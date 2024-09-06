import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries() {
    const availableCountriesUrl =
      'https://date.nager.at/api/v3/AvailableCountries';

    const response = await lastValueFrom(
      this.httpService.get(availableCountriesUrl),
    );

    return response.data;
  }

  async getCountryInfo(code: string) {
    try {
      const countrySearched = await this.getCountryByCode(code);
      const borders = await this.getBorderCountries(code);
      const population = await this.getCountryPopulationData(
        countrySearched.name,
      );
      const flag = await this.getCountryFlag(countrySearched.countryCode);

      const countryInfo = await Promise.all([borders, population, flag]).then(
        ([bordersData, populationData, flagData]) => {
          return {
            countryName: countrySearched.name,
            borders: bordersData,
            population: populationData,
            flag: flagData,
          };
        },
      );

      return countryInfo;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getBorderCountries(countryCode: string) {
    const countryInfoUrl = `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;

    try {
      const countryWithBordersResponse = await lastValueFrom(
        this.httpService.get(countryInfoUrl),
      );

      return countryWithBordersResponse.data.borders;
    } catch (error) {
      console.log('Get borders');
      throw new BadRequestException(error.message);
    }
  }

  async getCountryPopulationData(country: string) {
    const populationsUrl = `https://countriesnow.space/api/v0.1/countries/population`;

    try {
      // await this.getCountryByCodeOrName(country);
      const body = { country };

      const countriesPopulationResponse = await lastValueFrom(
        this.httpService.post(populationsUrl, body),
      );

      return countriesPopulationResponse.data.data.populationCounts;
    } catch (error) {
      console.log('Get population');
      throw new BadRequestException(error.message, 'Get population');
    }
  }

  async getCountryFlag(iso2: string) {
    const flagImageUrl =
      'https://countriesnow.space/api/v0.1/countries/flag/images';

    try {
      const body = { iso2 }; // Enviar o ISO2 como um objeto

      const countryFlagResponse = await lastValueFrom(
        this.httpService.post(flagImageUrl, body),
      );

      return countryFlagResponse.data.data.flag;
    } catch (error) {
      if (error) {
        return { flagData: 'No flag founded' };
      }
    }
  }

  async getCountryByCode(code?: string, name?: string) {
    try {
      const countries = await this.getAvailableCountries();

      const country = countries.find(
        (country) => country['countryCode'] == code,
      );

      if (!country) {
        throw new NotFoundException(`Country ${code} not founded`);
      }

      return country;
    } catch (error) {
      if (error) {
        return { country: 'Country not founded' };
      }
      throw new BadRequestException(error.message, 'Get country');
    }
  }
}
