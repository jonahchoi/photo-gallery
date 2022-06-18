import React from 'react';
import EmptyPage from '../EmptyPage';
import { render } from '@testing-library/react';

describe('EmptyPage test', () => {
  it('emptypage renders', () => {
    const {getByTestId} = render(<EmptyPage />);
    const emptyPage = getByTestId('emptypage');
    expect(emptyPage).toBeTruthy();
  });
  
})



