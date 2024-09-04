import { useState } from "react";
import { availableCountriesUrl } from "../utils/dataUrl";

export default function useFetchCountries() {
  const useFetchAvailableCountries = async () => {
    const data = await fetch(availableCountriesUrl).then((response) => {
      return response.json();
    });
    console.log(availableCountriesUrl);
    return data;
  };

  return { useFetchAvailableCountries };
}
