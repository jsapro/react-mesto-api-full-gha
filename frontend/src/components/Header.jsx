import React from "react";
import logo from "../images/header-logo.svg";
import { NavLink, useLocation } from "react-router-dom";

export default function Header({ userData, loggedIn, handleSignOut }) {
  let location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого Mesto" />
      {location.pathname === "/sign-up" && (
        <NavLink to="/sign-in" className="header__navlink">
          Войти
        </NavLink>
      )}
      {location.pathname === "/sign-in" && (
        <NavLink to="/sign-up" className="header__navlink">
          Регистрация
        </NavLink>
      )}
      {location.pathname === "/" && (
        <div className="header__info-wrapper">
          <p className="header__email">{loggedIn ? userData.email : null}</p>
          <NavLink
            to="/sign-in"
            className="header__navlink"
            onClick={handleSignOut}
          >
            Выйти
          </NavLink>
        </div>
      )}
    </header>
  );
}
