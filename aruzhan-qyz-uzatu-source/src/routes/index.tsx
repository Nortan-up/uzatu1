import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Music, Pause } from "lucide-react";

import heroSaukele from "@/assets/hero-saukele.jpg";
import watercolorFlorals from "@/assets/watercolor-florals.jpg";
import { CalendarCountdown } from "@/components/CalendarCountdown";
import { GoldDivider, ParallaxSideOrnaments } from "@/components/KazakhOrnaments";
import { RsvpForm } from "@/components/RsvpForm";
import { ambientPlayer } from "@/lib/audio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Аружан — Қыз Ұзату" },
      { name: "description", content: "Аружанның Қыз Ұзату тойына арналған салтанатты шақыру билеті · 28 қараша 2026" },
      { property: "og:title", content: "Аружан — Қыз Ұзату" },
      { property: "og:description", content: "Аружанның Қыз Ұзату тойына арналған салтанатты шақыру билеті · 28 қараша 2026" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InvitationPage,
});

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 as const },
  transition: { duration: 0.75, ease: "easeOut" as const },
};

function TwoGisIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="currentColor" opacity="0.18" />
      <path
        d="M12 5.2C8.9 5.2 6.4 7.7 6.4 10.8C6.4 14.9 12 19.3 12 19.3C12 19.3 17.6 14.9 17.6 10.8C17.6 7.7 15.1 5.2 12 5.2ZM12 12.8C10.9 12.8 10 11.9 10 10.8C10 9.7 10.9 8.8 12 8.8C13.1 8.8 14 9.7 14 10.8C14 11.9 13.1 12.8 12 12.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M20.5 11.8A8.5 8.5 0 0 1 8.1 19.3L4 20.5l1.2-4A8.5 8.5 0 1 1 20.5 11.8Z" strokeLinejoin="round" />
      <path d="M9.5 8.8c.2-.4.5-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.1-.1.3 0 .5.4.8 1.2 1.6 2 2 .2.1.4.1.5 0l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.4.7-.6.3-1.7.5-3.2-.2-1.7-.7-3.4-2.4-4.1-4.1-.7-1.5-.5-2.6-.2-3.2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function InvitationPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => ambientPlayer.stop();
  }, []);

  const handleToggleMusic = () => {
    setIsPlaying(ambientPlayer.toggle());
  };

  return (
    <div className="min-h-screen bg-paper-outer sm:py-8">
      <main className="paper-surface relative mx-auto min-h-screen w-full max-w-[440px] overflow-x-clip shadow-[0_24px_70px_-24px_rgba(92,72,42,0.18)] sm:rounded-[28px] sm:border sm:border-gold/25">
        {/* Subtle watercolor floral & gold geometry atmosphere */}
        <img
          src={watercolorFlorals}
          alt=""
          width={1024}
          height={1024}
          loading="lazy"
          className="pointer-events-none absolute top-[620px] left-0 w-full opacity-35 mix-blend-multiply select-none"
        />
        <img
          src={watercolorFlorals}
          alt=""
          width={1024}
          height={1024}
          loading="lazy"
          className="pointer-events-none absolute bottom-12 left-0 w-full rotate-180 opacity-30 mix-blend-multiply select-none"
        />

        {/* Semi-transparent parallax Kazakh ornaments */}
        <ParallaxSideOrnaments />

        {/* 1. First Screen: Hero Saukele Portrait + Name + Date + Pulsing Music Button */}
        <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden pb-10">
          <div className="absolute inset-0">
            <img
              src={heroSaukele}
              alt="Аружан сәукелемен"
              width={960}
              height={1280}
              className="h-full w-full object-cover object-top"
            />
            {/* Soft milk-white bottom gradient fade */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(250,247,241,0.04) 0%, rgba(250,247,241,0.12) 44%, rgba(250,247,241,0.82) 76%, var(--paper) 96%)",
              }}
            />
          </div>

          {/* Thin gold geometric frame */}
          <div
            className="pointer-events-none absolute inset-4 rounded-t-[200px] border border-gold/35"
            aria-hidden="true"
          />

          {/* Pulsing Music Button */}
          <div className="absolute top-7 right-7 z-20">
            <button
              type="button"
              onClick={handleToggleMusic}
              aria-label={isPlaying ? "Музыканы тоқтату" : "Фондық музыканы қосу"}
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-paper/85 text-gold-dark shadow-sm backdrop-blur-xs transition-transform active:scale-95"
            >
              <span
                className={`pointer-events-none absolute inset-0 rounded-full border border-gold/60 ${
                  isPlaying ? "animate-music-pulse" : "animate-music-pulse opacity-60"
                }`}
              />
              {isPlaying ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
            </button>
          </div>

          {/* Hero Typography */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 px-6 text-center"
          >
            <p className="text-xs font-medium tracking-[0.34em] text-gold-dark uppercase">
              Қыз Ұзату
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-script)] text-7xl leading-none text-foreground">
              Аружан
            </h1>
            <GoldDivider className="my-4" />
            <p className="text-lg tracking-[0.28em] text-foreground/85">
              28 · 11 · 2026
            </p>
          </motion.div>
        </section>

        {/* 2. Greeting Block: Poetic Quatrain + Official Invitation */}
        <section className="relative z-10 px-7 py-14 text-center">
          <motion.blockquote
            {...reveal}
            className="mx-auto max-w-[320px] space-y-1 text-lg leading-relaxed text-gold-dark italic"
          >
            <p>Ақ құсым ұшар ұядан,</p>
            <p>Ақ жол тілеп қиядан.</p>
            <p>Бақытты болсын жас отау,</p>
            <p>Нұр төгілсін әр таңнан.</p>
          </motion.blockquote>

          <GoldDivider className="my-8" />

          <div className="mx-auto max-w-[330px] space-y-5 text-lg leading-relaxed text-foreground/90">
            <motion.h2
              {...reveal}
              className="text-3xl font-medium italic tracking-wide text-gold-dark"
            >
              Құрметті ағайын-туыс,
            </motion.h2>

            <motion.p {...reveal}>
              құда-жекжат, дос-жарандар мен қадірлі қонақтар!
            </motion.p>

            <motion.p {...reveal}>
              Сіздерді аяулы қызымыз <strong className="font-semibold text-foreground">Аружанның</strong>{" "}
              Қыз Ұзату тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға
              шын жүректен шақырамыз!
            </motion.p>

            <motion.p {...reveal} className="text-base text-muted-foreground">
              Қуанышымызға ортақ болып, ақ баталарыңызды беріп, кешіміздің сәнін келтіріңіздер.
            </motion.p>
          </div>
        </section>

        {/* 3. Calendar & Live Countdown */}
        <section className="relative z-10 px-6 py-12 text-center">
          <motion.div {...reveal} className="mb-7">
            <h2 className="text-3xl font-medium italic tracking-wide text-gold-dark">
              Той күні
            </h2>
            <p className="mt-1 text-sm tracking-[0.22em] text-muted-foreground uppercase">
              28 қараша 2026 · Сағат 18:00
            </p>
          </motion.div>

          <CalendarCountdown
            targetIso="2026-11-28T18:00:00+05:00"
            monthTitle="Қараша"
            year={2026}
            monthIndex={10}
            highlightDay={28}
          />
        </section>

        <GoldDivider className="relative z-10 my-2" />

        {/* 4. Location + 2GIS Button */}
        <section className="relative z-10 px-6 py-14 text-center">
          <motion.div {...reveal} className="mx-auto max-w-[330px] space-y-4">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 bg-card/80 text-gold-dark">
              <MapPin className="h-5 w-5" />
            </div>

            <h2 className="text-3xl font-medium italic tracking-wide text-gold-dark">
              Мекенжайымыз
            </h2>

            <div className="space-y-1">
              <p className="text-xl font-medium text-foreground">
                «Ұмай» банкет залы
              </p>
              <p className="text-base text-muted-foreground">
                Астана қаласы
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://2gis.kz/astana/firm/70000001088015037"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-twogis px-7 py-3 text-sm font-medium tracking-[0.14em] text-twogis-foreground uppercase shadow-xs transition-opacity hover:opacity-90"
              >
                <TwoGisIcon />
                <span>2GIS арқылы ашу</span>
              </a>
            </div>
          </motion.div>
        </section>

        <GoldDivider className="relative z-10 my-2" />

        {/* 5. RSVP Form */}
        <section className="relative z-10 px-6 py-14 text-center">
          <motion.div {...reveal} className="mb-7 space-y-1.5">
            <h2 className="text-3xl font-medium italic tracking-wide text-gold-dark">
              Қатысуыңызды растаңыз
            </h2>
            <p className="text-base text-muted-foreground">
              Тойға келетініңізді алдын ала хабарлауыңызды сұраймыз
            </p>
          </motion.div>

          <RsvpForm />
        </section>

        {/* 6. Developer Footer */}
        <footer className="relative z-10 border-t border-gold/25 px-7 py-10 text-center">
          <p className="mx-auto max-w-[300px] text-sm leading-relaxed text-muted-foreground">
            Жақында сіздің де тойыңыз бола ма? Сайт шақыруға тапсырыс беру
          </p>
          <a
            href="tel:+77751371817"
            className="mt-2 inline-block text-base font-medium tracking-[0.12em] text-gold-dark transition-opacity hover:opacity-75"
          >
            +7 775 137 1817
          </a>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href="https://wa.me/77751371817"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp арқылы байланысу"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-card/80 text-gold-dark transition-colors hover:bg-secondary"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram парақшасы"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-card/80 text-gold-dark transition-colors hover:bg-secondary"
            >
              <InstagramIcon />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
