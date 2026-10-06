import MagneticButton from "./MagneticButton";
import HeroRobotVisual from "./HeroRobotVisual";
import { useLanguage } from "../context/LanguageContext";

function FestivalHero() {
  const { t } = useLanguage();

  return (
    <section className="festival-hero">
      <div
        className="sprocket-row hero-sprockets"
        aria-hidden="true"
        style={{
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="festival-hero-container">
        <div className="festival-hero-content">
          <h1 className="fest-hero-title">
            {t.festivalHero.titleLine1}
            <br />
            {t.festivalHero.titleLine2}
            <br />
            {t.festivalHero.titleLine3}
          </h1>

          <p>{t.festivalHero.description}</p>

          <div className="festival-buttons">
            <MagneticButton
              href="https://filmfreeway.com/aiazff"
              target="_blank"
              rel="noopener noreferrer"
              className="festival-btn primary"
            >
              {t.festivalHero.apply}
            </MagneticButton>

            <MagneticButton
              href="#festival-rules"
              className="festival-btn secondary"
            >
              {t.festivalHero.rules}
            </MagneticButton>
          </div>
        </div>

        <div
          className="festival-hero-visual"
          style={{
            pointerEvents: "none",
          }}
        >
          <HeroRobotVisual />
        </div>
      </div>
    </section>
  );
}

export default FestivalHero;
