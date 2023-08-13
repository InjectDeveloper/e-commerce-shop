export interface IAppConfigService {
  get port(): string;
  get adminPassword(): string;
}

export const IAppConfigService = Symbol('IAppConfigService');
