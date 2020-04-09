import React, { useState } from 'react'
import PropTypes from 'prop-types'
import JSONPretty from 'react-json-pretty'
import moment from 'moment'
import 'react-json-pretty/themes/1337.css'

function Block({ id, timestamp, actionCount, raw, index }) {
  const [showRaw, setShowRaw] = useState(false)

  function toggleShowRaw() {
    setShowRaw(!showRaw)
  }

  return (
    <div
      style={{ padding: 15, cursor: 'pointer' }}
      data-testid='info container'
      onClick={toggleShowRaw}
    >
      {!showRaw ? (
        <div data-testid='basic block info'>
          <h2>{index}</h2>
          <h3>{id}</h3>
          <h3>{moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')}</h3>
          <h3>Action Count: {actionCount}</h3>
        </div>
      ) : (
        <div data-testid='pretty json data'>
          <JSONPretty id='json-pretty' data={raw}></JSONPretty>
        </div>
      )}
    </div>
  )
}

Block.propTypes = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  actionCount: PropTypes.number.isRequired,
  raw: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default Block
