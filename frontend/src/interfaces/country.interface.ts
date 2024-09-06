export interface ICountry {
  countryName: string;
  commonName: string;
  countryCode: string;
  officialName: string;
  region: string;
  flag: string;
  borders: ICountry[];
  population: [{}];
}
