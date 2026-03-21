import Link from 'next/link';

export default function Header() {
  return (
    <header data-testid='header'>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About Me</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
        </ul>
        <div className="header-social-links">
          <a 
            href="https://www.linkedin.com/in/henry-russell/?skipRedirect=true" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/henryrussell" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
