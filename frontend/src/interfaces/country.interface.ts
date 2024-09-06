export interface ICountry {
  commonName: string;
  countryCode: string;
  officialName: string;
  region: string;
  flag: string;
  borders: ICountry[];
}
