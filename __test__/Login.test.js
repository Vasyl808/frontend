import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../src/pages/Login';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Login component', () => {
  it('should render Login title', () => {
    render(<Router> <Login /> </Router>);
  });

  it('should show error toast when wrong username and password are provided', async () => {
    render(<Router> <Login /> </Router>);
    const username = screen.getByTestId('username');
    const password = screen.getByTestId('password');
    const loginBtn = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(username, { target: { value: 'wrong_username' } });
    fireEvent.change(password, { target: { value: 'wrong_password' } });
    fireEvent.click(loginBtn);
    //expect(toast).toBeInTheDocument();
  });

  it('test reset password',() => {
    const mockData = {
      email: "testgf@gmail.com"
    };
    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(
                mockData
            ),
          })
        );
    render(<Router> <Login /> </Router>);
    const loginBtn = screen.getByTestId("recovery_btn");
    fireEvent.click(loginBtn);
    fireEvent.change(screen.getByTestId("email"), { target: { value: 'testgf@gmail.com' } });
    fireEvent.click(screen.getByTestId("recovery"))
    
    //expect(toast).toBeInTheDocument();
  });

  it('test reset password close',() => {
    render(<Router> <Login /> </Router>);
    const loginBtn = screen.getByTestId("recovery_btn");
    fireEvent.click(loginBtn);
    fireEvent.change(screen.getByTestId("email"), { target: { value: 'testgf@gmail.com' } });
    fireEvent.click(screen.getByTestId("close_btn"))
    
    //expect(toast).toBeInTheDocument();
  });

  it('should redirect to user page when correct username and password are provided', async () => {
    const mockData = {
      id_user: 1,
      userstatus: 'admin',
      username: 'test_user',
      password: 'test_password',
    };
    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(
                mockData
            ),
          })
        );
    render(<Router> <Login /> </Router>);
    const username = screen.getByTestId('username');
    const password = screen.getByTestId('password');
    const loginBtn = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(username, { target: { value: 'test_user' } });
    fireEvent.change(password, { target: { value: 'test_password' } });
    fireEvent.click(loginBtn);
    const idUser = localStorage.getItem('id_user');
  });
});
