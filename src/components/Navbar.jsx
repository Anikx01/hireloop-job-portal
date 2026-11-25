"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/app/api/auth/[...all]/auth-client";

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/company" },
  { name: "Pricing", href: "/pricing" },
];

function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#222222] border-2 border-[#00A6FF]">
      <header className="flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-[#168BFF]">hire</span>
          <span className="text-orange-500">loop</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-sm text-white hover:text-[#168BFF] transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Auth Section (Desktop) */}
          {isPending ? (
            <li className="border-l border-gray-600 pl-8 text-sm text-gray-400">
              Loading...
            </li>
          ) : user ? (
            <>
              <li className="border-l border-gray-600 pl-8 text-sm font-medium text-white">
                Hi, {user.name}!
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="cursor-pointer rounded-xl border border-gray-600 px-4 py-2 text-sm font-medium text-white hover:border-red-500 hover:text-red-400 transition-colors"
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="border-l border-gray-600 pl-8">
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-[#8175FF] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-[#6155F5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#5145DD] transition-colors duration-200"
                >
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-700 bg-[#222222] md:hidden"
        >
          <ul className="flex flex-col gap-2 px-5 py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-sm text-white hover:text-[#168BFF] transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Auth Section (Mobile) */}
            {isPending ? (
              <li className="border-t border-gray-700 pt-3 text-sm text-gray-400">
                Loading...
              </li>
            ) : user ? (
              <>
                <li className="border-t border-gray-700 pt-3 text-sm font-medium text-white">
                  Hi, {user.name}!
                </li>
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-gray-600 px-5 py-2.5 text-sm font-medium text-white hover:border-red-500 hover:text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="border-t border-gray-700 pt-3">
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-[#8175FF]"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-[#6155F5] px-5 py-3 text-sm font-medium text-white hover:bg-[#5145DD] transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
