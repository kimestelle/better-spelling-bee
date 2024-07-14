import React from 'react';

interface WordCheckProps {
  word: string;
  checkWord: (word: string) => boolean;
}

const WordCheck: React.FC<WordCheckProps> = ({ word, checkWord }) => {
  const isValid = checkWord(word);
  return (
    <div className="word-check flex flex-col items-center justify-center h-full">
      <div className={`word-status ${isValid ? 'text-green-500' : 'text-red-500'}`}>{isValid ? 'Valid' : 'Invalid'}</div>
    </div>
  );
};

export default WordCheck;
