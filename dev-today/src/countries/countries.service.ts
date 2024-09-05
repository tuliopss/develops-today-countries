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

  async getCountryInfo(countryCode: string) {
    //BORDER COUNTRIES
    const countryInfoUrl = `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;

    try {
      const countryWithBordersResponse = await lastValueFrom(
        this.httpService.get(countryInfoUrl),
      );

      return countryWithBordersResponse.data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getCountryPopulationData(countryCode: string) {
    const populationsUrl = `https://countriesnow.space/api/v0.1/countries/population`;

    try {
      const countriesPopulationResponse = await lastValueFrom(
        this.httpService.get(populationsUrl),
      );

      const countryPopulation = countriesPopulationResponse.data.data.filter(
        (country) => {
          return country['code'] == countryCode;
        },
      );

      if (countryPopulation.length == 0) {
        throw new NotFoundException(`Country code not founded`);
      }

      return countryPopulation;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCountryFlag(countryCode: string) {
    const flagImageUrl =
      'https://countriesnow.space/api/v0.1/countries/flag/images';

    try {
      const countryFlagResponse = await lastValueFrom(
        this.httpService.get(flagImageUrl),
      );

      const countryFlag = countryFlagResponse.data.data.filter((country) => {
        return country['iso2'] == countryCode;
      });
      return countryFlag[0].flag;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
