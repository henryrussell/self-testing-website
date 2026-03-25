import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const technicalSkills = [
    'TypeScript',
    'Node.js',
    'Playwright',
    'WebdriverIO',
    'Large Language Model (LLM) Integration',
    'AI Dataset Preparation & Engineering',
    'Prompt Engineering/Refinement',
    'AI Framework Implementation',
    'RAG (Retrieval-Augmented Generation) Concepts',
    'Selenium WebDriver',
    'Test Automation',
    'Jest',
    'Cucumber',
    'Jenkins',
    'React',
    'Next.js',
  ];

  const testingExpertise = [
    'Functional Testing',
    'Regression Testing',
    'Smoke Testing',
    'Integration Testing',
    'Sanity Testing',
    'Security Testing',
    'Performance Testing',
    'Accessibility Testing',
    'Compatibility Testing',
    'Mobile Testing',
  ];

  const careerHighlights = [
    'Developed a new testing framework to be shipped with a mandatory internal tool at Lloyds Banking Group',
    'Created a seamlessly interchangeable testing solution between Playwright and WebdriverIO, gaining valuable expertise with both frameworks',
    'Responsible for monthly releases of an SDK used for front-end web development across the bank, managing continuous feature releases across multiple environments',
    'Core member of Quality Engineering and web development teams, demonstrating strong agile and teamworking capabilities',
    'Trained new joiners on technical skills and best practices within the organization',
  ];

  return (
    <div className="about-page">
      <section className="about-header">
        <div className="header-content">
          <div className="profile-picture-container">
            <Image
              src="/profile.jpg"
              alt="Henry Russell"
              width={200}
              height={200}
              className="profile-picture"
              priority
            />
          </div>
          <div className="header-text">
            <h1>Henry Russell</h1>
            <div className="about-intro">
              <p className="headline">
                Passionate Software Engineer with 4 years of professional experience developing complex automation across multiple cloud and local environments.
              </p>
              <p className="subheading">
                My expertise lies in creating robust automation scripts and frameworks for web development, with a focus on Quality Engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ai-chatbot">
        <button className="chatbot-link">
          <Link href="https://portfolio-chatbot-orcin.vercel.app/">Chat with my AI assistant</Link>
        </button>
      </section>

      <section className="career-highlights">
        <h2>Career Highlights</h2>
        <ul className="highlights-list">
          {careerHighlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="technical-experience">
        <h2>Technical Experience</h2>
        <p>
          With four years of experience as an ISTQB Certified Software Engineer, I specialize in building robust automation frameworks using TypeScript and Node.js across the full modern testing stack. My technical expertise spans the development of interchangeable frameworks with Playwright and WebdriverIO, alongside unit testing in Jest and React Testing Library. I have a proven track record of managing complex CI/CD lifecycles, from architecting Jenkins pipelines for monthly SDK releases at Lloyds Banking Group to implementing real-time, self-validating GitHub Actions in live environments. Beyond core Quality Engineering, I am proficient in React 19 and Tailwind CSS, frequently integrating advanced web technologies like the Vercel AI SDK and REST APIs to bridge the gap between high-performance frontend development and comprehensive automated verification.
        </p>
      </section>

      <section className="skills-section">
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Technical Skills</h3>
            <div className="skill-tags">
              {technicalSkills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skill-category">
            <h3>Testing Expertise</h3>
            <div className="skill-tags">
              {testingExpertise.map((expertise, index) => (
                <span key={index} className="skill-tag">
                  {expertise}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="soft-skills">
        <h2>Professional Qualities</h2>
        <ul className="qualities-list">
          <li>Agile methodologies and team collaboration</li>
          <li>Technical mentoring and knowledge sharing</li>
          <li>Quick learner and problem solver</li>
          <li>Cross-team communication and coordination</li>
        </ul>
      </section>
    </div>
  );
}
