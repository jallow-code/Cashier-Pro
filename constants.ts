// Define application constants.
import { Denomination, Difficulty, DifficultySettings } from './types';

// Storing money values in cents to avoid floating point issues
export const DENOMINATIONS: Denomination[] = [
  { label: '€100', value: 10000, type: 'bill' },
  { label: '€50', value: 5000, type: 'bill' },
  { label: '€20', value: 2000, type: 'bill' },
  { label: '€10', value: 1000, type: 'bill' },
  { label: '€5', value: 500, type: 'bill' },
  { label: '€2', value: 200, type: 'coin' },
  { label: '€1', value: 100, type: 'coin' },
  { label: '50c', value: 50, type: 'coin' },
  { label: '20c', value: 20, type: 'coin' },
  { label: '10c', value: 10, type: 'coin' },
  { label: '5c', value: 5, type: 'coin' },
  { label: '2c', value: 2, type: 'coin' },
  { label: '1c', value: 1, type: 'coin' },
];

export const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySettings> = {
    [Difficulty.Easy]: {
        maxCost: 2000, // up to €20
        time: 30,
    },
    [Difficulty.Medium]: {
        maxCost: 5000, // up to €50
        time: 15,
    },
    [Difficulty.Hard]: {
        maxCost: 9999, // up to €99.99
        time: 10,
    },
};

export const CUSTOMERS_PER_SHIFT = 10;