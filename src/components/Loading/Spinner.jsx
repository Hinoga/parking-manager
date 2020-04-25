import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const SpinnerLoading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      with: '100%',
      margin: '20% auto'
    }}
  >
    <CircularProgress size={80} thickness={4} />
  </div>
)

export default SpinnerLoading
