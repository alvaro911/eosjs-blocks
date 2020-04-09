import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App from '../components/App'

jest.mock('../utils/rpc', () => {
  return {
    get_info: jest.fn(() => ({ last_irreversible_block_num: 11 })),
    get_block: jest.fn((blockNum) => {
      return {
        id: 'b2r5j',
        timestamp: '2020-04-08T15:15:35.000',
        actionCount: 5,
        producer: 'alvaro1',
        confirmed: 0,
        previous: 'c4d2bd55',
        transaction_mroot: '329ffgh',
        schedule_version: 233,
        new_producers: null,
        producer_signature: 'SIG_k1_2de34',
        block_num: blockNum,
        ref_block_prefix: 34591,
      }
    }),
  }
})

beforeEach(cleanup)

test('When application first renders see loading state', () => {
  const { getByTestId } = render(<App />)
  const loading = getByTestId('loading state')
  expect(loading).toBeTruthy()
  expect(loading.innerHTML).toBe('Loading')
})

test('If there was an error when loading the blocks', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('error block')).toBeTruthy()
})

test('When returning all the blocks successfully', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('blocks container')).toBeTruthy()
  expect(getByTestId('blocks').childNodes.length).toBe(10)
})
