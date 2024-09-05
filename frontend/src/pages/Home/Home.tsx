import React, { useEffect, useState } from "react";
import CountryCard from "../../components/CountryCard/CountryCard";
import { IAvailableCountry } from "../../interfaces/available-country.interface";
import { countriesService } from "../../services/country-service";
import styles from "./Home.module.css";

type Props = {};

const Home = (props: Props) => {
  const [availableCountries, setAvailableCountries] = useState<
    IAvailableCountry[]
  >([]);

  const fetchCountriesAvailables = async () => {
    const countries = await countriesService.getAvailableCountries();

    setAvailableCountries(countries);
  };

  useEffect(() => {
    fetchCountriesAvailables();
  }, []);

  return (
    <>
      <h1>Available Countries: </h1>
      <div className={styles.countriesList}>
        {availableCountries.length > 0 ? (
          availableCountries.map((country) => (
            <CountryCard key={country.countryCode} country={country} />
          ))
        ) : (
          <h1>Doesn't exists available countries</h1>
        )}
      </div>
    </>
  );
};

export default Home;
