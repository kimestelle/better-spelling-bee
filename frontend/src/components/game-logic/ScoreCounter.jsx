const ScoreCounter = (word, letters) => {
    if (word.length === 4) {
        return (1, 'good!')
    } else if (word.length === 5) {
        return (5, 'great!')
    } else if (word.length === 7) {
        if (isPangram(word)) {
            return (14, 'PANGRAM!')
        }
        return (7, 'amazing!')
    } else {
        return (word.length, 'quack-tastic!')
    }
}

    const isPangram = (word) => {
        const counter = []
        for (c in word.toCharArray()) {
            if (counter.includes(c)) {
                return false;
            } else {
                counter.push(c);
            }
        }
    }

export default ScoreCounter;