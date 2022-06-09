import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import useStorage from '../hooks/useStorage';
import Gallery from './Gallery'
import PictureModal from './PictureModal';
import UploadImg from './UploadImg'

const Dashboard = () => {
  const [ urlArray, setImgSrc ] = useStorage([]);
  const [ modalImgIdx, setModalImgIdx ] = useState('');
  const [ showPictureModal, setShowPictureModal ] = useState(false);

  return (
    <div className='text-center' style={{backgroundColor: 'grey'}}>
      <h1 className='position-sticky' style={{fontSize: "2rem"}}>Photo Real</h1>
      <h2>Your Profile</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      <Gallery 
        urlArray={urlArray} 
        setModalImgIdx={setModalImgIdx} 
        setShowPictureModal={setShowPictureModal} 
      />
      <PictureModal 
        modalImgIdx={modalImgIdx} 
        urlArray={urlArray} 
        showPictureModal={showPictureModal} 
        setShowPictureModal={setShowPictureModal} 
      />
      <UploadImg 
        setImgSrc={setImgSrc} 
      />
    </div>
  )
}

export default Dashboard
