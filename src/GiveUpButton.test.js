import React from 'react';
import {mount} from "enzyme";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import Input from "./Input";
import GiveUpButton from "./GiveUpButton";
import {findByTestAttr} from "../test/testUtils";

const mockSetGiveUp = jest.fn();
const mockSetSuccess = jest.fn();

const setup = ({success, giveUp, language}) => {
    success = success || false;
    language = language || 'en';
    giveUp = giveUp || false;

    return mount(
        <languageContext.Provider value={language}>
            <successContext.SuccessProvider value={[success, mockSetSuccess]}>
                <guessedWordsContext.GuessedWordsProvider>
                    <GiveUpButton setGiveUp={mockSetGiveUp} giveUp={giveUp}/>
                </guessedWordsContext.GuessedWordsProvider>
            </successContext.SuccessProvider>
        </languageContext.Provider>
    );
}

test('render without error', () => {
    const wrapper = setup({});

    const component = findByTestAttr(wrapper, 'component-giveup-button');
    expect(component.exists()).toBe(true);
});

test('click give up button: setGiveUp to true and SetSuccess to true',
    () => {
        const wrapper = setup({});
        const btn = findByTestAttr(wrapper, 'giveup-btn');

        btn.simulate('click', { preventDefault() {} });

        expect(mockSetGiveUp).toHaveBeenCalledWith(true);
        expect(mockSetSuccess).toHaveBeenCalledWith(true);
});

test('Displays "Better luck next time" text when success and GiveUp is true', () => {
    let wrapper = setup({success: true, giveUp: true});
    let luckText = findByTestAttr(wrapper, 'luck-text');

    expect(luckText.text()).toBe("Better luck next time");
})

describe.each([
    [true, false],
    [false, true],
    [false, false]
])('"Better luck next time" text', (success, giveUp) => {
    let wrapper;
    let luckText;
    beforeEach(() => {
        wrapper = setup({success, giveUp});
        luckText = findByTestAttr(wrapper, 'luck-text');
    });
    test('dont display when success is '+success+' and giveUp is '+giveUp, () => {
        expect(luckText.exists()).toBe(false);
    });
})
