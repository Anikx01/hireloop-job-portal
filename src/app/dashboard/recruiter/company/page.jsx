"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createCompany,
  getMyCompany,
  updateCompany,
} from "@/lib/actions/companies";

const INDUSTRIES = [
  "Technology & Software",
  "AI & Machine Learning",
  "FinTech & Finance",
  "Healthcare & Biotech",
  "E-Commerce & Retail",
  "Education & EdTech",
  "Media & Entertainment",
  "Consulting & Services",
];

const EMPLOYEE_RANGES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1,000 employees",
  "1,000+ employees",
];

const STATUS_BADGE_STYLES = {
  Pending: {
    wrapper: "border-amber-500/25 bg-amber-500/10 text-amber-400",
    dot: "bg-amber-400",
  },
  Approved: {
    wrapper: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
  },
  Rejected: {
    wrapper: "border-rose-500/25 bg-rose-500/10 text-rose-400",
    dot: "bg-rose-400",
  },
};

const INITIAL_FORM = {
  companyName: "",
  industry: "",
  website: "",
  location: "",
  employeeCount: "",
  description: "",
};

export default function CompanyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoName, setLogoName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadWorkspace() {
      try {
        const res = await getMyCompany();
        if (!active) return;

        if (!res.authenticated) {
          router.replace("/auth/signin");
          return;
        }

        setCompany(res.company);
      } catch (error) {
        console.error("Failed to load company workspace:", error);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadWorkspace();
    return () => {
      active = false;
    };
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Only PNG and JPG files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size must be under 5MB.");
      return;
    }

    setErrorMessage("");
    setLogoFile(file);
    setLogoName(file.name);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleOpenCreate = () => {
    setFormData(INITIAL_FORM);
    setLogoFile(null);
    setLogoPreview(null);
    setLogoName("");
    setErrorMessage("");
    setSuccessMessage("");
    setIsFormOpen(true);
  };

  const handleOpenEdit = () => {
    if (!company) return;
    setFormData({
      companyName: company.companyName || "",
      industry: company.industry || "",
      website: company.website
        ? company.website.replace(/^https?:\/\//, "")
        : "",
      location: company.location || "",
      employeeCount: company.employeeCount || "",
      description: company.description || "",
    });
    setLogoFile(null);
    setLogoPreview(company.logo || null);
    setLogoName(company.logoName || "");
    setErrorMessage("");
    setSuccessMessage("");
    setIsFormOpen(true);
  };

  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

    if (!apiKey) {
      throw new Error(
        "Missing NEXT_PUBLIC_IMAGE_UPLOAD_API in .env.local. Restart npm run dev.",
      );
    }

    const imgFormData = new FormData();
    imgFormData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgFormData,
    });

    const data = await res.json();

    if (!res.ok || !data?.success) {
      throw new Error(data?.error?.message || "Image upload to ImgBB failed.");
    }

    return data.data.display_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let logoUrl = company?.logo || "";

      if (logoFile) {
        logoUrl = await uploadToImgBB(logoFile);
      }

      const formattedWebsite = formData.website.trim()
        ? `https://${formData.website.trim().replace(/^https?:\/\//, "")}`
        : "";

      const payload = {
        ...formData,
        website: formattedWebsite,
        logo: logoUrl,
        logoName,
      };

      if (company?._id) {
        const res = await updateCompany(company._id, payload);
        console.log("Updated Company in MongoDB:", res);
        setCompany(res.company || { ...company, ...payload });
        setSuccessMessage("Company profile updated successfully.");
      } else {
        const res = await createCompany(payload);
        console.log("Saved Company in MongoDB:", res);
        setCompany(
          res.company || { _id: res.insertedId, ...payload, status: "Pending" },
        );
        setSuccessMessage("Company registered and saved to database.");
      }

      setLogoFile(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Company submission error:", error);
      setErrorMessage(error?.message || "Failed to save company.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border border-white/[0.08] bg-[#141417] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-[#665DF5] focus:outline-none";

  // 0. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[75vh] w-full items-center justify-center text-sm text-zinc-400">
        Loading workspace...
      </div>
    );
  }

  // 1. Empty State: No Company Registered Yet
  if (!company && !isFormOpen) {
    return (
      <div className="flex min-h-[75vh] w-full items-center justify-center px-4 py-12 text-white">
        <div className="flex w-full max-w-2xl flex-col items-center rounded-2xl border border-white/[0.06] bg-[#0B0B0E] px-6 py-16 text-center shadow-lg">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-[#151519] text-zinc-400">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              <path d="M17 18h1" />
              <path d="M12 18h1" />
              <path d="M7 18h1" />
            </svg>
          </div>

          <h1 className="mt-6 text-xl font-bold tracking-tight text-white sm:text-2xl">
            No Company Registered Yet
          </h1>
          <p className="mt-2.5 max-w-md text-sm leading-relaxed text-zinc-400">
            To start creating structural job posts and tracking incoming
            pipelines, configure your workspace profile.
          </p>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
          >
            <span>Register Company</span>
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
      </div>
    );
  }

  // 2. Register / Edit Company Form
  if (isFormOpen) {
    return (
      <div className="min-h-screen w-full bg-[#09090B] px-4 py-8 text-white sm:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.08] bg-[#0F0F12] p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {company
                ? "Update Workspace Platform"
                : "Configure Workspace Platform"}
            </h1>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsFormOpen(false)}
              className="cursor-pointer text-xs font-medium text-zinc-400 transition-colors hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

          {errorMessage && (
            <div className="mt-5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-300">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Row 1: Company Name & Industry / Category */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="companyName"
                  className="mb-2 block text-xs font-medium text-zinc-300"
                >
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corp"
                  className={inputBase}
                />
              </div>

              <div>
                <label
                  htmlFor="industry"
                  className="mb-2 block text-xs font-medium text-zinc-300"
                >
                  Industry / Category
                </label>
                <div className="relative">
                  <select
                    id="industry"
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleChange}
                    className={`${inputBase} appearance-none pr-10 ${
                      formData.industry ? "text-zinc-100" : "text-zinc-400"
                    }`}
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#141417] text-zinc-400"
                    >
                      Select an item
                    </option>
                    {INDUSTRIES.map((item) => (
                      <option
                        key={item}
                        value={item}
                        className="bg-[#141417] text-zinc-100"
                      >
                        {item}
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

            {/* Row 2: Website URL & Location */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="website"
                  className="mb-2 block text-xs font-medium text-zinc-300"
                >
                  Website URL
                </label>
                <div className="flex items-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#141417] transition-colors focus-within:border-[#665DF5]">
                  <span className="border-r border-white/[0.08] px-3.5 py-3 text-sm text-zinc-400 select-none">
                    https://
                  </span>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="www.company.com"
                    className="w-full bg-transparent px-3.5 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-xs font-medium text-zinc-300"
                >
                  Location
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
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                  </span>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Employee Count Range & Company Logo */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="employeeCount"
                  className="mb-2 block text-xs font-medium text-zinc-300"
                >
                  Employee Count Range
                </label>
                <div className="relative">
                  <select
                    id="employeeCount"
                    name="employeeCount"
                    required
                    value={formData.employeeCount}
                    onChange={handleChange}
                    className={`${inputBase} appearance-none pr-10 ${
                      formData.employeeCount ? "text-zinc-100" : "text-zinc-400"
                    }`}
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#141417] text-zinc-400"
                    >
                      Select an item
                    </option>
                    {EMPLOYEE_RANGES.map((range) => (
                      <option
                        key={range}
                        value={range}
                        className="bg-[#141417] text-zinc-100"
                      >
                        {range}
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

              <div>
                <span className="mb-2 block text-xs font-medium text-zinc-300">
                  Company Logo
                </span>
                <label
                  htmlFor="companyLogo"
                  className="group flex w-fit cursor-pointer items-center gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-[#141417] text-zinc-400 transition-colors group-hover:border-[#665DF5] group-hover:text-zinc-200">
                    {logoPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logoPreview}
                        alt="Company logo preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 5h14" />
                        <path d="M12 19V9" />
                        <path d="m8 13 4-4 4 4" />
                      </svg>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-zinc-100 group-hover:text-white">
                      {logoName || "Upload image"}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      PNG, JPG up to 5MB
                    </p>
                  </div>

                  <input
                    id="companyLogo"
                    type="file"
                    accept="image/png,image/jpeg"
                    disabled={isSubmitting}
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Row 4: Brief Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-xs font-medium text-zinc-300"
              >
                Brief Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your company's mission and culture..."
                className={`${inputBase} resize-y leading-relaxed`}
              />
            </div>

            {/* Submit Footer */}
            <div className="flex justify-end gap-3 border-t border-white/[0.08] pt-5">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setIsFormOpen(false)}
                className="cursor-pointer rounded-xl border border-white/10 bg-[#18181D] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#665DF5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#584EE8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? logoFile
                    ? "Uploading Logo..."
                    : "Saving..."
                  : company
                    ? "Save Changes"
                    : "Register Company"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 3. Registered Company Details View
  const statusStyle =
    STATUS_BADGE_STYLES[company.status] || STATUS_BADGE_STYLES.Pending;

  return (
    <div className="min-h-screen w-full bg-[#09090B] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.08] bg-[#0F0F12] p-6 sm:p-8">
        {successMessage && (
          <div className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141417] text-lg font-bold text-zinc-300">
              {company.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={company.logo}
                  alt={company.companyName}
                  className="h-full w-full object-cover"
                />
              ) : (
                company.companyName?.charAt(0)?.toUpperCase() || "C"
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {company.companyName}
                </h1>
                <span
                  title="Company verification status (set by Admin)"
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${statusStyle.wrapper}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                  />
                  {company.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-400">{company.industry}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenEdit}
            className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-[#18181D] px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-white/20 hover:bg-white/10"
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
            <span>Edit Company</span>
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-white/[0.06] bg-[#141417] p-4">
            <p className="text-xs font-medium text-zinc-500">
              Industry / Category
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-100">
              {company.industry}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-[#141417] p-4">
            <p className="text-xs font-medium text-zinc-500">Location</p>
            <p className="mt-1 text-sm font-medium text-zinc-100">
              {company.location}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-[#141417] p-4">
            <p className="text-xs font-medium text-zinc-500">Employee Count</p>
            <p className="mt-1 text-sm font-medium text-zinc-100">
              {company.employeeCount}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-[#141417] p-4">
            <p className="text-xs font-medium text-zinc-500">Website</p>
            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-medium text-[#8B85FF] hover:underline"
              >
                {company.website}
              </a>
            ) : (
              <p className="mt-1 text-sm text-zinc-400">Not provided</p>
            )}
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#141417] p-4">
          <p className="text-xs font-medium text-zinc-500">About Company</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            {company.description}
          </p>
        </div>

        <p className="mt-5 text-xs text-zinc-500">
          Verification status (
          <span className="text-zinc-300">{company.status}</span>) is reviewed
          and updated by an Admin.
        </p>
      </div>
    </div>
  );
}
