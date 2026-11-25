import Link from "next/link";

const featuredJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 2,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 3,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 4,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 5,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 6,
    title: "Frontend Developer",
    description:
      "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workType: "Hybrid",
    salary: "€25–€40/hour",
  },
];

export default function JobDiscoverySection() {
  return (
    <section className="w-full bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-[1px] bg-[#6366F1]" />
            <span className="font-mono text-xs tracking-[0.2em] text-neutral-300 uppercase">
              Smart Job Discovery
            </span>
            <span className="h-1.5 w-1.5 rounded-[1px] bg-[#6366F1]" />
          </div>

          <h2 className="max-w-xl text-3xl font-medium tracking-tight text-white sm:text-5xl sm:leading-[1.12]">
            The roles you&apos;d never
            <br />
            find by searching
          </h2>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <article
              key={job.id}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#111111] p-6 transition-colors duration-200 hover:border-white/15"
            >
              <div>
                <h3 className="text-xl font-medium text-white">{job.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-400">
                  {job.description}
                </p>

                {/* Metadata Badges */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {/* Location */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1C1F] px-3 py-1.5 text-xs font-medium text-neutral-200">
                    <svg
                      className="h-3.5 w-3.5 shrink-0 text-[#D8B4FE]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                    {job.location}
                  </span>

                  {/* Work Type */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1C1F] px-3 py-1.5 text-xs font-medium text-neutral-200">
                    <svg
                      className="h-3.5 w-3.5 shrink-0 text-[#D8B4FE]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10 4h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4V6a2 2 0 0 1 2-2zm4 3V6h-4v1h4z" />
                    </svg>
                    {job.workType}
                  </span>

                  {/* Salary */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1C1C1F] px-3 py-1.5 text-xs font-medium text-neutral-200">
                    <svg
                      className="h-3.5 w-3.5 shrink-0 text-[#D8B4FE]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm.75 15.93V19h-1.5v-1.08a3.86 3.86 0 0 1-2.67-1.4l1.13-.95a2.47 2.47 0 0 0 1.85.93c.93 0 1.54-.45 1.54-1.1s-.48-1-1.76-1.33c-1.78-.45-2.72-1.15-2.72-2.54a2.52 2.52 0 0 1 2.63-2.45V8h1.5v1.08a3.46 3.46 0 0 1 2.26 1.11l-1.07.98a2.24 2.24 0 0 0-1.5-.73c-.86 0-1.37.41-1.37 1s.49.91 1.78 1.24c1.82.46 2.7 1.19 2.7 2.62a2.65 2.65 0 0 1-2.7 2.63z" />
                    </svg>
                    {job.salary}
                  </span>
                </div>
              </div>

              {/* Apply Link */}
              <div className="mt-7">
                <Link
                  href={`/jobs/${job.id}`}
                  className="group inline-flex items-center gap-2 text-xs font-medium text-neutral-200 transition-colors hover:text-white"
                >
                  Apply Now
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-200 hover:bg-neutral-200"
          >
            View all job open
          </Link>
        </div>
      </div>
    </section>
  );
}
