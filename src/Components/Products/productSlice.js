import {createSlice} from '@reduxjs/toolkit';
import {data} from './Products';

const initialState = {
	value: 6, // products count
	items: [], // cart array
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
			}
		},
		removeFromCart: (state, action) => {
			const index = state.items.findIndex(item => item.id === action.payload.id);
			if (index !== -1) {
				state.items.splice(index, 1); // remove only 1 element
			}
		},
	},
});

export const {load, addToCart, removeFromCart} = productSlice.actions;
export default productSlice.reducer;
