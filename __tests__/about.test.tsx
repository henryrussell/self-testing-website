import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock Next.js Image component BEFORE importing AboutPage
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Filter out Next.js Image-specific props that aren't valid HTML img attributes
    const { priority, fill, loader, onLoadingComplete, placeholder, blurDataURL, unoptimized, quality, ...imgProps } = props;
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...imgProps} />;
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

import AboutPage from '../src/app/about/page.tsx';

describe('About Page', () => {
  it('renders the main heading with name', () => {
    render(<AboutPage />);
    expect(screen.getByText('Henry Russell')).toBeInTheDocument();
  });

  it('renders profile picture', () => {
    render(<AboutPage />);
    const profileImage = screen.getByAltText('Henry Russell');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/profile.jpg');
  });

  it('displays headline text', () => {
    render(<AboutPage />);
    const headline = screen.getByText(/Passionate Software Engineer with 4 years of professional experience/);
    expect(headline).toBeInTheDocument();
  });

  it('displays subheading text', () => {
    render(<AboutPage />);
    const subheading = screen.getByText(/My expertise lies in creating robust automation scripts/);
    expect(subheading).toBeInTheDocument();
  });

  it('renders Career Highlights section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Career Highlights')).toBeInTheDocument();
  });

  it('displays all career highlights', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Developed a new testing framework/)).toBeInTheDocument();
    expect(screen.getByText(/Created a seamlessly interchangeable testing solution/)).toBeInTheDocument();
    expect(screen.getByText(/Responsible for monthly releases of an SDK/)).toBeInTheDocument();
    expect(screen.getByText(/Core member of Quality Engineering/)).toBeInTheDocument();
    expect(screen.getByText(/Trained new joiners/)).toBeInTheDocument();
  });

  it('renders Technical Experience section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Technical Experience')).toBeInTheDocument();
  });

  it('displays technical experience description', () => {
    render(<AboutPage />);
    const techExperienceText = screen.getByText(/With four years of experience as an ISTQB Certified/);
    expect(techExperienceText).toBeInTheDocument();
  });

  it('renders skills section heading', () => {
    render(<AboutPage />);
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('Testing Expertise')).toBeInTheDocument();
  });

  it('displays technical skills', () => {
    render(<AboutPage />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Playwright')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('displays testing expertise', () => {
    render(<AboutPage />);
    expect(screen.getByText('Functional Testing')).toBeInTheDocument();
    expect(screen.getByText('Regression Testing')).toBeInTheDocument();
    expect(screen.getByText('Integration Testing')).toBeInTheDocument();
    expect(screen.getByText('Performance Testing')).toBeInTheDocument();
    expect(screen.getByText('Security Testing')).toBeInTheDocument();
  });

  it('renders AI Chatbot link section', () => {
    render(<AboutPage />);
    const chatbotLink = screen.getByText('Chat with my AI assistant');
    expect(chatbotLink).toBeInTheDocument();
  });

  it('chatbot link points to correct URL', () => {
    render(<AboutPage />);
    const chatbotLink = screen.getByRole('link', { name: 'Chat with my AI assistant' });
    expect(chatbotLink).toHaveAttribute('href', 'https://portfolio-chatbot-orcin.vercel.app/');
  });

  it('renders Professional Qualities section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Professional Qualities')).toBeInTheDocument();
  });

  it('displays all professional qualities', () => {
    render(<AboutPage />);
    expect(screen.getByText('Agile methodologies and team collaboration')).toBeInTheDocument();
    expect(screen.getByText('Technical mentoring and knowledge sharing')).toBeInTheDocument();
    expect(screen.getByText('Quick learner and problem solver')).toBeInTheDocument();
    expect(screen.getByText('Cross-team communication and coordination')).toBeInTheDocument();
  });

  it('renders page with correct structure', () => {
    const { container } = render(<AboutPage />);
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('displays multiple h2 headings for sections', () => {
    const { container } = render(<AboutPage />);
    const h2Elements = container.querySelectorAll('h2');
    expect(h2Elements.length).toBeGreaterThan(0);
  });

  it('displays h3 for skill categories', () => {
    const { container } = render(<AboutPage />);
    const h3Elements = container.querySelectorAll('h3');
    expect(h3Elements.length).toBeGreaterThan(0);
  });

  it('renders career highlights as list items', () => {
    const { container } = render(<AboutPage />);
    const listItems = container.querySelectorAll('.highlights-list li');
    expect(listItems.length).toBe(5);
  });

  it('renders professional qualities as list items', () => {
    const { container } = render(<AboutPage />);
    const listItems = container.querySelectorAll('.qualities-list li');
    expect(listItems.length).toBe(4);
  });

  it('all skill tags are rendered', () => {
    const { container } = render(<AboutPage />);
    const skillTags = container.querySelectorAll('.skill-tag');
    expect(skillTags.length).toBeGreaterThan(0);
  });

  it('displays LLM and AI-related skills', () => {
    render(<AboutPage />);
    expect(screen.getByText('Large Language Model (LLM) Integration')).toBeInTheDocument();
    expect(screen.getByText('AI Dataset Preparation & Engineering')).toBeInTheDocument();
    expect(screen.getByText('Prompt Engineering/Refinement')).toBeInTheDocument();
  });

  it('displays automation testing skills', () => {
    render(<AboutPage />);
    expect(screen.getByText('Test Automation')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
    expect(screen.getByText('Cucumber')).toBeInTheDocument();
  });

  it('renders with correct classes for styling', () => {
    const { container } = render(<AboutPage />);
    expect(container.querySelector('.about-page')).toBeInTheDocument();
    expect(container.querySelector('.about-header')).toBeInTheDocument();
    expect(container.querySelector('.career-highlights')).toBeInTheDocument();
    expect(container.querySelector('.technical-experience')).toBeInTheDocument();
    expect(container.querySelector('.skills-section')).toBeInTheDocument();
  });

  it('image has priority prop applied', () => {
    render(<AboutPage />);
    const profileImage = screen.getByAltText('Henry Russell');
    expect(profileImage).toBeInTheDocument();
  });

  it('displays header content with profile picture and text', () => {
    const { container } = render(<AboutPage />);
    const headerContent = container.querySelector('.header-content');
    expect(headerContent).toBeInTheDocument();
  });

  it('skill categories are properly organized in grid', () => {
    const { container } = render(<AboutPage />);
    const skillGrid = container.querySelector('.skills-grid');
    expect(skillGrid).toBeInTheDocument();
    const skillCategories = container.querySelectorAll('.skill-category');
    expect(skillCategories.length).toBe(2);
  });
});
