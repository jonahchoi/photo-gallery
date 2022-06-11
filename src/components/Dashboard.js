import React, { useState } from 'react'
import useStorage from '../hooks/useStorage';
import Gallery from './Gallery'
import LoadingSpinner from './LoadingSpinner';
import PictureModal from './PictureModal';
import UploadImg from './UploadImg'

/* 
  Todo/Possible changes
  1. Fix kebab button
  2. Add buttons for scrolling picture modal
  3. Add image preview before "posting"
  4. Check file to make sure its an image?
*/
const Dashboard = () => {
  
  const [ modalImgIdx, setModalImgIdx ] = useState('');
  const [ showPictureModal, setShowPictureModal ] = useState(false);
  const [ loadSpinnerStatus, setLoadSpinnerStatus ] = useState('');
  const [ urlArray, setImgSrc ] = useStorage([], setLoadSpinnerStatus);

  return (
    <div className='text-center'>
      <div className='position-sticky border-bottom' style={{minHeight: '45px'}}>
        <h1 className='header' style={{fontSize: "2rem", fontFamily: 'Fascinate'}}>Photo Real</h1>
      </div>
      <h2 className='m-4' style={{fontSize: '2.5rem'}}>Your Profile</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      <LoadingSpinner loadSpinnerStatus={loadSpinnerStatus} />
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
        setLoadSpinnerStatus={setLoadSpinnerStatus}
      />
      <UploadImg 
        setImgSrc={setImgSrc}
      />
    </div>
  )
}

export default Dashboard
