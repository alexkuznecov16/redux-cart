import {render} from '@testing-library/react'
import Header from './Header'
import { describe, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

describe('Header component', () => {
  it('Renders without crashing', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
  })
})