import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = ({loadSpinnerStatus}) => {

  const variantType = loadSpinnerStatus === 'delete' ? 'danger' : '';

  return (
    <>
      {loadSpinnerStatus ? 
        <Spinner 
          animation='border' 
          role='load-status' 
          variant={variantType}
          data-testid='loading-spinner'
          className='hi'
        >
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
        : ''
      }
      
    </>
  )
}

export default LoadingSpinner
