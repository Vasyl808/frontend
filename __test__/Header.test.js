import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/components/Header/Header';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store'; // імпортуємо стор

describe('Header component', () => {
  it('should render without errors', () => {
    localStorage.setItem("token", "testtoken")
    render(
      <MemoryRouter>
        <Provider store={store}>
        <Header />
        </Provider>
      </MemoryRouter>
    );
  });

  it('should render without errors', () => {
    localStorage.setItem('cartItems', JSON.stringify([{id: 1, name: "Test Item 1", price: 10.99, quantity: 2}, {id: 2, name: "Test Item 2", price: 7.99, quantity: 3}]));
    render(
      <MemoryRouter>
        <Provider store={store}>
        <Header />
        </Provider>
      </MemoryRouter>
    );
  });
});
