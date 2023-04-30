import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '../src/pages/About';
import { Provider } from 'react-redux';
import store from '../src/redux/store'; // імпортуємо стор

describe('About component', () => {
  it('renders all child components and images', () => {
    const { getByAltText, getByTestId } = render(
      <Provider store={store}>
        <About />
      </Provider>
    );

    // check that AboutGoods component is rendered
    expect(getByTestId('about-goods')).toBeInTheDocument();

    // check that Product component is rendered
    expect(getByTestId('product')).toBeInTheDocument();

    // check that cup image is rendered
    expect(getByAltText('cup of coffee')).toBeInTheDocument();
  });
});
