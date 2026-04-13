import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TestRunnerComponent from '../src/app/components/TestRunnerComponent';

// Mock the WorkflowStatusComponent
jest.mock('../src/app/components/TestOutput', () => {
  return function MockWorkflowStatus({ runId }: { runId: number }) {
    return <div data-testid="workflow-status-component">Workflow Status for Run {runId}</div>;
  };
});

// Mock fetch
global.fetch = jest.fn();

describe('TestRunnerComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the test runner button', () => {
    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });
    expect(button).toBeInTheDocument();
  });

  it('displays test runner heading', () => {
    render(<TestRunnerComponent />);
    const heading = screen.getByRole('heading', { name: 'RUN THE TESTS:' });
    expect(heading).toBeInTheDocument();
  });

  it('button is not disabled initially', () => {
    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });
    expect(button).not.toBeDisabled();
  });

  it('displays triggering message on button click', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ run_id: 123 }),
    });

    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Workflow triggered successfully!')).toBeInTheDocument();
    });
  });

  it('calls fetch with correct method and headers', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ run_id: 123 }),
    });

    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/triggerWorkflow',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'x-csrf-token': expect.any(String),
          }),
        })
      );
    });
  });

  it('displays error message on failed API call', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: { message: 'API Error' } }),
    });

    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Error: API Error')).toBeInTheDocument();
    });
  });

  it('handles network errors gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Error: Network Error')).toBeInTheDocument();
    });
  });

  it('renders WorkflowStatusComponent when runId is set', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ run_id: 456 }),
    });

    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('workflow-status-component')).toBeInTheDocument();
      expect(screen.getByText('Workflow Status for Run 456')).toBeInTheDocument();
    });
  });

  it('displays success message when workflow triggered', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ run_id: 789 }),
    });

    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Workflow triggered successfully!')).toBeInTheDocument();
    });
  });

  it('shows initial triggering status message', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });

    fireEvent.click(button);

    expect(screen.getByText('Triggering workflow...')).toBeInTheDocument();
  });

  it('passes runId to WorkflowStatusComponent', async () => {
    const mockRunId = 999;
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ run_id: mockRunId }),
    });

    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(`Workflow Status for Run ${mockRunId}`)).toBeInTheDocument();
    });
  });

  it('handles error with Error instance', async () => {
    const errorMessage = 'Custom error message';
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('generates CSRF token before making API call', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ run_id: 123 }),
    });

    render(<TestRunnerComponent />);
    const button = screen.getByRole('button', { name: 'Run All Tests' });

    fireEvent.click(button);

    await waitFor(() => {
      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const headers = callArgs[1].headers;
      expect(headers['x-csrf-token']).toBeTruthy();
      expect(typeof headers['x-csrf-token']).toBe('string');
      expect(headers['x-csrf-token'].length).toBeGreaterThan(0);
    });
  });
});
