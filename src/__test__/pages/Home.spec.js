import React from 'react';
import { render, cleanup, act, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import axiosMock from 'axios';
import Home from '../../pages/Home';
import Navbar from '../../components/Navbar'
import posts from '../../__mocks__/posts';


describe('Home component ', () => {
    afterEach(cleanup);

    it('render without crash', async() => {
        axiosMock.get.mockResolvedValueOnce({
            data: posts
        });
        let wrapper;
        act(() => {
            wrapper = render(<Home />);
        });
        await waitForElement(() => wrapper.asFragment());
        expect(wrapper.asFragment()).toMatchSnapshot();
    })
})
