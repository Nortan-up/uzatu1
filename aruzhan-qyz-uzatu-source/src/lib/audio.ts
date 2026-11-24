/**
 * Gentle Web Audio API ambient melody (Kazakh pentatonic harp/dombra motif)
 * so the invitation's music button plays reliably without external audio URLs.
 */
class AmbientToiPlayer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private step = 0;
  private playing = false;

  // D major pentatonic frequencies for a warm, lyrical Kazakh melody
  private readonly notes = [
    293.66, 329.63, 369.99, 440.0, 587.33, 440.0, 369.99, 329.63,
    293.66, 369.99, 440.0, 493.88, 587.33, 493.88, 440.0, 369.99,
  ];

  public toggle(): boolean {
    if (this.playing) {
      this.stop();
      return false;
    }
    this.start();
    return true;
  }

  public start(): void {
    if (this.playing || typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.0001;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    if (this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.14, this.ctx.currentTime + 0.6);
    }

    this.playing = true;
    this.playNote();
    this.timerId = window.setInterval(() => this.playNote(), 780);
  }

  public stop(): void {
    this.playing = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);
    }
  }

  private playNote(): void {
    if (!this.ctx || !this.masterGain || !this.playing) return;
    const freq = this.notes[this.step % this.notes.length] ?? 440;
    this.step += 1;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.42, now + 0.06);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.45);

    osc.connect(noteGain);
    noteGain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 1.5);
  }
}

export const ambientPlayer = new AmbientToiPlayer();