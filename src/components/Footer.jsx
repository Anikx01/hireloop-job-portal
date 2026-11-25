import Link from "next/link";

// Social Icon Component
function SocialIcon({ name }) {
  const icons = {
    facebook: "f",
    pinterest: "P",
    linkedin: "in",
  };

  return (
    <span className="text-base font-bold leading-none">{icons[name]}</span>
  );
}

// Footer Navigation Links
const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Job discovery", href: "/jobs" },
      { name: "Worker AI", href: "/worker-ai" },
      { name: "Companies", href: "/companies" },
      { name: "Salary data", href: "/salary-data" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { name: "Help center", href: "/help" },
      { name: "Career library", href: "/career-library" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Brand Guideline", href: "/brand-guideline" },
      { name: "Newsroom", href: "/newsroom" },
    ],
  },
];

function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-2 border-[#222222] bg-black text-white">
      {/* Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 0%, transparent 20%, #1d2939 100%),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 48px,
              rgba(100, 116, 139, 0.12) 49px,
              transparent 50px
            )
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-12 md:px-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block text-2xl font-extrabold tracking-tight"
            >
              <span className="text-[#168BFF]">hire</span>
              <span className="text-orange-500">loop</span>
            </Link>

            <p className="mt-4 max-w-[270px] text-sm leading-6 text-gray-500">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Footer Link Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-sm font-medium text-[#7770FF]">
                {section.title}
              </h3>

              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors duration-200 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer Section */}
        <div className="mt-12 flex flex-col gap-6 border-t border-gray-900 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Social Media Icons */}
          <div className="flex items-center gap-2">
            {/* Facebook */}
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-7 w-7 items-center justify-center rounded-md bg-[#111111] text-gray-400 transition-colors hover:bg-[#1877F2] hover:text-white"
            >
              <SocialIcon name="facebook" />
            </Link>

            {/* Pinterest */}
            <Link
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="flex h-7 w-7 items-center justify-center rounded-md bg-[#353080] text-white transition-colors hover:bg-[#E60023]"
            >
              <SocialIcon name="pinterest" />
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-7 w-7 items-center justify-center rounded-md bg-[#111111] text-gray-400 transition-colors hover:bg-[#0A66C2] hover:text-white"
            >
              <SocialIcon name="linkedin" />
            </Link>
          </div>

          {/* Copyright and Legal Links */}
          <div className="flex flex-col gap-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:gap-6">
            <p>Copyright 2024 - Programming Hero</p>

            <div className="flex items-center gap-2">
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms & Policy
              </Link>

              <span>-</span>

              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
