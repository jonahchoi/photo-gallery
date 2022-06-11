import React from 'react'
import { ProgressBar, Spinner } from 'react-bootstrap'

const LoadingSpinner = ({loadSpinnerStatus}) => {

  const variantType = loadSpinnerStatus === 'delete' ? 'danger' : '';

  return (
    <>
      {loadSpinnerStatus ? 
        <Spinner animation='border' role='load-status' variant={variantType}>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
        : ''
      }
      
    </>
  )
}

export default LoadingSpinner
