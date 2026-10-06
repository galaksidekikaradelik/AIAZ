import aiazImage from "../assets/2025/foto/_SMY2339.webp";
import aiaz2Image from "../assets/2025/foto/_SMY2346.webp";
import { useLanguage } from "../context/LanguageContext";

function FilmSection() {
  const { t } = useLanguage();

  return (
    <section id="film" className="film-section">
      <div className="section-container film-container">

        <div className="film-content">
          <span className="film-label">
            {t.film.label}
          </span>

          <h2>
            {t.film.title}
          </h2>

          <p>
            {t.film.description}
          </p>

          <h3>
            {t.film.awards}
          </h3>

          <ul className="film-awards">
            <li>
              <strong>{t.film.award1}</strong>
            </li>

            <li>
              <strong>{t.film.award2}</strong>
            </li>

            <li>
              <strong>{t.film.award3}</strong>
            </li>
          </ul>

          <div className="film-buttons">
            <a
              href="/festival"
              className="film-button secondary"
            >
              {t.film.details}
            </a>

            <a
              href="https://filmfreeway.com/aiazff"
              target="_blank"
              rel="noopener noreferrer"
              className="film-button primary"
            >
              {t.film.apply}
            </a>
          </div>
        </div>

        <div className="film-images">
          <div className="film-image film-image-large">
            <img
              src={aiazImage}
              alt="AIAZ Film Festival"
            />
          </div>

          <div className="film-image film-image-small">
            <img
              src={aiaz2Image}
              alt="AIAZ Film Festival"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default FilmSection;