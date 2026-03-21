import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TestRunnerComponent from '../src/app/components/TestRunnerComponent';

describe('TestRunnerComponent', () => {

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

  it('button is not disabled', () => {
    render(<TestRunnerComponent />);

    const button = screen.getByRole('button', { name: 'Run All Tests' });
    expect(button).not.toBeDisabled();
  });

  it('button is properly rendered', () => {
    render(<TestRunnerComponent />);

    const button = screen.getByRole('button', { name: 'Run All Tests' });
    expect(button).toBeInTheDocument();
  });
});
