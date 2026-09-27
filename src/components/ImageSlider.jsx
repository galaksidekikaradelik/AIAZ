import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ImageSlider({ images, alt }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goPrev = () =>
    setIndex((current) => (current === 0 ? images.length - 1 : current - 1));

  const goNext = () =>
    setIndex((current) => (current === images.length - 1 ? 0 : current + 1));

  return (
    <div className="news-slider">
      <div className="news-slider-track">
        <img
          src={images[index]}
          alt={alt || ""}
          className="news-slider-image"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="news-slider-arrow news-slider-arrow-left"
            onClick={goPrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            className="news-slider-arrow news-slider-arrow-right"
            onClick={goNext}
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          <div className="news-slider-dots">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`news-slider-dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageSlider;