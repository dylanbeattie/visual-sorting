import {
  customOscillators,
  customOscillatorTypes,
} from 'web-audio-oscillators';
import { browser } from '$app/environment';

export type OscillatorType = (typeof customOscillatorTypes)[number] | null;

const context = browser && new AudioContext();

let oscillator: OscillatorNode;
let freqStepSize = 0;

const maxFrequency = 1500;
const minFrequency = 10;

export const soundStart = (
  size: number,
  oscillatorName: NonNullable<OscillatorType>
) => {
  if (!context) {
    return;
  }

  freqStepSize = maxFrequency / size;
  if (oscillator) {
    soundStop();
  }
  oscillator = customOscillators[oscillatorName](context);
  oscillator.connect(context.destination);
  oscillator.start();
};

export const soundStop = () => {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
  }
};

const blackKeyFrequencies = [
  29.14,  // A♯0 / B♭0
  34.65,  // C♯1 / D♭1
  38.89,  // D♯1 / E♭1
  46.25,  // F♯1 / G♭1
  51.91,  // G♯1 / A♭1
  58.27,  // A♯1 / B♭1
  69.30,  // C♯2 / D♭2
  77.78,  // D♯2 / E♭2
  92.50,  // F♯2 / G♭2
  103.83, // G♯2 / A♭2
  116.54, // A♯2 / B♭2
  138.59, // C♯3 / D♭3
  155.56, // D♯3 / E♭3
  185.00, // F♯3 / G♭3
  207.65, // G♯3 / A♭3
  233.08, // A♯3 / B♭3
  277.18, // C♯4 / D♭4
  311.13, // D♯4 / E♭4
  369.99, // F♯4 / G♭4
  415.30, // G♯4 / A♭4
  466.16, // A♯4 / B♭4
  554.37, // C♯5 / D♭5
  622.25, // D♯5 / E♭5
  739.99, // F♯5 / G♭5
  830.61, // G♯5 / A♭5
  932.33, // A♯5 / B♭5
  1108.73, // C♯6 / D♭6
  1244.51, // D♯6 / E♭6
  1479.98, // F♯6 / G♭6
  1661.22, // G♯6 / A♭6
  1864.66, // A♯6 / B♭6
  2217.46, // C♯7 / D♭7
  2489.02, // D♯7 / E♭7
  2959.96, // F♯7 / G♭7
  3322.44, // G♯7 / A♭7
  3729.31, // A♯7 / B♭7
  4434.92  // C♯8 / D♭8
];


const pianoFrequencies = [
  27.5, 29.1352, 30.8677, 32.7032, 34.6478, 36.7081, 38.8909, 41.2034, 43.6535, 46.2493, 48.9994, 51.9131,
  55.0, 58.2705, 61.7354, 65.4064, 69.2957, 73.4162, 77.7817, 82.4069, 87.3071, 92.4986, 97.9989, 103.826,
  110.0, 116.541, 123.471, 130.813, 138.591, 146.832, 155.563, 164.814, 174.614, 184.997, 195.998, 207.652,
  220.0, 233.082, 246.942, 261.626, 277.183, 293.665, 311.127, 329.628, 349.228, 369.994, 391.995, 415.305,
  440.0, 466.164, 493.883, 523.251, 554.365, 587.33, 622.254, 659.255, 698.456, 739.989, 783.991, 830.609,
  880.0, 932.328, 987.767, 1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22,
  1760.0, 1864.66, 1975.53, 2093.0, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44,
  3520.0, 3729.31, 3951.07, 4186.01, 4434.92, 4698.63, 4978.03, 5274.04
];
export const playValue = (value: number) => {

  // const freq = freqStepSize * (value - 1) + minFrequency;
  const freq = blackKeyFrequencies[value];
  
  if (oscillator) {
    oscillator.frequency.value = freq;
  }
};
