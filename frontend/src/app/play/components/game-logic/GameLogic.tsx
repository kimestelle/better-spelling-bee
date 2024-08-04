import { useState, useEffect } from 'react';
import axios from 'axios'

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

export interface GameData {
  data: string[];
  letters: string[];
  center_letter: string;
  win_threshold: number;
}

export default function useGameLogic(gameData: GameData): GameLogicReturnType {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [points, setPoints] = useState<number>(0);
  const [counterPosition, setCounterPosition] = useState<number>(1);
  const [win, setWin] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [winScreenDisplayed, setWinScreenDisplayed] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get('/api/currentDailyData');
        const { found_words, points } = response.data;
        setFoundWords(found_words.split(','));
        setPoints(points);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

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
    if (word.length === 0) {
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
        if (navigator.onLine) {
          patchFoundWords([word]);
        } else {
          saveLocally([word]);
        }
        setPoints((prevPoints) => prevPoints + score); 
        setStatusMessage(message);
        
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

  const patchFoundWords = async (words: string[]) => {
    try {
      const response = await axios.patch('/api/updateFoundWords', { words });
      console.log('Patched words:', response.data);
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
    } else if (percentage <= 70) {
      setWin(true);
      setComplete(true);
      return 8;
    }
    else {
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
