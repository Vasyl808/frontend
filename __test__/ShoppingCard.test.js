import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ShopingCard from '../src/pages/ShopingCard';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ShopingCard', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      coffees: {
        totalAmount: 10.0,
        cartItems: [
          {
            id: 1,
            imgUrl: 'https://example.com/image.png',
            productName: 'Coffee',
            price: 5.0,
            quantity: 2
          }
        ]
      }
    });

    component = render(
        <Router>
      <Provider store={store}>
        <ShopingCard />
      </Provider>
      </Router>
    );
  });

  it('should render a title', () => {
    const titleElement = screen.getByText('Shoping Card');
    expect(titleElement).toBeInTheDocument();
  });

  it('should allow adding items to the cart', () => {
    const addButton = screen.getByTestId('count_add_btn');
    fireEvent.click(addButton);
    expect(addButton).toBeInTheDocument();
  });

  it('should allow removing items from the cart', () => {
    const minusButton = screen.getByTestId('count_minus_btn');
    fireEvent.click(minusButton);
    expect(minusButton).toBeInTheDocument();

  });

  it('should allow deleting items from the cart', () => {
    const imageElement = screen.getByTestId('delete_medicine_btn');
    fireEvent.click(imageElement);
    expect(imageElement).toBeInTheDocument();

  });

  it('should allow checking out', () => {
    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);
    expect(checkoutButton).toBeInTheDocument();

  });
});
