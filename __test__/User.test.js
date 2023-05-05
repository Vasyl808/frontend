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
      fireEvent.click(screen.getByTestId('open_btn'));
      fireEvent.click(screen.getByTestId('close_btn'));
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
      fireEvent.click(screen.getByTestId('open_btn'));
      const mockData = {
        id_user: 91,
        userstatus: 'user',
        username: 'testtest',
        password: 'testtest',
      };
      global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve(
                  mockData
              ),
            })
          );
      const username = screen.getByTestId('username');
      const password = screen.getByTestId('password');
      const loginBtn = screen.getByTestId('login_btn');
      fireEvent.change(username, { target: { value: 'test_user' } });
      fireEvent.change(password, { target: { value: 'test_password' } });
      fireEvent.click(loginBtn);

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
      fireEvent.click(screen.getByTestId('delete'));
      const mockData = {
        id_user: 91,
        userstatus: 'user',
        username: 'testtest',
        password: 'testtest',
      };
      global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve(
                  mockData
              ),
            })
          );
      const username = screen.getByTestId('username');
      const password = screen.getByTestId('password');
      const loginBtn = screen.getByTestId('login_btn');
      fireEvent.change(username, { target: { value: 'test_user' } });
      fireEvent.change(password, { target: { value: 'test_password' } });
      fireEvent.click(loginBtn);

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
      fireEvent.click(screen.getByTestId('delete'));
      const mockData = {
        id_user: 91,
        userstatus: 'user',
        username: 'testtest',
        password: 'testtest',
      };
      window.localStorage.setItem("token", btoa(`${"testtest"}:${"testtest"}`))
      global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve(
                  mockData
              ),
            })
          );
      const username = screen.getByTestId('username');
      const password = screen.getByTestId('password');
      const loginBtn = screen.getByTestId('login_btn');
      fireEvent.change(username, { target: { value: 'testtest' } });
      fireEvent.change(password, { target: { value: 'testtest' } });
      fireEvent.click(loginBtn);

  });

});
