import { useState } from "react";
import { Eye, Download } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

import cover2025 from "../assets/agenda-cover.webp";

function Program() {
  const { t } = useLanguage();

  const PROGRAMS = {
    2026: {
      image: null,
      pdf: "",
      available: false,
    },
    2025: {
      image: cover2025,
      pdf: "/agenda/aiaz-2025.pdf",
      available: true,
    },
    
  };

  const [year, setYear] = useState("2026");

  const current = PROGRAMS[year];

  return (
    <>
      <Navbar />

      <main>
        <section className="page-header">
          <div className="section-container">
            <span className="section-label">AIAZ PROGRAM</span>
            <h1>{t.about.program}</h1>
          </div>
        </section>

        <section className="program-page">
          <div className="section-container">

            <div className="year-switcher">
              <button
                className={year === "2025" ? "active" : ""}
                onClick={() => setYear("2025")}
              >
                AIAZ 2025
              </button>

              <button
                className={year === "2026" ? "active" : ""}
                onClick={() => setYear("2026")}
              >
                AIAZ 2026
              </button>
            </div>

            {current.available ? (
              <div className="agenda-preview-card">
                <img
                  src={current.image}
                  alt={`AIAZ ${year}`}
                  className="agenda-preview-image"
                />

                <div className="agenda-preview-actions">
                  <a
                    className="agenda-icon-btn"
                    href={current.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t.about.preview}
                  >
                    <Eye size={18} />
                  </a>

                  <a
                    className="agenda-icon-btn"
                    href={current.pdf}
                    download
                    title={t.about.download}
                  >
                    <Download size={18} />
                  </a>
                </div>
              </div>
            ) : (
              <div className="coming-soon-card">
                <span className="coming-soon-badge">
                  TEZLİKLƏ
                </span>

                <h2>AIAZ 2026</h2>

                <p>
                  Festival proqramı hazırlandıqdan sonra
                  burada paylaşılacaq.
                </p>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Program;