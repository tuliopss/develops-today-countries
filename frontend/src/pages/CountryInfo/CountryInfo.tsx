import { useEffect, useState } from "react";
import { countriesService } from "../../services/country-service";
import { useParams } from "react-router-dom";
import styles from "./CountryInfo.module.css";

type Props = {};

const CountryInfo = (props: Props) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const { countryCode = "" } = useParams();

  const fetchCountryInfo = async (countryCode: string) => {
    const countryid = await countriesService.getCountryInfo(countryCode);
    setCountryInfo(countryid);
  };

  useEffect(() => {
    fetchCountryInfo(countryCode);
  }, []);
  console.log(countryInfo);
  return (
    <>
      {countryInfo ? (
        <div className={styles.countryHeader}>
          <h2>{countryInfo.borders.commonName}</h2>
          <img
            className={styles.countryFlag}
            src={`${countryInfo.flag}`}
            alt={`${countryInfo.borders.commonName}'s flag`}
          />

          {/* <p>{countryInfo.population}</p> */}
        </div>
      ) : (
        <p>Loading country info...</p>
      )}
    </>
  );
};

export default CountryInfo;
