import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page.tsx';

describe('Home Page', () => {

  it('renders the main content', () => {
    render(<Home />);

    // Check for main title
    expect(screen.getByRole('heading', { name: 'THE SELF TESTING WEBSITE' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'RUN THE TESTS:' })).toBeInTheDocument();

    // Check for intro section
    const intro = screen.getByTestId('intro');
    expect(intro).toBeInTheDocument();

    // Check for the test runner button
    expect(screen.getByRole('button', { name: 'Run All Tests' })).toBeInTheDocument();
  });

  it('displays introduction text', () => {
    render(<Home />);

    const introText = screen.getByText(/I came up with this unique idea to showcase my software engineering skills/);
    expect(introText).toBeInTheDocument();
  });
});
