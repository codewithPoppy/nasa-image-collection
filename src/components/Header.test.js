import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

// Mock the constants
jest.mock('../utils/constants', () => ({
  HEADER_TEXT: 'Welcome to Our Website'
}));

describe('Header Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })
  it('renders without crashing', () => {
    render(<Header />);
    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toBeInTheDocument();
  });

  it('displays the correct text from constants', () => {
    render(<Header />);
    expect(screen.getByText('Welcome to Our Website')).toBeInTheDocument();
  });
});