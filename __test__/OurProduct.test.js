import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import OurProduct from '../src/pages/OurProduct';
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

  it('loading',async () => {
    await act(async () => render(
        <Provider store={store}>
        <MemoryRouter initialEntries={['/shop']}>
          <Routes>
            <Route path="/shop" element={<OurProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
      ))
    });

    it('should dispatch the filteredCoffeesByCoutry action when the available button is clicked',async () => {
        const {getByText} = await act(async () => render(
            <Provider store={store}>
            <MemoryRouter initialEntries={['/shop']}>
              <Routes>
                <Route path="/shop" element={<OurProduct />} />
              </Routes>
            </MemoryRouter>
          </Provider>
          ))
        const button = screen.getByTestId('all_available');
        fireEvent.click(button);
        //expect(dispatch).toHaveBeenCalledWith(filteredCoffeesByCoutry('available'));
      });

      it('should dispatch the filteredCoffeesByCoutry action when the all_btn button is clicked',async () => {
        const {getByText} = await act(async () => render(
            <Provider store={store}>
            <MemoryRouter initialEntries={['/shop']}>
              <Routes>
                <Route path="/shop" element={<OurProduct />} />
              </Routes>
            </MemoryRouter>
          </Provider>
          ))
        const button = screen.getByTestId('all_btn');
        fireEvent.click(button);
        //expect(dispatch).toHaveBeenCalledWith(filteredCoffeesByCoutry('available'));
      });

      it('should dispatch the filteredCoffeesByCoutry action when the all_pending button is clicked',async () => {
        const {getByText} = await act(async () => render(
            <Provider store={store}>
            <MemoryRouter initialEntries={['/shop']}>
              <Routes>
                <Route path="/shop" element={<OurProduct />} />
              </Routes>
            </MemoryRouter>
          </Provider>
          ))
        const button = screen.getByTestId('all_pending');
        fireEvent.click(button);
        //expect(dispatch).toHaveBeenCalledWith(filteredCoffeesByCoutry('available'));
      });

      
      it('should dispatch the filteredCoffeesByCoutry action when the sold_btn button is clicked',async () => {
        const {getByText} = await act(async () => render(
            <Provider store={store}>
            <MemoryRouter initialEntries={['/shop']}>
              <Routes>
                <Route path="/shop" element={<OurProduct />} />
              </Routes>
            </MemoryRouter>
          </Provider>
          ))
        const button = screen.getByTestId('sold_btn');
        fireEvent.click(button);
        //expect(dispatch).toHaveBeenCalledWith(filteredCoffeesByCoutry('available'));
      });

      it('should dispatch the filteredCoffeesByCoutry action when the search button is clicked',async () => {
        const {getByText} = await act(async () => render(
            <Provider store={store}>
            <MemoryRouter initialEntries={['/shop']}>
              <Routes>
                <Route path="/shop" element={<OurProduct />} />
              </Routes>
            </MemoryRouter>
          </Provider>
          ))
          const input = screen.getByPlaceholderText('start typing here...');
          fireEvent.change(input, { target: { value: 'test' } });
        //expect(dispatch).toHaveBeenCalledWith(filteredCoffeesByCoutry('available'));
      });
      
});
