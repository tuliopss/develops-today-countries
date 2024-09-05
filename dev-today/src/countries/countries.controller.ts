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

  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  getAvailableCountries() {
    return this.countriesService.getAvailableCountries();
  }

  @Get('/countryInfo/:code')
  getCountryInfo(@Param('code') countryCode: string) {
    return this.countriesService.getCountryInfo(countryCode);
  }
  @Get('/population/:code')
  getPopulations(@Param('code') countryCode: string) {
    return this.countriesService.getCountryPopulationData(countryCode);
  }

  @Get('/flag/:code')
  getFlag(@Param('code') countryCode: string) {
    return this.countriesService.getCountryFlag(countryCode);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countriesService.remove(+id);
  }
}
