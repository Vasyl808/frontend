import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { addItem } from '../src/redux/slices/medicineSlice';
import ProductList from '../src/components/UI/ProductList';
import React from 'react';
import '@testing-library/jest-dom';
const mockStore = configureStore([]);

describe('ProductList', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({});
    component = render(
      <Provider store={store}>
        <Router>
          <ProductList
            id="1"
            name="Product 1"
            medicine_status="test"
            price={10}
            quantity={5}
            image_url="http://example.com"
          />
        </Router>
      </Provider>,
    );
  });



  it('renders product information', () => {
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    //expect(screen.getByText('10')).toBeInTheDocument();
  });
});
