import { useEffect, useState } from "react";
import { countriesService } from "../../services/country-service";
import { Link, redirect, useParams } from "react-router-dom";
import styles from "./CountryInfo.module.css";
import { ICountry } from "../../interfaces/country.interface";
import PopulationChart from "../../components/PopulationChart/PopulationChart";
import VisibilityIcon from "@mui/icons-material/Visibility";

type Props = {};

const CountryInfo = (props: Props) => {
  const { countryCode = "" } = useParams();

  const initalCountry: ICountry = {
    countryName: "",
    commonName: "",
    countryCode: "",
    officialName: "",
    region: "",
    flag: "",
    borders: [],
    population: [{}],
  };
  const [countryInfo, setCountryInfo] = useState<ICountry>(initalCountry);
  const [errorMessage, setErrorMessage] = useState("");

  // const [countryInfo, setCountryInfo] = useState();

  const fetchCountryInfo = async (countryCode: string) => {
    try {
      const country = await countriesService.getCountryInfo(countryCode);
      setCountryInfo(country);
      return country;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (countryCode) {
      fetchCountryInfo(countryCode);
    }
  }, [countryCode]);

  console.log(countryInfo);

  return (
    <>
      {countryInfo ? (
        <>
          <div className={styles.countryHeader}>
            <h2>{countryInfo.countryName}</h2>
            <img
              className={styles.countryFlag}
              src={
                countryInfo.flag !== "Flag not founded"
                  ? countryInfo.flag
                  : "NO FLAG"
              } // Substitua "default-flag-url" por uma URL de imagem padrão
              alt={`${countryInfo.countryName}'s flag`}
            />
          </div>

          <div className={styles.countryBordersList}>
            <h3>Countries that border with {countryInfo.countryName}: </h3>
            <ul>
              {countryInfo.borders.length > 0 ? (
                countryInfo.borders.map((country: ICountry) => (
                  <li key={country.countryCode}>
                    <Link to={`/countryInfo/${country.countryCode}`}>
                      {country.commonName} <VisibilityIcon />
                    </Link>
                  </li>
                ))
              ) : (
                <p>This country doesn't have borders</p>
              )}
              {/* {countryInfo.borders.map((country: ICountry) => (
                <li key={country.countryCode}>
                  <Link to={`/countryInfo/${country.countryCode}`}>
                    {country.commonName} <VisibilityIcon />
                  </Link>
                </li>
              ))} */}
            </ul>
          </div>

          <div className={styles.populationChart}>
            <PopulationChart countryCode={countryCode} country={countryInfo} />
          </div>
        </>
      ) : (
        <p>Loading country info...</p>
      )}
    </>
  );
};

export default CountryInfo;
