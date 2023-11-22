import { NavLink, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <header>
      <div>
        <NavLink to={"/"}>
          <h1>
            <span>NavBar</span>
          </h1>
        </NavLink>
      </div>
      <div>
        {pathname === "/home" ? (
          <NavLink to={"/home"} id="active">
            Inicio
          </NavLink>
        ) : (
          <NavLink to={"/home"}>Inicio</NavLink>
        )}
        {pathname === "/About" ? (
          <NavLink to={"/About"} id="active">
            About
          </NavLink>
        ) : (
          <NavLink to={"/About"}>About</NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
