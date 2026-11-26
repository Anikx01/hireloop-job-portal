"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    featured: false,
    subtitle: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 17h14l1-9-4.5 3.2L12 6l-3.5 5.2L4 8l1 9Zm0 2a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2H5Z" />
      </svg>
    ),
  },
  {
    name: "Growth",
    monthlyPrice: 17,
    yearlyPrice: 13,
    featured: true,
    subtitle: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19V14" />
        <path d="M9 19V11" />
        <path d="M14 19V13" />
        <path d="M19 19V8" />
        <path d="m4 10 5-3 5 2 5-5" />
      </svg>
    ),
  },
  {
    name: "Premium",
    monthlyPrice: 99,
    yearlyPrice: 74,
    featured: false,
    subtitle: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
      </svg>
    ),
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section id="pricing" className="w-full bg-black py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.22em] text-zinc-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-[1px] bg-[#5E5CE6]" />
            <span>PRICING</span>
            <span className="h-1.5 w-1.5 rounded-[1px] bg-[#5E5CE6]" />
          </div>

          <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[42px]">
            Pay for the leverage,
            <br />
            not the listings
          </h2>

          {/* Monthly / Yearly Toggle */}
          <div className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-[#141417] p-1.5">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              <span>Yearly</span>
              <span className="rounded-full bg-[#D900C5] px-2 py-0.5 text-[11px] font-semibold text-white">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const price =
              billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <div
                key={plan.name}
                className={`flex flex-col justify-between rounded-2xl border p-7 transition-colors duration-200 ${
                  plan.featured
                    ? "border-white/15 bg-gradient-to-b from-[#202024] via-[#141417] to-[#0D0D10]"
                    : "border-white/10 bg-[#070709] hover:border-white/20"
                }`}
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#121215] text-[#E4B8FF]">
                        {plan.icon}
                      </div>
                      <h3 className="text-lg font-medium text-white">
                        {plan.name}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight text-white">
                        ${price}
                      </span>
                      <span className="text-xs text-zinc-400">/month</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mt-8">
                    <p className="text-sm font-medium text-zinc-200">
                      {plan.subtitle}
                    </p>

                    <ul className="mt-5 space-y-3.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-sm text-zinc-400"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/[0.08] text-xs font-medium text-zinc-300">
                            +
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  className={`mt-10 flex w-full cursor-pointer items-center justify-between rounded-xl px-5 py-3.5 text-sm font-medium transition-colors duration-200 ${
                    plan.featured
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "bg-[#222225] text-zinc-200 hover:bg-[#2C2C31]"
                  }`}
                >
                  <span>Choose This Plan</span>
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
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
