import Link from 'next/link';

export default function Header() {
  return (
    <header data-testid='header' className="sticky top-0 z-10">
      <nav className="flex flex-row items-center justify-center p-2 md:p-4">
        <ul className="flex flex-row items-center justify-center gap-1 md:gap-6">
          <li>
            <Link href="/" className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-base hover:text-orange-500 transition-colors rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 whitespace-nowrap">Home</Link>
          </li>
          <li>
            <Link href="/about" className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-base hover:text-orange-500 transition-colors rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 whitespace-nowrap">About Me</Link>
          </li>
          <li>
            <Link href="/projects" className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-base hover:text-orange-500 transition-colors rounded-md hover:bg-gray-800 dark:hover:bg-gray-700 whitespace-nowrap">Projects</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
