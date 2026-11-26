const features = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 5v14h16" />
        <path d="m7 15 4-4 3 3 5-5" />
      </svg>
    ),
  },
  {
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="11" width="4" height="8" rx="1" />
        <rect x="10" y="5" width="4" height="14" rx="1" />
        <rect x="16" y="13" width="4" height="6" rx="1" />
      </svg>
    ),
  },
  {
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 4h12v16l-6-4-6 4V4Z" />
      </svg>
    ),
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m11 11 8 3-3.5 1.5L14 19l-3-8Z" />
        <path d="M11 5V3" />
        <path d="M5 11H3" />
        <path d="m6.8 6.8-1.5-1.5" />
        <path d="m15.2 6.8 1.5-1.5" />
        <path d="m6.8 15.2-1.5 1.5" />
      </svg>
    ),
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <circle cx="12" cy="9" r="2" />
        <path d="M9 14.5c.8-1 2-1.5 3-1.5s2.2.5 3 1.5" />
        <path d="M9 18h6" />
      </svg>
    ),
  },
  {
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z" />
        <circle cx="12" cy="12" r="2.75" />
      </svg>
    ),
  },
  {
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m4 17 6-6 4 4 6-7" />
        <path d="M15 8h5v5" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#121214] py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.22em] text-zinc-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-[1px] bg-[#5E5CE6]" />
            <span>FEATURES JOB</span>
            <span className="h-1.5 w-1.5 rounded-[1px] bg-[#5E5CE6]" />
          </div>

          <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[42px]">
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="group flex items-start gap-4">
              {/* Icon Box */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#0B0B0D] text-[#D8B4FE] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-200 group-hover:border-[#5E5CE6]/50">
                {feature.icon}
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-[15px] font-medium text-white">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
