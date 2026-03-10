interface Project {
    title: string;
    description?: string;
    image?: string;
    video?: string;
    link?: string;
    technologies?: string[];
  }
  
interface Skill {
  name: string;
  level: number | string;
}

// interface MyCustomError {
//   code: number;
//   details: string;
// }

interface WorkflowStatusProps {
  runId: number; // Or string, depending on the type of your runId
}

interface Step {
  name: string;
  status: string;
}

interface Job {
  name: string;
  status: string;
  steps: Step[];
}
