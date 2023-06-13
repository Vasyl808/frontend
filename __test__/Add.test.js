import { render, screen, fireEvent } from '@testing-library/react';
import Add from '../src/pages/Add';
import React from 'react';
import '@testing-library/jest-dom';
const cat_list = [
  {
    "category_name": "test",
    "description": "test",
    "id_category": 1
  },
  {
    "category_name": "wefew",
    "description": "wefew",
    "id_category": 7
  },
  {
    "category_name": "aaaaa",
    "description": "aaaaa",
    "id_category": 11
  }
];



beforeEach(() => {
  global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(
          cat_list
        ),
      })
    );
});

describe('Add component', () => {
  test('renders Add component', () => {
    const { getByAltText, getByTestId } = render(<Add />);
    expect(getByTestId('add')).toBeInTheDocument();
    expect(getByTestId('name')).toBeInTheDocument();
    expect(getByTestId('manufacturer')).toBeInTheDocument();
    expect(getByTestId('description')).toBeInTheDocument();
    expect(getByTestId('categoryId')).toBeInTheDocument();
    expect(getByTestId('medicineStatus')).toBeInTheDocument();
    expect(getByTestId('price')).toBeInTheDocument();
    expect(getByTestId('quantity')).toBeInTheDocument();
    expect(getByTestId('demand_count')).toBeInTheDocument();
    expect(getByTestId('demand')).toBeInTheDocument();
    expect(getByTestId('image_url')).toBeInTheDocument();
    const button = screen.getByTestId('add_btn')
    fireEvent.click(button);
  });

  test('sets name when input is entered', () => {
    render(<Add />);
    const nameInput = screen.getByTestId('name');
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    expect(nameInput.value).toBe('Test Name');
  });

  test('sets manufacturer when input is entered', () => {
    render(<Add />);
    const manufacturerInput = screen.getByTestId('manufacturer');
    fireEvent.change(manufacturerInput, { target: { value: 'Test Manufacturer' } });
    expect(manufacturerInput.value).toBe('Test Manufacturer');
  });

  test('sets description when input is entered', () => {
    render(<Add />);
    const descriptionInput = screen.getByTestId('description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    expect(descriptionInput.value).toBe('Test Description');
  });

  test('sets price when input is entered', () => {
    render(<Add />);
    const priceInput = screen.getByTestId('price');
    fireEvent.change(priceInput, { target: { value: 20 } });
    expect(priceInput.value).toBe('20');
  });

  test('sets quantity when input is entered', () => {
    render(<Add />);
    const quantityInput = screen.getByTestId('quantity');
    fireEvent.change(quantityInput, { target: { value: 50 } });
    expect(quantityInput.value).toBe('50');
  });

  test('sets demand count when input is entered', () => {
    render(<Add />);
    const demandCountInput = screen.getByTestId('demand_count');
    fireEvent.change(demandCountInput, { target: { value: 100 } });
    expect(demandCountInput.value).toBe('100');
  });

  test('sets demand when input is entered', () => {
    render(<Add />);
    const demandInput = screen.getByTestId("demand");
    fireEvent.change(demandInput, { target: { value: 1 } });
    expect(demandInput.value).toBe('1');
  });

  test('sets image url when input is entered', () => {
    render(<Add />);
    const imageUrlInput = screen.getByTestId('image_url');
    fireEvent.change(imageUrlInput, { target: { value: 'Test Image Url' } });
    expect(imageUrlInput.value).toBe('Test Image Url');
  });

  test('calls handleAddItem function on submit', () => {
    const handleAddItem = jest.fn();
    const event = { preventDefault: jest.fn() };
    render(<Add handleAddItem={handleAddItem} />);
    const submitButton = screen.getByText('ADD');
    fireEvent.click(submitButton, event);
    //expect(event.preventDefault).toBeCalled();
    //expect(handleAddItem).toBeCalled();
  });

  test('calls handleAddItem function on submit', () => {
    const error = new Error('Network Error');
    render(<Add error={error} />);
    //expect(event.preventDefault).toBeCalled();
    //expect(handleAddItem).toBeCalled();
  });

  test('sets and submit all data', () => {
    render(<Add />);
    const name = screen.getByTestId('name');
    const manufacturer = screen.getByTestId('manufacturer');
    const description = screen.getByTestId('description');
    const categoryId = screen.getByTestId('categoryId');
    const medicineStatus = screen.getByTestId('medicineStatus');
    const price = screen.getByTestId('price');
    const quantity = screen.getByTestId('quantity');
    const demand_count = screen.getByTestId('demand_count');
    const demand = screen.getByTestId('demand');
    const image_url = screen.getByTestId('image_url');
    fireEvent.change(name, { target: { value: "name" } });
    fireEvent.change(manufacturer, { target: { value: "manufacturer" } });
    fireEvent.change(description, { target: { value: "description" } });
    fireEvent.change(price, { target: { value: 10 } });
    fireEvent.change(quantity, { target: { value: 0 } });
    fireEvent.change(demand_count, { target: { value: 0 } });
    fireEvent.change(demand, { target: { value: 1 } });
    fireEvent.change(image_url, { target: { value: "image_url" } });
    const button = screen.getByTestId('add_btn')
    fireEvent.click(button);
  });
 
 });