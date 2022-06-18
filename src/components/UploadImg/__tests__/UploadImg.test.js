import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import UploadImg from '../UploadImg';
import { act } from 'react-test-renderer';

describe('UploadImg test', () => {
  let mockSetSrc;
  beforeEach(()=> {
    mockSetSrc = jest.fn();
  })
  
  it('UploadImg button renders, and modal does not on start', () => {
    const { getByRole, queryByTestId } = render(<UploadImg />);
    
    const addButton = getByRole('button');
    expect(addButton).toBeTruthy();
    
    const modal = queryByTestId('addImageModal');
    expect(modal).toBeFalsy();
  });
  
  it('UploadImg button click shows modal', async () => {
    const { getByRole, getByTestId } = render(<UploadImg />);
    
    await act(async () => {
      const addButton = getByRole('button');
      await fireEvent.click(addButton);
    })
    
    const modal = getByTestId('addImageModal');
    expect(modal).toBeTruthy();
  });
  
  it('submit button click hides modal', async () => {
    const { getByRole, queryByTestId, getByTestId } = render(<UploadImg setImgSrc={mockSetSrc} />);
    
    await act(async () => {
      const addButton = getByRole('button');
      await fireEvent.click(addButton);
    })
    
    const modal1 = getByTestId('addImageModal');
    expect(modal1).toBeTruthy();
    
    await act(async () => {
      const uploadButton = getByRole('button', {name: 'submit button to upload'});
      await fireEvent.click(uploadButton);
    })
    
    const modal2 = queryByTestId('addImageModal');
    expect(modal2).toBeFalsy();
    
  });
  
  
})