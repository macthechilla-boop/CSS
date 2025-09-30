"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

type Orientation = "portrait" | "landscape";

type GalleryImage = {
  src: string;
  alt: string;
  orientation: Orientation;
};

const morphonicImages: GalleryImage[] = [
  {
    src: "/morphonic-lab/IMG_0032.jpeg",
    alt: "Morphonic Lab installation viewed across the kinetic light field",
    orientation: "landscape",
  },
  {
    src: "/morphonic-lab/IMG_0070.jpeg",
    alt: "Close view of Morphonic Lab's robotic actuators and light arrays",
    orientation: "landscape",
  },
  {
    src: "/morphonic-lab/IMG_0083.jpeg",
    alt: "Audience interacting with Morphonic Lab's responsive sculpture",
    orientation: "landscape",
  },
  {
    src: "/morphonic-lab/IMG_0093.jpeg",
    alt: "Detail of light projections across suspended membranes",
    orientation: "landscape",
  },
  {
    src: "/morphonic-lab/IMG_0095.jpeg",
    alt: "Generative visuals rendered on semi-transparent scrims",
    orientation: "landscape",
  },
  {
    src: "/morphonic-lab/IMG_9963.jpeg",
    alt: "Morphonic Lab control hub with custom software interface",
    orientation: "landscape",
  },
];

const rootStyles: CSSProperties = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top left, rgba(99,102,241,0.08), transparent 60%)",
  backgroundColor: "#0b1020",
  color: "#e0eafc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3rem",
  padding: "4rem 1.5rem 5rem",
};

const heroStyles: CSSProperties = {
  width: "min(960px, 100%)",
  background: "linear-gradient(135deg, rgba(17,24,39,0.92), rgba(12,18,32,0.78))",
  borderRadius: "24px",
  border: "1px solid rgba(148,163,184,0.2)",
  padding: "2.5rem clamp(1.5rem, 6vw, 3rem)",
  boxShadow: "0 24px 48px rgba(8,11,22,0.5)",
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
  border: "1px solid rgba(148,163,184,0.22)",
  background: "rgba(15,17,24,0.85)",
  boxShadow: "0 18px 36px rgba(8,11,22,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const landscapeItemStyles: CSSProperties = {
  ...baseCardStyles,
  flex: "1 1 420px",
  maxWidth: "min(560px, 68vw)",
  height: "min(45vh, 360px)",
};

const portraitItemStyles: CSSProperties = {
  ...baseCardStyles,
  flex: "1 1 260px",
  maxWidth: "min(320px, 32vw)",
  height: "min(60vh, 520px)",
};

const imageStyles: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const overlayStyles: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(4, 8, 20, 0.94)",
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

export default function MorphonicLabPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const portraitImages = useMemo(
    () => morphonicImages.map((image, index) => ({ ...image, index })).filter((image) => image.orientation === "portrait"),
    []
  );

  const landscapeImages = useMemo(
    () => morphonicImages.map((image, index) => ({ ...image, index })).filter((image) => image.orientation === "landscape"),
    []
  );

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % morphonicImages.length;
    });
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + morphonicImages.length) % morphonicImages.length;
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
        <p style={{ letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(148,163,184,0.72)", margin: 0 }}>
          IMMERSIVE INSTALLATION
        </p>
        <h1 style={{ fontSize: "clamp(2.6rem, 6vw, 3.6rem)", letterSpacing: "0.14em", margin: 0 }}>
          MORPHONIC LAB
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.75, margin: 0, color: "rgba(224,234,252,0.85)" }}>
          My installation at the yearly Morphonic Lab 2024. An interactive audio-visual installation where visitors
          immerse themselves in a constantly shifting environment. Sound and image emerge directly from processes of
          feedback, becoming material to be regulated, manipulated, and transformed through their interaction.
        </p>
      </header>

      <section style={galleryStyles}>
        {portraitImages.length > 0 && (
          <div style={rowStyles}>
            {portraitImages.map((image) => (
              <figure key={image.src} style={portraitItemStyles}>
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
                  <img src={image.src} alt={image.alt} style={imageStyles} />
                </button>
              </figure>
            ))}
          </div>
        )}

        {landscapeImages.length > 0 && (
          <div style={rowStyles}>
            {landscapeImages.map((image) => (
              <figure key={image.src} style={landscapeItemStyles}>
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
                  <img src={image.src} alt={image.alt} style={imageStyles} />
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
              src={morphonicImages[activeIndex].src}
              alt={morphonicImages[activeIndex].alt}
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
    </div>
  );
}
