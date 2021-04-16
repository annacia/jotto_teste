import React from "react";
import {mount} from 'enzyme';
import {Provider} from 'react-redux';

import {findByTestAttr, storeFactory} from "../test/testUtils";
import App from "./App";

//activate global mock to make sure getSecretWord doesnt make network call
jest.mock('./actions');
import {getSecretWord as mockGetSecretWord} from './actions';


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