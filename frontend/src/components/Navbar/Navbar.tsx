import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav id={styles.navBar}>
      <NavLink to='/'>All countries</NavLink>
    </nav>
  );
};

export default Navbar;
