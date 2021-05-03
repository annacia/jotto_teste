const languageStrings = {
    en: {
        congrats: 'Congratulations! You guessed the word!',
        submit: 'Submit',
        guessPrompt: 'Try to guess the secret word!',
        guessInputPlaceholder: 'enter guess',
        guessColumnHeader: 'Guessed Words',
        guessedWords: 'Guesses',
        matchingLettersColumnHeader: 'Matching Letters',
        guessNumberHeader: 'Guess Number',
        numberOfGuesses: 'Total Guesses: '
    },
    emoji: {
        congrats: '🎯🎉',
        submit: '🚀',
        guessPrompt: '🤔🤫🔤',
        guessInputPlaceholder: '⌨️🤔',
        guessedWords: '🤷‍🔤',
        guessColumnHeader: '🤷‍',
        matchingLettersColumnHeader: '✅',
        guessNumberHeader: '🆔',
        numberOfGuesses: '🔠 '
    },
    ptbr: {
        congrats: 'Parabéns! Você descobriu a palavra!',
        submit: 'Enviar',
        guessPrompt: 'Tente adivinhar a palavra!',
        guessInputPlaceholder: 'Digitar',
        guessedWords: 'Palavras',
        guessColumnHeader: 'Palpites',
        matchingLettersColumnHeader: 'Letras em comum',
        guessNumberHeader: 'Número Palpite',
        numberOfGuesses: 'Total Palpites: '
    }
}

function getStringByLanguage(languageCode, stringKey, strings=languageStrings) {
    if (!strings[languageCode] || !strings[languageCode][stringKey]) {
        console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);

        // fall back to english
        return strings.en[stringKey];
    }

    return strings[languageCode][stringKey];
}

// for future mocking
export default {
    getStringByLanguage,
}