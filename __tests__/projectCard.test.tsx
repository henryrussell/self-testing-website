import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProjectCard from '../src/app/components/ProjectCard';

// Mock Next.js Image component
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

describe('ProjectCard Component', () => {
  const mockProject: Project = {
    title: 'Test Project',
    description: 'This is a test project description',
    image: '/test-image.jpg',
    video: '/test-video.mp4',
    link: 'https://example.com',
  };

  it('renders project title', () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    render(<ProjectCard {...mockProject} />);
    const image = screen.getByAltText('Test Project');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('renders video when provided', () => {
    render(<ProjectCard {...mockProject} />);
    const container = document.querySelector('[data-testid="project-card"]');
    const video = container?.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', '/test-video.mp4');
  });

  it('video has correct attributes', () => {
    render(<ProjectCard {...mockProject} />);
    const container = document.querySelector('[data-testid="project-card"]');
    const video = container?.querySelector('video');
    expect(video).toBeInTheDocument();
    // Verify video has the src attribute
    expect(video?.getAttribute('src')).toBe('/test-video.mp4');
    expect(video?.className).toContain('rounded-lg');
  });

  it('renders project link when provided', () => {
    render(<ProjectCard {...mockProject} />);
    const link = screen.getByRole('link', { name: 'Click here to try it out!' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('does not render link when not provided', () => {
    const projectWithoutLink: Project = {
      ...mockProject,
      link: undefined,
    };
    render(<ProjectCard {...projectWithoutLink} />);
    expect(screen.queryByText('Click here to try it out!')).not.toBeInTheDocument();
  });

  it('does not render image when not provided', () => {
    const projectWithoutImage: Project = {
      ...mockProject,
      image: undefined,
    };
    render(<ProjectCard {...projectWithoutImage} />);
    expect(screen.queryByAltText('Test Project')).not.toBeInTheDocument();
  });

  it('does not render video when not provided', () => {
    const projectWithoutVideo: Project = {
      ...mockProject,
      video: undefined,
    };
    render(<ProjectCard {...projectWithoutVideo} />);
    const videos = document.querySelectorAll('video');
    expect(videos.length).toBe(0);
  });

  it('renders with testid for project card', () => {
    const { container } = render(<ProjectCard {...mockProject} />);
    expect(container.querySelector('[data-testid="project-card"]')).toBeInTheDocument();
  });

  it('renders h3 heading for title', () => {
    const { container } = render(<ProjectCard {...mockProject} />);
    const h3 = container.querySelector('h3');
    expect(h3).toBeInTheDocument();
    expect(h3?.textContent).toContain('Test Project');
  });

  it('renders p element for description', () => {
    const { container } = render(<ProjectCard {...mockProject} />);
    const paragraphs = container.querySelectorAll('p');
    const descFound = Array.from(paragraphs).some((p) =>
      p.textContent?.includes('This is a test project description')
    );
    expect(descFound).toBe(true);
  });

  it('handles project without image and video', () => {
    const minimalProject: Project = {
      title: 'Minimal Project',
      description: 'A project with only title and description',
    };
    render(<ProjectCard {...minimalProject} />);
    expect(screen.getByText('Minimal Project')).toBeInTheDocument();
    expect(screen.getByText('A project with only title and description')).toBeInTheDocument();
  });

  it('handles long project descriptions', () => {
    const longDesc = 'A'.repeat(500);
    const projectWithLongDesc: Project = {
      ...mockProject,
      description: longDesc,
    };
    render(<ProjectCard {...projectWithLongDesc} />);
    expect(screen.getByText(longDesc)).toBeInTheDocument();
  });
});
