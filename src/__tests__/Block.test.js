import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Block from '../components/Block'

afterEach(cleanup)

const block = {
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
  block_num: 1492,
  ref_block_prefix: 34591,
}

test('Renders the position number, id, time stamp and count of actions from a block', () => {
  const { getByTestId } = render(
    <Block
      id={block.id}
      timestamp={block.timestamp}
      actionCount={block.actionCount}
      raw={block}
      index={3}
    />
  )
  const basicInfo = getByTestId('basic block info')
  expect(basicInfo).not.toBeNull()
  expect(basicInfo.childNodes['0'].textContent).toBe('3')
  expect(basicInfo.childNodes['1'].textContent).toBe('b2r5j')
  expect(basicInfo.childNodes['2'].textContent).toBe(
    'April 8th 2020, 3:15:35 pm'
  )
  expect(basicInfo.childNodes['3'].textContent).toBe('Action Count: 5')
})

test('After clicking the block info remove the basic infor and show raw data, and clicking again shows basic info', () => {
  const { getByTestId } = render(
    <Block
      id={block.id}
      timestamp={block.timestamp}
      actionCount={block.actionCount}
      raw={block}
      index={3}
    />
  )
  fireEvent.click(getByTestId('info container'))
  const rawInfo = getByTestId('pretty json data')
  const keys = rawInfo.getElementsByClassName('__json-key__')
  const strings = rawInfo.getElementsByClassName('__json-string__')
  const values = rawInfo.getElementsByClassName('__json-value__')
  expect(rawInfo).not.toBeNull()
  expect(keys[0].innerHTML).toBe('id')
  expect(strings[0].innerHTML).toBe('"b2r5j"')
  expect(keys[1].innerHTML).toBe('timestamp')
  expect(strings[1].innerHTML).toBe('"2020-04-08T15:15:35.000"')
  expect(keys[2].innerHTML).toBe('actionCount')
  expect(values[0].innerHTML).toBe('5')
  expect(keys[3].innerHTML).toBe('producer')
  expect(strings[2].innerHTML).toBe('"alvaro1"')
  expect(keys[4].innerHTML).toBe('confirmed')
  expect(values[1].innerHTML).toBe('0')
  expect(keys[5].innerHTML).toBe('previous')
  expect(strings[3].innerHTML).toBe('"c4d2bd55"')
  expect(keys[6].innerHTML).toBe('transaction_mroot')
  expect(strings[4].innerHTML).toBe('"329ffgh"')
  expect(keys[7].innerHTML).toBe('schedule_version')
  expect(values[2].innerHTML).toBe('233')
  expect(keys[8].innerHTML).toBe('new_producers')
  expect(values[3].innerHTML).toBe('null')
  expect(keys[9].innerHTML).toBe('producer_signature')
  expect(strings[5].innerHTML).toBe('"SIG_k1_2de34"')
  expect(keys[10].innerHTML).toBe('block_num')
  expect(values[4].innerHTML).toBe('1492')
  expect(keys[11].innerHTML).toBe('ref_block_prefix')
  expect(values[5].innerHTML).toBe('34591')
  fireEvent.click(getByTestId('info container'))
  expect(getByTestId('basic block info')).not.toBeNull()
})
