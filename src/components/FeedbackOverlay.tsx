import React from 'react';
import { GameState } from '../types';
import { CheckIcon, XCircleIcon } from './Icons';

interface FeedbackOverlayProps {
  gameState: GameState;
  onNext: () => void;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ gameState, onNext }) => {
  const isVisible = gameState === GameState.Correct || gameState === GameState.Incorrect || gameState === GameState.TimesUp;
  if (!isVisible) return null;

  const isCorrect = gameState === GameState.Correct;
  
  let message = '';
  let subMessage = '';
  let Icon;
  let bgColor = '';
  let textColor = '';

  if (isCorrect) {
    message = "Correct!";
    Icon = CheckIcon;
    bgColor = 'bg-cashier-green';
    textColor = 'text-cashier-green';
  } else {
    Icon = XCircleIcon;
    bgColor = 'bg-cashier-red';
    textColor = 'text-cashier-red';
    switch (gameState) {
      case GameState.Incorrect:
        message = "Too much!";
        break;
      case GameState.TimesUp:
        message = "Time's Up!";
        break;
      default:
        message = "Try Again";
    }
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-10">
      <div className="bg-cashier-dark-light rounded-lg shadow-2xl p-8 text-center text-white max-w-sm w-full animate-fade-in-up">
        <Icon className={`w-20 h-20 mx-auto mb-4 ${textColor}`} />
        <h2 className="text-4xl font-bold mb-2">{message}</h2>
        {subMessage && <p className="text-gray-300 mb-6">{subMessage}</p>}
        <button
          onClick={onNext}
          className={`w-full ${bgColor} text-white font-bold py-3 px-4 rounded-lg text-lg hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cashier-dark-light focus:ring-white`}
        >
          Next Customer
        </button>
      </div>
    </div>
  );
};

export default FeedbackOverlay;
