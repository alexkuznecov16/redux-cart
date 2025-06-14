import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../pages/Products/productSlice';

export const store = configureStore({
	reducer: {
		product: productReducer,
	},
});
