export interface ILavaConfigService {
  get apiSecretKey(): string;

  get shopId(): string;
}

export const ILavaConfigService = Symbol('ILavaConfigService');
