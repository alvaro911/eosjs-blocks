import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import ErrorBlock from '../components/ErrorBlock'

beforeEach(cleanup)

test('<ErrorBlock component', () => {
  const { getByTestId } = render(<ErrorBlock />)
  expect(getByTestId('error message').innerHTML).toBe(
    'There was a problem getting the blocks, Please try again'
  )
  expect(getByTestId('error button').innerHTML).toBe('Reload')
})
