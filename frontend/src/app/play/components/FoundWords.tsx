import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './FoundWords.css'

interface FoundWordsProps {
  foundWords: string[];
}

const FoundWords: React.FC<FoundWordsProps> = ({ foundWords }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sortedWords = [...foundWords].sort();
  foundWords = [...foundWords]

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

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDesktop]);

  return (
    <div className='w-[50svh] h-[10svh]'>
      <div className="dropdown">
        <img src="/game-assets/arrow.svg" className={`dropdown-toggle ${isOpen ? 'up' : 'down'}`} onClick={toggleMenu} />
        {isOpen || isDesktop ? (
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
        {(isOpen || isDesktop) && (
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
    </div>
  );
};

export default FoundWords;
