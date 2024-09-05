import React from "react";
import { IAvailableCountry } from "../../interfaces/available-country.interface";
import styles from "./CountryCard.module.css";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
type Props = {
  country: IAvailableCountry;
};
const CountryCard = ({ country }: Props) => {
  return (
    <div className={styles.countryCard}>
      <Link to={"/countryInfo"} state={{ countryCode: country.countryCode }}>
        <h2>{country.name}</h2>
      </Link>

      <p>{country.countryCode}</p>

      <div className={styles.countryCardLink}>
        <Link to={`/countryInfo/${country.countryCode}`}>
          See more <VisibilityIcon />
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;
