import React from 'react';
import { mount } from 'enzyme';
import {Provider} from 'react-redux';

import { findByTestAttr, storeFactory, checkProps} from "../test/testUtils";
import Input from "./Input";

//mock entire module for destructuring useState on import
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: (initialState) => [initialState, mockSetCurrentGuess]
// }));

const setup = (initialState={}, secretWord='party') => {
    const store = storeFactory(initialState);
    return mount(<Provider store={store}><Input secretWord={secretWord} /></Provider>);
}

describe('render', () => {
    describe('success is true', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup({success:true});
        });
        test('renders without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });
        test('input box does not show', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.exists()).toBe(false);
        });
        test('submit button does not show', () => {
            const btn = findByTestAttr(wrapper, 'submit-button');
            expect(btn.exists()).toBe(false);
        });
    });
    describe('success is false', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup({success:false});
        });
        test('renders without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });
        test('input box shows', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.exists()).toBe(true);
        });
        test('submit button shows', () => {
            const btn = findByTestAttr(wrapper, 'submit-button');
            expect(btn.exists()).toBe(true);
        });
    });


    test('does not throw warning with expected props', () => {
        checkProps(Input, {secretWord: 'party'});
    });
});

describe('state controlled input field', () => {
    let mockSetCurrentGuess = jest.fn();
    let wrapper;

    beforeEach(() => {
        mockSetCurrentGuess.mockClear();
        React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
        // this function React.useState replaces the function of the component
        wrapper = setup({ success: false });
    });

    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');

        const mockEvent = {target:{value:'train'}};
        inputBox.simulate('change', mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });
});



// import Input, {UnconnectedInput} from "./Input";
//
// const setup = (initialState={}) => {
//     const store = storeFactory(initialState);
//     const wrapper = shallow(<Input store={store}/>).dive().dive();
//     return wrapper;
// }
//
// describe('render', () => {
//     describe('word has not been guessed', () => {
//         let wrapper;
//         beforeEach(() => {
//             const initialState = { success: false};
//             wrapper = setup(initialState);
//         });
//
//         test('renders component without error', () => {
//             const component = findByTestAttr(wrapper, 'component-input');
//             expect(component.length).toBe(1);
//         });
//         test('renders input box', () => {
//             const inputBox = findByTestAttr(wrapper, 'input-box');
//             expect(inputBox.length).toBe(1);
//         });
//         test('renders submit button', () => {
//             const submitButton = findByTestAttr(wrapper, 'submit-button');
//             expect(submitButton.length).toBe(1);
//         });
//     });
//
//     describe('word has been guessed', () => {
//         let wrapper;
//         beforeEach(() => {
//             const initialState = {success: true};
//             wrapper = setup(initialState);
//         });
//
//         test('renders component without error', () => {
//             const component = findByTestAttr(wrapper, "component-input");
//             expect(component.length).toBe(1);
//         });
//         test('does not renders input box', () => {
//             const inputBox = findByTestAttr(wrapper, "input-box");
//             expect(inputBox.length).toBe(0);
//         });
//         test('does not render submit button', () => {
//             const submitButton = findByTestAttr(wrapper, "submit-button");
//             expect(submitButton.length).toBe(0);
//         });
//     });
// });
//
// describe('redux props', () => {
//     test('has success piece of state as prop', () => {
//         const success = true;
//         const wrapper = setup({success});
//         const successProp = wrapper.instance().props.success;
//         expect(successProp).toBe(success);
//     });
//     test('guessWord action creator is a function prop', () => {
//         const wrapper = setup();
//         const guessWordProp = wrapper.instance().props.guessWord;
//         expect(guessWordProp).toBeInstanceOf(Function);
//     })
// });
//
// describe('guessWord action creator call', () => {
//     let guessWordMock;
//     let wrapper;
//     const guessedWord = "train";
//     beforeEach(() => {
//         //set up mock for guessWord
//         guessWordMock = jest.fn();
//         const props = {
//             guessWord: guessWordMock,
//         };
//
//         //set up app component with guessWordMock as the guessWord prop
//         wrapper = shallow(<UnconnectedInput {...props} />);
//
//         //add value to input box
//         wrapper.setState({currentGuess: guessedWord});
//
//         //simulate clicked
//         const submitButton = findByTestAttr(wrapper, 'submit-button');
//         submitButton.simulate('click', { preventDefault() {}});
//     });
//
//     test('calls guessWord when button is clicked', () => {
//         //check to see if mock ran
//         const guessWordCallCount = guessWordMock.mock.calls.length;
//         expect(guessWordCallCount).toBe(1);
//     });
//     test("calls guessWord with input value as argument", () => {
//         const guessedWordArg = guessWordMock.mock.calls[0][0];
//         expect(guessedWordArg).toBe(guessedWord);
//     });
//     test("input box clears on submit", () => {
//        expect(wrapper.state('currentGuess')).toBe('');
//     });
// });
