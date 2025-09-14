// Create the DifficultySelector component.
import React from 'react';
import { Difficulty } from '../types';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-cashier-accent">Cashier Pro</h1>
      <p className="text-lg text-gray-300 mb-8">Select a difficulty to start your shift.</p>
      <div className="space-y-4 w-full max-w-xs">
        {(Object.values(Difficulty)).map((difficultyLevel) => (
          <button
            key={difficultyLevel}
            onClick={() => onSelectDifficulty(difficultyLevel)}
            className="w-full bg-cashier-accent text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-cashier-accent-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cashier-dark focus:ring-white"
          >
            {difficultyLevel}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-12">Created by Abdoulie Jallow</p>
    </div>
  );
};

export default DifficultySelector;
