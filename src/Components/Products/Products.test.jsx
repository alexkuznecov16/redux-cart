import {render} from '@testing-library/react'
import Products from './Products'
import { describe, it } from 'vitest'
import { Provider } from 'react-redux'
import { store } from '../../app/store.js';

describe('Products component', () => {
  it('Renders without crashing', () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    )
  })
})