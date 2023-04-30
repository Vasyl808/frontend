import { render, screen, fireEvent, act } from '@testing-library/react';
import Category from '../src/pages/Update';
import '@testing-library/jest-dom';
import React from 'react'

describe('Category', () => {
  test('should render the category list', async () => {
    // Arrange
    const medicineList = [
        {
            "category": "test",
            "category description": "test",
            "demand": false,
            "demand_count": 0,
            "id": 8,
            "image_url": "https://content.apteka-ds.com.ua/images/big/3838957049080.jpg",
            "manufacturer": "test",
            "medicine_description": "test",
            "medicine_status": "available",
            "name": "test",
            "price": 10,
            "quantity": 8
          }
    ];

    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({Medicine: medicineList}),
          })
        );

    // Act
    const { findByText } = await act(async () => render(<Category />));
    const categoryTable = await screen.findByRole('table');

    // Assert
    expect(categoryTable).toBeInTheDocument();
    findByText('test');
    const del_btn = screen.getByTestId('del_btn');
    fireEvent.click(del_btn);
    const input = screen.getByPlaceholderText('start typing here...');
    fireEvent.change(input, { target: { value: 'test' } });


    // Clean up
    global.fetch.mockRestore();
  });

  test('should update a category', async () => {
    // Arrange
    const medicineList = [
        {
            "category": "test",
            "category description": "test",
            "demand": false,
            "demand_count": 0,
            "id": 8,
            "image_url": "https://content.apteka-ds.com.ua/images/big/3838957049080.jpg",
            "manufacturer": "test",
            "medicine_description": "test",
            "medicine_status": "available",
            "name": "test",
            "price": 10,
            "quantity": 8
          }
    ];
  
      global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve({Medicine: medicineList}),
            })
          );
    const { findByText } = await act(async () => render(<Category />));
    const addButton =  screen.getByTestId('update_btn');
    fireEvent.click(addButton);
    global.fetch.mockRestore();
});

});