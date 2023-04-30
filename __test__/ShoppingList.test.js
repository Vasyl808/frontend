import React from 'react';
import { getByTestId, render, screen, act } from '@testing-library/react';
import ShoppingList from '../src/pages/ShoppingList';
import '@testing-library/jest-dom';

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        id: 1, order_status: 'placed', complete: false
    }) 
}))

describe('ShoppingList', () => {
  test('renders "Shopping List" heading', () => {
    render(<ShoppingList />);
    const headingElement = screen.getByText('Shopping List');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders filter buttons', () => {
    render(<ShoppingList />);
    const allButton = screen.getByTestId('all_btn');
    const placedButton = screen.getByTestId('placed_btn');
    const approvedButton = screen.getByTestId('approved_btn');
    const deliveredButton = screen.getByTestId('delivered_btn');
    const completeButton = screen.getByTestId('complete_btn');
    const notCompleteButton = screen.getByTestId('not_complete_btn');
    expect(allButton).toBeInTheDocument();
    expect(placedButton).toBeInTheDocument();
    expect(approvedButton).toBeInTheDocument();
    expect(deliveredButton).toBeInTheDocument();
    expect(completeButton).toBeInTheDocument();
    expect(notCompleteButton).toBeInTheDocument();
  });

  test('renders "No item" when there are no orders', () => {
    render(<ShoppingList />);
    const noItemElement = screen.getByText('No item');
    expect(noItemElement).toBeInTheDocument();
  });

  test('renders orders',async () => {
    const orders = [
        { id: 1, order_status: 'placed', complete: false },
        { id: 2, order_status: 'approved', complete: false },
        { id: 3, order_status: 'delivered', complete: false },
      ];
      global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ Orders: orders }),
          })
        );
    
        const { findByText } = await act(async () => render(<ShoppingList />));
        //expect(getByTestId('list_orders')).toBeInTheDocument();
      // Перевірка наявності елементів у списку замовлень
      expect(findByText('Check order №2'));
      //await findByText('Check order №3');
  });

  test('filters orders by "placed" status',async () => {
    const orders = [
      { id: 1, order_status: 'placed', complete: false },
      { id: 2, order_status: 'approved', complete: false },
      { id: 3, order_status: 'delivered', complete: false },
    ];
    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ Orders: orders }),
          })
        );
        const { findByText } = await act(async () => render(<ShoppingList />));
    const placedButton = screen.getByTestId('placed_btn');
    placedButton.click();
    expect(findByText('Check order №1'));
    //const orderElements = screen.getAllByRole('button', { name: /Check order/i });
    //expect(orderElements).toHaveLength(1);
    //expect(orderElements[0]).toHaveTextContent(`Check order №${orders[0].id}`);
  });
  test('filters orders by "approved" status',async () => {
    const orders = [
      { id: 1, order_status: 'placed', complete: false },
      { id: 2, order_status: 'approved', complete: false },
      { id: 3, order_status: 'delivered', complete: false },
    ];
    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ Orders: orders }),
          })
        );
        const { findByText } = await act(async () => render(<ShoppingList />));
    const placedButton = screen.getByTestId('approved_btn');
    placedButton.click();
    expect(findByText('Check order №2'));
    //const orderElements = screen.getAllByRole('button', { name: /Check order/i });
    //expect(orderElements).toHaveLength(1);
    //expect(orderElements[0]).toHaveTextContent(`Check order №${orders[0].id}`);
  });

  test('filters orders by "delivered" status',async () => {
    const orders = [
      { id: 1, order_status: 'placed', complete: false },
      { id: 2, order_status: 'approved', complete: false },
      { id: 3, order_status: 'delivered', complete: false },
    ];
    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ Orders: orders }),
          })
        );
        const { findByText } = await act(async () => render(<ShoppingList />));
    const placedButton = screen.getByTestId('delivered_btn');
    placedButton.click();
    expect(findByText('Check order №3'));
    //const orderElements = screen.getAllByRole('button', { name: /Check order/i });
    //expect(orderElements).toHaveLength(1);
    //expect(orderElements[0]).toHaveTextContent(`Check order №${orders[0].id}`);
  });

  test('filters orders by "complete_btn" status',async () => {
    const orders = [
      { id: 1, order_status: 'placed', complete: true },
      { id: 2, order_status: 'approved', complete: false },
      { id: 3, order_status: 'delivered', complete: false },
    ];
    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ Orders: orders }),
          })
        );
        const { findByText } = await act(async () => render(<ShoppingList />));
    const placedButton = screen.getByTestId('complete_btn');
    placedButton.click();
    expect(findByText('Check order №1'));
    //const orderElements = screen.getAllByRole('button', { name: /Check order/i });
    //expect(orderElements).toHaveLength(1);
    //expect(orderElements[0]).toHaveTextContent(`Check order №${orders[0].id}`);
  });

  test('filters orders by "not_complete_btn" status',async () => {
    const orders = [
      { id: 1, order_status: 'placed', complete: true },
      { id: 2, order_status: 'approved', complete: true },
      { id: 3, order_status: 'delivered', complete: false },
    ];
    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ Orders: orders }),
          })
        );
        const { findByText } = await act(async () => render(<ShoppingList />));
    const placedButton = screen.getByTestId('not_complete_btn');
    placedButton.click();
    expect(findByText('Check order №3'));
    //const orderElements = screen.getAllByRole('button', { name: /Check order/i });
    //expect(orderElements).toHaveLength(1);
    //expect(orderElements[0]).toHaveTextContent(`Check order №${orders[0].id}`);
  });

});