import React from 'react'
import { Image, Modal } from 'react-bootstrap'

const PictureModal = ({ modalImg, showPictureModal, setShowPictureModal }) => {

  const closePictureModal = () => {
    setShowPictureModal(false);
  }

  return (
    <div>
      <Modal show={showPictureModal} onHide={closePictureModal} centered size='lg'>
        <Image src={modalImg}></Image>
      </Modal>
    </div>
  )
}

export default PictureModal
