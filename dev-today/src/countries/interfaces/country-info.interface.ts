export interface ICountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders?: ICountryInfo[];
}
