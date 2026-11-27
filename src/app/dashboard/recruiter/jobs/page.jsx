import { Suspense } from "react";
import Link from "next/link";
import { getCompanyJobs } from "@/lib/api/jobs";

const STATUS_STYLES = {
  active: "bg-emerald-500/15 text-emerald-400",
  closed: "bg-rose-500/15 text-rose-400",
  paused: "bg-amber-500/15 text-amber-400",
  draft: "bg-zinc-500/15 text-zinc-400",
};

function JobsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#16161A]">
      <div className="h-12 bg-[#222227]" />
      <div className="divide-y divide-white/[0.06]">
        {[1, 2, 3].map((row) => (
          <div
            key={row}
            className="flex items-center justify-between px-6 py-5 animate-pulse"
          >
            <div className="h-4 w-40 rounded bg-white/10" />
            <div className="h-4 w-28 rounded bg-white/10" />
            <div className="h-4 w-24 rounded bg-white/10" />
            <div className="h-6 w-16 rounded-full bg-white/10" />
            <div className="h-4 w-20 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function JobsTable() {
  const jobs = await getCompanyJobs();

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#16161A]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead>
            <tr className="bg-[#222227] text-xs font-medium text-zinc-400">
              <th className="px-6 py-4 font-medium">Job Title</th>
              <th className="px-6 py-4 font-medium">Type / Category</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.06] text-sm">
            {jobs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-zinc-400"
                >
                  No job postings found yet.{" "}
                  <Link
                    href="/dashboard/recruiter/jobs/new"
                    className="font-medium text-[#8B85FF] hover:underline"
                  >
                    Post your first job
                  </Link>
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const statusKey = (job.status || "active").toLowerCase();
                const badgeStyle =
                  STATUS_STYLES[statusKey] || STATUS_STYLES.active;
                const displayLocation =
                  job.location || (job.isRemote ? "Remote" : "Not specified");

                return (
                  <tr
                    key={job._id}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    {/* Job Title */}
                    <td className="px-6 py-5 font-semibold text-zinc-100">
                      {job.title}
                    </td>

                    {/* Type / Category */}
                    <td className="px-6 py-5">
                      <div className="font-semibold text-zinc-100">
                        {job.jobType || "Full-time"}
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-400">
                        {job.category || "General"}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-5 text-zinc-200">
                      {displayLocation}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${badgeStyle}`}
                      >
                        {job.status || "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {/* View */}
                        <Link
                          href={`/dashboard/recruiter/jobs/${job._id}`}
                          title="View Job"
                          className="text-zinc-300 transition-colors hover:text-white"
                        >
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/dashboard/recruiter/jobs/${job._id}/edit`}
                          title="Edit Job"
                          className="text-zinc-300 transition-colors hover:text-white"
                        >
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          title="Delete Job"
                          className="cursor-pointer text-rose-500 transition-colors hover:text-rose-400"
                        >
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RecruiterJobs() {
  return (
    <div className="min-h-screen w-full bg-[#0C0C0F] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Manage All Jobs
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            View, update, and manage your current job postings.
          </p>
        </div>

        {/* Table */}
        <Suspense fallback={<JobsTableSkeleton />}>
          <JobsTable />
        </Suspense>
      </div>
    </div>
  );
}
