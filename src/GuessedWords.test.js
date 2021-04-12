import React from 'react';
import { mount } from 'enzyme';

import App from "./App";
import {findByTestAttr} from "../test/testUtils";

const setup = (state={}) => {
    //@todo: apply state
    const wrapper = mount(<App/>);

    //add value to input box
    const inputBox = findByTestAttr(wrapper, 'input-box');
    inputBox.simulate('change', {target:{value:'train'}});

    //simulate click on submit button
    const submitBtn = findByTestAttr(wrapper, 'submit-button');
    submitBtn.simulate('click', {preventDefault(){}});

    return wrapper;
}

describe.skip('no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: []
        });
    });

    test('creates GuessedWords table with one row', () => {
       const guessedWordRows = findByTestAttr(wrapper, 'guessed-word');
       expect(guessedWordRows).toHaveLength(1);
    });

});

describe.skip('some words has been guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{guessedWord: 'agile', letterMatchCount: 1}]
        });
    });
    test('add rows to guessedWords table', () => {
       const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(2);
    });

});

describe.skip('guess secret word', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{guessedWord:'agile', letterMatchCount: 1}]
        });
        //add value to input box
        const inputBox = findByTestAttr(wrapper, 'input-box');
        const mockEvent = {target:{value: 'party'}};
        inputBox.simulate('change', mockEvent);

        //simulate click on submit button
        const submitBtn = findByTestAttr(wrapper, 'submit-button');
        submitBtn.simulate('click', {preventDefault() {}});
    });
    test('adds row to guessedWords table', () => {
        const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(3);
    });
    test('displays congrats component', () => {
        const congrats = findByTestAttr(wrapper, 'component-congrats');
        expect(congrats.text().length).toBeGreaterThan(0);
    });
    test('does not display input component contents', () => {
       const inputBox = findByTestAttr(wrapper, 'input-box');
       expect(inputBox.exists()).toBe(false);

       const submitBtn = findByTestAttr(wrapper, 'submit-button');
       expect(submitBtn.exists()).toBe(false);
    });
});


// import React from "react";
// import { shallow } from 'enzyme';
// import { findByTestAttr, checkProps } from "../test/testUtils";
// import GuessedWords from "./GuessedWords";
//
// const defaultProps = {
//     guessedWords: [{guessedWord: 'train', letterMatchCount: 3 }]
// };
//
// const setup = (props={}) => {
//     const setupProps = {...defaultProps, ...props};
//     return shallow(<GuessedWords {...setupProps}/>);
// };
//
// test ('does not throw a warning with expected props', () => {
//     checkProps(GuessedWords, defaultProps);
// });
//
// describe('if there are no words guessed', () => {
//     let wrapper;
//     beforeEach(() => {
//         wrapper = setup({ guessedWords: []});
//     });
//
//     test('renders without error', () => {
//         const component = findByTestAttr(wrapper, 'component-guessed-words');
//         expect(component.length).toBe(1);
//     })
//     test('renders instructions to a guess word', () => {
//         const instructions = findByTestAttr(wrapper, 'guess-instructions');
//         expect(instructions.text().length).not.toBe(0);
//     })
// });
//
// describe('if there are words guessed', () => {
//     const guessedWords = [
//         {guessedWord: 'train', letterMatchCount: 3},
//         {guessedWord: 'agile', letterMatchCount: 1},
//         {guessedWord: 'party', letterMatchCount: 5},
//     ]
//     let wrapper;
//     beforeEach(() => {
//         wrapper = setup({ guessedWords })
//     })
//     test('renders without error', () => {
//         const component = findByTestAttr(wrapper, 'component-guessed-words');
//         expect(component.length).toBe(1);
//     });
//     test('renders guessed words section', () => {
//         const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
//         expect(guessedWordsNode.length).toBe(1);
//     });
//     test('display correct number of guessed words', () => {
//         const guessedWordsNode = findByTestAttr(wrapper, 'guessed-word');
//         expect(guessedWordsNode.length).toBe(guessedWords.length);
//     });
// });