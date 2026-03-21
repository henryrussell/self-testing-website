export default function Footer() {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return (
      <footer data-testid='footer'>
        <div className="footer-content">
          <div className="footer-section">
            <p className="last-updated">Last updated {currentDate}</p>
          </div>
          <div className="social-links">
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
        </div>
      </footer>
    );
}
