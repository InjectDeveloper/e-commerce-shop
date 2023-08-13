import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('lava', () => ({
  apiSecretKey: process.env.LAVA_API_KEY,
  shopId: process.env.LAVA_SHOP_ID,
}));
