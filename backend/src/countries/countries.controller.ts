import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

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

  @Get('/info/:code')
  getCountryInfo(@Param('code') code: string) {
    return this.countriesService.getCountryInfo(code);
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
