// Importing logo image and CSS styles
import logo from "../assets/react.svg";
import "../css/Style.css";

// Importing NavLink from react-router-dom
import { NavLink } from "react-router-dom";

// Functional component for the Navbar
const Navbar = () => {
  return (
    // Navbar container with logo and navigation elements
    <nav className="navbar">
      <div className="container">
        {/* Logo section with a link to the home page */}
        <div className="logo">
          <NavLink to="/">
            <img src={logo} className="logo-img" alt="Vite logo" />
          </NavLink>
          <span className="brand">D.</span>
        </div>

        {/* Navigation elements with links to Home and About pages */}
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Exporting the Navbar component
export default Navbar;
