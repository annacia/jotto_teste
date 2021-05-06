import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

// activate global mock to make sure getSecretWord doesn't make network call
import {getSecretWord as mockGetSecretWord} from "./actions/hookActions";
jest.mock('./actions/hookActions');

/**
 * Setup function for App component
 * @returns {Wrapper}
 */
const setup = () => {
  // use mount, because useEffect not called on `shallow`
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
}

describe.each([
    [null, true, false, false],
    ['party', false, true, false]
])(
    'renders with secretWord as %s', (secretWord, loadingShows, appShows, giveUp) => {
      let wrapper;
      let originalUseReducer;

      beforeEach(() => {
        originalUseReducer = React.useReducer;

        const mockUseReducer = jest.fn()
            .mockReturnValue([
              {secretWord, language: 'en', giveUp},
                jest.fn(),
            ]);
        React.useReducer = mockUseReducer;
        wrapper = setup();
      });
      afterEach(() => {
        React.useReducer = originalUseReducer;
      });

      test('renders loading spinner: ' + loadingShows, () => {
        const spinnerComponent = findByTestAttr(wrapper, 'spinner');
        expect(spinnerComponent.exists()).toBe(loadingShows);
      });
      test('renders app: ' + appShows, () => {
        const appComponent = findByTestAttr(wrapper, 'component-app');
        expect(appComponent.exists()).toBe(appShows);
      });
    }
)

describe('get secret word', () => {
  beforeEach(() => {
    // clear the mock calls from previous tests
    mockGetSecretWord.mockClear();
  })
  test('getSecretWord on app mount', () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  test('getSecretWord does not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // using setProps because wrapper.update() doesn't trigger useEffect
    // https://github.com/enzymejs/enzyme/issues/2254
    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});

describe('user give up', () => {
    test('dont render text when giveup state is false', () => {
        const mockUseReducer = jest.fn()
            .mockReturnValue([
                {secretWord: 'party', language: 'en', giveUp: false},
                jest.fn(),
            ]);
        React.useReducer = mockUseReducer;

        let wrapper = setup();
        let textGiveUp = findByTestAttr(wrapper, "text-secret-word");
        expect(textGiveUp.exists()).toBe(false);
    });
    test('render text when giveup state is true', () => {
        const mockUseReducer = jest.fn()
            .mockReturnValue([
                {secretWord: 'party', language: 'en', giveUp: true},
                jest.fn(),
        ]);
        React.useReducer = mockUseReducer;

        let wrapper = setup();
        let textGiveUp = findByTestAttr(wrapper, "text-secret-word");
        expect(textGiveUp.exists()).toBe(true);
    });
});
