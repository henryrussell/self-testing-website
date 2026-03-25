import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; //downloads the font during the build process - faster
import './globals.css';
import DarkModeToggle from './components/DarkModeToggle';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header'; // Import Header
import Footer from './components/Footer'; // Import Footer

const inter = Inter({
  subsets: ['latin'],
  weight: '400'
}); //this tells nextjs which character subsets of the font to include

//meta data for the website - will appear as tab name
export const metadata: Metadata = {
  title: 'Self Testing Website and Portfolio',
  description: 'Click the button to run the tests. Check out my other projects and experience too!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      {/* apply the inter font to the whole <body> of the HTML */}
      <body className={inter.className}>
        <AnimatedBackground />
        <Header />
        <main>
          <DarkModeToggle>
            {children}
          </DarkModeToggle>
        </main>
        <Footer/>
      </body> 
    </html>
  );
}
