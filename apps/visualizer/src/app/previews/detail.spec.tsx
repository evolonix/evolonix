import { render } from '@testing-library/react';

import { Component } from './detail';

describe('Preview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Component />);
    expect(baseElement).toBeTruthy();
  });
});
