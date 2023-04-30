import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Order from '../src/pages/Order';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Order Component', () => {
  const fakeOrderData = {
    "Order": [
      {
        "address": "Shevchenko 12, Lviv, 190129, Lviv",
        "complete": false,
        "date_of_purchase": "Sat, 29 Apr 2023 12:34:52 GMT",
        "id": 1,
        "order_details": [
          {
            "count": 1,
            "medicine": "test2",
            "medicine_id": 2,
            "order_id": 37,
            "price": 29
          }
        ],
        "order_status": "placed",
        "phone": "0961491914",
        "shipData": "Tue, 02 May 2023 12:34:52 GMT",
        "total": 58,
        "total_count": 2,
        "user_id": 103
      }
    ]
  }

  beforeEach(() => {
    global.localStorage.setItem('token', 'test-token');
    global.localStorage.setItem('userstatus', 'pharmacist');
    window.location.pathname = '/order/1';
    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeOrderData),
          })
        );
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.localStorage.clear();
  });

  test('Renders order details correctly', async () => {
    const {getByText} = await act(async () => render(<Router> <Order /> </Router>));
  });

  test('Can delete an order', async () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeOrderData),
    })
  );
    const {getByText} = await act(async () => render(<Router> <Order /> </Router>));
    
    const deleteButton = screen.getByTestId('delete_btn');
    fireEvent.click(deleteButton);
  });

  test('Can edit an order', async () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeOrderData),
    })
  );
  const {getByText} = await act(async () => render(<Router> <Order /> </Router>));
    const editButton = screen.getByTestId('edit_btn');
    fireEvent.click(editButton);
    const saveButton = screen.getByTestId('sace_btn');
    fireEvent.click(saveButton);
    const del_details = screen.getByTestId('eldet_btn');
    fireEvent.click(del_details);
  });

  test('Can edit an order user', async () => {
    global.localStorage.setItem('userstatus', 'user');
    global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeOrderData),
    })
  );
  const {getByText} = await act(async () => render(<Router> <Order /> </Router>));
    const editButton = screen.getByTestId('edit_btn');
    fireEvent.click(editButton);
    const saveButton = screen.getByTestId('sace_btn');
    fireEvent.click(saveButton);
    const del_details = screen.getByTestId('eldet_btn');
    fireEvent.click(del_details);
  });
});