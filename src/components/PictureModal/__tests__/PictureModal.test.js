import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PictureModal from '../PictureModal';
import { act } from 'react-test-renderer';

const testUrlArray = [
  {url: 'https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg',
  filepath: 'test.jpg'},
  {url: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg'}, 
  {url: 'https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_960_720.png'}
];

const props = { 
  modalImgIdx: 0, 
  urlArray: testUrlArray, 
  showPictureModal: true
}

describe('PictureModal render test', () => {
  it('PictureModal renders', () => {
    const {getByTestId} = render(<PictureModal {...props} />);
    const pictureModal = getByTestId('picture-modal');
    expect(pictureModal).toBeTruthy();
  });
  
  it('PictureModal has correct number of images in carousel', () => {
    const { getByTestId, getAllByRole} = render(<PictureModal {...props} />);
    const pictures = getAllByRole('img');
    expect(pictures).toHaveLength(3);
    const pictureModal = getByTestId('picture-modal');
    expect(pictureModal).toMatchSnapshot();
  });
  
  it('Dropdown toggle works', async () => {
    
    const { getByRole, getByText } = render(<PictureModal {...props} />);
    
    await act( async ()=>{
      const toggleButton = getByRole('button', {name: 'dropdown toggle button'});
      await fireEvent.click(toggleButton);
    });
    const downloadButton = getByText('Download');
    const deleteButton = getByText('Delete');
    expect(downloadButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
    
  });
  
  it('Download button works', async () => {
    const mockDownload = jest.fn();
    
    const { getByRole, getByText } = render(<PictureModal {...props} />);
    
    await act( async ()=>{
      const toggleButton = getByRole('button', {name: 'dropdown toggle button'});
      await fireEvent.click(toggleButton);
    });
    const downloadButton = getByText('Download');
    downloadButton.onclick = mockDownload;
    await fireEvent.click(downloadButton);
    
    expect(mockDownload.mock.calls.length).toBe(1);
    
  });
  
  
})
