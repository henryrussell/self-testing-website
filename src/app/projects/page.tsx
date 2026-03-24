'use client'
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      title: 'AI Chatbot',
      description: 'This project is a web application that showcases an AI model is trained on a dataset of my personal career history and skills. The goal of this project was to gain hands on experience with AI model training and fine-tuning, as well as to create an interactive way for visitors to learn about my background and expertise.',
      video: '/chatbotRecording.mp4',
      link: 'https://portfolio-chatbot-orcin.vercel.app/'
    },
    {
      title: 'Flocking Simulation',
      description: 'This project is from my one of my Electronic Engineering modules at university. Its a java project that simulates the flocking behaviour of birds. The project was a great opportunity to apply my programming skills in a different language and context, and it also helped me develop my understanding of algorithms and data structures.',
      video: '/flockingRecording.mp4',
    },
    {
      title: 'This website!',
      description: 'This project is the website you are currently on! I built this website as a unique way to showcase my software engineering skills. The website runs tests on itself using a github actions pipeline, and it also includes a section where visitors can learn about my background and experience. Building this website was a great opportunity to demonstrate my creativity and technical skills, and it also allowed me to create an interactive and engaging experience for visitors.',
    },
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
