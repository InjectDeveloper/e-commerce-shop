import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../provider/database/prisma/provider.service';
import { ILavaConfigService } from '../../config/lava/config.interface';
import { createHmac } from 'crypto';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { CreateCodesDto } from './dto/create-code.dto';
import { CreateLicensesDto } from './dto/create-licenses.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto } from './dto/create-order.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { DeleteCodesOrLicensesDto } from './dto/delete-codes-or-licenses.dto';
import { CreateWithRelationDto } from './dto/create-with-relation.dto';
import { yellow } from '@nestjs/common/utils/cli-colors.util';
import { uuid } from 'uuidv4';
import * as CryptoJs from 'crypto-js';
import {CreateSoloLicensesDto} from "./dto/create-solo-license.dto";

@Injectable()
export class LicenseService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(ILavaConfigService) private readonly lavaConfig: ILavaConfigService,
  ) {}

  async createCodes(createCodeDto: CreateCodesDto) {
    try {
      const count = await this.prismaService.code.createMany({
        data: createCodeDto.codes,
      });
      return { message: `Успешно создано ${count.count} ключей` };
    } catch (e) {
      throw new BadRequestException(
        'Неправильные данные, проверьте, может быть неправильно указаны названия товаров',
      );
    }
  }
  async createLicenses(createDto: CreateSoloLicensesDto) {
    try {
      const count = await this.prismaService.license.createMany({
        data: createDto.licenses,
      });
      return { message: `Успешно создано ${count.count} ключей` };
    } catch (e) {
      throw new BadRequestException(
          'Неправильные данные, проверьте, может быть неправильно указаны названия товаров',
      );
    }
  }
  async createLicensesByGroup(createLicenseDto: CreateLicensesDto) {
    try {
      let count = 0
      for (let i = 0; i < createLicenseDto.licenses.length; i++) {
        const group = await this.prismaService.group.findUnique({
          where: {
            title: createLicenseDto.licenses[i].groupTitle
          },
          include: {
            products: true
          }
        })


        for (let k = 0; k < group.products.length; k++) {
          await this.prismaService.license.create({
            data: {
              productTitle: group.products[k].title,
              value: createLicenseDto.licenses[i].value
            }
          })
          count += 1
        }
      }
      return { message: `Успешно создано ${count} лицензий` };
    } catch (e) {

      throw new BadRequestException(
        'Неправильные данные, проверьте, может быть неправильно указаны названия товаров',
      );
    }
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: createOrderDto.productId,
      },
    });
    if (!product) {
      throw new BadRequestException('Товара с таким ID не существует');
    }

    let license = await this.prismaService.license.findFirst({
      where: {
        codeId: null,
        isBuyed: false,
        productTitle: product.title,
      },
    });

    if (!license) {
      const group = await this.prismaService.group.findFirst({
        where: {
          products: {
            some: {
              title: product.title
            }
          }
        },
        include: {
          products: true
        }
      })
      let titles = []
      for (let i = 0; i < group.products.length; i++){
        titles.push(group.products[i].title)
      }
      license = await this.prismaService.license.findFirst({
        where: {
          productTitle: {
            in: titles
          },
          codeId: null,
          isBuyed: false
        }
      })
      if (!license) {
        throw new InternalServerErrorException(
            'Товар закончился',
        )
      }
    }

    const codeValue = uuidv4().split('-')[0].toUpperCase();
    const paymentData = uuid().split('-')[0];
    const code = await this.prismaService.code.create({
      data: {
        value: codeValue,
        productTitle: product.title,
        isBuyed: true,
        paymentData: paymentData,
      },
      include: {
        product: true,
      },
    });

    const order = await this.prismaService.order.create({
      data: {
        codeId: code.id,
        date: new Date().toLocaleString(),
        phone: createOrderDto.phone,
      },
    });

    //ПОЛУЧЕНИЕ ССЫЛКИ С ЛАВЫ
    const payUrl = await this._getPayLink(
      product.price,
      order.id,
      codeValue,
      product.title,
    );
    return payUrl;
  }

  async activateLicense(userCode: string) {
    const code = await this.prismaService.code.findUnique({
      where: {
        value: userCode,
      },
    });
    if (!code) {
      throw new NotFoundException();
    }

    await this.prismaService.code.update({
      where: {
        value: code.value,
      },
      data: {
        isBuyed: true,
      },
    });

    const license = await this.prismaService.license.findUnique({
      where: {
        codeId: code.id,
      },
      include: {
        product: true,
      },
    });
    if (license) {
      await this.prismaService.activation.create({
        data: {
          codeId: code.id,
          date: new Date().toLocaleString(),
        },
      });
      return license;
    } else {
      let freeLicense = await this.prismaService.license.findFirst({
        where: {
          productTitle: code.productTitle,
          codeId: null,
          isBuyed: false
        }
      })
      if (!freeLicense) {
        const group = await this.prismaService.group.findFirst({
          where: {
            products: {
              some: {
                title: code.productTitle
              }
            }
          },
          include: {
            products: true
          }
        })
        let titles = []
        for (let i = 0; i < group.products.length; i++){
          titles.push(group.products[i].title)
        }
        freeLicense = await this.prismaService.license.findFirst({
          where: {
            productTitle: {
              in: titles
            },
            codeId: null,
            isBuyed: false
          }
        })
        if (!freeLicense) {
          throw new InternalServerErrorException(
              'Ошибка сайта. Свяжитесь с нами по контактам техподдержки',
          )
        }
        freeLicense = await this.prismaService.license.create({
          data: {
            isBuyed: false,
            codeId: null,
            productTitle: code.productTitle,
            value: freeLicense.value
          }
        })

      }
      const newLicense = await this.prismaService.license.update({
        where: {
          id: freeLicense.id
        },
        data: {
          isBuyed: true,
          codeId: code.id
        },
        include: {
          product: true
        }
      })

      const group = await this.prismaService.group.findFirst({
        where: {
          products: {
            some: {
              title: code.productTitle
            }
          }
        },
        include: {
          products: true
        }
      })


      for (let i = 0; i < group.products.length; i++) {
        const lic = await this.prismaService.license.findFirst({
          where: {
            productTitle: group.products[i].title,
            value: newLicense.value,
            isBuyed: false
          }
        })
        if (lic) {
          if (lic.id != newLicense.id) {
            await this.prismaService.license.update({
              where: {
                id: lic.id
              },
              data: {
                isBuyed: true
              }
            })
          }
        }
      }

      await this.prismaService.activation.create({
        data: {
          codeId: code.id,
          date: String(new Date())
        }
      })
      return newLicense
    }
  }

  async _getPayLink(
    sum: number,
    orderId: number,
    code: string,
    product: string,
  ) {
    return new Promise((resolve, reject) => {
      let body = {
        sum: sum,
        orderId: orderId,
        shopId: '2692456a-106c-41ad-aedd-0829446eb8ee',
        hookUrl: 'https://winkeys.ru/api/license/webhook',
        successUrl: 'https://winkeys.ru/order/' + code,
      };

      const secret = 'd3eb4e51d2700197d42610a6de1006973951bae7'
      const hash = createHmac('sha256', secret).update(JSON.stringify(body)).digest('hex')



      const response = axios({
        method: 'POST',
        url:'https://api.lava.ru/business/invoice/create',
        data: body,
        headers: {
          'Signature': hash
        }
      })
        .then((result) => {
          resolve(result.data.data.url);
        })
        .catch((error) => {
          console.log(error)
          reject(error);
        });
    });
  }

  async activations() {
    const activations = await this.prismaService.activation.findMany({
      include: {
        code: {
          include: { product: true, license: true },
        },
      },
    });

    let csvData = 'Лицензия,Товар,Код,Дата,Время\n';
    for (let i = 0; i < activations.length; i++) {
      const code = activations[i].code.value;
      const key = activations[i].code.license?.value;
      const productName = activations[i].code.productTitle;
      const date = activations[i].date;
      csvData =
        csvData +
        `${
          key || 'Пользователь еще не получил лицензию'
        },${productName},${code},${date}\n`;
    }
    await fs.writeFile(
      path.join(__dirname, '..', '..', '..', '..', 'public/activations.csv'),
      csvData,
      (err) => {
        if (err) {
          throw new InternalServerErrorException('Что-то пошло не так');
        }
      },
    );
    return;
  }

  async code() {
    const codes = await this.prismaService.code.findMany({
        where: {
          isBuyed: false,
          license: null
        },
      include: {
          product: true
      }
    });

    let csvData = 'Код,Товар\n';
    for (let i = 0; i < codes.length; i++) {
      csvData += `${codes[i].value},${codes[i].product.title}\n`
    }
    await fs.writeFile(
        path.join(__dirname, '..', '..', '..', '..', 'public/code.csv'),
        csvData,
        (err) => {
          if (err) {
            throw new InternalServerErrorException('Что-то пошло не так');
          }
        },
    );
    return;
  }

  async orders() {
    const orders = await this.prismaService.order.findMany({
      where: {
        isDone: true,
      },
      include: {
        code: {
          include: {
            product: true,
            license: true,
          },
        },
      },
    });

    let csvData = 'Лицензия,Товар,Номер,Код,Дата,Время\n';
    for (let i = 0; i < orders.length; i++) {
      const code = orders[i].code.value;
      const key = orders[i].code.license?.value ? orders[i].code.license.value : 'Лицензия ещё не получена';
      const productName = orders[i].code.productTitle;
      const phone = orders[i].phone;
      const date = orders[i].date;
      csvData = csvData + `${key},${productName},${phone},${code},${date}\n`;
    }
    await fs.writeFile(
      path.join(__dirname, '..', '..', '..', '..', 'public/orders.csv'),
      csvData,
      (err) => {
        if (err) {
          throw new InternalServerErrorException('Что-то пошло не так');
        }
      },
    );
    return;
  }

  async download() {
    const products = await this.prismaService.product.findMany({
      include: {
        licenses: {
          where: {
            codeId: null,
            isBuyed: false
          },
        },
      },
    });
    let txtData = '';
    let exist = 'В наличии: \n\n';
    let runOut = '\nЗакончились: \n';
    for (let i = 0; i < products.length; i++) {
      const productName = products[i].title;
      const count = products[i].licenses.length;
      if (count == 0) {
        runOut = runOut + `${productName} (0 шт)\n`;
        continue;
      }

      let licensesRaw = '';
      for (let b = 0; b < count; b++) {
        licensesRaw = licensesRaw + products[i].licenses[b].value + '\n';
      }

      exist = exist + `${productName} (${count} шт)\n${licensesRaw}\n`;
    }
    txtData = exist + runOut;
    await fs.writeFile(
      path.join(__dirname, '..', '..', '..', '..', 'public/licenses.txt'),
      txtData,
      (err) => {
        if (err) {
          console.log(err)
          throw new InternalServerErrorException('Что-то пошло не так');
        }
      },
    );
    return;
  }

  async getByCode(code: string) {
    const findedCode = await this.prismaService.code.findFirst({
      where: {
        value: code,
      },
      include: {
        product: true,
        license: true,
      },
    });
    if (!findedCode) {
      throw new NotFoundException();
    }
    return findedCode;
  }

  async deleteCodes(codes: DeleteCodesOrLicensesDto) {
    try {
      await this.prismaService.code.deleteMany({
        where: {
          value: {
            in: codes.values,
          },
        },
      });
    } catch (e) {
      throw new BadRequestException('Что-то нет');
    }
  }

  async deleteLicenes(licenses: DeleteCodesOrLicensesDto) {
    try {
      for (let i = 0; i < licenses.values.length; i++) {
        const lic = await this.prismaService.license.findFirst({
          where: {
            value: licenses.values[i]
          },
          include: {
            product: {
              include: {
                group: {
                  include: {
                    products: true
                  }
                }
              }
            }
          }
        })
        const group = lic.product.group
        for (let k = 0; k < group.products.length; k++) {
          const li = await this.prismaService.license.findFirst({
            where: {
              productTitle: group.products[k].title,
              value: licenses.values[i]
            }
          })

          if (li) {
            await this.prismaService.license.delete({
              where: {
                id: li.id
              }
            })
          }

        }

      }
    } catch (e) {
      console.log(e)
      throw new BadRequestException('Что-то нет');
    }
  }

  async createWithRelations(createDto: CreateWithRelationDto) {
    try {
      for (let i = 0; i < createDto.values.length; i++) {
        const code = await this.prismaService.code.create({
          data: {
            productTitle: createDto.values[i].product,
            value: createDto.values[i].code,
            isBuyed: true,
          },
        });
        await this.prismaService.license.create({
          data: {
            codeId: code.id,
            productTitle: createDto.values[i].product,
            value: createDto.values[i].license,
          },
        });
      }
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async webhook(orderId: number) {
    let order = await this.prismaService.order.findUnique({
      where: {
        id: orderId
      },
      include: {
        code: {
          include: {
            license: true,
            product: true
          }
        }
      }
    })


    await this.prismaService.order.update({
      where: {
        id: order.id
      },
      data: {
        isDone: true
      }
    })

    let freeLicense = await this.prismaService.license.findFirst({
      where: {
        isBuyed: false,
        codeId: null,
        productTitle: order.code.productTitle
      }
    })

    if (!freeLicense) {
      const group = await this.prismaService.group.findFirst({
        where: {
          products: {
            some: {
              title: order.code.productTitle
            }
          }
        },
        include: {
          products: true
        }
      })
      let titles = []
      for (let i = 0; i < group.products.length; i++){
        titles.push(group.products[i].title)
      }
      freeLicense = await this.prismaService.license.findFirst({
        where: {
          productTitle: {
            in: titles
          },
          codeId: null,
          isBuyed: false
        }
      })
      if (!freeLicense) {
        return
      }
      freeLicense = await this.prismaService.license.create({
        data: {
          isBuyed: false,
          codeId: order.code.id,
          productTitle: order.code.productTitle,
          value: freeLicense.value
        }
      })

    }
    const newLic = await this.prismaService.license.update({
      where: {
        id: freeLicense.id
      },
      data: {
        codeId: order.code.id,
        isBuyed: true
      }
    })

    order = await this.prismaService.order.findUnique({
      where: {
        id: orderId
      },
      include: {
        code: {
          include: {
            license: true,
            product: true
          }
        }
      }
    })

    const group = await this.prismaService.group.findFirst({
      where: {
        products: {
          some: {
            title: order.code.product.title
          }
        }
      },
      include: {
        products: true
      }
    })

    for (let i = 0; i < group.products.length; i++) {
      const lic = await this.prismaService.license.findFirst({
        where: {
          productTitle: group.products[i].title,
          value: order.code.license.value,
          isBuyed: false
        }
      })
      if (lic) {

        if (lic.id != newLic.id) {
          await this.prismaService.license.update({
            where: {
              id: lic.id
            },
            data: {
              isBuyed: true
            }
          })
        }
      }
    }
  }
}
