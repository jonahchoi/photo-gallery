import React, { useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

const Gallery = ({ urlArray, setModalImgIdx, setShowPictureModal }) => {
  
  const handleClick = (urlIdx) => {
    setModalImgIdx(urlIdx);
    setShowPictureModal(true);
  }
  
  let rowsArray = [];
  for(let idx = 0; idx < urlArray.length; idx+=3){
    
    rowsArray.push(
      <Row key={idx} xs={3}>
        <Col 
          className='custom-col' 
          onClick={()=> handleClick(idx)} 
          style={{
          backgroundImage: `url('${urlArray[idx]}')`
          }} 
        />
        {urlArray[idx+1] ? 
        <Col 
          className='custom-col' 
          onClick={()=> handleClick(idx+1)} 
          style={{
          backgroundImage: `url(${urlArray[idx+1]})`
          }} 
        />
        : ''
        }
        {urlArray[idx+2] ? 
        <Col 
          className='custom-col' 
          onClick={()=> handleClick(idx+2)} 
          style={{
          backgroundImage: `url(${urlArray[idx+2]})`
          }} 
        />
        : ''
        }
      </Row>
    ) 
  }
  
  return (
    <Container>
        {rowsArray}
    </Container>
  )
}

export default Gallery
