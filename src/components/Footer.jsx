import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  FaFacebookF,
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
} from "react-icons/fa";

import FilmFreewayIcon from "./FilmFreewayIcon";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h3>AIAZ</h3>

          <p>
            {t.footer.description}
          </p>
        </div>

        <div className="footer-column">
          <h3>{t.footer.contact}</h3>

          <div className="footer-contact-info">
            <a href="mailto:info@aiazff.com">
              <FaEnvelope />
              <span>info@aiazff.com</span>
            </a>

            <a href="tel:+994503514024">
              <FaPhone />
              <span>+994 50 351 40 24</span>
            </a>

            <div className="footer-location">
              <FaMapMarkerAlt />
              <span>Moskva 9, Yasamal, Bakı, AZ1012</span>
            </div>
          </div>

          <div className="footer-socials">
            <a
              href="https://www.facebook.com/aiazff"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/aiazfilmfestival/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.youtube.com/@A%C4%B0AZFilmFestival"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>

            <a
              href="https://filmfreeway.com/aiazff"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FilmFreeway"
            >
              <FilmFreewayIcon size={20} />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>{t.footer.links}</h3>

          <Link to="/">
            {t.footer.home}
          </Link>

          <Link to="/news">
            {t.footer.news}
          </Link>

          <Link to="/festival">
            {t.footer.festival}
          </Link>

          <Link to="/media">
            {t.footer.gallery}
          </Link>

          <a href="#film">
            {t.footer.film}
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        {t.footer.copyright}
      </div>
    </footer>
  );
}

export default Footer;