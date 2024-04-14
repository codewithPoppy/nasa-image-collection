import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from './Image';

describe('Image Component', () => {
  const testImage = {
    href: 'https://example.com/test-image.jpg',
    title: 'Test Image'
  };

  it('renders without crashing', () => {
    render(<Image image={testImage} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
  });

  it('displays the correct image source and alt text', () => {
    render(<Image image={testImage} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', testImage.href);
    expect(imageElement).toHaveAttribute('alt', testImage.title);
  });

  it('shows the correct title', () => {
    render(<Image image={testImage} />);
    expect(screen.getByText(testImage.title)).toBeInTheDocument();
  });
});