import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react'
import { Carousel, Dropdown, Image, Modal } from 'react-bootstrap'
import { appFirestore, appStorage } from '../firebase/config';

const PictureModal = ({ modalImgIdx, urlArray, showPictureModal, setShowPictureModal }) => {

  const [ carouselIndex, setCarouselIndex ] = useState(0);

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

  /* const handleSlide = () => {
    console.log(activeIndex);
  } */
  
  const closePictureModal = () => {
    setShowPictureModal(false);
  }

  const deleteImage = (idx) => {
    
    const storageRef = ref(appStorage, urlArray[idx].filePath);

    deleteObject(storageRef)
      .then(()=> {
        console.log('Image deleted from storage.')
      })
      .catch((err) => {
        console.error(err);
      });

    const docInfo = doc(appFirestore, urlArray[idx].filePath);
    deleteDoc(docInfo)
      .then(()=> {
        console.log('Image doc deleted from firestore.')
      })
      .catch((err) => {
        console.error(err);
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
    >
      <Carousel 
        slide={false} 
        interval={null} 
        defaultActiveIndex={modalImgIdx}
        indicators={false}
        wrap={false}
        onSelect={(idx)=>setCarouselIndex(idx)}
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
            onClick={()=> downloadImage(carouselIndex)}
          >
              Download
          </Dropdown.Item>
          <Dropdown.Item 
            onClick={()=> deleteImage(carouselIndex)}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Modal>
  )
}

export default PictureModal
