"use client";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Eye, Lightbulb } from "lucide-react";

interface RevealModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const contentStagger: Variants = {
  hidden: {},
  // Waits until the paper has mostly popped + rotated into place before the
  // text starts appearing, so it reads as "the note is here" then "here's
  // what it says" instead of everything landing at once.
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.32 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function RevealModal({
  isOpen,
  onConfirm,
  onCancel,
}: RevealModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19]/70 backdrop-blur-md px-6 py-10 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-115 my-auto"
          >
            {/* Backing colored sheet — pops straight, then rotates right a
                touch, so it reads as a second page peeking out from behind.
                Height matches the front sheet automatically (absolute
                inset-0 against this shared relative parent). */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 10 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
                // Starts once scale is roughly halfway grown, so it pops
                // straight first and only starts turning partway in.
                rotate: {
                  duration: 0.35,
                  delay: 0.17,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="absolute inset-0 rounded-2xl bg-[#6F9CC4] shadow-[0_25px_70px_rgba(10,30,50,0.4)]"
            />

            {/* Front notepad sheet — the artwork and all text/buttons live
                in this SAME rotating element, so rotation moves them as one
                rigid unit. Pops straight, then settles into a slight left
                tilt on a short delay — opposite direction from the backing
                sheet. Height is driven by the content (not locked to the
                image's native ratio), with the artwork stretched to fit —
                safe here since the art is just the spiral-binding row up
                top over an otherwise plain white sheet. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -5 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -8 }}
              transition={{
                opacity: { duration: 0.2, delay: 0.05 },
                scale: {
                  duration: 0.35,
                  delay: 0.05,
                  ease: [0.34, 1.56, 0.64, 1],
                },
                // Starts once scale is roughly halfway grown (matching the
                // backing sheet's timing, offset by the same small stagger).
                rotate: {
                  duration: 0.35,
                  delay: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="relative shadow-[0_25px_70px_rgba(10,30,50,0.45)]"
              style={{
                backgroundImage: "url(/paper_popup.webp)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Spinning citation stamp — references the actual researchers
                  instead of a generic "RESEARCH PAPER" label, curved around
                  the badge and continuously rotating like a seal. */}
              <motion.div
                className="absolute -top-4 -right-4 h-20 w-20 sm:h-24 sm:w-24 drop-shadow-md"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <defs>
                    <path
                      id="reveal-badge-path"
                      d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    />
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="#F7E4D6"
                    stroke="#C46A3A"
                    strokeWidth="1.5"
                  />
                  <text
                    fontSize="6.2"
                    fontWeight="700"
                    letterSpacing="1.3"
                    fill="#C46A3A"
                  >
                    <textPath href="#reveal-badge-path" startOffset="0%">
                      BERTRAND &amp; MULLAINATHAN &middot; 2004 &middot;
                      AMERICAN ECONOMIC REVIEW &middot;
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              <motion.div
                variants={contentStagger}
                initial="hidden"
                animate="show"
                className="flex flex-col px-[11%] pt-[19%] pb-[7%]"
              >
                <motion.div variants={item}>
                  {/* Small, out of the way, above the headline instead of
                      beside it — beside it was stealing width and forcing
                      "Did you" to wrap onto two lines. */}
                  <Lightbulb
                    className="h-5 w-5 text-[#2a3d47]"
                    aria-hidden="true"
                  />
                  <div className="relative mt-2 flex w-full items-start">
                    {/* Left half */}
                    <div className="relative z-20 flex-[1]">
                      <h2 className="text-[2.4rem] sm:text-[3rem] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-[#0A0A0A]">
                        Did you
                        <br />
                        know?
                      </h2>
                    </div>

                    {/* Right half */}
                    <div className="relative flex-[1]">
                      <span
                        className="
                        absolute
                        left-[-18%]
                        top-[55%]
                        -translate-y-1/2
                        text-[5.7rem]
                        sm:text-[7rem]
                        font-black
                        leading-none
                        tracking-[-0.08em]
                      text-black/8
                        select-none
                        whitespace-nowrap
                        "
                      >
                        50%
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  variants={item}
                  className="mt-4 text-lg font-medium leading-snug text-[#0A0A0A]"
                >
                  A photo can introduce bias. So can age, gender, and race.
                </motion.p>

                <motion.h3
                  variants={item}
                  className="mt-6 text-base font-semibold text-neutral-500"
                >
                  Before you reveal the photo
                </motion.h3>
                <motion.p
                  variants={item}
                  className="mt-2 text-[15px] leading-relaxed text-neutral-600"
                >
                  This page hides mine by default so the work gets read first.
                  Reveal it whenever you want, it&apos;s entirely your call.
                </motion.p>

                <motion.p
                  variants={item}
                  className="mt-5 text-xs leading-relaxed text-neutral-400"
                >
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
                </motion.p>

                <motion.div
                  variants={item}
                  className="mt-7 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-end"
                >
                  <button
                    onClick={onCancel}
                    className="text-sm font-medium text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition hover:text-neutral-700 hover:decoration-neutral-500"
                  >
                    Keep it blurred
                  </button>
                  <button
                    onClick={onConfirm}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black/80"
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    Reveal photo
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
