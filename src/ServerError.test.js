import React from 'react';
import { mount } from 'enzyme';
import ServerError from './ServerError';
import {findByTestAttr} from "../test/testUtils";

const setup = () => {
    return mount(
        <ServerError />
    );
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-server-error');
    expect(component.length).toBe(1);
});