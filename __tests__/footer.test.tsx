import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '../src/app/components/Footer';

describe('Footer', () => {

  it('renders social media links', () => {
    render(<Footer />);

    // Check for LinkedIn and GitHub links in footer
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn Profile' });
    const githubLink = screen.getByRole('link', { name: 'GitHub Profile' });

    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
  });

  it('social links open in new tab', () => {
    render(<Footer />);

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn Profile' });
    const githubLink = screen.getByRole('link', { name: 'GitHub Profile' });

    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays last updated date', () => {
    render(<Footer />);

    // Check that "Last updated" text is present
    const lastUpdatedText = screen.getByText(/Last updated/);
    expect(lastUpdatedText).toBeInTheDocument();
  });

  it('has proper footer structure', () => {
    render(<Footer />);

    // Check for footer element with test-id
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe('FOOTER');
  });
});
