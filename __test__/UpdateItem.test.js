import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import UpdateItem from '../src/pages/UpdateItem';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor, screen, act, getByTestId } from '@testing-library/react';
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

const mockData = {
  medicine_name: 'medicine name',
  manufacturer: 'manufacturer',
  medicine_description: 'description',
  category_id: 1,
  price: 10,
  quantity: 1,
  demand: false,
  medicine_status: 'status',
  image_url: 'https://example.com/image.jpg',
  demand_count: 0,
};

beforeEach(() => {
  // Симулюємо загрузку категорій перед кожним тестом
  global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(
        mockData
    ),
  })
);
});


describe('UpdateItem', () => {
  it('should fetch and set medicine data', async () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(
        cat_list
      ),
    })
  );
    const { findByText } = await act(async () => render(
      <MemoryRouter initialEntries={['/update-item/1']}>
          <UpdateItem />
      </MemoryRouter>,
    ));
    const medicine_name =  screen.getByTestId('medicine_name');
    const manufacturer =  screen.getByTestId('manufacturer');
    const description =  screen.getByTestId('description');
    const price =  screen.getByTestId('price');
    const quantity =  screen.getByTestId('quantity');
    const demand =  screen.getByTestId('demand');
    const image_url =  screen.getByTestId('image_url');
    const demand_count =  screen.getByTestId('demand_count');
    fireEvent.change(medicine_name, { target: { value: "jdsjhjgd" } });
    fireEvent.change(manufacturer, { target: { value: "manufacturer" } });
    fireEvent.change(description, { target: { value: "description" } });
    fireEvent.change(price, { target: { value: 100 } });
    fireEvent.change(quantity, { target: { value: 10000} });
    fireEvent.change(demand, { target: { value: true } });
    fireEvent.change(image_url, { target: { value: "image_url" } });
    fireEvent.change(demand_count, { target: { value: 10 } });
    fireEvent.click(
    screen.getByTestId('update_btn'))
    })
});

