// Web Audio API DTMF tone generator for realistic IVR dialpad
class AudioController {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  // Play realistic dual-tone multi-frequency (DTMF) keypad sound
  playDtmfTone(key) {
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const dtmfFrequencies = {
        '1': [697, 1209],
        '2': [697, 1336],
        '3': [697, 1477],
        '4': [770, 1209],
        '5': [770, 1336],
        '6': [770, 1477],
        '7': [852, 1209],
        '8': [852, 1336],
        '9': [852, 1477],
        '*': [941, 1209],
        '0': [941, 1336],
        '#': [941, 1477],
      };

      const freqs = dtmfFrequencies[key] || [440, 880];
      const now = this.audioCtx.currentTime;

      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc1.frequency.setValueAtTime(freqs[0], now);
      osc2.frequency.setValueAtTime(freqs[1], now);

      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.2);
      osc2.stop(now + 0.2);
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  // Play phone ring tone
  playRingTone() {
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const now = this.audioCtx.currentTime;
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc1.frequency.setValueAtTime(440, now);
      osc2.frequency.setValueAtTime(480, now);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
    } catch (e) {
      console.warn('Ring tone error:', e);
    }
  }

  // Play alert / notification chime
  playNotificationSound() {
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.1); // A5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn('Chime error:', e);
    }
  }

  // Speak voice prompt using Web Speech API
  speakText(text, lang = 'en-IN') {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Stop any pending speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        utterance.lang = lang;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
      }
    }
  }

  stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioService = new AudioController();
