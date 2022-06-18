import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('Loading Spinner test', () => {
  it('Loading spinner renders', () => {
    const {getByTestId} = render(<LoadingSpinner loadSpinnerStatus={'loading'} />);
    const loader = getByTestId('loading-spinner');
    expect(loader).toBeTruthy();
  });
  
  it('Loading spinner doesnt render with no spinnerStatus', () => {
    const {queryByTestId} = render(<LoadingSpinner loadSpinnerStatus={''} />);
    const loader = queryByTestId('loading-spinner');
    expect(loader).toBeFalsy();
  });
  
  it('Loading spinner should be danger variant when passed delete', () => {
    const {getByTestId} = render(<LoadingSpinner loadSpinnerStatus={'delete'} />);
    const loader = getByTestId('loading-spinner');
    expect(loader.getAttribute('class')).toMatch('text-danger');
  });
})