"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  slug: string;
  image: string;
  description: string;
};

type Scene =
  | { kind: "home" }
  | { kind: "project"; project: Project }
  | { kind: "vita" };

const projects: Project[] = [
  {
    title: "Digital Assets",
    slug: "digital-assets",
    image: "/digital-assets/digital-assets-preview.svg",
    description:
      "Python-driven video signal where generated sound writes fragile traces line by line across a white field.",
  },
  {
    title: "Morphonic Lab",
    slug: "morphonic-lab",
    image: "/morphonic-lab/IMG_0083.jpeg",
    description:
      "Immersive audio-visual environment where feedback-driven light and sound respond to visitors in real time.",
  },
  {
    title: "Glitching Carlowitz",
    slug: "new-ecologies",
    image: "/new-ecologies/IMG_8259.jpeg",
    description:
      "Glitching portrait that fuses Chemnitz climate data with the legacy of sustainability pioneer Hans Carl von Carlowitz.",
  },
  {
    title: "Ships",
    slug: "ships",
    image: "/ships/IMG_3597.jpeg",
    description:
      "A step away from gear and cables toward painting—seeking new perspectives and unexpected inspiration.",
  },
  {
    title: "Sinks",
    slug: "sinks",
    image: "/sinks/DSCF7630.jpg",
    description:
      "Documentation of HFBK Dresden studio sinks as everyday focal points of artistic practice and process.",
  },
];

const scenes: Scene[] = [
  { kind: "home" },
  ...projects.map((project) => ({ kind: "project" as const, project })),
  { kind: "vita" },
];

const VITA_BACKGROUND = "/name-collage.jpg";

