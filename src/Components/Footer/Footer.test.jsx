import {render} from '@testing-library/react'
import Footer from './Footer'
import { describe, it } from 'vitest'

describe('Footer component', () => {
  it('Renders without crashing', () => {
    render(<Footer />)
  })
})