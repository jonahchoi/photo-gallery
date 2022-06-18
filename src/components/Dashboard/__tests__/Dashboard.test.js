import React from 'react';
import Dashboard from '../Dashboard';

import { render } from '@testing-library/react';

describe('Dashboard test', () => {
  it('dashboard renders', () => {
    const {getByTestId} = render(<Dashboard />);
    const dashboard = getByTestId('dashboard');
    expect(dashboard).toBeTruthy();
  })

})