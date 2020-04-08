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
        alignItems: 'center'
      }}
    >
      <p style={{ marginRight: 15 }}>
        There was a problem getting the blocks, Please try again
      </p>
      <button
        style={{ backgroundColor: 'red', width: 85, height: 40 }}
        onClick={reload}
      >
        Reload
      </button>
    </div>
  )
}

ErrorBlock.propTypes = {
  reloadBlocks: PropTypes.func
}

export default ErrorBlock
