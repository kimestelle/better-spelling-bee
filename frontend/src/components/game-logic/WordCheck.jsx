import ScoreCounter from './ScoreCounter';
import { useState} from'react';

function WordCheck(word, wordList) {
    const [foundWords, setFoundWords] = useState([]);
    if (word.length === 0) {
        return;
      }
    
      if (word.length <= 3) {
        setStatusMessage('Too Short!');
        setDuckAnimate(2);
        return (0, 'Too Short!');
      }
    
      if (!word.includes(letters[0])) {
        setStatusMessage('Missing center letter');
        resetForm();
        return (0, 'Missing center letter');
      }
    
      if (wordList.includes(word)) {
        if (foundWords.includes(word)) {
          setStatusMessage('Already found!');
          return (0, 'Already found!');
        } else {
          return ScoreCounter(word)
        }
      }
      return (0, 'Not in word list')
}

export default WordCheck;