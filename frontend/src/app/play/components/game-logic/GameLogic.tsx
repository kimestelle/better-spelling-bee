import { useState, useEffect } from 'react';

const wordList = [
  'ACED', 'AGED', 'FADED', 'FADE', 'BADE', 'FACE', 'FACED', 'BAGGED', 'DABBED', 'DEAF', 'CAGE', 'CAGED', 'GAFFED'
];

export interface GameLogicReturnType {
  handleSubmit: (word: string, letters: string[]) => SubmitResult | undefined;
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

export default function useGameLogic(): GameLogicReturnType {
  const [foundWords, setFoundWords] = useState<string[]>([]);

  const [statusMessage, setStatusMessage] = useState<string>('');

  const [points, setPoints] = useState<number>(0);
  const [winThreshold, setWinThreshold] = useState<number>(10);
  const [counterPosition, setCounterPosition] = useState<number>(1);

  const [win, setWin] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [winScreenDisplayed, setWinScreenDisplayed] = useState<boolean>(false);

  const handleSubmit = (word: string, letters: string[]): SubmitResult | undefined => {
    console.log(foundWords)
    if (word.length === 0) {
      return;
    }

    if (word.length <= 3) {
      setStatusMessage('Too Short!');
      return { message: 'Too Short!', animation: 2, reset: false, sink: false };
    }

    if (!word.includes(letters[0])) {
      setStatusMessage('Missing center letter');
      return { message: 'Missing center letter', animation: 2, reset: true, sink: true };
    }

    if (wordList.includes(word)) {
      if (foundWords.includes(word)) {
        setStatusMessage('Already found!');
        return { message: 'Already found!', animation: 2, reset: true, sink: true };
      } else {
        setFoundWords((prevWords) => [...prevWords, word]);
        const { score, message } = ScoreCounter.calculateScore(word);
        setPoints((prevPoints) => prevPoints + score); 
        setStatusMessage(message);
        return { message, animation: 1, reset: true, sink: false };
      }
    }

    setStatusMessage('Not in word list');
    return { message: 'Not in word list', animation: 2, reset: true, sink: true };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusMessage('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [statusMessage]);

  useEffect(() => {
    const newPosition = getCounterPosition();
    setCounterPosition(newPosition);
  }, [points, winThreshold]);

  const getCounterPosition = () => {
    const percentage = (points / winThreshold) * 100;

    if (winThreshold <= 0) {
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
  }
  

  return { handleSubmit, statusMessage, foundWords, points, counterPosition, win, complete, winScreenDisplayed, setWinScreenDisplayed };
}

class ScoreCounter {
  static calculateScore(word: string) {
    if (word.length === 4) {
      return { score: 1, message: 'good!' };
    } else if (word.length === 5) {
      return { score: 5, message: 'great!' };
    } else if (word.length === 7 && this.isPangram(word)) {
      return { score: 14, message: 'PANGRAM!' };
    } else {
      return { score: word.length, message: 'quack-tastic!' };
    }
  }

  static isPangram(word: string) {
    const counter: Record<string, boolean> = {};
    for (const char of word) {
      if (counter[char]) {
        return false;
      } else {
        counter[char] = true;
      }
    }
    return Object.keys(counter).length === 7;
  }
}
