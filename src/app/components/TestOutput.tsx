import { useState, useEffect } from "react";

const MAX_POLLING_DURATION = 60 * 60 * 1000; // 1 hour
const POLLING_INTERVAL = 5000; // 5 seconds

interface Artifact {
  id: number;
  name: string;
  size: number;
  expired: boolean;
}

export default function WorkflowStatusComponent({ runId }: WorkflowStatusProps) {
    const [workflowStatus, setWorkflowStatus] = useState("Loading...");
    const [jobSteps, setJobSteps] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [pollingTimeoutReached, setPollingTimeoutReached] = useState(false);
    const [artifacts, setArtifacts] = useState<Artifact[]>([]);
    const [selectedReport, setSelectedReport] = useState<string | null>(null);

    useEffect(() => {
        const startTime = Date.now();

        const fetchWorkflowStatus = async () => {
            // Check if polling has exceeded maximum duration
            if (Date.now() - startTime > MAX_POLLING_DURATION) {
                setPollingTimeoutReached(true);
                setWorkflowStatus('Polling timeout - workflow took too long');
                return;
            }
            try {
                const response = await fetch(`/api/workflowStatus/${runId}`);
                const data = await response.json();
    
                if (response.ok) {
                    if (data.conclusion) {
                        if(data.conclusion === "success"){
                            setWorkflowStatus("Completed Successfully");
                        } else if (data.conclusion === "failure"){
                            setWorkflowStatus("Completed with failures");
                        } else {
                            setWorkflowStatus(`Completed with conclusion: ${data.conclusion}`);
                        }
                    } else {
                        setWorkflowStatus(`Status: ${data.status || "Unknown Status"}`);
                    }

                    // Fetch detailed job steps
                    fetchJobSteps();

                    // Mark as completed when workflow finishes
                    if ((data.conclusion === "success" || data.conclusion === "failure" || data.conclusion === "cancelled" || data.conclusion === "skipped" || data.conclusion === "timed_out") && !isCompleted) {
                        setIsCompleted(true);
                        fetchArtifacts();
                    }
                } else {
                    setWorkflowStatus(`Error fetching status: ${data.error}`);
                }
            } catch (error) {
                setWorkflowStatus(`Error fetching status: ${error instanceof Error ? error.message : error}`);
            }
        };

        const fetchJobSteps = async () => {
            try {
                const response = await fetch(`/api/workflowJobs/${runId}`);
                const data = await response.json();
    
                if (response.ok) {

                    if (data.jobs && data.jobs.length > 0) {
                        const jobs = data.jobs.map((job: Job) => {
                            const steps = job.steps ? job.steps.map((step: Step) => `${step.name}: ${step.status}`) : [];
                            return `${job.name}: ${job.status} - Steps: ${steps.join(", ")}`;
                        });
                        setJobSteps(jobs);
                    } else {
                        setJobSteps(["No jobs found."]);
                    }

                } else {
                    console.error("Error fetching job steps:", data.error);
                }

            } catch (error) {
                console.error("Error fetching job steps:", error);
            }
        };

        const fetchArtifacts = async () => {
            try {
                const response = await fetch(`/api/workflowArtifacts/${runId}`);
                const data = await response.json();

                if (response.ok && data.artifacts) {
                    setArtifacts(data.artifacts);
                } else {
                    console.error("Error fetching artifacts:", data.error);
                }
            } catch (error) {
                console.error("Error fetching artifacts:", error);
            }
        };
  
  
        // Poll for updates every 5 seconds
        const intervalId = setInterval(() => {
            if (!pollingTimeoutReached) {
                fetchWorkflowStatus();
            }
        }, POLLING_INTERVAL);
        
        return () => clearInterval(intervalId);
    }, [runId, isCompleted, pollingTimeoutReached]);

    return (
        <div className="workflow-status">
            <h3>Workflow Status: {workflowStatus}</h3>
            {pollingTimeoutReached && (
                <p style={{ color: 'orange', fontWeight: 'bold' }}>
                    ⚠️ Polling stopped after 1 hour. Workflow may still be running on GitHub.
                </p>
            )}
            <h4>Pipeline Steps:</h4>
            <ul className="job-steps">
                {jobSteps.map((job, index) => (
                    <li key={index} className="job-step">
                        {job}
                    </li>
                ))}
            </ul>

            {artifacts.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h4>Test Reports:</h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                        {artifacts.map((artifact) => {
                            const isPlaywrightReport = artifact.name.includes('playwright');
                            const isCoverage = artifact.name.includes('coverage');
                            const icon = isPlaywrightReport ? '📊' : isCoverage ? '📈' : '📦';
                            const isSelected = selectedReport === artifact.name;
                            
                            return (
                                <button
                                    key={artifact.id}
                                    onClick={() => setSelectedReport(artifact.name)}
                                    style={{
                                        padding: '10px 15px',
                                        backgroundColor: isSelected ? '#4338CA' : '#4F46E5',
                                        color: 'white',
                                        borderRadius: '6px',
                                        border: 'none',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4338CA')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isSelected ? '#4338CA' : '#4F46E5')}
                                >
                                    {icon} {artifact.name}
                                </button>
                            );
                        })}
                    </div>

                    {selectedReport && (
                        <div
                            style={{
                                marginTop: '15px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                backgroundColor: '#f9fafb',
                            }}
                        >
                            <iframe
                                src={`/api/artifactContent/${runId}/${selectedReport}`}
                                style={{
                                    width: '100%',
                                    height: '600px',
                                    border: 'none',
                                }}
                                title={`${selectedReport} report`}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
