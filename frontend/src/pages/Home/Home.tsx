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
  const [query, setQuery] = useState<String>("");

  const fetchCountriesAvailables = async () => {
    const countries = await countriesService.getAvailableCountries();

    setAvailableCountries(countries);
  };

  const filteredCountries = query
    ? availableCountries.filter((country) => {
        return country.name.toLowerCase().includes(query.toLowerCase());
      })
    : availableCountries;
  useEffect(() => {
    fetchCountriesAvailables();
  }, []);

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type='search'
          placeholder='Search country...'
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <h1>Available Countries: </h1>

      <div className={styles.countriesList}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
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
