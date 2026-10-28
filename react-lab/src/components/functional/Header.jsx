import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

function Header(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <header className="header">
      <h1>Inventory Dashboard</h1>
      <p>Current theme: {theme}</p>
      <p>Total products: {props.totalProducts}</p>
      <ThemeToggle />
    </header>
  );
}

export default Header;
