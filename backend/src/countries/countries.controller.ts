import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post('/population')
  create(@Body() country: string) {
    return this.countriesService.getCountryPopulationData(country);
  }

  @Get()
  getAvailableCountries() {
    return this.countriesService.getAvailableCountries();
  }

  @Get('/info/')
  getCountryInfo(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.getCountryInfo(createCountryDto);
  }

  @Get('/borders/:code')
  getBorderCountries(@Param('code') countryCode: string) {
    return this.countriesService.getBorderCountries(countryCode);
  }

  @Post('/flag')
  getFlag(@Body() iso2: string) {
    return this.countriesService.getCountryFlag(iso2);
  }
}
