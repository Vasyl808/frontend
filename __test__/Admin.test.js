import { render, screen, fireEvent, act } from '@testing-library/react';
import Admin from '../src/pages/Admin';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
              age: 32,
              email: "user1@gmail.com",
              first_name: "Ivan",
              id: 1,
              last_name: "Petrenko",
              phone_number: "0999309899",
              username: "user1",
              userstatus: "user"
        
    }) 
}))

describe('Admin component', () => {
    test('renders Admin Panel header',async () => {
        await act(async () => render(<Router> <Admin /> </Router>));
    });

    it('renders correctly', async () => {
        render(
          <Router>
            <Admin />
          </Router>
        );
      });
    
      it('displays user list modal correctly', async () => {
        const userList = [
          { id: 1, username: 'John', userstatus: 'patient' },
          { id: 2, username: 'Jane', userstatus: 'pharmacist' },
        ];
    
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(userList),
          })
        );
    
        render(
          <Router>
            <Admin />
          </Router>
        );
    
        const userButton = screen.getByRole('button', { name: /User list/i });
        fireEvent.click(userButton);
    
    
        // Check that users are displayed correctly
        const userLinks = await screen.findAllByRole('link', { name: /username:/i });
    
        // Close the modal
        const closeButton = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeButton);
            
        const userButton1 = screen.getByRole('button', { name: /Admin list/i });
        fireEvent.click(userButton1);

        const closeButton1 = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeButton1);
        
        const logout = screen.getByRole('button', { name: /Log Out/i });
        fireEvent.click(logout);
      });

      it('displays user list modal search', async () => {
        const userList = [
          { id: 1, username: 'John', userstatus: 'user' },
          { id: 2, username: 'Jane', userstatus: 'pharmacist' },
        ];
    
        global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(userList),
          })
        );
    
        render(
          <Router>
            <Admin />
          </Router>
        );
    
        const userButton = screen.getByRole('button', { name: /User list/i });
        fireEvent.click(userButton);
        const search_user = screen.getByPlaceholderText('Find user by username')
        fireEvent.change(search_user, { target: { value: "John" } });
        // Close the modal
        const closeButton = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeButton);
            
        const userButton1 = screen.getByRole('button', { name: /Admin list/i });
        fireEvent.click(userButton1);
        const search_adm = screen.getByPlaceholderText('Find user by username')
        fireEvent.change(search_adm, { target: { value: "Jane" } });

        const closeButton1 = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeButton1);
  
      });

  });