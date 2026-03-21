'use client'
import Intro from './components/Intro';
import TestRunnerComponent from './components/TestRunnerComponent';

export default function Home() {
  return (
    <div>
      <section id='intro'>
        <Intro></Intro>
      </section>

      <section id='test-runner'>
        <TestRunnerComponent></TestRunnerComponent>
      </section>
    </div>
  );
}
