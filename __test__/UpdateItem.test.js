import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import UpdateItem from '../src/pages/UpdateItem';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor, screen, act, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('UpdateItem component', () => {
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
    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(
                mockData
            ),
          })
        );
  });


  it('should fetch and set medicine data', async () => {
    const { findByText } = await act(async () => render(
      <MemoryRouter initialEntries={['/update-item/1']}>
          <UpdateItem />
      </MemoryRouter>,
    ));
    const medicine_name =  screen.getByTestId('medicine_name');
    const manufacturer =  screen.getByTestId('manufacturer');
    const description =  screen.getByTestId('description');
    const categoryId =  screen.getByTestId('categoryId');
    const price =  screen.getByTestId('price');
    const quantity =  screen.getByTestId('quantity');
    const demand =  screen.getByTestId('demand');
    const medicine_status =  screen.getByTestId('medicine_status');
    const image_url =  screen.getByTestId('image_url');
    const demand_count =  screen.getByTestId('demand_count');
    fireEvent.change(medicine_name, { target: { value: "jdsjhjgd" } });
    fireEvent.change(manufacturer, { target: { value: "manufacturer" } });
    fireEvent.change(description, { target: { value: "description" } });
    fireEvent.change(categoryId, { target: { value: 1 } });
    fireEvent.change(price, { target: { value: 100 } });
    fireEvent.change(quantity, { target: { value: 10000} });
    fireEvent.change(demand, { target: { value: true } });
    fireEvent.change(medicine_status, { target: { value: "sold" } });
    fireEvent.change(image_url, { target: { value: "image_url" } });
    fireEvent.change(demand_count, { target: { value: 10 } });
    fireEvent.click(
    screen.getByTestId('update_btn'))
    })
});