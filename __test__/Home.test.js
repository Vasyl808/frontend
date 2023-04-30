import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store'; // імпортуємо стор

describe('About component', () => {
  it('renders all child components and images', () => {
    const { getByAltText, getByTestId } = render(
        <Router>
      <Provider store={store}>
        <Home />
      </Provider>
      </Router>
    );
  });
});
