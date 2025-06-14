import {render} from '@testing-library/react'
import { describe, it } from 'vitest'
import Contacts from './Contacts'

describe('Countries block', () => {
  it('Renders without crashing', () => {
    render(<Contacts />)
  })
})