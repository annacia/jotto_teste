const languageStrings = {
    en: {
        congrats: 'Congratulations! You guessed the word!',
        submit: 'Submit',
        guessPrompt: 'Try to guess the secret word!',
        guessInputPlaceholder: 'enter guess',
        guessColumnHeader: 'Guessed Words',
        guessedWords: 'Guesses',
        matchingLettersColumnHeader: 'Matching Letters',
    },
    emoji: {
        congrats: '🎯🎉',
        submit: '🚀',
        guessPrompt: '🤔🤫🔤',
        guessInputPlaceholder: '⌨️🤔',
        guessedWords: '🤷‍🔤',
        guessColumnHeader: '🤷‍',
        matchingLettersColumnHeader: '✅',
    },
    br: {
        congrats: 'Parabéns! Você descobriu a palavra!',
        submit: 'Enviar',
        guessPrompt: 'Tente adivinhar a palavra!',
        guessInputPlaceholder: 'Digitar',
        guessedWords: 'Palavras',
        guessColumnHeader: 'Palpites',
        matchingLettersColumnHeader: 'Letras em comum',
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