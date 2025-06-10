import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../Components/Products/productSlice';

export const store = configureStore({
	reducer: {
		product: productReducer,
	},
});
