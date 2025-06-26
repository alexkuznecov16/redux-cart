import {createSlice} from '@reduxjs/toolkit';
import {data} from './Products';

const savedCart = localStorage.getItem('cart');
const initialCart = savedCart ? JSON.parse(savedCart) : [];

const initialState = {
	value: 6, // products count
	items: initialCart, // cart array
};

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		load: state => {
			if (state.value < data.length) {
				state.value += 6;
				if (state.value > data.length) {
					state.value = data.length;
				}
			}
		},
		addToCart: (state, action) => {
			const product = action.payload;
			const existingCount = state.items.filter(item => item.id === product.id).length;

			if (existingCount < product.count) {
				state.items.push(product);
				localStorage.setItem('cart', JSON.stringify(state.items));
			}
		},
		removeFromCart: (state, action) => {
			const index = state.items.findIndex(item => item.id === action.payload.id);
			if (index !== -1) {
				state.items.splice(index, 1); // remove only 1 element
				localStorage.setItem('cart', JSON.stringify(state.items));
			}
		},
		clearCart: state => {
			state.items = [];
			localStorage.setItem('cart', JSON.stringify([]));
		},
	},
});

export const {load, addToCart, removeFromCart, clearCart} = productSlice.actions;
export default productSlice.reducer;
