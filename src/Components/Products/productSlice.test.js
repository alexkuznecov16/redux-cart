import {describe, it, expect} from 'vitest';
import reducer, {addToCart, load, removeFromCart} from './productSlice';
import {data} from './Products';

describe('productSlice - load reducer', () => {
	it('Increases count by 6, if has more products', () => {
		const initialState = {value: 6, items: []};
		const nextState = reducer(initialState, load());

		expect(nextState.value).toBe(12); // next count must be 12 (after 6)
	});

	it('Does not exceed the limit if count + 6 is greater than products count', () => {
		const initialState = {value: 27, items: []};
		const nextState = reducer(initialState, load());

		expect(nextState.value).toBe(data.length); // must be 30 (MAX)
	});

	it('Does not change value, if exceed the limit', () => {
		const initialState = {value: 30, items: []};
		const nextState = reducer(initialState, load());

		expect(nextState.value).toBe(30); // must be 30 (MAX)
	});
});

describe('addToCart', () => {
	it('Adds product to the cart, if the limit is not exceed', () => {
		const initialState = {value: 27, items: []};
		const nextState = reducer(initialState, addToCart(data[0]));

		expect(nextState.items.length).toBe(1);
		expect(nextState.items[0]).toEqual(data[0]);
	});

	it('Does not add product, if the cart already has max count', () => {
		const initialState = {value: 27, items: Array(data[0].count).fill(data[0])};
		const nextState = reducer(initialState, addToCart(data[0]));

		expect(nextState.items.length).toBe(data[0].count);
	});

	it('Adds different product to the cart separately', () => {
		const initialState = {value: 27, items: []};
		let nextState = reducer(initialState, addToCart(data[0]));
		nextState = reducer(nextState, addToCart(data[1]));

		expect(nextState.items.length).toBe(2);
		expect(nextState.items).toContain(data[0]);
		expect(nextState.items).toContain(data[1]);
	});
});

describe('removeFromCart', () => {
	it('Removes one item from the cart, if there is more than one item', () => {
		const initialState = {value: 27, items: Array(data[0].count).fill(data[0])};
		const nextState = reducer(initialState, removeFromCart(data[0]));

		expect(nextState.items.length).toBe(data[0].count - 1);
	});

	it('Removes product from the cart, if there is only one left', () => {
		const initialState = {value: 27, items: [data[0]]};
		const nextState = reducer(initialState, removeFromCart(data[0]));

		expect(nextState.items.length).toBe(0);
	});
});
