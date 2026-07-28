import "./Header.css";

import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

import { LANGUAGE_STORAGE_KEY } from "../i18n";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  const { i18n, t } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const changeLanguage = (nextLanguage) => {
    i18n.changeLanguage(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
    setLanguageMenuAnchor(null);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="#daily-reading">
          <img className="site-header__logo" src="/logo192.png" alt="" />
          <span className="site-header__brand-name">Scriptum Deus</span>
        </a>

        <nav
          className={`site-header__nav ${mobileMenuOpen ? "site-header__nav--open" : ""}`}
          aria-label={t("header.nav.ariaLabel")}
        >
          <NavLink
            to="/daily-reading"
            className={({ isActive }) => `site-header__nav-link ${isActive ? "site-header__nav-link--active" : ""}`}
            onClick={closeMobileMenu}
          >
            {t("header.nav.dailyReading.title")}
          </NavLink>

          <NavLink
            to="/bible"
            className={({ isActive }) => `site-header__nav-link ${isActive ? "site-header__nav-link--active" : ""}`}
            onClick={closeMobileMenu}
          >
            {t("header.nav.bible.title")}
          </NavLink>
        </nav>

        <div className="site-header__desktop-actions">
          <Button
            className="site-header__language-button"
            aria-label={t("header.language.label")}
            aria-controls={languageMenuAnchor ? "language-menu" : undefined}
            aria-expanded={Boolean(languageMenuAnchor)}
            aria-haspopup="menu"
            onClick={(event) => setLanguageMenuAnchor(event.currentTarget)}
            startIcon={<LanguageIcon />}
          >
            {language.toUpperCase()}
          </Button>

          <Menu
            id="language-menu"
            anchorEl={languageMenuAnchor}
            open={Boolean(languageMenuAnchor)}
            onClose={() => setLanguageMenuAnchor(null)}
            MenuListProps={{ "aria-label": t("header.language.label") }}
          >
            {["en", "ro", "de", "fr", "it", "es"].map((code) => (
              <MenuItem key={code} selected={language === code} onClick={() => changeLanguage(code)}>
                {t(`header.language.options.${code}`)}
              </MenuItem>
            ))}
          </Menu>

          <Button component={NavLink} to="/daily-reading" variant="outlined" className="site-header__reading-button">
            {t("header.actions.readToday")}
          </Button>
        </div>

        <IconButton
          className="site-header__mobile-toggle"
          aria-label={t(mobileMenuOpen ? "header.mobileMenu.close" : "header.mobileMenu.open")}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </header>
  );
};
