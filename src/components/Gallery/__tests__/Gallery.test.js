import React from 'react';
import Gallery from '../Gallery';

import { render } from '@testing-library/react';

describe('Gallery test', () => {

  const testUrlArray = [
    {url: 'https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_960_720.jpg'},
    {url: 'https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg'}, 
    {url: 'https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_960_720.png'}
  ];

  it('gallery renders without crashing', () => {
    const {getByTestId} = render(<Gallery />);
    const gallery = getByTestId('gallery');
    expect(gallery).toBeTruthy();
  });
  
  it('gallery renders images when passed urlArray', () => {
    const {getByTestId} = render(<Gallery urlArray={testUrlArray} />);
    const galleryRow = getByTestId('gallery-row');
    const cols = galleryRow.querySelectorAll('.custom-col');
    expect(galleryRow).toBeTruthy();
    expect(cols).toHaveLength(3);
  });

  //Test on click

})
