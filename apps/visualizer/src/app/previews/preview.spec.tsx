import { render } from '@testing-library/react';

import { Component } from './preview';

describe('Preview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Component />);
    expect(baseElement).toBeTruthy();
  });
});
