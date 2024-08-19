import { useState, useEffect } from 'react';

export interface GameLogicReturnType {
  handleSubmit: (word: string) => SubmitResult | undefined;
  statusMessage: string;
  foundWords: string[];
  points: number;
  counterPosition: number;
  win: boolean;
  complete: boolean;
  winScreenDisplayed: boolean;
  setWinScreenDisplayed: (displayed: boolean) => void;
}

interface SubmitResult {
  message: string;
  animation: number;
  reset: boolean;
  sink: boolean;
}

export default function useGameLogic(
  updateFoundWords: (words: string[], score: number, daily: boolean) => Promise<void>, 
  gameData: any,
  initScore: number,
  initWords: string[],
  daily: boolean,
): GameLogicReturnType {
  const [foundWords, setFoundWords] = useState<string[]>(initWords || []);
  const [points, setPoints] = useState<number>(initScore || 0);
  
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [counterPosition, setCounterPosition] = useState<number>(1);
  const [win, setWin] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [winScreenDisplayed, setWinScreenDisplayed] = useState<boolean>(false);

  useEffect(() => {
    const storedUpdates = JSON.parse(localStorage.getItem('gameUpdates') || '[]');
    if (storedUpdates.length > 0) {
      storedUpdates.forEach((update: any) => {
        setPoints((prevPoints) => prevPoints + update.score);
        setFoundWords((prevWords) => [...prevWords, ...update.words]);
      });
      localStorage.removeItem('gameUpdates');
    }
  }, []);

  const handleSubmit = (word: string): SubmitResult | undefined => {
    if (!gameData || word.length === 0) {
      return;
    }

    if (word.length <= 3) {
      setStatusMessage('Too Short!');
      return { message: 'Too Short!', animation: 2, reset: false, sink: false };
    }

    if (!word.includes(gameData.center_letter)) {
      setStatusMessage('Missing center letter');
      return { message: 'Missing center letter', animation: 2, reset: true, sink: true };
    }

    if (gameData.data.includes(word)) {
      if (foundWords.includes(word)) {
        setStatusMessage('Already found!');
        return { message: 'Already found!', animation: 2, reset: true, sink: true };
      } else {
        setFoundWords((prevWords) => [...prevWords, word]);
        const { score, message } = ScoreCounter.calculateScore(word);
        setPoints((prevPoints) => prevPoints + score); 
        setStatusMessage(message);

        const newFoundWords = [...foundWords, word];
        const newScore = points + score
        if (navigator.onLine) {
          patchFoundWords(newFoundWords, newScore);
        } else {
          saveLocally(newFoundWords, newScore);
        }
        
        return { message, animation: 1, reset: true, sink: false };
      }
    }

    setStatusMessage('Not in word list');
    return { message: 'Not in word list', animation: 2, reset: true, sink: true };
  };

  const saveLocally = (words: string[]) => {
    const existingUpdates = JSON.parse(localStorage.getItem('gameUpdates') || '[]');
    existingUpdates.push({ words });
    localStorage.setItem('gameUpdates', JSON.stringify(existingUpdates));
  };

  const patchFoundWords = async (words: string[], score: number) => {
    try {
      await updateFoundWords(words, score, daily);
      console.log('Patched words:', words, score);
    } catch (error) {
      console.error('Failed to patch found words:', error);
      saveLocally(words);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusMessage('');
    }, 1500);
    return () => clearTimeout(timer);
  }, [statusMessage]);

  useEffect(() => {
    const newPosition = getCounterPosition();
    setCounterPosition(newPosition);
  }, [points, gameData]);

  const getCounterPosition = () => {
    if (!gameData) return 0;
    const percentage = (points / gameData.win_threshold) * 100;

    if (gameData.win_threshold <= 0) {
      throw new Error('Win threshold must be greater than 0');
    }
    if (percentage <= 2) {
      return 1;
    } else if (percentage <= 5) {
      return 2;
    } else if (percentage <= 8) {
      return 3;
    } else if (percentage <= 15) {
      return 4;
    } else if (percentage <= 25) {
      return 5;
    } else if (percentage <= 40) {
      return 6;
    } else if (percentage <= 50) {
      return 7;
    } else if (percentage <= 70) {
      setWin(true);
      return 8;
    } else if (percentage > 70) {
      setWin(true);
      setComplete(true);
      return 8;
    } else {
      return 0;
    }
  };

  return { handleSubmit, statusMessage, foundWords, points, counterPosition, win, complete, winScreenDisplayed, setWinScreenDisplayed };
}

class ScoreCounter {
  static calculateScore(word: string) {
    if (word.length === 4) {
      return { score: 1, message: 'good!' };
    } else if (word.length === 5) {
      return { score: 5, message: 'great!' };
    } else if (word.length >= 7 && this.isPangram(word)) {
      return { score: 14, message: 'PANGRAM!' };
    } else {
      return { score: word.length, message: 'quack-tastic!' };
    }
  }

  static isPangram(word: string) {
    const uniqueLetters = new Set(word);
    return uniqueLetters.size === 7;
  }
}
