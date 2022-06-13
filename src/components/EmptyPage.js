import React from 'react'
import { Image } from 'react-bootstrap'
import UploadImg from './UploadImg'

const EmptyPage = () => {
  return (
    <div>
      <p style={{fontSize: '2rem', fontWeight:'600', paddingTop: '4rem'}}>
        <i className="bi bi-camera"></i>
        <br />
        There's nothing here yet!
      </p>
      <div className='add-image-tooltip'>
        <span>Click here to add an image!</span>
      </div>
    </div>
    
  )
}

export default EmptyPage
