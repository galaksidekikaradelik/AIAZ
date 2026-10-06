import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Moon,
  Sun,
  Menu,
  X,
  Globe,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import logoLight from "../assets/aiazlogomain.webp";
import logoDark from "../assets/aiazlogoag.webp";

function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [festivalOpen, setFestivalOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setLanguageOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setFestivalOpen(false);
    setLanguageOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "active" : undefined;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <img
            src={theme === "dark" ? logoDark : logoLight}
            alt="AIAZ"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="navbar-links">

          {/* HOME */}
          <NavLink
            to="/"
            end
            className={navLinkClass}
          >
            {t.nav.home}
          </NavLink>

          {/* FESTIVAL */}
          <div
            className={`navbar-dropdown ${
              festivalOpen ? "open" : ""
            }`}
          >
            <button
              type="button"
              className="navbar-dropdown-trigger"
              onClick={() =>
                setFestivalOpen((current) => !current)
              }
              aria-expanded={festivalOpen}
            >
              <span>{t.nav.festival}</span>
              <ChevronDown size={15} />
            </button>

            <div className="navbar-dropdown-menu">
              <NavLink
                to="/festival"
                className={navLinkClass}
              >
                {t.nav.aboutFestival}
              </NavLink>

              <NavLink
                to="/jury"
                className={navLinkClass}
              >
                {t.nav.jury}
              </NavLink>

              <NavLink
                to="/program"
                className={navLinkClass}
              >
                {t.nav.program}
              </NavLink>
            </div>
          </div>

          {/* NEWS */}
          <NavLink
            to="/news"
            className={navLinkClass}
          >
            {t.nav.news}
          </NavLink>

          {/* MEDIA */}
          <NavLink
            to="/media"
            className={navLinkClass}
          >
            {t.nav.gallery}
          </NavLink>

          {/* ABOUT */}
          <NavLink
            to="/about"
            className={navLinkClass}
          >
            {t.nav.about}
          </NavLink>

          {/* CONTACT */}
          <NavLink
            to="/contact"
            className={navLinkClass}
          >
            {t.nav.contact}
          </NavLink>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="navbar-actions">

          {/* FILMFREEWAY */}
          <a
            href="https://filmfreeway.com/festivals/79513"
            target="_blank"
            rel="noopener noreferrer"
            className="filmfreeway-link"
            aria-label={t.nav.submitFilm}
          >
            <img
              src="https://public-assets.filmfreeway.com/submission_buttons/v2/sm_submission_btn@2x-purple-gradient.png"
              alt={t.nav.submitFilm}
            />
          </a>

          {/* THEME */}
          <button
            type="button"
            className={`theme-toggle ${theme}`}
            onClick={toggleTheme}
            aria-label={t.nav.changeTheme}
          >
            <span className="theme-toggle-circle">
              {theme === "dark" ? (
                <Moon size={14} />
              ) : (
                <Sun size={14} />
              )}
            </span>
          </button>

          {/* LANGUAGE */}
          <div className="language-switcher">
            <button
              type="button"
              className="language-current"
              onClick={() =>
                setLanguageOpen((current) => !current)
              }
              aria-label={t.nav.changeLanguage}
            >
              <Globe size={16} />
              <span>{language.toUpperCase()}</span>
            </button>

            {languageOpen && (
              <div className="language-dropdown">
                <button
                  type="button"
                  className={language === "az" ? "active" : ""}
                  onClick={() => changeLanguage("az")}
                >
                  AZ
                </button>

                <button
                  type="button"
                  className={language === "en" ? "active" : ""}
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() =>
              setMenuOpen((current) => !current)
            }
            aria-label={t.nav.openMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`mobile-menu ${
          menuOpen ? "is-open" : ""
        }`}
      >
        <div className="mobile-menu-inner">

          {/* MOBILE NAVIGATION */}
          <div className="mobile-nav">

            <NavLink
              to="/"
              end
              className={navLinkClass}
              onClick={closeMenu}
            >
              <span>01</span>
              {t.nav.home}
            </NavLink>

            {/* FESTIVAL */}
            <div className="mobile-festival">
              <button
                type="button"
                className={`mobile-festival-trigger ${
                  festivalOpen ? "open" : ""
                }`}
                onClick={() =>
                  setFestivalOpen((current) => !current)
                }
                aria-expanded={festivalOpen}
              >
                <span>
                  <small>02</small>
                  {t.nav.festival}
                </span>

                <ChevronDown size={20} />
              </button>

              <div
                className={`mobile-festival-menu ${
                  festivalOpen ? "is-open" : ""
                }`}
              >
                <NavLink
                  to="/festival"
                  onClick={closeMenu}
                >
                  {t.nav.aboutFestival}
                </NavLink>

                <NavLink
                  to="/jury"
                  onClick={closeMenu}
                >
                  {t.nav.jury}
                </NavLink>

                <NavLink
                  to="/program"
                  onClick={closeMenu}
                >
                  {t.nav.program}
                </NavLink>
              </div>
            </div>

            <NavLink
              to="/news"
              className={navLinkClass}
              onClick={closeMenu}
            >
              <span>03</span>
              {t.nav.news}
            </NavLink>

            <NavLink
              to="/media"
              className={navLinkClass}
              onClick={closeMenu}
            >
              <span>04</span>
              {t.nav.gallery}
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={closeMenu}
            >
              <span>05</span>
              {t.nav.about}
            </NavLink>

            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={closeMenu}
            >
              <span>06</span>
              {t.nav.contact}
            </NavLink>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="mobile-menu-actions">

            {/* FILMFREEWAY */}
            <a
              href="https://filmfreeway.com/festivals/79513"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-filmfreeway"
            >
              <span>{t.nav.submitFilm}</span>
              <ExternalLink size={17} />
            </a>

            {/* CONTROLS */}
            <div className="mobile-controls">

              {/* LANGUAGE */}
              <div className="mobile-language">
                <Globe size={17} />

                <button
                  type="button"
                  className={language === "az" ? "active" : ""}
                  onClick={() => changeLanguage("az")}
                >
                  AZ
                </button>

                <span>/</span>

                <button
                  type="button"
                  className={language === "en" ? "active" : ""}
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </button>
              </div>

              {/* THEME */}
              <button
                type="button"
                className="mobile-theme"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <>
                    <Moon size={17} />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun size={17} />
                    <span>Light</span>
                  </>
                )}
              </button>

            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;