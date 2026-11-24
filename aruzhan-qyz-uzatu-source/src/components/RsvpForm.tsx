import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

type AttendanceStatus = "attending" | "declined";

interface SavedRsvp {
  name: string;
  status: AttendanceStatus;
}

const STORAGE_KEY = "aruzhan-qyz-uzatu-rsvp";

export function RsvpForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<AttendanceStatus>("attending");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedRsvp | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<SavedRsvp>;
      if (
        typeof parsed.name === "string" &&
        (parsed.status === "attending" || parsed.status === "declined")
      ) {
        setSaved({ name: parsed.name, status: parsed.status });
        setName(parsed.name);
        setStatus(parsed.status);
      }
    } catch {
      // Ignore invalid storage entries
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Аты-жөніңізді жазыңыз");
      return;
    }
    setError(null);
    const next: SavedRsvp = { name: trimmed, status };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable
    }
    setSaved(next);
  };

  if (saved) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-[330px] rounded-2xl border border-gold/35 bg-card/80 px-6 py-7 text-center"
      >
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-secondary text-gold-dark">
          <Check className="h-5 w-5" />
        </div>
        <p className="text-3xl font-medium italic tracking-wide text-gold-dark">
          Рақмет, {saved.name}!
        </p>
        <p className="mt-2 text-base text-muted-foreground">
          {saved.status === "attending"
            ? "Жауабыңыз қабылданды. Сізді қуанышты кешімізде асыға күтеміз!"
            : "Хабар бергеніңізге рақмет. Ізгі тілегіңізге алғысымыз шексіз."}
        </p>
        <button
          type="button"
          onClick={() => setSaved(null)}
          className="mt-5 text-xs tracking-[0.18em] text-gold-dark underline underline-offset-4 uppercase transition-opacity hover:opacity-75"
        >
          Жауапты өзгерту
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-[330px] space-y-5 rounded-2xl border border-gold/30 bg-card/75 px-6 py-7 backdrop-blur-xs"
      noValidate
    >
      <div className="space-y-1.5 text-left">
        <label htmlFor="guest-name" className="block text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Аты-жөніңіз
        </label>
        <input
          id="guest-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Мысалы: Айгүл Сәтбаева"
          className="w-full border-b border-gold/45 bg-transparent px-1 py-2.5 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-gold-dark focus:outline-none"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <fieldset className="space-y-2.5 text-left">
        <legend className="mb-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Қатысуыңыз
        </legend>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gold/25 bg-background/70 px-4 py-3 transition-colors has-[:checked]:border-gold has-[:checked]:bg-secondary/80">
          <input
            type="radio"
            name="attendance"
            value="attending"
            checked={status === "attending"}
            onChange={() => setStatus("attending")}
            className="h-4 w-4 accent-gold-dark"
          />
          <span className="text-base text-foreground">Келемін</span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gold/25 bg-background/70 px-4 py-3 transition-colors has-[:checked]:border-gold has-[:checked]:bg-secondary/80">
          <input
            type="radio"
            name="attendance"
            value="declined"
            checked={status === "declined"}
            onChange={() => setStatus("declined")}
            className="h-4 w-4 accent-gold-dark"
          />
          <span className="text-base text-foreground">Өкінішке қарай, келе алмаймын</span>
        </label>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium tracking-[0.22em] text-primary-foreground uppercase shadow-xs transition-all hover:bg-gold-dark active:scale-[0.99]"
      >
        Жауапты жіберу
      </button>
    </motion.form>
  );
}