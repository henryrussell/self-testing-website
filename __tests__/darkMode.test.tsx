import DarkModeToggle from '../src/app/components/DarkModeToggle';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('DarkModeToggle Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Clear document body classes
    document.body.className = '';
  });

  it('renders the toggle button', () => {
    render(<DarkModeToggle><div>Test</div></DarkModeToggle>);
    const button = screen.getByTestId('dark-mode-button');
    expect(button).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<DarkModeToggle><div>Test Content</div></DarkModeToggle>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<DarkModeToggle><div>Test</div></DarkModeToggle>);
    const button = screen.getByTestId('dark-mode-button');
    expect(button).toHaveAttribute('aria-label', 'Toggle dark mode');
  });

  it('defaults to dark theme on initial render', () => {
    render(<DarkModeToggle><div>Test</div></DarkModeToggle>);
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('toggles theme when button is clicked', () => {
    render(<DarkModeToggle><div>Test</div></DarkModeToggle>);
    const button = screen.getByTestId('dark-mode-button');
    
    // Initially dark
    expect(document.body.classList.contains('dark')).toBe(true);
    
    // Click to toggle to light
    fireEvent.click(button);
    expect(document.body.classList.contains('dark')).toBe(false);
    
    // Click to toggle back to dark
    fireEvent.click(button);
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('persists theme to localStorage', () => {
    render(<DarkModeToggle><div>Test</div></DarkModeToggle>);
    const button = screen.getByTestId('dark-mode-button');
    
    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('light');
    
    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('loads saved theme from localStorage on render', () => {
    localStorage.setItem('theme', 'light');
    render(<DarkModeToggle><div>Test</div></DarkModeToggle>);
    
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('removes dark class when switching to light theme', () => {
    render(<DarkModeToggle><div>Test</div></DarkModeToggle>);
    const button = screen.getByTestId('dark-mode-button');
    
    expect(document.body.classList.contains('dark')).toBe(true);
    fireEvent.click(button);
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('renders light bulb icon in dark theme', () => {
    render(<DarkModeToggle><div>Test</div></DarkModeToggle>);
    const button = screen.getByTestId('dark-mode-button');
    
    // Check that the button contains SVG (from HiLightBulb icon)
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('maintains theme state across multiple renders', () => {
    const { rerender } = render(<DarkModeToggle><div>Test 1</div></DarkModeToggle>);
    const button = screen.getByTestId('dark-mode-button');
    
    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('light');
    
    // Re-render with different children
    rerender(<DarkModeToggle><div>Test 2</div></DarkModeToggle>);
    // Theme should still be light
    expect(document.body.classList.contains('dark')).toBe(false);
  });
});
