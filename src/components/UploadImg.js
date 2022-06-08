import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const UploadImg = ({ setImgSrc }) => {
  const [imgFile, setImgFile] = useState();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  }
  const handleSubmit = () => {
    setShowModal(false);
    setImgSrc(imgFile);
  }
  
  return (
    <>
      <Button 
        className='custom-btn' 
        size='lg' 
        onClick={()=> setShowModal(true)}
      >
        +
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Upload an Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control 
              type='file' 
              accept="image/*" 
              onChange={(e)=> setImgFile(e.target.files[0])}>
            </Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            onClick={handleSubmit}>
            Upload
          </Button>
        </Modal.Footer>
        
      </Modal>
    </>
  )
}

export default UploadImg
