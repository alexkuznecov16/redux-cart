import {render} from '@testing-library/react'
import { describe, it } from 'vitest'
import Home from './Home'

describe('Home block', () => {
  it('Renders without crashing', () => {
    render(<Home />)
  })
})