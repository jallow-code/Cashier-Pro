import React from 'react';
import { CUSTOMERS_PER_SHIFT } from '../constants';

interface ScoreboardProps {
  customerCount: number;
  streak: number;
  timeLeft: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ customerCount, streak, timeLeft }) => {
  const timeColor = timeLeft <= 5 ? 'text-cashier-red animate-pulse' : 'text-cashier-accent';
  
  return (
    <div className="w-full bg-cashier-dark-light rounded-lg shadow-lg p-4 flex justify-around text-white text-center mb-4">
      <div>
        <p className="text-sm text-gray-400">CUSTOMER</p>
        <p className="text-2xl font-bold text-cashier-accent">{customerCount} / {CUSTOMERS_PER_SHIFT}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">STREAK</p>
        <p className="text-2xl font-bold text-cashier-accent">🔥 {streak}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">TIME</p>
        <p className={`text-2xl font-bold ${timeColor}`}>{timeLeft}s</p>
      </div>
    </div>
  );
};

export default Scoreboard;