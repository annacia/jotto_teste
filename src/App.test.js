import React from "react";
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import {findByTestAttr, storeFactory} from "../test/testUtils";
import App from "./App";


//activate global mock to make sure getSecretWord doesnt make network call
import {getSecretWord as mockGetSecretWord} from './actions';
jest.mock('./actions');

const setup = () => {
    const store = storeFactory();
    //useEffect not called on shallow
    return mount(<Provider store={store}><App/></Provider>);
}

test('renders without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent).toHaveLength(1);
});

describe('getSecretWord', () => {
    beforeEach(() => {
        //clear the mock calls from previous tests
        mockGetSecretWord.mockClear();
    });
   test('getSecretWord on app mount', () => {
        const wrapper = setup();
        expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
   });
   test('getSecretWord does not run on app update', () => {
        const wrapper = setup();
        mockGetSecretWord.mockClear();

        //using setProps because wrapper.update() doesnt trigger useEffect
       wrapper.setProps();

       expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
   });
});

// import React from "react";
// import {shallow} from "enzyme";
//
// import { storeFactory } from "../test/testUtils";
// import App, {UnconnectedApp} from "./App";
//
// const setup = (state = {}) => {
//     const store = storeFactory(state);
//     const wrapper = shallow(<App store={store} />).dive().dive();
//     return wrapper;
// }
//
// describe('redux properties', () => {
//     test('has access to success state', () => {
//         const success = true;
//         const wrapper = setup({success});
//         const successProp = wrapper.instance().props.success;
//         expect(successProp).toBe(success);
//     });
//
//     test('has access to secretWord state', () => {
//         const secretWord = 'party';
//         const wrapper = setup({secretWord});
//         const secretWordProp = wrapper.instance().props.secretWord;
//         expect(secretWordProp).toBe(secretWord);
//     });
//
//     test('has access to guessedWords state', () => {
//         const guessedWords = [ { guessedWord: 'train', letterMatchCount: 3}];
//         const wrapper = setup({guessedWords});
//         const guessedWordsProp = wrapper.instance().props.guessedWords;
//         expect(guessedWordsProp).toEqual(guessedWords);
//     });
//
//     test('getSecretWord action creator is a function on the props', () => {
//         const wrapper = setup();
//         const getSecretWordProp = wrapper.instance().props.getSecretWord;
//         expect(getSecretWordProp).toBeInstanceOf(Function);
//     });
// });
//
// test('getSecretWord runs on App mount', () => {
//     const getSecretWordMock = jest.fn();
//
//     const props = {
//         getSecretWord: getSecretWordMock,
//         success: false,
//         guessedWords: [],
//     }
//     //set up app with getSecretWordMock as the getSecretWord prop
//     const wrapper = shallow(<UnconnectedApp {...props} />);
//
//     //run lifecycle method
//     wrapper.instance().componentDidMount();
//
//     //check to see if mock ran
//     const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
//
//     expect(getSecretWordCallCount).toBe(1);
//
// });