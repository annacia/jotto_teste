import stringsModule from './strings';
const {getStringByLanguage} = stringsModule;

const strings = {
    en: {submit: 'submit'},
    emoji: {submit: '🚀'},
    mermish: {}
}

describe('language string testing', () => {
    const mockWarn = jest.fn();
    let originalWarn;
    //this variable makes possible to see warns out of this describe
    //because the original warn is restored after mock in the test

    beforeEach(() => {
        originalWarn = console.warn;
        console.warn = mockWarn;
    });

    afterEach(() => {
        console.warn = originalWarn;
    })

    test('returns correct submit string for english', () => {
        const string = getStringByLanguage('en', 'submit', strings);
        expect(string).toBe('submit');
        expect(mockWarn).not.toHaveBeenCalled();
    });
    test('returns the correct submit string for emoji', () => {
        const string = getStringByLanguage('emoji', 'submit', strings);
        expect(string).toBe('🚀');
        expect(mockWarn).not.toHaveBeenCalled();
    });
    test('returns english submit string when language does not exist', () => {
        const string = getStringByLanguage('notALanguage', 'submit', strings);
        expect(string).toBe('submit');
        expect(mockWarn).toHaveBeenCalledWith("Could not get string [submit] for [notALanguage]");
    });
    test('returns english submit string when submit key does not exist for language', () => {
        const string = getStringByLanguage('mermish', 'submit', strings);
        expect(string).toBe('submit');
        expect(mockWarn).toHaveBeenCalledWith("Could not get string [submit] for [mermish]");
    });
});
