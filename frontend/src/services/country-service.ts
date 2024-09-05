import { apiUrl, requestConfig } from "../../utils/api-request-config.ts";
import { SearchCountryDto } from "../dtos/search-country.dto.ts";
import { IAvailableCountry } from "../interfaces/available-country.interface.ts";

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

const getCountryInfo = async (code: string) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(`${apiUrl}/countries/info/${code}`, config);

    return await res.json();
  } catch (error) {
    console.log(error);
    return {};
  }
};

// const createProduct = async (data: ): Promise< | undefined> => {
//   const config = requestConfig("POST", data);

//   try {
//     const res = await fetch(`${apiUrl}/products`, config);

//     return await res.json();
//   } catch (error) {
//     console.error(error);
//   }
// };

export const countriesService = {
  getAvailableCountries,
  getCountryInfo,
};
