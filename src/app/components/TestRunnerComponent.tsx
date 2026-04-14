import { useState } from "react";
import WorkflowStatusComponent from "./TestOutput"; // Import the workflow status component
import TestSummary from "./TestSummary"; // Import the test summary component

// Generate a simple CSRF token for local development
function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function TestRunnerComponent() {
  const [workflowStatus, setWorkflowStatus] = useState("");
  const [runId, setRunId] = useState(null); // Add state for the run ID

  const handleRunTests = async () => {
    setWorkflowStatus("Triggering workflow...");

    try {
      const csrfToken = generateCSRFToken();
      const response = await fetch("/api/triggerWorkflow", {
        method: "POST",
        headers: {
          "x-csrf-token": csrfToken,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setWorkflowStatus("Workflow triggered successfully!");
        setRunId(data.run_id); // Assuming your API response includes the run ID
      } else {
        setWorkflowStatus(`Error: ${data.error.message}`);
      }
    } catch (error) {
        if (error instanceof Error){
            setWorkflowStatus(`Error: ${error.message}`);
        } else {
            console.error('Health check: Failure', error);
        }
    }
  };

  return (
    <div className="test-runner">
      <h2>RUN THE TESTS:</h2>
      <div className="button-container">
        <button onClick={handleRunTests}>Run All Tests</button>
      </div>
      {workflowStatus && <p>{workflowStatus}</p>}
      {runId && (
        <>
          <TestSummary runId={runId} />
          <WorkflowStatusComponent runId={runId} />
        </>
      )}
    </div>
  );
}