import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import WorkflowStatusComponent from '../src/app/components/TestOutput';

// Mock fetch at module level
global.fetch = jest.fn();

describe('WorkflowStatusComponent (TestOutput)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders workflow status container on mount', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'in_progress' }),
    });

    const { container } = render(<WorkflowStatusComponent runId={123} />);
    expect(container.querySelector('.workflow-status')).toBeInTheDocument();
  });

  it('displays initial Loading status text', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<WorkflowStatusComponent runId={123} />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('renders h3 heading for workflow status', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'in_progress' }),
    });

    const { container } = render(<WorkflowStatusComponent runId={123} />);
    const h3 = container.querySelector('h3');
    expect(h3).toBeInTheDocument();
  });

  it('renders h4 heading for pipeline steps', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'in_progress' }),
    });

    const { container } = render(<WorkflowStatusComponent runId={123} />);
    const h4 = container.querySelector('h4');
    expect(h4).toBeInTheDocument();
  });

  it('renders ul element for job steps', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'in_progress' }),
    });

    const { container } = render(<WorkflowStatusComponent runId={123} />);
    const ul = container.querySelector('ul.job-steps');
    expect(ul).toBeInTheDocument();
  });

  it('has empty job steps array initially', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'in_progress' }),
    });

    const { container } = render(<WorkflowStatusComponent runId={123} />);
    const ul = container.querySelector('ul.job-steps');
    expect(ul?.children.length).toBe(0);
  });

  it('includes "Workflow Status:" text in heading', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'in_progress' }),
    });

    const { container } = render(<WorkflowStatusComponent runId={123} />);
    const h3 = container.querySelector('h3');
    expect(h3?.textContent).toContain('Workflow Status:');
  });

  it('includes "Pipeline Steps:" text in subheading', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'in_progress' }),
    });

    const { container } = render(<WorkflowStatusComponent runId={123} />);
    const h4 = container.querySelector('h4');
    expect(h4?.textContent).toContain('Pipeline Steps:');
  });

  it('clears the polling interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'in_progress' }),
    });

    const { unmount } = render(<WorkflowStatusComponent runId={123} />);
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('renders proper class structure', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'in_progress' }),
    });

    const { container } = render(<WorkflowStatusComponent runId={123} />);
    expect(container.querySelector('.workflow-status')).toHaveClass('workflow-status');
    expect(container.querySelector('.job-steps')).toHaveClass('job-steps');
  });

  it('renders with expected DOM hierarchy', () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'in_progress' }),
    });

    const { container } = render(<WorkflowStatusComponent runId={123} />);
    const wrapper = container.querySelector('.workflow-status');
    expect(wrapper?.querySelector('h3')).toBeInTheDocument();
    expect(wrapper?.querySelector('h4')).toBeInTheDocument();
    expect(wrapper?.querySelector('ul.job-steps')).toBeInTheDocument();
  });
});
