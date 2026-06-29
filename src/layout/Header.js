import "./Header.css";

import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="#daily-reading">
          <img className="site-header__logo" src="/logo192.png" alt="" />
          <span className="site-header__brand-name">Scriptum Deus</span>
        </a>

        <nav className={`site-header__nav ${mobileMenuOpen ? "site-header__nav--open" : ""}`} aria-label="Navigare principală">
          <NavLink
            to="/daily-reading"
            className={({ isActive }) => `site-header__nav-link ${isActive ? "site-header__nav-link--active" : ""}`}
            onClick={closeMobileMenu}
          >
            Pasajul zilei
          </NavLink>

          <NavLink
            to="/bible"
            className={({ isActive }) => `site-header__nav-link ${isActive ? "site-header__nav-link--active" : ""}`}
            onClick={closeMobileMenu}
          >
            Biblia
          </NavLink>
        </nav>

        <div className="site-header__desktop-actions">
          <Button component={NavLink} to="/daily-reading" variant="outlined" className="site-header__reading-button">
            Citește azi
          </Button>
        </div>

        <IconButton
          className="site-header__mobile-toggle"
          aria-label="Deschide meniul"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </header>
  );
};
