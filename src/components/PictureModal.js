import React from 'react'
import { Button, Carousel, Dropdown, DropdownButton, Image, Modal } from 'react-bootstrap'

const PictureModal = ({ modalImgIdx, urlArray, showPictureModal, setShowPictureModal }) => {

  let carouselArray = [];
  if(urlArray){
    for(let idx = 0; idx < urlArray.length; idx++){
    carouselArray.push(
      <Carousel.Item key={idx}>
        <Image style={{width: '100%', maxHeight: '90vh'}} src={urlArray[idx]}></Image>
      </Carousel.Item>

    );
  }
  }
  
  const closePictureModal = () => {
    setShowPictureModal(false);
  }
  const deleteImage = () => {
    
  }

  return (
    
    <Modal dialogClassName='custom-modal-dialog' show={showPictureModal} onHide={closePictureModal} centered size='lg'>
      
      <Carousel 
        slide={false} 
        interval={null} 
        defaultActiveIndex={modalImgIdx}
        indicators={false}
        wrap={false}>
        {carouselArray}
      </Carousel>
      <Dropdown className='modal-btn' align='end'
      drop='up'>
        <Dropdown.Toggle><i class="bi bi-three-dots-vertical"></i></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Download</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Modal>
  )
}

export default PictureModal
