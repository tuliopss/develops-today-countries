import { apiUrl, requestConfig } from "../../utils/api-request-config.ts";
import { SearchCountryDto } from "../dtos/search-country.dto.ts";
import { IAvailableCountry } from "../interfaces/available-country.interface.ts";
import { ICountry } from "../interfaces/country.interface.ts";

const getAvailableCountries = async (): Promise<IAvailableCountry[]> => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(`${apiUrl}/countries`, config);

    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getCountryInfo = async (code: string): Promise<ICountry> => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(`${apiUrl}/countries/info/${code}`, config);

    if (!res) {
      console.log("Erro");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return {} as ICountry;
  }
};

export const countriesService = {
  getAvailableCountries,
  getCountryInfo,
};
