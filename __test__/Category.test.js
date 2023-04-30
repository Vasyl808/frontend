import { render, screen, fireEvent, act } from '@testing-library/react';
import Category from '../src/pages/Category';
import '@testing-library/jest-dom';
import React from 'react'

describe('Category', () => {
  test('should render the category list', async () => {
    // Arrange
    const categoryList = [
      {
        id_category: 2,
        category_name: 'Category 2',
        description: 'Category 2 description',
      }
    ];

    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(categoryList),
          })
        );

    // Act
    const { findByText } = await act(async () => render(<Category />));
    const categoryTable = await screen.findByRole('table');

    // Assert
    expect(categoryTable).toBeInTheDocument();
    findByText('Category 2');
    const del_btn = screen.getByTestId('start_delete');
    fireEvent.click(del_btn);


    // Clean up
    global.fetch.mockRestore();
  });

  test('should add a new category', async () => {
    // Arrange
    const categoryList = [
        {
          id_category: 1,
          category_name: 'Category 1',
          description: 'Category 1 description',
        },
        {
          id_category: 2,
          category_name: 'Category 2',
          description: 'Category 2 description',
        },
      ];
  
      global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve(categoryList),
            })
          );
    const { findByText } = await act(async () => render(<Category />));
    const newCategoryName = 'New Category';
    const newCategoryDescription = 'New Category description';

    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
          })
        );

        
    const nameInput =  screen.getByTestId('add_name');
    const descriptionInput =  screen.getByTestId('add_description');
    const addButton =  screen.getByTestId('add_btn');

    // Act
    fireEvent.change(nameInput, { target: { value: newCategoryName } });
    fireEvent.change(descriptionInput, { target: { value: newCategoryDescription } });
    fireEvent.click(addButton);

    // Assert

    // Clean up
    global.fetch.mockRestore();
  });

  test('should update a category', async () => {
    // Arrange
    const categoryList = [
        {
          id_category: 1,
          category_name: 'Category 1',
          description: 'Category 1 description',
        }
      ];
  
      global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve(categoryList),
            })
          );
    const { findByText } = await act(async () => render(<Category />));
    const updatedCategoryName = 'Updated Category';
    const updatedCategoryDescription = 'Updated Category description';
    const updateCategoryId = categoryList[0].id_category;

    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
          })
        );

    const up_btn = screen.getByTestId('start_update');
    fireEvent.click(up_btn);
    const nameInput =  screen.getByTestId('update_name');
    const descriptionInput =  screen.getByTestId('update_description');
    const addButton =  screen.getByTestId('update_btn');
    fireEvent.change(nameInput, { target: { value: updatedCategoryName } });
    fireEvent.change(descriptionInput, { target: { value: updatedCategoryDescription } });
    fireEvent.click(addButton);
    global.fetch.mockRestore();
});

});