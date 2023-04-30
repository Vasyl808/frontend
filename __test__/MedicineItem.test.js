import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MedicineItem from '../src/pages/MedicineItem';
import '@testing-library/jest-dom';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { MemoryRouter, Route ,Routes} from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from '../src/redux/slices/medicineSlice';

const store = createStore(rootReducer, applyMiddleware(thunk));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(),
          })
        );

describe('MedicineItem', () => {
  let store;
  const initialState = {
    coffees: {
      coffeesLoadingStatus: 'idle',
      coffees: [
        {
          id: 1,
          medicine_status: 'available',
          name: 'coffee1',
          price: 10,
          quantity: 10,
          medicine_description: 'description1',
          manufacturer: 'manufacturer1',
          demand: false,
          image_url: 'https://www.example.com/coffee1.jpg',
          demand_count: 0,
        },
        {
          id: 2,
          medicine_status: 'available',
          name: 'coffee2',
          price: 20,
          quantity: 20,
          medicine_description: 'description2',
          manufacturer: 'manufacturer2',
          demand: true,
          image_url: 'https://www.example.com/coffee2.jpg',
          demand_count: 5,
        },
      ],
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('loading', () => {
    render(
        <Provider store={store}>
          <MedicineItem />
        </Provider>
      );
      expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('loading1', () => {
    let store;
  const initialState = {
    coffees: {
      coffeesLoadingStatus: 'loading',
      coffees: [
      ],
    },
  };
  store = mockStore(initialState);
    render(
        <Provider store={store}>
          <MedicineItem />
        </Provider>
      );
      //expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('error', () => {
    let store;
  const initialState = {
    coffees: {
      coffeesLoadingStatus: 'error',
      coffees: [
      ],
    },
  };
  store = mockStore(initialState);
    render(
        <Provider store={store}>
          <MedicineItem />
        </Provider>
      );
      //expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('should render coffee item details',async () => {
    await act(async () => render(
        <Provider store={store}>
        <MemoryRouter initialEntries={['/shop/1']}>
          <Routes>
            <Route path="/shop/:id" element={<MedicineItem />} />
          </Routes>
        </MemoryRouter>
      </Provider>
      ));
    

    //expect(screen.getByText('Загрузка...')).toBeInTheDocument();
    expect(screen.getByAltText('coffee')).toBeInTheDocument();
    //expect(screen.getByText('coffee1')).toBeInTheDocument();
    expect(screen.getByText('Category:')).toBeInTheDocument();
    expect(screen.getByText('Category description:')).toBeInTheDocument();
    expect(screen.getByText('Medicine status:')).toBeInTheDocument();
    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText('Manufacturer:')).toBeInTheDocument();
    expect(screen.getByText('Is on demand?:')).toBeInTheDocument();
    expect(screen.getByText('Quantity:')).toBeInTheDocument();
    expect(screen.getByText('Price:')).toBeInTheDocument();

    //expect(screen.getByText('coffee1').tagName).toBe('H2');
  });

  it('should add an item to the cart',async () => {
    await act(async () => render(
        <Provider store={store}>
        <MemoryRouter initialEntries={['/shop/1']}>
          <Routes>
            <Route path="/shop/:id" element={<MedicineItem />} />
          </Routes>
        </MemoryRouter>
      </Provider>
      ));

    //const countField = screen.getByRole('spinbutton', { name: 'Count:' });
    const addToCartBtn = screen.getByTestId('add_to_card_btn');
    fireEvent.click(addToCartBtn);
  })

  it('should add an item to demand',async () => {
    await act(async () => render(
        <Provider store={store}>
        <MemoryRouter initialEntries={['/shop/1']}>
          <Routes>
            <Route path="/shop/:id" element={<MedicineItem />} />
          </Routes>
        </MemoryRouter>
      </Provider>
      ));
    const add_to_demand_btn = screen.getByTestId('add_to_demand_btn');
    fireEvent.click(add_to_demand_btn);
    global.fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            json: () => Promise.resolve(),
          })
        );
  })
});
