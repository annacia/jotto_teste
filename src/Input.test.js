import React from 'react';
import { shallow, mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';


import Input from './Input';
import hookActions from "./actions/hookActions";

// mock entire module for destructuring useState on import //////
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetCurrentGuess]
// }))

const mockSetSuccess = jest.fn();
const mockSetGiveUp = jest.fn();
const mockSetManualSecretWord = jest.fn();



const setup = ({success, secretWord, setSecretWord, language, setGiveUp, setManualSecretWord}) => {
  success = success || false;
  secretWord = secretWord || 'party';
  setSecretWord = setSecretWord || function () {};
  language = language || 'en';

  return mount(
      <languageContext.Provider value={language}>
        <successContext.SuccessProvider value={[success, mockSetSuccess]}>
          <guessedWordsContext.GuessedWordsProvider>
            <Input
                secretWord={secretWord}
                setSecretWord={setSecretWord}
                setGiveUp={mockSetGiveUp}
                setManualSecretWord={mockSetManualSecretWord}
            />
          </guessedWordsContext.GuessedWordsProvider>
        </successContext.SuccessProvider>
      </languageContext.Provider>
  );
}

describe('languagePicker', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup({ language: 'en'});
    const btn = findByTestAttr(wrapper, 'submit-button');
    expect(btn.text()).toBe('Submit');
  });
  test('correctly renders submit string in emoji', () => {
    const wrapper = setup({language: 'emoji'});
    const btn = findByTestAttr(wrapper, 'submit-button')
    expect(btn.text()).toBe('🚀');
  });
  test('correctly renders submit string in pt-br', () => {
    const wrapper = setup({language: 'ptbr'});
    const btn = findByTestAttr(wrapper, 'submit-button')
    expect(btn.text()).toBe('Enviar');
  });
});

describe('render', () => {
  describe('success is false', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({success:false});
    })
    test('Input renders without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');
      expect(inputComponent.length).toBe(1);
    });
    test('input box displays', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(true);
    });
    test('submit button displays', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(true);
    });
    test('do not render reset btn', () => {
      const resetBtn = findByTestAttr(wrapper, 'render-button');
      expect(resetBtn.exists()).toBe(false);
    })
  });
  describe('success is true', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({success:true});
    })
    test('Input renders without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');
      expect(inputComponent.length).toBe(1);
    });
    test('input box does not display', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(false);
    });
    test('submit button does not display', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(false);
    });
    test('show btn to reset game after successful guess', () => {
      const resetBtn = findByTestAttr(wrapper, 'reset-button');
      expect(resetBtn.exists()).toBe(true);
    });
  });
});

test('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' });
})

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = () => ["", mockSetCurrentGuess];
    wrapper = setup({});
  });
  afterEach(() => {
    React.useState = originalUseState;
  });
  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };

    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('field is cleared upon submit button click', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };

    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
});

test('Reset Game on click reset button', () => {
  const mockGetSecretWord = jest.fn();
  hookActions.getSecretWord = mockGetSecretWord;

  const wrapper = setup({
    success: true,
    secretWord: 'party',
    setSecretWord: jest.fn(),
    setGiveUp: jest.fn()
  });
  const resetBtn = findByTestAttr(wrapper, 'reset-button');
  resetBtn.simulate('click', { preventDefault() {} });
  expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  expect(mockSetSuccess).toHaveBeenCalledWith(false);
  expect(mockSetGiveUp).toHaveBeenCalledWith(false);
  expect(mockSetManualSecretWord).toHaveBeenCalledWith(true);
});
