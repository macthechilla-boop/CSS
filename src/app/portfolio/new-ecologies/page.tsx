"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

const galleryImages = [
  {
    src: "/new-ecologies/IMG_8234.jpeg",
    alt: "Glitching Carlowitz installation detail 1",
    orientation: "portrait" as const,
  },
  {
    src: "/new-ecologies/IMG_8259.jpeg",
    alt: "Glitching Carlowitz installation detail 2",
    orientation: "landscape" as const,
  },
  {
    src: "/new-ecologies/IMG_8322.jpeg",
    alt: "Glitching Carlowitz projection study",
    orientation: "portrait" as const,
  },
  {
    src: "/new-ecologies/IMG_8334.jpeg",
    alt: "Glitching Carlowitz reflective texture",
    orientation: "portrait" as const,
  },
];

const rootStyles: CSSProperties = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top left, rgba(148,163,184,0.1), transparent 55%)",
  backgroundColor: "#10131c",
  color: "#e0eafc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3rem",
  padding: "4rem 1.5rem 5rem",
};

const heroStyles: CSSProperties = {
  width: "min(960px, 100%)",
  background: "linear-gradient(135deg, rgba(18,24,38,0.92), rgba(8,12,22,0.78))",
  borderRadius: "24px",
  border: "1px solid rgba(148,163,184,0.18)",
  padding: "2.5rem clamp(1.5rem, 6vw, 3rem)",
  boxShadow: "0 24px 48px rgba(8,12,24,0.52)",
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
  textAlign: "center",
};

const galleryStyles: CSSProperties = {
  width: "min(1100px, 100%)",
  display: "flex",
  flexDirection: "column",
  gap: "1.8rem",
};

const rowStyles: CSSProperties = {
  display: "flex",
  gap: "1.5rem",
  justifyContent: "center",
  flexWrap: "wrap",
};

const baseCardStyles: CSSProperties = {
  position: "relative",
  borderRadius: "20px",
  overflow: "hidden",
  border: "1px solid rgba(148,163,184,0.2)",
  background: "rgba(15,17,24,0.82)",
  boxShadow: "0 18px 36px rgba(8,11,22,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const portraitItemStyles: CSSProperties = {
  ...baseCardStyles,
  flex: "1 1 260px",
  maxWidth: "min(320px, 28vw)",
  height: "min(60vh, 520px)",
};

const landscapeItemStyles: CSSProperties = {
  ...baseCardStyles,
  flex: "1 1 420px",
  maxWidth: "min(560px, 70vw)",
  height: "min(45vh, 360px)",
};

const portraitImageStyles: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const landscapeImageStyles: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const overlayStyles: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(3, 6, 16, 0.94)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 200,
  padding: "clamp(1.5rem, 4vw, 3rem)",
};

const overlayImageWrapperStyles: CSSProperties = {
  maxWidth: "min(1200px, 92vw)",
  maxHeight: "min(88vh, 1200px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "clamp(0.6rem, 1vw, 1.2rem)",
  borderRadius: "20px",
  background: "rgba(6, 12, 24, 0.85)",
  boxShadow: "0 32px 72px rgba(6, 12, 24, 0.85)",
};

const overlayImageStyles: CSSProperties = {
  maxWidth: "100%",
  maxHeight: "100%",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  display: "block",
};

const overlayNavButton: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(15, 23, 42, 0.7)",
  color: "#e2e8f0",
  border: "1px solid rgba(148, 163, 184, 0.45)",
  borderRadius: "50%",
  width: "56px",
  height: "56px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  cursor: "pointer",
  boxShadow: "0 18px 40px rgba(2, 6, 18, 0.55)",
};

