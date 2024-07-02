import { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/FoundWords.css';
import arrow from '../../assets/arrow.svg';
import { AnimatePresence, motion } from "framer-motion";

const FoundWords = ({ foundWords }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sortedWords = [...foundWords].sort();

  // settings for dropdown animation
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
    }
  };

  return (
    <>
    <div className="dropdown">
    <img src={arrow} className={`dropdown-toggle ${isOpen ? 'up' : 'down'}`} onClick={toggleMenu}/>
        {isOpen ? 
            <p className='words-found'>
                Words you found:
            </p>
        :
        <ul className='dropdown-list closed' >
            {foundWords.map((word, index) => (
            <li key={index}>{word.toLowerCase()}</li>
            ))}
        </ul>}
    </div>
    <AnimatePresence>
    {isOpen && (
        <motion.div 
        variants={menuVars}
        initial="initial"
        animate="animate"
        exit="exit"
        className="dropdown container">
    
        <ul className='dropdown-list open' >
        {sortedWords.map((word , index) => (
            <li key={index}>{word.toLowerCase()}</li>
        ))}
        </ul>
    </motion.div>
    )}
    </AnimatePresence>
    </>
  );
}

FoundWords.propTypes = {
  foundWords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FoundWords;
