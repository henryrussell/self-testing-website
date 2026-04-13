import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../src/app/components/Header';

describe('Header Navigation', () => {

  it('renders navigation links', () => {
    render(<Header />);

    // Check for all main navigation links
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About Me' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
  });

  it('has proper header structure', () => {
    const { container } = render(<Header />);

    // Check for header element with test-id
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('HEADER');
  });
});
