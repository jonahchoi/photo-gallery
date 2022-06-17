import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Carousel, Dropdown, Image, Modal } from 'react-bootstrap'
import { appFirestore, appStorage } from '../../firebase/config';

const PictureModal = ({ modalImgIdx, setModalImgIdx, urlArray, showPictureModal, setShowPictureModal, setLoadSpinnerStatus }) => {
  let carouselArray = [];
  if(urlArray){
    for(let idx = 0; idx < urlArray.length; idx++){
      carouselArray.push(
        <Carousel.Item key={idx}>
          <Image 
            style={{width: '100%', maxHeight: '90vh'}} 
            src={urlArray[idx].url} 
          />
        </Carousel.Item>
      );
    }
  }

  const closePictureModal = () => {
    setShowPictureModal(false);
  }

  const deleteImage = (idx) => {

    setLoadSpinnerStatus('delete');
    const storageRef = ref(appStorage, urlArray[idx].filePath);
    const docInfo = doc(appFirestore, urlArray[idx].filePath);
    
    Promise.all([deleteObject(storageRef), deleteDoc(docInfo)])
      .then(()=> {
        console.log('Image deleted from storage and firestore.');
        setLoadSpinnerStatus('');
      })
      .catch((err) => {
        console.error(err);
        setLoadSpinnerStatus('');
      });

    closePictureModal();
  }

  const downloadImage = (idx) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
      const file = new File([blob], urlArray[idx].filePath, { type: blob.type });

      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', URL.createObjectURL(file));
      downloadAnchor.setAttribute('download', file.name)
      
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
    }
    xhr.open('GET', urlArray[idx].url);
    xhr.send();

  }
 
  return (
    
    <Modal 
      dialogClassName='custom-modal-dialog' 
      show={showPictureModal} 
      onHide={closePictureModal} 
      centered 
      size='lg'
      data-testid='picture-modal'
    >
      <Carousel 
        slide={false} 
        interval={null} 
        defaultActiveIndex={modalImgIdx}
        indicators={false}
        wrap={false}
        onSelect={(idx)=>setModalImgIdx(idx)}
      >
        {carouselArray}
      </Carousel>
      <Dropdown 
        className='modal-btn' 
        align='end'
        drop='up'
      >
        <Dropdown.Toggle>
          <i className="bi bi-three-dots-vertical" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item 
            onClick={()=> downloadImage(modalImgIdx)}
          >
              Download
          </Dropdown.Item>
          <Dropdown.Item 
            onClick={()=> deleteImage(modalImgIdx)}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Modal>
  )
}

export default PictureModal
