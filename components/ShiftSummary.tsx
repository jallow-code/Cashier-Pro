import React from 'react';
import { TransactionData } from '../types';

interface ShiftSummaryProps {
    score: number;
    performanceData: TransactionData[];
    onStartNewShift: () => void;
}

const ShiftSummary: React.FC<ShiftSummaryProps> = ({ score, performanceData, onStartNewShift }) => {
    const totalTransactions = performanceData.length;
    const correctTransactions = performanceData.filter(t => t.result === 'correct').length;
    const accuracy = totalTransactions > 0 ? (correctTransactions / totalTransactions) * 100 : 0;
    const totalTime = performanceData.reduce((acc, t) => acc + t.timeTaken, 0);
    const averageTime = totalTransactions > 0 ? totalTime / totalTransactions : 0;

    return (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-20">
            <div className="bg-cashier-dark-light rounded-lg shadow-2xl p-8 text-center text-white max-w-md w-full animate-fade-in-up">
                <h2 className="text-3xl font-bold mb-4 text-cashier-accent">Shift Over!</h2>
                <div className="space-y-4 text-lg mb-8">
                    <div className="flex justify-between border-b border-gray-600 py-2">
                        <span className="font-semibold">Final Score:</span>
                        <span className="font-bold text-cashier-accent">{score}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-600 py-2">
                        <span className="font-semibold">Accuracy:</span>
                        <span>{accuracy.toFixed(1)}% ({correctTransactions}/{totalTransactions})</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-600 py-2">
                        <span className="font-semibold">Average Time:</span>
                        <span>{averageTime.toFixed(2)}s</span>
                    </div>
                </div>
                <button
                    onClick={onStartNewShift}
                    className="w-full bg-cashier-accent text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-cashier-accent-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cashier-dark-light focus:ring-white"
                >
                    Start New Shift
                </button>
            </div>
        </div>
    );
};

export default ShiftSummary;