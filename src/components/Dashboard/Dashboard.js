import React, { useState } from 'react'
import useStorage from '../../hooks/useStorage';
import Gallery from '../Gallery/Gallery'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import PictureModal from '../PictureModal/PictureModal';
import UploadImg from '../UploadImg/UploadImg'

/* 
  Future Todo/Possible changes
  1. Add testing
  2. Fix kebab button
  3. Add seperate buttons for scrolling picture modal
  4. Add image preview before "posting"
  5. Check file to make sure its an image?
  6. Make delete button red 
  7. Add loading images functionality, instead of loading all images at once
  8. Seperate accounts and login page -> instagram clone
*/
const Dashboard = () => {
  
  const [ modalImgIdx, setModalImgIdx ] = useState('');
  const [ showPictureModal, setShowPictureModal ] = useState(false);
  const [ loadSpinnerStatus, setLoadSpinnerStatus ] = useState('');
  const [ urlArray, setImgSrc ] = useStorage([], setLoadSpinnerStatus);

  return (
    <div data-testid='dashboard' className='text-center'>
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
        setModalImgIdx={setModalImgIdx}
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
