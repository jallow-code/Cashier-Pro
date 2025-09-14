// Web Audio API for sound effects
let audioCtx: AudioContext | null = null;

// Initialize audio context on user interaction
export const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
};

const playSound = (type: 'sine' | 'square' | 'sawtooth' | 'triangle', frequency: number, duration: number, volume: number = 0.5) => {
    if (!audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
};

const playNoise = (duration: number, volume: number = 0.2) => {
    if (!audioCtx) return;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = buffer;
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    noiseNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    noiseNode.start();
}

export const playCoinSound = () => playSound('sine', 900, 0.1, 0.3);
export const playBillSound = () => playNoise(0.05, 0.1);
export const playCashDrawerOpenSound = () => {
    playNoise(0.1, 0.3);
    setTimeout(() => playSound('square', 1000, 0.15, 0.2), 50);
};
export const playCorrectSound = () => {
    playSound('sine', 600, 0.1);
    setTimeout(() => playSound('sine', 900, 0.1), 100);
};
export const playIncorrectSound = () => {
    playSound('sawtooth', 200, 0.3, 0.4);
};