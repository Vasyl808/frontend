import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import UpdateUser from '../src/pages/UpdateUser';
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
    
    const { findByText } = await act(async () => render(<Router> <UpdateUser /> </Router>));
        //expect(getByTestId('list_orders')).toBeInTheDocument();
      // Перевірка наявності елементів у списку замовлень
      expect(findByText('user1'));
});

test('changes the state after loading data from the server update pass', async () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn(() => 'token');
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
  
      const { findByText } = await act(async () => render(<Router> <UpdateUser /> </Router>));
      const firstNameInput = screen.getByTestId('first_name')
    const lastNameInput = screen.getByTestId('last_name')
    const usernameInput = screen.getByTestId('username')
    const emailInput = screen.getByTestId('email')
    const ageInput = screen.getByTestId('age')
    const phoneNumberInput = screen.getByTestId('phone_number')
    const pass = screen.getByTestId('password')
    const submitButton = screen.getByTestId('update')
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.change(pass,  { target: { value: 'John' } })
    fireEvent.change(phoneNumberInput, { target: { value: '555-5555' } });
    fireEvent.click(submitButton);
    //await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
      //expect(getByTestId('list_orders')).toBeInTheDocument();
    // Перевірка наявності елементів у списку замовлень
    //const { getByDisplayValue } = render(<UpdateUser />);
    //await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  test('changes the state after loading data from the server update not pass ', async () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn(() => 'token');
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
  
      const { findByText } = await act(async () => render(<Router> <UpdateUser /> </Router>));
      const firstNameInput = screen.getByTestId('first_name')
    const lastNameInput = screen.getByTestId('last_name')
    const usernameInput = screen.getByTestId('username')
    const emailInput = screen.getByTestId('email')
    const ageInput = screen.getByTestId('age')
    const phoneNumberInput = screen.getByTestId('phone_number')
    const submitButton = screen.getByTestId('update')
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(ageInput, { target: { value: '25' } });
    fireEvent.change(phoneNumberInput, { target: { value: '555-5555' } });
    fireEvent.click(submitButton);
    //await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
      //expect(getByTestId('list_orders')).toBeInTheDocument();
    // Перевірка наявності елементів у списку замовлень
    //const { getByDisplayValue } = render(<UpdateUser />);
    //await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  test('changes the state after loading data from the server and update old', async () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn(() => 'token');
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
  
      const { findByText } = await act(async () => render(<Router> <UpdateUser /> </Router>));

    const submitButton = screen.getByTestId('update')

    fireEvent.click(submitButton);
    //await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
      //expect(getByTestId('list_orders')).toBeInTheDocument();
    // Перевірка наявності елементів у списку замовлень
    //const { getByDisplayValue } = render(<UpdateUser />);
    //await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });