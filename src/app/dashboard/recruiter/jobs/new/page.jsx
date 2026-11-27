"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/actions/jobs";
import { toast } from "@heroui/react";

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "AI & Machine Learning",
  "Product Management",
  "UI/UX Design",
  "Data & Analytics",
  "Marketing & Growth",
  "Sales & Business",
  "Operations & HR",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const FREQUENCIES = ["per hour", "per month", "per year"];

const INITIAL_FORM_DATA = {
  title: "",
  companyName: "HirePulse Network",
  category: "Engineering & Tech",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  salaryMin: "",
  salaryMax: "",
  frequency: "per hour",
  responsibilities: "",
  requirements: "",
  benefits: "",
};

export default function NewJob() {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await createJob(formData);

      if (res?.insertedId) {
        toast.success("Job Posted Successfully");
        setFormData(INITIAL_FORM_DATA);
        router.push("/dashboard/recruiter");
      } else {
        toast.error("Job could not be saved. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error?.message || "Failed to post job");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border border-white/[0.06] bg-[#1A1A1F] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-[#635BFF] focus:outline-none";

  return (
    <div className="min-h-screen w-full bg-[#0C0C0F] px-4 py-8 text-white sm:px-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-medium">
              <Link
                href="/dashboard/recruiter/jobs"
                className="text-zinc-400 transition-colors hover:text-zinc-200"
              >
                Manage Jobs
              </Link>
              <svg
                className="h-3.5 w-3.5 text-zinc-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="text-[#8B85FF]">Create New Listing</span>
            </nav>

            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Post a New Job
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-[#665DF5] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(102,93,245,0.4)] transition-all hover:bg-[#584EE8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>{isSubmitting ? "Publishing..." : "Publish Job"}</span>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 1. Basic Information */}
        <section className="rounded-2xl border border-white/[0.06] bg-[#121216] p-6">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#665DF5]" />
            <h2 className="text-sm font-semibold text-zinc-100">
              1. Basic Information
            </h2>
          </div>

          <div className="space-y-5">
            {/* Job Title */}
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Job Title <span className="text-[#665DF5]">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Frontend Developer"
                className={inputBase}
              />
            </div>

            {/* Company Name & Job Category */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-300">
                  Company Name <span className="text-[#665DF5]">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-zinc-500">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <path d="M9 22v-4h6v4" />
                      <path d="M8 6h.01" />
                      <path d="M16 6h.01" />
                      <path d="M12 6h.01" />
                      <path d="M12 10h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 10h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 10h.01" />
                      <path d="M8 14h.01" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="HirePulse Network"
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-300">
                  Job Category <span className="text-[#665DF5]">*</span>
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`${inputBase} appearance-none pr-10`}
                  >
                    {JOB_CATEGORIES.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-[#1A1A1F] text-white"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-zinc-400">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Job Type */}
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Job Type <span className="text-[#665DF5]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {JOB_TYPES.map((type) => {
                  const isActive = formData.jobType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, jobType: type }))
                      }
                      className={`cursor-pointer rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                        isActive
                          ? "border-[#665DF5] bg-[#665DF5]/15 text-white"
                          : "border-white/[0.06] bg-[#1A1A1F] text-zinc-400 hover:border-white/15 hover:text-zinc-200"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Location, Compensation & Timeline */}
        <section className="rounded-2xl border border-white/[0.06] bg-[#121216] p-6">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#665DF5]" />
            <h2 className="text-sm font-semibold text-zinc-100">
              2. Location, Compensation &amp; Timeline
            </h2>
          </div>

          <div className="space-y-5">
            {/* Remote Toggle Box */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.05] bg-[#18181D] px-4 py-3.5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#665DF5]/15 text-[#8B85FF]">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-100">
                    Remote Work Allowed (isRemote)
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={formData.isRemote}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, isRemote: !prev.isRemote }))
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                  formData.isRemote ? "bg-[#665DF5]" : "bg-[#2C2C34]"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    formData.isRemote ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Job Location & Application Deadline */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-300">
                    Job Location (location)
                  </label>
                  <span className="text-[11px] text-zinc-500">
                    {formData.isRemote ? "Optional" : "Required"}
                  </span>
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-zinc-500">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="location"
                    required={!formData.isRemote}
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York, USA"
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-300">
                  Application Deadline (deadline)
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-zinc-500">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4" />
                      <path d="M8 2v4" />
                      <path d="M3 10h18" />
                    </svg>
                  </span>
                  <input
                    type="date"
                    name="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleChange}
                    className={`${inputBase} pl-10 [color-scheme:dark]`}
                  />
                </div>
              </div>
            </div>

            {/* Min Salary, Max Salary & Frequency */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-300">
                  Min Salary / Rate
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-medium text-zinc-400">
                    €
                  </span>
                  <input
                    type="number"
                    name="salaryMin"
                    min="0"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="25"
                    className={`${inputBase} pl-9`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-300">
                  Max Salary / Rate
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-medium text-zinc-400">
                    €
                  </span>
                  <input
                    type="number"
                    name="salaryMax"
                    min="0"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="40"
                    className={`${inputBase} pl-9`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-300">
                  Frequency
                </label>
                <div className="relative">
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    className={`${inputBase} appearance-none pr-10`}
                  >
                    {FREQUENCIES.map((freq) => (
                      <option
                        key={freq}
                        value={freq}
                        className="bg-[#1A1A1F] text-white"
                      >
                        {freq}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-zinc-400">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Responsibilities & Requirements */}
        <section className="rounded-2xl border border-white/[0.06] bg-[#121216] p-6">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#665DF5]" />
            <h2 className="text-sm font-semibold text-zinc-100">
              3. Responsibilities &amp; Requirements
            </h2>
          </div>

          <div className="space-y-5">
            {/* Key Responsibilities */}
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Key Responsibilities <span className="text-[#665DF5]">*</span>
              </label>
              <textarea
                name="responsibilities"
                rows={4}
                required
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                className={`${inputBase} resize-y leading-relaxed`}
              />
            </div>

            {/* Qualifications & Requirements */}
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Qualifications &amp; Requirements{" "}
                <span className="text-[#665DF5]">*</span>
              </label>
              <textarea
                name="requirements"
                rows={4}
                required
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List required technical skills, years of experience, and qualifications for this role..."
                className={`${inputBase} resize-y leading-relaxed`}
              />
            </div>

            {/* Benefits (Optional) */}
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Benefits{" "}
                <span className="font-normal text-zinc-500">(Optional)</span>
              </label>
              <textarea
                name="benefits"
                rows={3}
                value={formData.benefits}
                onChange={handleChange}
                placeholder="Health insurance, flexible working hours, learning budget, remote stipend..."
                className={`${inputBase} resize-y leading-relaxed`}
              />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
