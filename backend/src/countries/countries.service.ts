import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
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

  async getCountryInfo(createCountry: CreateCountryDto) {
    const { country, iso2, code } = createCountry;
    try {
      const borders = await this.getBorderCountries(code);
      const population = await this.getCountryPopulationData(country);
      console.log('a', population);
      const flag = await this.getCountryFlag(iso2);

      const countryInfo = await Promise.all([borders, population, flag]).then(
        (values) => {
          return { borders, population, flag };
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
}
