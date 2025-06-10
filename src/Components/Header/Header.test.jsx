import {render} from '@testing-library/react'
import Header from './Header'
import { describe, it } from 'vitest'

describe('Header component', () => {
  it('Renders without crashing', () => {
    render(<Header />)
  })
})