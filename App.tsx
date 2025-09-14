// Implement the main App component.
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Scoreboard from './components/Scoreboard';
import Display from './components/Display';
import CashDrawer from './components/CashDrawer';
import FeedbackOverlay from './components/FeedbackOverlay';
import DifficultySelector from './components/DifficultySelector';
import ShiftSummary from './components/ShiftSummary';
import { RefreshIcon } from './components/Icons';
import { GameState, Difficulty, TransactionData } from './types';
import { DENOMINATIONS, DIFFICULTY_SETTINGS, CUSTOMERS_PER_SHIFT } from './constants';
import * as Audio from './components/AudioUtils';

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(GameState.NotStarted);
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [amountGiven, setAmountGiven] = useState(0);
    const [runningTotal, setRunningTotal] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [shiftPerformance, setShiftPerformance] = useState<TransactionData[]>([]);
    
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const settingsRef = useRef(DIFFICULTY_SETTINGS[Difficulty.Medium]);

    const formatCurrency = (amountInCents: number) => {
        return (amountInCents / 100).toLocaleString('de-DE', {
            style: 'currency',
            currency: 'EUR',
        });
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };
    
    const generateNewProblem = useCallback((currentDifficulty: Difficulty) => {
        Audio.playCashDrawerOpenSound();
        const settings = DIFFICULTY_SETTINGS[currentDifficulty];
        settingsRef.current = settings;
        const cost = Math.floor(Math.random() * (settings.maxCost - 1)) + 1;
        
        let given = 0;
        const rand = Math.random();

        // Complex Payment Scenarios
        if (rand < 0.15 && cost < 10000) { // Exact Change
            given = cost;
        } else if (rand < 0.30 && cost < 4000) { // Large Bill
            given = Math.random() > 0.5 ? 5000 : 10000;
        } else if (rand < 0.50) { // Smart Payment
            const nextBill = DENOMINATIONS.find(d => d.value > cost && d.type === 'bill')?.value || cost + 500;
            const extra = DENOMINATIONS.filter(d => d.type === 'coin' && d.value < 100)[Math.floor(Math.random() * 6)].value;
            given = nextBill + extra;
        } else { // Standard Payment
            const potentialGivens = DENOMINATIONS.filter(d => d.value > cost).map(d => d.value);
            given = potentialGivens.length > 0 ? potentialGivens[Math.floor(Math.random() * potentialGivens.length)] : Math.ceil(cost / 10000) * 10000 + 10000;
        }

        setTotalCost(cost);
        setAmountGiven(given);
        setRunningTotal(cost);
        setTimeLeft(settings.time);
        
        if (cost === given) { // Handle exact change case immediately
            setGameState(GameState.Correct);
            setScore(prev => prev + 50); // Small bonus for recognition
            setStreak(prev => prev + 1);
            setShiftPerformance(prev => [...prev, { timeTaken: 0, result: 'correct' }]);
        } else {
            setGameState(GameState.Playing);
        }
    }, []);

    const startShift = useCallback((selectedDifficulty: Difficulty) => {
        Audio.initAudio();
        setDifficulty(selectedDifficulty);
        setScore(0);
        setStreak(0);
        setCustomerCount(1);
        setShiftPerformance([]);
        generateNewProblem(selectedDifficulty);
    }, [generateNewProblem]);

    const handleNext = useCallback(() => {
        if (difficulty) {
            if(customerCount >= CUSTOMERS_PER_SHIFT) {
                setGameState(GameState.ShiftOver);
                Audio.playCorrectSound();
            } else {
                setCustomerCount(prev => prev + 1);
                generateNewProblem(difficulty);
            }
        }
    }, [difficulty, generateNewProblem, customerCount]);

    const handleReset = () => {
        stopTimer();
        setGameState(GameState.NotStarted);
        setDifficulty(null);
    };
    
    const endTransaction = (result: 'correct' | 'incorrect' | 'timesup') => {
        stopTimer();
        const timeTaken = settingsRef.current.time - timeLeft;
        setShiftPerformance(prev => [...prev, { timeTaken, result }]);

        if(result === 'correct') {
            const points = 100 + streak * 10 + timeLeft;
            setScore(prev => prev + points);
            setStreak(prev => prev + 1);
            setGameState(GameState.Correct);
            Audio.playCorrectSound();
        } else {
            setStreak(0);
            setGameState(result === 'incorrect' ? GameState.Incorrect : GameState.TimesUp);
            Audio.playIncorrectSound();
        }
    }

    const handleDenominationClick = (value: number) => {
        if (gameState !== GameState.Playing) return;
        
        const denom = DENOMINATIONS.find(d => d.value === value);
        if(denom?.type === 'coin') Audio.playCoinSound(); else Audio.playBillSound();

        const newTotal = runningTotal + value;
        setRunningTotal(newTotal);

        if (newTotal > amountGiven) {
            endTransaction('incorrect');
        } else if (newTotal === amountGiven) {
            endTransaction('correct');
        }
    };

    useEffect(() => {
        if (gameState === GameState.Playing) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        endTransaction('timesup');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            stopTimer();
        }

        return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState]);

    if (gameState === GameState.NotStarted || !difficulty) {
        return (
            <main className="bg-cashier-dark min-h-screen flex items-center justify-center font-sans">
                <DifficultySelector onSelectDifficulty={startShift} />
            </main>
        );
    }
    
    return (
        <main className="bg-cashier-dark min-h-screen flex items-center justify-center font-sans p-2 sm:p-4">
            <div className="relative container mx-auto max-w-2xl">
                {gameState === GameState.ShiftOver && (
                     <ShiftSummary score={score} performanceData={shiftPerformance} onStartNewShift={handleReset} />
                )}
                <FeedbackOverlay gameState={gameState} onNext={handleNext} />

                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Cashier Pro</h1>
                    <button onClick={handleReset} className="text-gray-400 hover:text-white transition-colors">
                        <RefreshIcon className="w-8 h-8"/>
                    </button>
                </div>
                
                <Scoreboard customerCount={customerCount} streak={streak} timeLeft={timeLeft} />
                <Display 
                    totalCost={totalCost}
                    amountGiven={amountGiven}
                    runningTotal={runningTotal}
                    formatCurrency={formatCurrency}
                />
                <CashDrawer 
                    denominations={DENOMINATIONS}
                    onDenominationClick={handleDenominationClick}
                    disabled={gameState !== GameState.Playing}
                />
            </div>
        </main>
    );
};

export default App;