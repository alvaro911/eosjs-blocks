import React, { useState } from 'react'
import PropTypes from 'prop-types'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/themes/monikai.css'

import { format } from 'date-fns'
import { parseISO } from 'date-fns/esm'

function Block({ id, timestamp, actionCount, raw, index }) {
  const [showRaw, setShowRaw] = useState(false)

  function toggleShowRaw() {
    setShowRaw(!showRaw)
  }

  return (
    <div style={{ padding: 15, cursor: 'pointer' }} onClick={toggleShowRaw}>
      {!showRaw ? (
        <div>
          <h2>{index}</h2>
          <h3>{id}</h3>
          <h3>{format(parseISO(timestamp), 'MM/dd/yyyy HH:mm:ss')}</h3>
          <h3>Action Count: {actionCount}</h3>
        </div>
      ) : (
        <JSONPretty id='json-pretty' data={raw}></JSONPretty>
      )}
    </div>
  )
}

Block.propTypes = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  actionCount: PropTypes.number.isRequired,
  raw: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default Block
