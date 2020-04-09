import React, { useEffect, useState } from 'react'

import './App.css'
import Block from './Block'
import ErrorBlock from './ErrorBlock'
import { rpc } from '../utils/rpc'

function App() {
  const [blocks, setBlocks] = useState([])

  const [errorBlock, setErrorBlock] = useState(false)

  const [errorInfo, setErrorInfo] = useState(false)

  const [loading, setLoading] = useState(true)

  async function main() {
    let errorCount = 0
    try {
      const blockNums = []
      let { last_irreversible_block_num } = await rpc.get_info()
      blockNums.push(last_irreversible_block_num)
      while (blockNums.length < 10) {
        blockNums.push(--last_irreversible_block_num)
      }
      blockNums.map(async (blockNum, i) => {
        try {
          const block = await rpc.get_block(blockNum)
          setBlocks((blocks) => [...blocks, block])
        } catch (error) {
          errorCount++
          if (errorCount > 3) {
            setErrorBlock(true)
          }
          setTimeout(async () => {
            const block = await rpc.get_block(blockNum)
            setBlocks((savedBlocks) => [...savedBlocks, block])
          }, 1000)
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setErrorInfo(true)
    }
  }

  useEffect(() => {
    main()
  }, [])

  function reloadBlocks() {
    setErrorBlock(false)
    setErrorInfo(false)
    setBlocks([])
    setTimeout(() => {
      main()
    }, 500)
  }

  function renderBlocks(blocks) {
    return blocks.map((block, i) => {
      const actionCount = block.transactions.reduce(
        (acc, curr) => acc + curr?.trx?.transaction.actions.length,
        0
      )

      return (
        <Block
          key={block.id}
          id={block.id}
          timestamp={block.timestamp}
          actionCount={actionCount}
          raw={block}
          index={i + 1}
        />
      )
    })
  }

  if (errorBlock) {
    return <ErrorBlock reloadBlocks={reloadBlocks} />
  }

  if (errorInfo) {
    return <ErrorBlock reloadBlocks={reloadBlocks} />
  }

  if (loading) {
    return <p data-testid='loading state'>Loading</p>
  }

  return (
    <div
      className='App'
      test-id='application wrapper'
      data-testid='blocks container'
    >
      <header>
        <button onClick={reloadBlocks}>Load</button>
      </header>
      <section data-testid='blocks'>{renderBlocks(blocks)}</section>
    </div>
  )
}

export default App
