import React from 'react';
import {mount} from "enzyme";

import languageContext from "./contexts/languageContext";
import ManualSecretWord from "./ManualSecretWord";
import {checkProps, findByTestAttr} from "../test/testUtils";

const mockSetSecretWord = jest.fn();
const mockSetManualSecretWord = jest.fn();

const setup = ({language}) => {
    language = language || 'en';

    return mount(
        <languageContext.Provider value={language}>
            <ManualSecretWord setManualSecretWord={mockSetManualSecretWord} setSecretWord={mockSetSecretWord}/>
        </languageContext.Provider>
    );
}

test('does not throw warning with expected props', () => {
    checkProps(ManualSecretWord, {
        setManualSecretWord: function () {},
        setSecretWord: function () {}
    });
});

test('renders without error', () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, "component-manual-secret-word");

    expect(component.exists()).toBe(true);
});

test('input manual secret word', () => {
    const wrapper = setup({});
    const input = findByTestAttr(wrapper, "input-secret-word");
    const btn = findByTestAttr(wrapper, "button-manual-secret-word");

    const mockEvent = { target: { value: 'train' } };
    input.simulate("change", mockEvent);
    btn.simulate('click')

    expect(mockSetSecretWord).toHaveBeenCalledWith('train');
    expect(mockSetManualSecretWord).toHaveBeenCalledWith(true);
});

test('dont input manual secret word', () => {
    const wrapper = setup({});
    const btn = findByTestAttr(wrapper, "button-random-secret-word");

    btn.simulate('click');

    expect(mockSetManualSecretWord).toHaveBeenCalledWith(false);
});

