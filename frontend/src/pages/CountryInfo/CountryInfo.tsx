import { useEffect, useState } from "react";
import { countriesService } from "../../services/country-service";
import { useParams } from "react-router-dom";
import styles from "./CountryInfo.module.css";
import { ICountry } from "../../interfaces/country.interface";
import PopulationChart from "../../components/PopulationChart/PopulationChart";

type Props = {};

const CountryInfo = (props: Props) => {
  const initalCountry: ICountry = {
    commonName: "",
    countryCode: "",
    officialName: "",
    region: "",
    flag: "",
    borders: [],
  };
  const [countryInfo, setCountryInfo] = useState();
  const { countryCode = "" } = useParams();

  const fetchCountryInfo = async (countryCode: string) => {
    const countryid = await countriesService.getCountryInfo(countryCode);
    setCountryInfo(countryid);
  };

  useEffect(() => {
    fetchCountryInfo(countryCode);
  }, []);
  return (
    <>
      {countryInfo ? (
        <>
          <div className={styles.countryHeader}>
            <h2>{countryInfo.countryName}</h2>
            <img
              className={styles.countryFlag}
              src={`${countryInfo.flag}`}
              alt={`${countryInfo.countryName}'s flag`}
            />
          </div>

          <div className={styles.countryBordersList}>
            <h3>Countries that border with {countryInfo.countryName}</h3>
            <ul>
              {countryInfo.borders.borders.map((country) => (
                <li key={country.countryCode}>{country.commonName}</li>
              ))}
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
