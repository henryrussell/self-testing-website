import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProjectsPage from '../src/app/projects/page.tsx';

// Mock ProjectCard component
jest.mock('../src/app/components/ProjectCard', () => {
  return function MockProjectCard({ title, description, link }: Project) {
    return (
      <div data-testid="project-card-mock">
        <h3>{title}</h3>
        <p>{description}</p>
        {link && <a href={link}>Link</a>}
      </div>
    );
  };
});

describe('Projects Page', () => {
  it('renders the main projects section heading', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('My Projects')).toBeInTheDocument();
  });

  it('renders projects grid container', () => {
    const { container } = render(<ProjectsPage />);
    expect(container.querySelector('.projects-grid')).toBeInTheDocument();
  });

  it('renders all three project cards', () => {
    render(<ProjectsPage />);
    const projectCards = screen.getAllByTestId('project-card-mock');
    expect(projectCards.length).toBe(3);
  });

  it('renders AI Chatbot project', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('AI Chatbot')).toBeInTheDocument();
    expect(
      screen.getByText(/web application that showcases an AI model/i)
    ).toBeInTheDocument();
  });

  it('renders Flocking Simulation project', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Flocking Simulation')).toBeInTheDocument();
    expect(
      screen.getByText(/project is from my one of my Electronic Engineering modules/i)
    ).toBeInTheDocument();
  });

  it('renders This website project', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('This website!')).toBeInTheDocument();
    expect(
      screen.getByText(/website you are currently on/i)
    ).toBeInTheDocument();
  });

  it('AI Chatbot project has correct link', () => {
    render(<ProjectsPage />);
    const links = screen.getAllByText('Link');
    expect(links[0]).toHaveAttribute('href', 'https://portfolio-chatbot-orcin.vercel.app/');
  });

  it('AI Chatbot description mentions LLM training', () => {
    render(<ProjectsPage />);
    expect(
      screen.getByText(/trained on a dataset of my personal career history/i)
    ).toBeInTheDocument();
  });

  it('Flocking Simulation description mentions Java', () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/java project that simulates/i)).toBeInTheDocument();
  });

  it('This website project mentions GitHub Actions', () => {
    render(<ProjectsPage />);
    expect(
      screen.getByText(/runs tests on itself using a github actions pipeline/i)
    ).toBeInTheDocument();
  });

  it('renders main section with id "projects"', () => {
    const { container } = render(<ProjectsPage />);
    const section = container.querySelector('#projects');
    expect(section).toBeInTheDocument();
  });

  it('projects are rendered in correct order', () => {
    render(<ProjectsPage />);
    const projectTexts = screen.getAllByRole('heading', { level: 3 });
    expect(projectTexts[0].textContent).toBe('AI Chatbot');
    expect(projectTexts[1].textContent).toBe('Flocking Simulation');
    expect(projectTexts[2].textContent).toBe('This website!');
  });

  it('each project has description paragraph', () => {
    render(<ProjectsPage />);
    const descriptions = screen.getAllByRole('paragraph');
    expect(descriptions.length).toBeGreaterThanOrEqual(3);
  });

  it('renders all project cards with proper data-testid', () => {
    const { container } = render(<ProjectsPage />);
    const mockCards = container.querySelectorAll('[data-testid="project-card-mock"]');
    expect(mockCards.length).toBe(3);
  });

  it('page is wrapped in main div', () => {
    const { container } = render(<ProjectsPage />);
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('renders page with correct structure', () => {
    const { container } = render(<ProjectsPage />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('projects grid has multiple children', () => {
    const { container } = render(<ProjectsPage />);
    const grid = container.querySelector('.projects-grid');
    const children = grid?.children;
    expect(children?.length).toBe(3);
  });

  it('Flocking project mentions university module', () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Electronic Engineering modules/i)).toBeInTheDocument();
  });

  it('Flocking project mentions algorithms and data structures', () => {
    render(<ProjectsPage />);
    expect(
      screen.getByText(/understanding of algorithms and data structures/i)
    ).toBeInTheDocument();
  });

  it('Website project mentions showcase skills', () => {
    render(<ProjectsPage />);
    expect(
      screen.getByText(/unique way to showcase my software engineering skills/i)
    ).toBeInTheDocument();
  });

  it('Website project mentions interactive experience', () => {
    render(<ProjectsPage />);
    expect(
      screen.getByText(/interactive and engaging experience for visitors/i)
    ).toBeInTheDocument();
  });

  it('AI Chatbot mentions hands on experience', () => {
    render(<ProjectsPage />);
    expect(
      screen.getByText(/hands on experience with AI model training and fine-tuning/i)
    ).toBeInTheDocument();
  });

  it('renders section with role region or section element', () => {
    const { container } = render(<ProjectsPage />);
    const section = container.querySelector('#projects');
    expect(section?.tagName.toLowerCase()).toBe('section');
  });

  it('displays h2 heading for projects title', () => {
    const { container } = render(<ProjectsPage />);
    const h2Elements = container.querySelectorAll('h2');
    expect(h2Elements.length).toBeGreaterThan(0);
    expect(h2Elements[0].textContent).toBe('My Projects');
  });
});
