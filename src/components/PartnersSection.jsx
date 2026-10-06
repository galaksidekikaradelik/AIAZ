import { useLanguage } from "../context/LanguageContext";

import partner1Logo from "../assets/partners/auth_logo.webp";
import partner2Logo from "../assets/partners/logo_en.webp";

function PartnersSection() {
  const { t } = useLanguage();

  const partners = [
    {
      logo: partner1Logo,
    },
    {
      logo: partner2Logo,
    },
  ];

  return (
    <section id="partners" className="partners-section">
      <div className="section-container">

        <div className="section-header">
          <h2>
            {t.partners.title}
          </h2>
        </div>

        <div className="partners-marquee">
          <div className="partners-track">
            {[...partners, ...partners].map((partner, index) => (
              <div className="partner-logo" key={index}>
                <img
                  src={partner.logo}
                  alt={`Partner ${index + 1}`}
                  className="partner-logo-image"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default PartnersSection;