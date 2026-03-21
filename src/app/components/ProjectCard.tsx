import Image from 'next/image';

export default function ProjectCard({ title, description, image, video, link }: Project) {
  return (
    <div className="project-card" data-testid='project-card'>
      <h3>{title}</h3>
      {image && (
        <Image src={image} alt={title} width={500} height={300} />
      )}
        <video src={video} controls preload='metadata' autoPlay muted className="w-full h-auto rounded-lg mb-2">
          {description && <p>{description}</p>} {/* Conditionally render description */}
        </video>
    </div>
  );
}
