import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import EmptyPage from './EmptyPage';

const Gallery = ({ urlArray, setModalImgIdx, setShowPictureModal }) => {
  
  const handleClick = (urlIdx) => {
    console.log(urlIdx);
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
          backgroundImage: `url('${urlArray[idx].url}')`
          }} 
        />
        {urlArray[idx+1] ? 
        <Col 
          className='custom-col' 
          onClick={()=> handleClick(idx+1)} 
          style={{
          backgroundImage: `url(${urlArray[idx+1].url})`
          }} 
        />
        : ''
        }
        {urlArray[idx+2] ? 
        <Col 
          className='custom-col' 
          onClick={()=> handleClick(idx+2)} 
          style={{
          backgroundImage: `url(${urlArray[idx+2].url})`
          }} 
        />
        : ''
        }
      </Row>
    ) 
  }
  
  return (
    <Container>
        {rowsArray.length === 0 ? <EmptyPage /> : rowsArray}
    </Container>
  )
}

export default Gallery
