import { motion, useScroll, useTransform } from "framer-motion";

function OyuMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 260" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        {/* Top қошқар мүйіз (ram's horn) scroll */}
        <path d="M40 16 C40 34, 14 34, 14 54 C14 68, 28 72, 34 62 C38 55, 31 48, 25 52" />
        <path d="M40 16 C40 34, 66 34, 66 54 C66 68, 52 72, 46 62 C42 55, 49 48, 55 52" />
        <path d="M40 16 L40 94" />
        {/* Center tulip / diamond medallion */}
        <path d="M40 94 L54 114 L40 134 L26 114 Z" />
        <path d="M40 102 L48 114 L40 126 L32 114 Z" />
        <path d="M26 114 C14 114, 10 102, 18 96" />
        <path d="M54 114 C66 114, 70 102, 62 96" />
        <path d="M26 114 C14 114, 10 126, 18 132" />
        <path d="M54 114 C66 114, 70 126, 62 132" />
        {/* Lower mirrored қошқар мүйіз scroll */}
        <path d="M40 134 L40 244" />
        <path d="M40 244 C40 226, 14 226, 14 206 C14 192, 28 188, 34 198 C38 205, 31 212, 25 208" />
        <path d="M40 244 C40 226, 66 226, 66 206 C66 192, 52 188, 46 198 C42 205, 49 212, 55 208" />
        <path d="M40 168 C24 168, 18 156, 26 148" />
        <path d="M40 168 C56 168, 62 156, 54 148" />
      </g>
    </svg>
  );
}

export function ParallaxSideOrnaments() {
  const { scrollYProgress } = useScroll();
  const yLeft = useTransform(scrollYProgress, [0, 1], [-40, 180]);
  const yRight = useTransform(scrollYProgress, [0, 1], [60, -160]);
  const yLowerLeft = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yLowerRight = useTransform(scrollYProgress, [0, 1], [-60, 140]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ y: yLeft }}
        className="absolute -left-5 top-[28%] w-16 text-gold/25 sm:w-20"
      >
        <OyuMotif className="h-auto w-full" />
      </motion.div>

      <motion.div
        style={{ y: yRight }}
        className="absolute -right-5 top-[34%] w-16 text-gold/25 sm:w-20"
      >
        <OyuMotif className="h-auto w-full -scale-x-100" />
      </motion.div>

      <motion.div
        style={{ y: yLowerLeft }}
        className="absolute -left-5 top-[68%] w-16 text-gold/20 sm:w-20"
      >
        <OyuMotif className="h-auto w-full" />
      </motion.div>

      <motion.div
        style={{ y: yLowerRight }}
        className="absolute -right-5 top-[72%] w-16 text-gold/20 sm:w-20"
      >
        <OyuMotif className="h-auto w-full -scale-x-100" />
      </motion.div>
    </div>
  );
}

export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="gold-shimmer-line h-px w-16" />
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold" fill="none">
        <path
          d="M12 2 L16 12 L12 22 L8 12 Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      </svg>
      <span className="gold-shimmer-line h-px w-16" />
    </div>
  );
}

export function OrnamentalRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
      <circle cx="28" cy="28" r="21" stroke="currentColor" strokeWidth="1.15" />
      <circle
        cx="28"
        cy="28"
        r="24.5"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2.5 3"
        opacity="0.8"
      />
      <path d="M28 2 L30.5 6.5 L28 9 L25.5 6.5 Z" fill="currentColor" />
      <path d="M28 54 L30.5 49.5 L28 47 L25.5 49.5 Z" fill="currentColor" />
      <path d="M2 28 L6.5 25.5 L9 28 L6.5 30.5 Z" fill="currentColor" />
      <path d="M54 28 L49.5 25.5 L47 28 L49.5 30.5 Z" fill="currentColor" />
    </svg>
  );
}