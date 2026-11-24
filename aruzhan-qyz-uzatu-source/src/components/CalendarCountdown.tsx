import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { OrnamentalRing } from "./KazakhOrnaments";

interface CalendarCountdownProps {
  targetIso: string;
  monthTitle: string;
  year: number;
  monthIndex: number; // 0-based (7 = August)
  highlightDay: number;
}

const WEEKDAYS = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жк"];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(targetMs: number, nowMs: number): TimeLeft {
  const diff = Math.max(0, targetMs - nowMs);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function buildMonthGrid(year: number, monthIndex: number): Array<number | null> {
  const firstDay = new Date(year, monthIndex, 1).getDay();
  // Convert Sunday=0..Saturday=6 into Monday=0..Sunday=6
  const leadingEmpty = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Array<number | null> = Array.from({ length: leadingEmpty }, () => null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(d);
  }
  return cells;
}

export function CalendarCountdown({
  targetIso,
  monthTitle,
  year,
  monthIndex,
  highlightDay,
}: CalendarCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const cells = buildMonthGrid(year, monthIndex);

  useEffect(() => {
    const targetMs = new Date(targetIso).getTime();
    const update = () => setTimeLeft(computeTimeLeft(targetMs, Date.now()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  const units = [
    { label: "Күн", value: timeLeft ? String(timeLeft.days) : "—" },
    { label: "Сағат", value: timeLeft ? String(timeLeft.hours).padStart(2, "0") : "—" },
    { label: "Минут", value: timeLeft ? String(timeLeft.minutes).padStart(2, "0") : "—" },
    { label: "Секунд", value: timeLeft ? String(timeLeft.seconds).padStart(2, "0") : "—" },
  ];

  return (
    <div className="space-y-8">
      {/* Minimalist Month Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-[320px] rounded-2xl border border-gold/30 bg-card/75 px-5 py-6 backdrop-blur-xs"
      >
        <p className="mb-5 text-center text-sm tracking-[0.28em] text-gold-dark uppercase">
          {monthTitle} · {year}
        </p>

        <div className="mb-2 grid grid-cols-7 text-center text-xs tracking-wider text-muted-foreground">
          {WEEKDAYS.map((day) => (
            <span key={day} className="py-1">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1.5 text-center text-base">
          {cells.map((day, idx) => {
            if (day === null) {
              return <span key={`empty-${idx}`} />;
            }
            const isEventDay = day === highlightDay;
            return (
              <div
                key={day}
                className="relative flex h-10 items-center justify-center"
              >
                {isEventDay && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center text-gold"
                  >
                    <OrnamentalRing className="h-11 w-11" />
                  </motion.div>
                )}
                <span
                  className={
                    isEventDay
                      ? "relative z-10 font-semibold text-gold-dark"
                      : "text-foreground/85"
                  }
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Live Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="space-y-3"
      >
        <p className="text-center text-sm tracking-[0.22em] text-muted-foreground uppercase">
          Тойға дейін қалды
        </p>
        <div className="mx-auto grid max-w-[320px] grid-cols-4 gap-2">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center rounded-xl border border-gold/25 bg-card/70 py-3"
            >
              <span className="text-2xl font-medium tabular-nums text-foreground">
                {unit.value}
              </span>
              <span className="mt-0.5 text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}