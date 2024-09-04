import React, { useEffect, useState } from "react";
import useFetchCountries from "../hooks/useFetchCountries";

const Home = () => {
  const { useFetchAvailableCountries } = useFetchCountries();
  const [countries, setCountries] = useState([]);

  const handleCountries = async () => {
    const countries = await useFetchAvailableCountries();
    setCountries(countries);
  };

  useEffect(() => {
    handleCountries();
    console.log(countries);
  }, []);

  return (
    <div>
      <h2>Countries: </h2>
      {countries.map((c) => (
        <ul>
          <li>
            {c.name} - {c.countryCode}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Home;
