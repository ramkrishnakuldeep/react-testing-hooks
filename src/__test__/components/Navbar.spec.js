import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Navbar from '../../components/Navbar';
import {BrowserRouter} from 'react-router-dom';

afterEach(cleanup);

const withRouter = (component) => {
    return (
        <BrowserRouter> 
            {component}
        </BrowserRouter>
    )
}

test('load Navbar', async () => {
    const {asFragment} = render(withRouter(<Navbar />));
    expect(asFragment()).toMatchSnapshot();
});
