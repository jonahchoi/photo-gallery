import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import useStorage from '../hooks/useStorage';
import Gallery from './Gallery'
import PictureModal from './PictureModal';
import UploadImg from './UploadImg'

const Dashboard = () => {
  const [urlArray, setImgSrc] = useStorage([]);
  const [ modalImg, setModalImg ] = useState('');
  const [ showPictureModal, setShowPictureModal ] = useState(false);

  return (
    <div className='text-center' style={{backgroundColor: 'grey'}}>
      <h1 className='position-sticky' style={{fontSize: "2rem"}}>Photo Real</h1>
      <h2>Your Profile</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      <PictureModal modalImg={modalImg} showPictureModal={showPictureModal} setShowPictureModal={setShowPictureModal} />
      <Gallery urlArray={urlArray} setModalImg={setModalImg} setShowPictureModal={setShowPictureModal} />
      <UploadImg setImgSrc={setImgSrc} />
    </div>
  )
}

export default Dashboard
