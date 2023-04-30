import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hook/http.hook';
import { toast } from 'react-toastify';
import { el } from "date-fns/locale";
 
const coffeesAdapter = createEntityAdapter();
 
const initialState = coffeesAdapter.getInitialState({
    coffeesLoadingStatus: 'idle',
    coffees: [],
    filteredCoffees: [],
    cartItems: window.localStorage.getItem('cartItems') ? JSON.parse(window.localStorage.getItem('cartItems')) : [],
    totalAmount: window.localStorage.getItem('totalAmount') ? parseFloat(window.localStorage.getItem('totalAmount')) : 0,
    totalQuantity: window.localStorage.getItem('totalQuantity') ? parseInt(window.localStorage.getItem('totalQuantity')) : 0,
})
 
export const fetchCoffees = createAsyncThunk(
    'coffees/fetchCoffees', 
    () => {
        const {request} = useHttp();
        return request("http://127.0.0.1:5000/api/v1/pharmacy/inventory")
    }
);
 
const coffeesSlice = createSlice({
    name: 'coffees',
    initialState,
    reducers: {
        filteredCoffeesByName: (state, action) => {
			state.coffees = state.filteredCoffees.filter((coffee) =>
                coffee.name.toLowerCase().includes(action.payload.toLowerCase())
			);
		},
 
        filteredCoffeesByCoutry: (state, action) => {
			state.coffees = state.filteredCoffees.filter((coffee) =>
                coffee.medicine_status === action.payload
			);
		},
 
        reset: (state) => {
            state.coffees = state.filteredCoffees
        },
 
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if (!existingItem) {
                if (Number(newItem.quntity_itm) <= Number(newItem.count_quantity)){
                    state.cartItems.push({
                        id: newItem.id,
                        productName: newItem.productName,
                        imgUrl: newItem.imgUrl,
                        price: newItem.price,
                        quantity: Number(newItem.quntity_itm),
                        totalPrice: Number(Number(newItem.price) * Number(newItem.quntity_itm))
                    })
                    state.totalQuantity += Number(newItem.quntity_itm);
                    state.totalAmount = state.cartItems.reduce((total, item) => 
                    total + Number(item.price) * Number(item.quantity),0);
    
                    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                    localStorage.setItem('totalAmount', state.totalAmount);
                    localStorage.setItem('totalQuantity', state.totalQuantity);
                    toast.success("Product added successfully");
                }
                else{
                    toast.error('The selected quantity exceeds the quantity of the product in stock')
                }
            }
            else{
                if (Number(newItem.quntity_itm) + Number(existingItem.quantity) <= Number(newItem.count_quantity)){
                    state.totalQuantity += Number(newItem.quntity_itm);
                    existingItem.quantity = Number(Number(newItem.quntity_itm) + Number(existingItem.quantity));
                    existingItem.totalPrice = Number(existingItem.totalPrice) + Number(Number(newItem.price) * Number(newItem.quntity_itm))
                    state.totalAmount = state.cartItems.reduce((total, item) => 
                    total + Number(item.price) * Number(item.quantity),0);
    
                    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                    localStorage.setItem('totalAmount', state.totalAmount);
                    localStorage.setItem('totalQuantity', state.totalQuantity);
                    toast.success("Product added successfully");
                }
                else{
                    toast.error('The selected quantity exceeds the quantity of the product in stock')
                }
            }
 
        },
 
        deleteItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
 
            if (existingItem) {
                state.cartItems = state.cartItems.filter(item => item.id !== id);
                state.totalQuantity = state.totalQuantity - existingItem.quantity
            }
 
            state.totalAmount = state.cartItems.reduce((total, item) => 
            total + Number(item.price) * Number(item.quantity),0);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalAmount', state.totalAmount);
            localStorage.setItem('totalQuantity', state.totalQuantity);
        },
 
        count_add: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if (existingItem.quantity + 1 <= Number((state.coffees.find(item => item.id === id)).quantity)){
                state.totalQuantity++;
                existingItem.quantity++;
                existingItem.totalPrice += Number(existingItem.price);
                
                state.totalAmount = state.cartItems.reduce((total, item) => 
                total + Number(item.price) * Number(item.quantity),0);
 
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                localStorage.setItem('totalAmount', state.totalAmount);
                localStorage.setItem('totalQuantity', state.totalQuantity);
                toast.success("Product added successfully");
            }
            else{
                toast.error('The selected quantity exceeds the quantity of the product in stock')
            }
        },
 
        count_minus: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            state.totalQuantity--;
 
            existingItem.quantity--;
            if (existingItem.quantity === 0){
                if (existingItem) {
                    state.cartItems = state.cartItems.filter(item => item.id !== id);
                    state.totalQuantity = state.totalQuantity - existingItem.quantity
                }
 
                state.totalAmount = state.cartItems.reduce((total, item) => 
                total + Number(item.price) * Number(item.quantity),0);
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                localStorage.setItem('totalAmount', state.totalAmount);
                localStorage.setItem('totalQuantity', state.totalQuantity);
            }
            else{
            existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
 
            state.totalAmount = state.cartItems.reduce((total, item) => 
            total + Number(item.price) * Number(item.quantity),0);
 
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalAmount', state.totalAmount);
            localStorage.setItem('totalQuantity', state.totalQuantity);
            }
        }
    },
 
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoffees.pending, state => {state.coffeesLoadingStatus = 'loading'})
            .addCase(fetchCoffees.fulfilled, (state, action) => {
                state.coffeesLoadingStatus = 'idle';
                state.coffees = action.payload;
                state.filteredCoffees = action.payload;
                coffeesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCoffees.rejected, state => {state.coffeesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});
 
const {actions, reducer} = coffeesSlice;
 
export default reducer;
 
export const {
    filteredCoffeesByName,
    filteredCoffeesByCoutry,
    reset,
    addItem,
    deleteItem,
    count_add,
    count_minus
} = actions