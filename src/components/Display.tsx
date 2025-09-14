
import React from 'react';

interface DisplayProps {
  totalCost: number;
  amountGiven: number;
  runningTotal: number;
  formatCurrency: (amount: number) => string;
}

const Display: React.FC<DisplayProps> = ({ totalCost, amountGiven, runningTotal, formatCurrency }) => {
  const progressPercentage = Math.min(((runningTotal - totalCost) / (amountGiven - totalCost)) * 100, 100);

  return (
    <div className="w-full bg-cashier-dark-light rounded-lg shadow-lg p-6 text-white mb-4">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-lg text-gray-400">Total Cost</span>
        <span className="text-2xl md:text-3xl font-mono font-bold">{formatCurrency(totalCost)}</span>
      </div>
      <div className="flex justify-between items-baseline mb-4">
        <span className="text-lg text-gray-400">Amount Given</span>
        <span className="text-2xl md:text-3xl font-mono font-bold">{formatCurrency(amountGiven)}</span>
      </div>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
            <div>
                <span className="text-xs font-semibold inline-block text-cashier-accent">
                    Counting Up From: {formatCurrency(totalCost)}
                </span>
            </div>
            <div className="text-right">
                <span className="text-xs font-semibold inline-block text-cashier-accent">
                    Target: {formatCurrency(amountGiven)}
                </span>
            </div>
        </div>
        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-cashier-dark">
            <div style={{ width: `${progressPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cashier-accent transition-all duration-300"></div>
        </div>
        <div className="text-center">
            <p className="text-lg text-gray-400">Current Total</p>
            <p className="text-4xl md:text-5xl font-mono font-extrabold text-white tracking-wider">{formatCurrency(runningTotal)}</p>
        </div>
      </div>
    </div>
  );
};

export default Display;
