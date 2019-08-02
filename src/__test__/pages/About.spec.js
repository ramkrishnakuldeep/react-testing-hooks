import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import About from '../../pages/About';

afterEach(cleanup);

test('load About', async () => {
    const {asFragment} = render(<About />);
    expect(asFragment()).toMatchSnapshot()
});

test('About component test', () => {
    const {getByText, getByTestId} = render(<About />);
    expect(getByText('About')).toBeInTheDocument();
    expect(getByTestId('about')).toHaveTextContent('About');
})