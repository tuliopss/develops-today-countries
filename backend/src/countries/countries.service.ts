import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { IAvailableCountry } from './interfaces/available-country.interface';
@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}
  create(createCountryDto: CreateCountryDto) {
    return 'This action adds a new country';
  }

  async getAvailableCountries(): Promise<IAvailableCountry[]> {
    const availableCountriesUrl =
      'https://date.nager.at/api/v3/AvailableCountries';

    const response = await lastValueFrom(
      this.httpService.get(availableCountriesUrl),
    );

    return response.data;
  }

  async getCountryInfo(code: string) {
    try {
      const countrySearched = await this.getCountryByCodeOrName(code);
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

      if (!countryFlagResponse) {
        return 'oi';
      }

      return countryFlagResponse.data.data.flag;
    } catch (error) {
      if (error) {
        return { flagData: 'No flag founded' };
      }
    }
  }

  async getCountryByCodeOrName(code?: string, name?: string) {
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
      console.log('Get country');
      throw new BadRequestException(error.message, 'Get country');
    }
  }
}
