import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({ title, description, image, video, link }: Project) {
  return (
    <div className="project-card" data-testid='project-card'>
      <h3>
        {title}
        {link && (
          <span className="ml-2">
            <Link href={link}>
                Click here to try it out!
            </Link>
          </span>
        )}
      </h3>
      {image && (
        <Image src={image} alt={title} width={500} height={300} />
      )}
        {video && (
          <video 
            src={video} 
            preload="metadata" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-auto rounded-lg mb-2"
          >
          </video>
        )}
        <p>{description}</p>
    </div>
  );
}