const overlayCloseButton: CSSProperties = {
  position: "absolute",
  top: "clamp(1.5rem, 4vw, 2.6rem)",
  right: "clamp(1.5rem, 4vw, 2.6rem)",
  background: "rgba(15, 23, 42, 0.7)",
  color: "#f8fafc",
  border: "1px solid rgba(148, 163, 184, 0.45)",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  fontSize: "1.8rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default function NewEcologiesPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const imagesWithIndex = galleryImages.map((image, index) => ({ ...image, index }));
  const portraitImages = imagesWithIndex.filter((image) => image.orientation === "portrait");
  const landscapeImages = imagesWithIndex.filter((image) => image.orientation === "landscape");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const portraitCardStyles = useMemo<CSSProperties>(() => {
    if (!isMobile) return portraitItemStyles;
    return {
      ...portraitItemStyles,
      flex: "1 1 auto",
      width: "100%",
      maxWidth: "min(520px, 94vw)",
      aspectRatio: "3 / 4",
      height: "auto",
      boxShadow: "0 16px 38px rgba(8,11,22,0.32)",
    };
  }, [isMobile]);

  const landscapeCardStyles = useMemo<CSSProperties>(() => {
    if (!isMobile) return landscapeItemStyles;
    return {
      ...landscapeItemStyles,
      flex: "1 1 auto",
      width: "100%",
      maxWidth: "min(520px, 94vw)",
      aspectRatio: "16 / 9",
      height: "auto",
      boxShadow: "0 16px 38px rgba(8,11,22,0.32)",
    };
  }, [isMobile]);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % galleryImages.length;
    });
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + galleryImages.length) % galleryImages.length;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
      if (event.key === "ArrowLeft") {
        showPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, closeLightbox, showNext, showPrev]);

  return (
    <div style={rootStyles}>
      <Link href="/" aria-label="Close" className="top-right-close">
        <span>×</span>
      </Link>

      <header style={heroStyles}>
        <p style={{ letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(148,163,184,0.75)", margin: 0 }}>
          MEDIA INSTALLATION
        </p>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 3.4rem)", letterSpacing: "0.12em", margin: 0 }}>
          GLITCHING CARLOWITZ
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.75, margin: 0, color: "rgba(224,234,252,0.82)" }}>
          This work was developed site-specifically for the exhibition New Ecologies with the Kunstsammlungen Chemnitz.
          The local weather and climate have a direct influence on the portrait of Hans Carl von Carlowitz. Born in
          Chemnitz-Rabenstein, he is regarded as the founder of the concept of sustainability in 1713.
        </p>
      </header>

      <section style={galleryStyles}>
        {portraitImages.length > 0 && (
          <div
            style={{
              ...rowStyles,
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              gap: isMobile ? "1.4rem" : rowStyles.gap,
            }}
          >
            {portraitImages.map((image) => (
              <figure key={image.src} style={portraitCardStyles}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(image.index)}
                  style={{
                    padding: 0,
                    border: "none",
                    background: "none",
                    display: "block",
                    width: "100%",
                    height: "100%",
                    cursor: "zoom-in",
                  }}
                >
                  <img src={image.src} alt={image.alt} style={portraitImageStyles} />
                </button>
              </figure>
            ))}
          </div>
        )}

        {landscapeImages.length > 0 && (
          <div
            style={{
              ...rowStyles,
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              gap: isMobile ? "1.4rem" : rowStyles.gap,
            }}
          >
            {landscapeImages.map((image) => (
              <figure key={image.src} style={landscapeCardStyles}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(image.index)}
                  style={{
                    padding: 0,
                    border: "none",
                    background: "none",
                    display: "block",
                    width: "100%",
                    height: "100%",
                    cursor: "zoom-in",
                  }}
                >
                  <img src={image.src} alt={image.alt} style={landscapeImageStyles} />
                </button>
              </figure>
            ))}
          </div>
        )}
      </section>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          style={overlayStyles}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            style={overlayCloseButton}
            aria-label="Close gallery"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            style={{ ...overlayNavButton, left: "3%" }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <div
            style={overlayImageWrapperStyles}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={galleryImages[activeIndex].src}
              alt={galleryImages[activeIndex].alt}
              style={overlayImageStyles}
            />
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            style={{ ...overlayNavButton, right: "3%" }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}

      <section
        style={{
          width: "min(960px, 100%)",
          background: "rgba(24,28,40,0.78)",
          borderRadius: "20px",
          border: "1px solid rgba(71,85,105,0.28)",
          padding: "1.6rem clamp(1.4rem, 5vw, 2.4rem)",
          boxShadow: "0 18px 36px rgba(8,12,24,0.42)",
        }}
      >
        <video controls style={{ width: "100%", borderRadius: "16px", background: "#111827" }}>
          <source src="/media/new-ecologies.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </div>
  );
}
