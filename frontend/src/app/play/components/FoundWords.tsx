import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameLogicContext } from './game-logic/GameLogicProvider';

import './FoundWords.css';

const FoundWords: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { foundWords } = useGameLogicContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sortedWords = [...foundWords].sort();

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.2,
        ease: [0.12, 0, 0.39, 0],
      },
    },
  };

  return (
    <>
      <div className="dropdown">
        <img src="/game-assets/arrow.svg" className={`dropdown-toggle ${isOpen ? 'up' : 'down'}`} onClick={toggleMenu} />
        {isOpen ? (
          <p className="words-found">
            Words you found:
          </p>
        ) : (
          <ul className="dropdown-list closed">
            {foundWords.map((word, index) => (
              <li key={index}>{word.toLowerCase()}</li>
            ))}
          </ul>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="dropdown container"
          >
            <ul className="dropdown-list open">
              {sortedWords.map((word, index) => (
                <li key={index}>{word.toLowerCase()}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FoundWords;
