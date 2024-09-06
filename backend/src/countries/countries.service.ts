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
      const countrySearched = await this.getCountryByCode(code);
      const borders = await this.getBorderCountries(code);
      const population = await this.getCountryPopulationData(
        countrySearched.name,
      );
      const flag = await this.getCountryFlag(countrySearched.countryCode);

      const countryInfo = await Promise.all([borders, population, flag]).then(
        () => {
          return {
            countryName: countrySearched.name,
            borders: borders,
            population,
            flag,
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
      if (!countryWithBordersResponse) {
        throw new BadRequestException('oiipb');
      }
      return countryWithBordersResponse.data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getCountryPopulationData(country: string) {
    const populationsUrl = `https://countriesnow.space/api/v0.1/countries/population`;

    try {
      const body = { country };
      const countriesPopulationResponse = await lastValueFrom(
        this.httpService.post(populationsUrl, body),
      );

      return countriesPopulationResponse.data.data;
    } catch (error) {
      throw new BadRequestException(error.message);
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
      throw new BadRequestException(error.message);
    }
  }

  async getCountryByCode(code: string) {
    const countries = await this.getAvailableCountries();

    const country = countries.find((country) => country['countryCode'] == code);

    return country;
  }
}
