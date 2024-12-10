import Link from "next/link";

export default function SecondaryNavbar() {
  return (
    <nav className="bg-gray-100 border-b p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/" className="text-gray-800 hover:text-orange-500">
            Today
          </Link>
        </li>
        <li>
          <Link href="/5-day" className="text-gray-800 hover:text-orange-500">
            5-Day
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-gray-800 hover:text-orange-500">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
