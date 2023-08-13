import { PrismaService } from '../../provider/database/prisma/provider.service';
import { Injectable } from '@nestjs/common';
import { UpdateContact } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {
    this.createIfDontExist();
  }

  async getAll() {
    const contacts = await this.prismaService.contacts.findFirst();
    return contacts;
  }

  async updateContact(updateDto: UpdateContact) {
    let contact = await this.prismaService.contacts.findFirst();
    contact[updateDto.target] = updateDto.newValue;
    return await this.prismaService.contacts.update({
      where: { id: contact.id },
      data: contact,
    });
  }

  private async createIfDontExist() {
    const contacts = await this.prismaService.contacts.findFirst();
    if (!contacts) {
      await this.prismaService.contacts.create({
        data: {
          mobile: '',
          email: '',
          telegram: '',
          viber: '',
          whatsapp: '',
        },
      });
    }
  }
}
