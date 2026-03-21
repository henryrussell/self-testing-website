'use client'
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const projects: Project[] = [ // projects is an array of Projects, hence the []
    {
      title: 'Flocking Simulation',
      description: 'A brief description of your project.',
      video: '/flockingRecording.mp4',
    },
    // ... more projects
  ];

  return (
    <div>
      <section id="projects">
          <h2>My Projects</h2>
          <div className="projects-grid">
          {projects.map((project, index) => ( //iterate over each item in the projects array and execute a function for each item
              <ProjectCard key={index} {...project} /> 
              //the key prop helps react efficiently update the list when items are changed. 
              // ...project just includes everything in the project object
          ))}
          </div>
      </section>
    </div>
  );
}
