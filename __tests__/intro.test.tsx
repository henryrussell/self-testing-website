import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Intro from '../src/app/components/Intro';

describe('Intro Component', () => {

  it('renders the intro section', () => {
    render(<Intro />);

    const intro = screen.getByTestId('intro');
    expect(intro).toBeInTheDocument();
  });

  it('displays main title', () => {
    render(<Intro />);

    // Check for the main title heading
    const titleHeading = screen.getByRole('heading', { name: 'THE SELF TESTING WEBSITE' });
    expect(titleHeading).toBeInTheDocument();
  });

  it('displays introduction content', () => {
    render(<Intro />);

    // Check for key description text
    const descriptionText = screen.getByText(/unique idea to showcase my software engineering skills/);
    expect(descriptionText).toBeInTheDocument();
  });

  it('has correct structure', () => {
    const { container } = render(<Intro />);

    // Check for h1 and p elements
    const h1 = container.querySelector('h1');
    const p = container.querySelector('p');

    expect(h1).toBeInTheDocument();
    expect(p).toBeInTheDocument();
  });
});
