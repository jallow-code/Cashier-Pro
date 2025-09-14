
import React from 'react';
import { Denomination } from '../types';

interface CashDrawerProps {
  denominations: Denomination[];
  onDenominationClick: (value: number) => void;
  disabled: boolean;
}

const CashDrawer: React.FC<CashDrawerProps> = ({ denominations, onDenominationClick, disabled }) => {
  return (
    <div className="w-full bg-cashier-dark-light rounded-lg shadow-lg p-4">
      <h3 className="text-center text-gray-400 text-sm mb-4">CASH DRAWER</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4">
        {denominations.map((denom) => {
          const isBill = denom.type === 'bill';
          const buttonClasses = `
            font-bold py-2 px-1 rounded-lg shadow-md transition-all duration-200 ease-in-out transform 
            focus:outline-none focus:ring-2 focus:ring-cashier-accent-hover
            ${disabled 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'text-white hover:scale-105 active:scale-95'
            }
            ${isBill 
              ? `w-full h-12 ${!disabled ? 'bg-cashier-accent hover:bg-cashier-accent-hover' : ''}` 
              : `w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full mx-auto ${!disabled ? 'bg-gray-700 hover:bg-gray-600' : ''}`
            }
          `;

          return (
            <button
              key={denom.label}
              onClick={() => onDenominationClick(denom.value)}
              disabled={disabled}
              className={buttonClasses}
            >
              {denom.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CashDrawer;
