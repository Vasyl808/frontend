import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import User from '../src/pages/User';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Checkout', () => {
  test('renders User and delete component',async () => {
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
    
    const { findByText } = await act(async () => render(<Router> <User /> </Router>));
        //expect(getByTestId('list_orders')).toBeInTheDocument();
      // Перевірка наявності елементів у списку замовлень
      expect(findByText('user1'));
      const btn = screen.getByTestId('delete');
      fireEvent.click(btn);

  });

  test('renders logout component',async () => {
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
    
    const { findByText } = await act(async () => render(<Router> <User /> </Router>));
        //expect(getByTestId('list_orders')).toBeInTheDocument();
      // Перевірка наявності елементів у списку замовлень
      expect(findByText('user1'));
      const btn = screen.getByTestId('logout');
      fireEvent.click(btn);

  });

});
