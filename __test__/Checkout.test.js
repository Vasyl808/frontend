import React from 'react';
import { render, fireEvent, waitFor, screen, act, getByTestId } from '@testing-library/react';
import Checkout from '../src/pages/Checkout';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';


test('renders UpdateUser component', async () => {
    const user_data = {
        age: 35,
        email: "alex@gmail.com",
        first_name: "testtest",
        id: 91,
        last_name: "testtest",
        phone_number: "0961491914",
        username: "testtest",
        userstatus: "user"
      };
      global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(
                {"user": user_data}
            ),
          })
        );
    
    const { findByText, findByTestId } = await act(async () => render(<Router> <Checkout /> </Router>));
        //expect(getByTestId('list_orders')).toBeInTheDocument();
      // Перевірка наявності елементів у списку замовлень
      expect(findByText('user1'));
      //const btn = findByTestId('Place_order');
      //fireEvent.click(btn);
    //const btn = screen.getByTestId('update')
    //fireEvent.click(btn);
});

  test('the loadTotal function renders the total count and price correctly',async () => {
    localStorage.setItem('cartItems', JSON.stringify([{id: 1, name: "Test Item 1", price: 10.99, quantity: 2}, {id: 2, name: "Test Item 2", price: 7.99, quantity: 3}]));
    const { findByText, findByTestId } = await act(async () => render(<Router> <Checkout /> </Router>));
    const totalQty = screen.getByText(/Total Qty:/i);
    const subtotal = screen.getByText(/Subtotal:/i);
    const totalCost = screen.getByText(/Total cost:/i);
    const placeOrderButton = screen.getByTestId("buy");
    //const startMock = jest.fn();
    //Checkout.prototype.start = startMock;
    fireEvent.click(placeOrderButton);
  });