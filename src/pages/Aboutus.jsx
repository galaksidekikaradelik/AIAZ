import { Eye, Download } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import agendaCover from "../assets/agenda-cover.webp";

import { useLanguage } from "../context/LanguageContext";

const teamPhotoFiles = import.meta.glob("../assets/team/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const getTeamPhoto = (name) => {
  if (!name) return null;

  const match = Object.entries(teamPhotoFiles).find(([path]) => {
    const fileName = path.split("/").pop();

    return fileName.toLowerCase().startsWith(name.toLowerCase());
  });

  return match ? match[1] : null;
};

function AboutUs() {
  const { language, t } = useLanguage();

  return (
    <>
      <Navbar />

      <main>
        <section className="page-header">
          <div className="section-container">
            <span className="section-label">{t.about.label}</span>
            <h1>{t.about.title}</h1>
          </div>
        </section>

        <section className="about-page">
          <div className="section-container about-page-content">
            {t.about.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <h2>{t.about.directionsIntro}</h2>

            <ul className="about-directions">
              {t.about.directions.map((item, i) => (
                <li key={i}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>

            
          </div>
        </section>

        <section className="team-section">
          <div className="section-container">
            <h2>{t.about.teamTitle}</h2>

            <div className="team-grid">
              {t.about.team.map((member, i) => {
                const photoSrc = getTeamPhoto(member.name);

                return (
                  <div className="team-card" key={i}>
                    <div className="team-card-photo">
                      {photoSrc && (
                        <img src={photoSrc} alt={member.name} />
                      )}
                    </div>

                    <h3>{member.name}</h3>
                    <span>{member.role}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default AboutUs;