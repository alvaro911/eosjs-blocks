import React from 'react'
import PropTypes from 'prop-types'

function ErrorBlock({ reloadBlocks }) {
  const reload = () => {
    reloadBlocks()
  }

  return (
    <div
      style={{
        backgroundColor: 'pink',
        color: 'red',
        width: '100%',
        padding: 10,
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
      }}
      data-testid='error block'
    >
      <p style={{ marginRight: 15 }} data-testid='error message'>
        There was a problem getting the blocks, Please try again
      </p>
      <button
        data-testid='error button'
        style={{ backgroundColor: 'red', width: 85, height: 40 }}
        onClick={reload}
      >
        Reload
      </button>
    </div>
  )
}

ErrorBlock.propTypes = {
  reloadBlocks: PropTypes.func,
}

export default ErrorBlock
