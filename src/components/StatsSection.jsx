"use client";
import { Briefcase, ChartColumn, Magnifier, Star } from "@gravity-ui/icons";
import { motion } from "motion/react";
const stats = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: Briefcase,
  },
  {
    value: "12K",
    label: "Companies",
    icon: ChartColumn,
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: Magnifier,
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: Star,
  },
];

export default function StatsSection() {
  return (
    <section className="relative isolate flex min-h-[580px] w-full flex-col justify-end overflow-hidden bg-black px-5 pb-12 pt-44 text-white sm:px-8 lg:min-h-[600px] lg:px-12 lg:pb-14 lg:pt-56">
      {/* Globe Background (shifted up so the pink top of globe.png is clipped off) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src="/globe.png"
          alt=""
          className="absolute left-1/2 -top-[340px] w-[720px] max-w-none -translate-x-1/2 select-none object-contain sm:-top-[430px] sm:w-[900px] lg:-top-[500px] lg:w-[1050px]"
        />

        {/* Top & bottom black fades so no pink tint bleeds at the top edge */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mb-10 text-center lg:mb-12">
          <h2 className="text-2xl font-normal leading-[1.35] tracking-tight text-white/75 sm:text-3xl lg:text-[34px]">
            Assisting over{" "}
            <span className="font-medium text-white">15,000 job seekers</span>
            <br />
            find their dream positions.
          </h2>
          <motion.p>Remote Jobs</motion.p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex h-44 flex-col justify-between rounded-2xl border border-white/10 bg-[#09090b] bg-gradient-to-br from-[#050507] via-[#0d0d10] to-[#1a1a1f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50"
              >
                {/* Icon */}
                <div className="text-white/90">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Statistic */}
                <div>
                  <h3 className="text-4xl font-semibold leading-none tracking-tight text-white">
                    {stat.value}
                  </h3>
                  <p className="mt-2.5 text-xs text-zinc-400">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
