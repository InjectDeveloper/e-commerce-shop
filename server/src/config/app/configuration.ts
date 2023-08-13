import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.APP_BACKEND_PORT,
  adminPassword: process.env.APP_ADMIN_PASSWORD,
}));