export default function ImmersiveHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const navTimerRef = useRef<number | null>(null);
  const glitchTimerRef = useRef<number | null>(null);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navContainerRef = useRef<HTMLElement | null>(null);
  const homeVideoRef = useRef<HTMLVideoElement | null>(null);
  const hasCapturedPosterRef = useRef(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHomeVideoReady, setIsHomeVideoReady] = useState(false);
  const [homeVideoPoster, setHomeVideoPoster] = useState<string | null>(null);

  useEffect(() => {
    const original = document.body.style.overflow;
    const coarse = window.matchMedia("(pointer: coarse)");
    const applyOverflow = (matches: boolean) => {
      document.body.style.overflow = matches ? original : "hidden";
    };
    applyOverflow(coarse.matches);
    const handleChange = (event: MediaQueryListEvent) => applyOverflow(event.matches);
    coarse.addEventListener("change", handleChange);
    return () => {
      coarse.removeEventListener("change", handleChange);
      document.body.style.overflow = original;
      if (navTimerRef.current) {
        window.clearTimeout(navTimerRef.current);
      }
      if (glitchTimerRef.current) {
        window.clearTimeout(glitchTimerRef.current);
      }
    };
  }, []);

  const triggerGlitch = useCallback(() => {
    if (glitchTimerRef.current) {
      window.clearTimeout(glitchTimerRef.current);
    }
    setIsGlitching(true);
    glitchTimerRef.current = window.setTimeout(() => {
      setIsGlitching(false);
      glitchTimerRef.current = null;
    }, 760);
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(scenes.length - 1, index));
      setActiveIndex((current) => {
        if (current === target) {
          return current;
        }
        setIsNavigating(true);
        triggerGlitch();
        if (navTimerRef.current) {
          window.clearTimeout(navTimerRef.current);
        }
        navTimerRef.current = window.setTimeout(() => {
          setIsNavigating(false);
          navTimerRef.current = null;
        }, 650);
        return target;
      });
    },
    [triggerGlitch]
  );

  const goToNumericIndex = useCallback(
    (target: number) => {
      if (target === activeIndex) return;
      goToIndex(target);
    },
    [activeIndex, goToIndex]
  );

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (isNavigating) return;
      if (["ArrowDown", "ArrowRight", "PageDown", " ", "Enter"].includes(event.key)) {
        event.preventDefault();
        goToIndex(activeIndex + 1);
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goToIndex(activeIndex - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goToIndex(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goToIndex(scenes.length - 1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, goToIndex, isNavigating]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const handleWheel = (event: WheelEvent) => {
      if (isNavigating) return;
      if (Math.abs(event.deltaY) < 30) return;
      goToIndex(activeIndex + (event.deltaY > 0 ? 1 : -1));
    };

    stage.addEventListener("wheel", handleWheel, { passive: true });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [activeIndex, goToIndex, isNavigating]);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (event.touches.length !== 1) return;
    touchStartRef.current = event.touches[0]!.clientY;
  }, []);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (touchStartRef.current === null || isNavigating) return;
      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined) return;
      const deltaY = touchStartRef.current - currentY;
      if (Math.abs(deltaY) < 80) return;
      goToIndex(activeIndex + (deltaY > 0 ? 1 : -1));
      touchStartRef.current = null;
    },
    [activeIndex, goToIndex, isNavigating]
  );

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    stage.addEventListener("touchstart", handleTouchStart, { passive: true });
    stage.addEventListener("touchmove", handleTouchMove, { passive: true });
    stage.addEventListener("touchend", handleTouchEnd, { passive: true });
    stage.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    return () => {
      stage.removeEventListener("touchstart", handleTouchStart);
      stage.removeEventListener("touchmove", handleTouchMove);
      stage.removeEventListener("touchend", handleTouchEnd);
      stage.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [handleTouchEnd, handleTouchMove, handleTouchStart]);

  const [loadedScenes, setLoadedScenes] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedPoster = window.localStorage.getItem("homeVideoPoster");
    if (storedPoster) {
      setHomeVideoPoster(storedPoster);
      hasCapturedPosterRef.current = true;
    }
  }, []);

  useEffect(() => {
    setLoadedScenes((current) => {
      if (current.has(activeIndex)) return current;
      const next = new Set(current);
      next.add(activeIndex);
      if (activeIndex > 0) next.add(activeIndex - 1);
      if (activeIndex < scenes.length - 1) next.add(activeIndex + 1);
      return next;
    });
  }, [activeIndex]);

  useEffect(() => {
    const vitaImage = new Image();
    vitaImage.src = VITA_BACKGROUND;
    return () => {
      vitaImage.src = "";
    };
  }, []);

  useEffect(() => {
    const container = navContainerRef.current;
    const activeButton = navRefs.current[activeIndex];
    if (!container || !activeButton) return;
    if (container.scrollWidth <= container.clientWidth + 1) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

    const buttonOffset = activeButton.offsetLeft;
    const buttonWidth = activeButton.offsetWidth;
    const targetScroll = buttonOffset - container.clientWidth / 2 + buttonWidth / 2;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const clampedScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    container.scrollTo({ left: clampedScroll, behavior });
  }, [activeIndex]);

  const handleHomeVideoLoadedData = useCallback(() => {
    const video = homeVideoRef.current;
    if (!video) return;
    if (hasCapturedPosterRef.current) return;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    try {
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      setHomeVideoPoster(dataUrl);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("homeVideoPoster", dataUrl);
      }
    } catch {
      // Ignore storage failures
    } finally {
      hasCapturedPosterRef.current = true;
    }
  }, []);

  const handleHomeVideoCanPlay = useCallback(() => {
    setIsHomeVideoReady(true);
  }, []);

  return (
    <div className="immersive-root">
      <div
        className={`glitch-overlay ${isGlitching ? "is-active" : ""}`}
        aria-hidden="true"
      />
      <nav
        className="vertical-nav"
        aria-label="Scene navigation"
        ref={navContainerRef}
        suppressHydrationWarning
      >
        {scenes.map((scene, index) => {
          const rawLabel =
            scene.kind === "home"
              ? "Home"
              : scene.kind === "vita"
              ? "Vita"
              : scene.project.title;
          const label = rawLabel.toUpperCase();
          return (
            <button
              key={scene.kind === "project" ? scene.project.slug : scene.kind}
              type="button"
              className={`nav-dot ${activeIndex === index ? "is-active" : ""}`}
              onClick={() => {
                if (!isNavigating) goToNumericIndex(index);
              }}
              disabled={isNavigating && activeIndex !== index}
              aria-label={label}
              aria-current={activeIndex === index ? "true" : undefined}
              ref={(element) => {
                navRefs.current[index] = element;
              }}
            >
              <span className="dot-label">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="scene-stage" ref={stageRef} suppressHydrationWarning>
        {scenes.map((scene, index) => {
          const isActive = index === activeIndex;
          if (!loadedScenes.has(index)) {
            return null;
          }
          const sceneClass = [
            "scene",
            `scene--${scene.kind}`,
            isActive ? "is-active" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <article
              key={scene.kind === "project" ? scene.project.slug : scene.kind}
              className={sceneClass}
              aria-hidden={!isActive}
              style={{ zIndex: isActive ? 4 : 1 }}
            >
              {scene.kind === "home" ? (
                <>
                  <video
                    ref={homeVideoRef}
                    className="scene-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={handleHomeVideoLoadedData}
                    onCanPlay={handleHomeVideoCanPlay}
                    style={{ opacity: isHomeVideoReady ? 1 : 0 }}
                  >
                    <source src="/Landing1.webm" type="video/webm" />
                    <source src="/Landing1.h265.mp4" type='video/mp4; codecs="hvc1"' />
                    <source src="/Landing1.mp4" type="video/mp4" />
                  </video>
                  <div
                    className={`scene-video-placeholder ${
                      isHomeVideoReady ? "is-hidden" : ""
                    } ${homeVideoPoster ? "has-image" : ""}`}
                    style={
                      homeVideoPoster
                        ? { backgroundImage: `url(${homeVideoPoster})` }
                        : undefined
                    }
                  />
                </>
              ) : (
                <Image
                  className="scene-image"
                  src={scene.kind === "vita" ? VITA_BACKGROUND : scene.project.image}
                  alt={
                    scene.kind === "project"
                      ? scene.project.title
                      : scene.kind === "vita"
                      ? "Vita collage"
                      : "Home background"
                  }
                  fill
                  priority={isActive}
                  sizes="(max-width: 900px) 100vw, 100vw"
                />
              )}
              <div className="scene-gradient" />
              <div className="scene-content">
                {scene.kind === "home" && <HomeContent />}
                {scene.kind === "project" && <ProjectContent project={scene.project} />}
                {scene.kind === "vita" && <VitaContent />}
              </div>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .immersive-root {
          position: relative;
          width: 100vw;
          height: 100vh;
          min-height: 100dvh;
          overflow: hidden;
          color: #f8fafc;
          background: #010409;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          user-select: none;
        }

        .glitch-overlay {
          position: absolute;
          inset: 0;
          z-index: 30;
          pointer-events: none;
          opacity: 0;
          mix-blend-mode: screen;
          background:
            repeating-linear-gradient(
              0deg,
              rgba(15, 23, 42, 0.28) 0px,
              rgba(15, 23, 42, 0.28) 1.4px,
              rgba(248, 250, 252, 0.2) 2.2px,
              rgba(15, 23, 42, 0.24) 3.4px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(71, 85, 105, 0.35) 0px,
              rgba(71, 85, 105, 0.35) 1.6px,
              transparent 3.4px,
              transparent 5px
            );
        }

        .glitch-overlay::before,
        .glitch-overlay::after {
          content: "";
          position: absolute;
          inset: -18vh -26vw;
          background: linear-gradient(
            115deg,
            rgba(226, 232, 240, 0.28) 0%,
            rgba(100, 116, 139, 0.22) 18%,
            transparent 42%,
            rgba(15, 23, 42, 0.5) 100%
          );
          opacity: 0;
          mix-blend-mode: lighten;
        }

        .glitch-overlay.is-active {
          animation: glitch-global 0.76s steps(8, end) forwards;
        }

        .glitch-overlay.is-active::before {
          animation: glitch-slice-horizontal 0.76s cubic-bezier(0.46, -0.12, 0.38, 1.26) forwards;
        }

        .glitch-overlay.is-active::after {
          animation: glitch-slice-vertical 0.76s cubic-bezier(0.46, -0.12, 0.38, 1.26) forwards;
        }

        .scene-stage {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .scene {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(1.03) translateY(2%);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.2, 0.7, 0.3, 1);
          pointer-events: none;
          overflow: hidden;
        }

        .scene.is-active {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: auto;
        }

        .scene::after,
        .scene::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            112deg,
            rgba(56, 189, 248, 0.12) 0%,
            transparent 28%,
            rgba(168, 85, 247, 0.14) 52%,
            transparent 84%
          );
          opacity: 0;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .scene::before {
          background: linear-gradient(
            90deg,
            rgba(56, 189, 248, 0.18) 0%,
            transparent 30%,
            rgba(2, 132, 199, 0.16) 60%,
            transparent 100%
          );
        }

        .scene.is-active::after {
          animation: glitch-overlay 0.78s ease-out;
        }

        .scene.is-active::before {
          animation: glitch-scan 0.78s cubic-bezier(0.48, 0.01, 0.22, 0.99);
        }

        .scene-video,
        .scene-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7);
          transform: scale(1.08);
          transition: opacity 0.6s ease, transform 5s ease;
          pointer-events: none;
        }

        .scene.is-active .scene-video,
        .scene.is-active .scene-image {
          transform: scale(1.02);
        }

        .scene-video-placeholder {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 20%, rgba(30, 41, 59, 0.75), rgba(2, 6, 12, 0.95));
          background-size: cover;
          background-position: center;
          transition: opacity 0.6s ease;
          pointer-events: none;
          opacity: 1;
        }

        .scene-video-placeholder.has-image {
          background-size: cover;
        }

        .scene-video-placeholder.is-hidden {
          opacity: 0;
        }

        .scene.is-active .scene-content {
          animation: none;
          will-change: auto;
        }

        .scene.is-active .scene-gradient {
          animation: glitch-fade 0.78s ease-out;
        }

        .scene-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(2, 6, 23, 0.8) 0%,
            rgba(15, 23, 42, 0.65) 55%,
            rgba(15, 23, 42, 0.35) 100%
          );
        }

        .scene--home .scene-video {
          filter: brightness(1);
        }

        .scene--home .scene-gradient {
          background: none;
        }

        .scene--home .scene-content {
          mix-blend-mode: difference;
          text-shadow: none;
          color: #f8fafc;
        }

        .scene-content {
          position: relative;
          z-index: 5;
          max-width: min(540px, 48vw);
          padding: clamp(2rem, 4vw, 4rem);
          display: flex;
          flex-direction: column;
          gap: 0;
          background: none;
          border-radius: 0;
          box-shadow: none;
          border: none;
          backdrop-filter: none;
          text-shadow: none;
        }

        :global(.scene-title) {
          font-size: clamp(2.6rem, 3.6vw, 3.2rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          text-align: center;
          line-height: 1.05;
          margin: 0 0 clamp(1.1rem, 2.4vw, 1.5rem) 0;
          color: #f8fafc;
          white-space: normal;
        }

        :global(.scene-subtitle) {
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          text-transform: uppercase;
          letter-spacing: 0.22em;
          text-align: center;
          line-height: 1.65;
          color: rgba(226, 232, 240, 0.85);
          margin: 0;
          max-width: none;
        }

        :global(.scene-subtitle--hero) {
          color: rgba(248, 250, 252, 0.85);
          max-width: none;
          white-space: nowrap;
        }

        :global(.scene-title--nowrap) {
          white-space: nowrap;
        }

        .vertical-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: clamp(1.6vw, 1.9vw, 42px);
          display: flex;
          flex-direction: column;
          gap: clamp(0.32rem, 0.8vw, 0.5rem);
          z-index: 10;
          mix-blend-mode: difference;
        }

        .nav-dot {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 0.22rem 0.62rem;
          border-radius: 999px;
          color: rgba(248, 250, 252, 0.68);
          letter-spacing: 0.18em;
          font-size: clamp(0.95rem, 1.6vw, 1.1rem);
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.3s ease, text-shadow 0.3s ease;
          white-space: nowrap;
        }

        .nav-dot:disabled {
          opacity: 0.45;
          cursor: wait;
        }

        .nav-dot:hover,
        .nav-dot:focus-visible {
          color: #f8fafc;
          text-shadow: 0 0 8px rgba(15, 23, 42, 0.6);
          outline: none;
        }

        .nav-dot.is-active {
          color: #fefefe;
          text-shadow: 0 0 12px rgba(15, 23, 42, 0.65);
        }

        .dot-label {
          opacity: 0.78;
          text-transform: uppercase;
        }

        @media (max-width: 1600px) and (min-width: 901px) {
          .vertical-nav {
            right: unset;
            top: auto;
            bottom: clamp(2rem, 4vw, 3rem);
            left: 50%;
            transform: translateX(-50%);
            flex-direction: row;
            gap: clamp(0.4rem, 1.8vw, 1rem);
            background: rgba(2, 6, 23, 0.6);
            padding: 0.6rem clamp(1.1rem, 3vw, 2.2rem);
            border-radius: 999px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            backdrop-filter: blur(16px);
            mix-blend-mode: normal;
            width: min(90vw, 780px);
            justify-content: flex-start;
            overflow-x: auto;
            z-index: 12;
            overscroll-behavior-x: contain;
            -webkit-overflow-scrolling: touch;
          }

          .scene-stage {
            padding-bottom: clamp(6rem, 8vw, 7.5rem);
          }

          .scene-content {
            max-width: min(560px, 48vw);
            margin-bottom: clamp(3.2rem, 6vw, 4.2rem);
          }
        }

        @media (max-width: 900px) {
          .vertical-nav {
            right: unset;
            top: auto;
            bottom: 18px;
            bottom: calc(env(safe-area-inset-bottom) + 18px);
            left: 50%;
            transform: translateX(-50%);
            flex-direction: row;
            gap: clamp(0.45rem, 2vw, 0.75rem);
            background: rgba(2, 6, 23, 0.72);
            padding: 0.6rem clamp(0.95rem, 4vw, 1.6rem);
            border-radius: 999px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            backdrop-filter: blur(18px);
            mix-blend-mode: normal;
            width: min(92vw, 560px);
            justify-content: flex-start;
            overflow-x: auto;
            z-index: 12;
            overscroll-behavior-x: contain;
            -webkit-overflow-scrolling: touch;
          }

          .scene-content {
            max-width: min(92vw, 560px);
            padding: clamp(1.6rem, 7vw, 2rem) clamp(1.2rem, 5vw, 2rem);
            margin-top: 0;
            margin-bottom: clamp(2rem, 12vw, 3rem);
            background: none;
            border-radius: 14px;
            border: none;
            box-shadow: none;
            backdrop-filter: none;
            text-shadow: 0 6px 22px rgba(1, 4, 9, 0.55);
          }

          .scene-stage {
            padding-bottom: calc(clamp(5rem, 16vw, 6.5rem) + env(safe-area-inset-bottom));
          }

          :global(.scene-title) {
            font-size: clamp(2.1rem, 6.6vw, 2.8rem);
            letter-spacing: clamp(0.14em, 2vw, 0.2em);
          }

          :global(.scene-subtitle) {
            font-size: clamp(1rem, 3.4vw, 1.2rem);
            letter-spacing: clamp(0.14em, 1.8vw, 0.2em);
            line-height: 1.4;
          }

          :global(.scene-title--nowrap),
          :global(.scene-subtitle--hero) {
            white-space: normal;
          }

          :global(.scene-subtitle--hero) {
            letter-spacing: clamp(0.14em, 1.8vw, 0.2em);
          }

          .scene--home .scene-content {
            mix-blend-mode: normal;
            color: #f8fafc;
            text-shadow: 0 6px 18px rgba(1, 4, 9, 0.5);
          }
        }

        @media (max-width: 640px) {
          .immersive-root {
            height: 100dvh;
          }

          .scene {
            align-items: center;
          }

          .scene-content {
            width: 100%;
            max-width: 94vw;
            padding: clamp(1.4rem, 6.5vw, 1.8rem) clamp(1rem, 5vw, 1.6rem) calc(clamp(1.4rem, 6.5vw, 1.8rem) + 12px);
            margin-bottom: clamp(2rem, 12vw, 3rem);
            margin-bottom: calc(clamp(2rem, 12vw, 3rem) + env(safe-area-inset-bottom));
            background: none;
            border-radius: 12px;
            border: none;
            box-shadow: none;
            backdrop-filter: none;
            text-shadow: 0 10px 28px rgba(1, 4, 9, 0.6);
          }

          .vertical-nav {
            width: min(94vw, 520px);
            padding: 0.55rem clamp(0.8rem, 4vw, 1.2rem);
            gap: clamp(0.4rem, 2.8vw, 0.7rem);
            justify-content: flex-start;
            top: auto;
            bottom: calc(env(safe-area-inset-bottom) + 18px);
            scroll-snap-type: x mandatory;
            scroll-padding: 0.55rem;
            overscroll-behavior-x: contain;
          }

          .nav-dot {
            font-size: clamp(0.85rem, 3.4vw, 1.05rem);
            letter-spacing: clamp(0.12em, 1.8vw, 0.18em);
            scroll-snap-align: center;
          }

          .dot-label {
            opacity: 0.86;
          }

          .scene--home .scene-content {
            text-shadow: 0 10px 28px rgba(1, 4, 9, 0.6);
          }
        }

        @keyframes glitch-shift {
          0% {
            transform: translate3d(0, 0, 0) skewX(0deg);
            filter: none;
          }
          18% {
            transform: translate3d(1px, -1px, 0) skewX(-0.6deg);
            filter: contrast(165%) saturate(180%) grayscale(30%);
          }
          38% {
            transform: translate3d(-2px, 2px, 0) skewX(1deg);
            filter: contrast(260%) saturate(240%) invert(26%);
          }
          58% {
            transform: translate3d(0.5px, -0.5px, 0) skewX(-0.5deg);
            filter: contrast(320%) saturate(260%) grayscale(55%);
          }
          80% {
            transform: translate3d(0, 0, 0) skewX(0.3deg);
            filter: contrast(210%) saturate(200%) grayscale(35%);
          }
          100% {
            transform: translate3d(0, 0, 0) skewX(0deg);
            filter: none;
          }
        }

        @keyframes glitch-fade {
          0% {
            opacity: 0.85;
          }
          25% {
            opacity: 0.3;
          }
          60% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes glitch-overlay {
          0% {
            opacity: 0.65;
            transform: translate3d(-30px, 0, 0);
          }
          26% {
            opacity: 0.86;
            transform: translate3d(18px, 0, 0);
          }
          58% {
            opacity: 0.32;
            transform: translate3d(-9px, 0, 0);
          }
          82% {
            opacity: 0.14;
            transform: translate3d(6px, 0, 0);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes glitch-scan {
          0% {
            opacity: 0.5;
            transform: translate3d(0, -100%, 0);
          }
          40% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 120%, 0);
          }
        }

        @keyframes glitch-scanlines {
          0% {
            opacity: 0.55;
            transform: translate3d(0, -12px, 0);
          }
          50% {
            opacity: 0.35;
            transform: translate3d(0, 4px, 0);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes glitch-global {
          0% {
            opacity: 0.8;
            filter: contrast(240%) saturate(180%) grayscale(28%);
          }
          40% {
            opacity: 0.5;
            filter: contrast(300%) saturate(210%) grayscale(45%);
          }
          80% {
            opacity: 0.2;
            filter: contrast(220%) saturate(160%) grayscale(30%);
          }
          100% {
            opacity: 0;
            filter: none;
          }
        }

        @keyframes glitch-slice-horizontal {
          0% {
            opacity: 0.5;
            clip-path: polygon(0 10%, 100% 5%, 100% 22%, 0 28%);
          }
          50% {
            opacity: 0.35;
            clip-path: polygon(0 48%, 100% 44%, 100% 58%, 0 61%);
          }
          100% {
            opacity: 0;
            clip-path: polygon(0 85%, 100% 82%, 100% 92%, 0 95%);
          }
        }

        @keyframes glitch-slice-vertical {
          0% {
            opacity: 0.4;
            transform: translate3d(-8%, 0, 0);
            clip-path: polygon(12% 0, 26% 0, 22% 100%, 8% 100%);
          }
          55% {
            opacity: 0.25;
            transform: translate3d(6%, 0, 0);
            clip-path: polygon(68% 0, 84% 0, 76% 100%, 58% 100%);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, 0, 0);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }
      `}</style>
    </div>
  );
}

function HomeContent() {
  const title = "CHRISTIAN SILVESTER SEEMANN";
  const subtitle = "SPACE TECHNOLOGY PERCEPTION";
  return (
    <div className="home-content">
      <h1 className="scene-title scene-title--nowrap">{title}</h1>
      <p className="scene-subtitle scene-subtitle--hero">{subtitle}</p>
      <style jsx>{`
        .home-content {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          text-align: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}

function ProjectContent({ project }: { project: Project }) {
  const title = project.title.toUpperCase();
  const description = project.description.toUpperCase();
  return (
    <Link href={`/portfolio/${project.slug}`} className="project-content">
      <h2 className="scene-title">{title}</h2>
      <p className="scene-subtitle">{description}</p>
      <style jsx>{`
        .project-content {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          text-align: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
          transition: transform 0.35s ease, opacity 0.35s ease;
          cursor: pointer;
        }

        .project-content:hover {
          transform: translateY(-6px);
          opacity: 0.92;
        }
      `}</style>
    </Link>
  );
}

function VitaContent() {
  const name = "CHRISTIAN SILVESTER SEEMANN";
  return (
    <Link href="/vita" className="vita-content">
      <h2 className="scene-title">VITA</h2>
      <p className="scene-subtitle">{name}</p>
      <style jsx>{`
        .vita-content {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          align-items: center;
          text-align: center;
          text-decoration: none;
          color: inherit;
          transition: transform 0.35s ease, opacity 0.35s ease;
          cursor: pointer;
        }

        .vita-content:hover {
          transform: translateY(-6px);
          opacity: 0.92;
        }
      `}</style>
    </Link>
  );
}
