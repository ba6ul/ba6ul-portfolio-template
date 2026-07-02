"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import herobabulImage from "@/assets/images/hero_babul.webp";
import herobabulblurImage from "@/assets/images/hero_babul_blur.webp";
import clickhere from "@/assets/images/clickhere.webp";
import sparkleOneImage from "@/assets/images/sparkle_one_white.webp";
import sparkleTwoImage from "@/assets/images/sparkle_two_black.webp";

interface PersonData {
  slug: string;
  name: string;
  lname?: string;
  title: string;
  description: string;
  image: any;
  blurImage: any;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  experience?: any[];
}


interface HeroProps {
  person: PersonData;
}


export default function Hero({ person }: HeroProps) {
  const { 
    name, 
    lname, 
    title, 
    description, 
    image, 
    blurImage,
    resumeUrl,
    githubUrl,
    linkedinUrl,
    youtubeUrl 
  } = person;
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Count-up for the 50% stat in the reveal-confirm modal. Resets to 0 and
  // counts up each time the modal opens, so it's a small earned moment of
  // motion rather than a static number sitting next to a sentence.
  const [statValue, setStatValue] = useState(0);

  useEffect(() => {
    if (!showConfirm) {
      setStatValue(0);
      return;
    }
    const durationMs = 900;
    const target = 50;
    const startTime =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    let frameId: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      // easeOutExpo-ish curve so it starts fast and settles, rather than
      // ticking up linearly like a loading bar.
      const eased = 1 - Math.pow(1 - progress, 3);
      setStatValue(Math.round(eased * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [showConfirm]);

  const heroRef = useRef(null);
  const imageWrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  // Raw mouse position relative to the image container, normalized -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the raw values so movement feels fluid, not jumpy
  const springConfig = { stiffness: 120, damping: 18, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Tilt: rotate opposite to mouse direction for a "follows cursor" feel
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  // Small positional drift, kept subtle so the image doesn't wander far
  const moveX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const moveY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  // --- Sparkle follow-through layer -----------------------------------
  // The sparkles sit in their own motion.div, sibling to the photo, so they
  // can have their own z-translation (in front of the photo) and their own
  // timing. To get a true "follow through" feel, we don't spring off the
  // raw mouse position again — that would just be a second independent
  // chase of the cursor and would drift out of sync with the photo on fast
  // movements. Instead we spring a second time off the photo's *already
  // smoothed* rotate/move values. That makes the sparkles mathematically
  // chase the photo itself: they lag a beat behind wherever the photo
  // currently is, and the lower stiffness / higher mass lets them overshoot
  // and settle slightly after the photo has already stopped, which is the
  // classic follow-through/drag animation principle.
  const followConfig = { stiffness: 55, damping: 12, mass: 1.1 };
  const sparkleRotateX = useSpring(rotateX, followConfig);
  const sparkleRotateY = useSpring(rotateY, followConfig);
  const sparkleMoveX = useSpring(moveX, followConfig);
  const sparkleMoveY = useSpring(moveY, followConfig);

  // Track mouse position relative to the image wrapper, but listen on the
  // whole window so the tilt/eye effect isn't limited to the hero section.
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!imageWrapRef.current) return;
      const rect = (
        imageWrapRef.current as HTMLElement
      ).getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 overflow-x-clip relative"
      style={{
        background:
          "radial-gradient(ellipse 140% 90% at 8% 0%, #f7f9fa 0%, transparent 55%), " +
          "radial-gradient(ellipse 200% 100% at bottom right, #6F9CC4 0%, #8FB7CE 35%, #eef2f1 100%)",
      }}
    >
      {/* Custom slow pulse for the status dot. Tailwind's animate-ping is
          hardcoded to a 1s duration, can't be slowed via className alone,
          so this defines a near-identical keyframe under a different name
          that the inline animation style above can reference. */}
      <style>{`
        @keyframes ba6ul-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          75%, 100% { transform: scale(2.8); opacity: 0; }
        }
      `}</style>
      <div className="container">
        <div className="md:flex items-center justify-between gap-16">
          <div className="md:w-[478px]">
            {/* Same glass/dot treatment as before, but rounded-lg to match
                the resume button and every other corner in this hero —
                rounded-full was the one shape in the page that didn't
                belong. Ping duration slowed from the Tailwind default
                (1s) to 2.4s so the dot breathes instead of flashing. */}
            <div className="inline-flex items-center gap-2.5 rounded-lg border border-black/5 bg-white/60 backdrop-blur-md px-3.5 py-1.5 text-sm font-medium text-black shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <div className="relative flex h-2 w-2 items-center justify-center">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"
                  style={{ animation: "ba6ul-pulse 4s cubic-bezier(0, 0, 0.2, 1) infinite" }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              Open to Work
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mt-6 leading-tight">
              {/* Added relative and higher z-index to bring first name forward */}
              <span className="block relative z-10 tracking-tighter bg-linear-to-b from-black to-[#2a3d47] text-transparent bg-clip-text pb-2">
                {name}
              </span>

              {/* Lowered z-index and dropped opacity to 45% */}
              <span className="block relative z-0 opacity-45 font-signature font-normal tracking-normal bg-linear-to-b from-purple-900 to-[#2a3d47] text-transparent bg-clip-text pb-4 -mt-10 md:-mt-12">
                {lname}
              </span>
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
             {description}
            </p>

            <div className="flex gap-3 items-center mt-7.5">
              <a
                href="./ba6ul_resume_2026.pdf"
                download="resume.pdf"
                className="rounded-lg bg-black px-5 py-2.5 text-white text-sm font-medium hover:bg-black/80 transition inline-flex items-center justify-center gap-1.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>

                <span>Résumé</span>
              </a>

              <div className="flex items-center gap-2 pl-2 border-l border-[#222]/10">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-[#222]/15 hover:bg-black/5 transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.21.66.79.55C20.21 21.38 23.5 17.07 23.5 12 23.5 5.73 18.27.5 12 .5Z" />
                  </svg>
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-[#222]/15 hover:bg-black/5 transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                  </svg>
                </a>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-[#222]/15 hover:bg-black/5 transition"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.5 6.5s-.23-1.64-.94-2.36c-.9-.95-1.9-.95-2.36-1.01C16.99 2.8 12 2.8 12 2.8h-.01s-4.98 0-8.2.33c-.46.06-1.46.06-2.36 1.01C.73 4.86.5 6.5.5 6.5S.27 8.42.27 10.35v1.31c0 1.93.23 3.85.23 3.85s.23 1.64.94 2.36c.9.95 2.08.92 2.6 1.02 1.89.18 8 .24 8 .24s4.99-.01 8.21-.33c.46-.07 1.46-.07 2.36-1.02.71-.72.94-2.36.94-2.36s.23-1.92.23-3.85v-1.31c0-1.93-.23-3.85-.23-3.85ZM9.7 14.65V7.95l6.43 3.36-6.43 3.34Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div
            ref={imageWrapRef}
            className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative"
            style={{ perspective: 1000 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isRevealed ? "revealed" : "blurred"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="md:absolute md:h-full md:w-auto md:max-w-none mx-auto"
                style={{
                  rotateX,
                  rotateY,
                  x: moveX,
                  y: moveY,
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
 src={isRevealed ? image : blurImage}
  alt={`${name} Profile`}
  priority
  placeholder="empty"
  onClick={() => {
    if (!isRevealed) setShowConfirm(true);
  }}
  className="md:h-full md:w-auto md:max-w-none cursor-pointer object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Sparkle overlays — moved out here so they are a sibling of
                the AnimatePresence block, not a child of the photo's own
                motion.div. Two reasons:
                  1) They no longer get unmounted/remounted by the
                     key={isRevealed ? "revealed" : "blurred"} swap, so they
                     now stay visible during blur AND reveal, instead of
                     only showing once isRevealed is true.
                  2) They're no longer nested inside whatever ancestor clips
                     the photo to its arch silhouette, so their tips can
                     swing past that boundary on tilt instead of getting cut
                     off at the same edge as the photo.
                Position/sizing classes match the photo so they still land
                on the same canvas; translateZ keeps them in front. */}
            <motion.div
              className="pointer-events-none absolute top-0 left-0 md:h-full md:w-auto md:max-w-none mx-auto"
              style={{
                rotateX: sparkleRotateX,
                rotateY: sparkleRotateY,
                x: sparkleMoveX,
                y: sparkleMoveY,
                translateZ: 60,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Each sparkle PNG shares the exact same canvas/aspect
                  ratio as hero_babul.webp, with its sparkle already
                  drawn at the correct spot on an otherwise transparent
                  image. So it's sized and positioned identically to
                  the main photo (same classes), not placed with
                  top/left/width/height like a small icon. Stacking two
                  of these full-canvas images on top of the photo just
                  layers their individual sparkles in. */}
              <Image
                src={sparkleOneImage}
                alt=""
                className="absolute top-0 left-0 md:h-full md:w-auto md:max-w-none object-contain"
              />
              <Image
                src={sparkleTwoImage}
                alt=""
                className="absolute top-0 left-0 md:h-full md:w-auto md:max-w-none object-contain"
              />
            </motion.div>

            {!isRevealed && (
              <motion.div
                className="hidden md:block -top-8 -left-32 absolute"
                style={{ translateY: translateY }}
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, -4, 4, 0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 2.2,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={clickhere}
                  width={220}
                  height={220}
                  alt="Click image"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-[0_30px_90px_rgba(10,30,50,0.25)]"
            >
              {/* One accent strip in the hero's own steel-blue, instead of
                  off-palette blue/violet blurred orbs, so the popup ties
                  back to the page itself. */}
              <div
                className="h-1.5 w-full"
                style={{
                  background: "linear-gradient(90deg, #6F9CC4, #2a3d47)",
                }}
              />

              <div className="p-8 sm:p-10">
                {/* The single bold moment: a large number that counts up
                    on open. Lands first, before any explanation, so the
                    number itself is the hook. */}
                <div
                  className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-[#0A0A0A] tabular-nums"
                  aria-label="50 percent"
                >
                  {statValue}%
                </div>

                {/* The one line that has to land in a glance. Plain,
                    HR-register words, no study framing yet, this is the
                    point, not the evidence for it. */}
                <p className="mt-2 text-lg font-medium leading-snug text-[#0A0A0A]">
                  A photo can introduce bias. So can age, gender, and race.
                </p>

                <h2 className="mt-6 text-base font-semibold text-neutral-500">
                  Before you reveal the photo
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
                  This page hides mine by default so the work gets read first.
                  Reveal it whenever you want, it&apos;s entirely your call.
                </p>

                {/* The study, now background noise rather than the lead.
                    Still fully present and citable, just sized and
                    colored to be read on a second pass, not the first. */}
                <p className="mt-5 text-xs leading-relaxed text-neutral-400">
                  That 50% figure comes from a 2004 study that sent close to
                  5,000 identical resumes to real job ads, changing only the
                  name at the top.{" "}
                  <span className="whitespace-nowrap">
                    Bertrand, M. &amp; Mullainathan, S. (2004).
                  </span>{" "}
                  <em>
                    Are Emily and Greg More Employable than Lakisha and Jamal?
                  </em>{" "}
                  American Economic Review, 94(4), 991&ndash;1013.
                </p>

                <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                  >
                    Keep it blurred
                  </button>
                  <button
                    onClick={() => {
                      setIsRevealed(true);
                      setShowConfirm(false);
                    }}
                    className="rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black/80"
                  >
                    Reveal photo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
