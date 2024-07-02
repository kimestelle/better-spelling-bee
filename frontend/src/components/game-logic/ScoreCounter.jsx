class ScoreCounter {
    static calculateScore(word) {
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
  
    static isPangram(word) {
      const counter = {};
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
  
  export default ScoreCounter;