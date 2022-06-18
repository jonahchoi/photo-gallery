import React from 'react';
import App from '../App';
import { render } from '@testing-library/react';

describe('App test', () => {
  it('app renders',() => {
    const {getByTestId} = render(<App />);
    const app = getByTestId('app');
    expect(app).toBeTruthy();
  });
  
})