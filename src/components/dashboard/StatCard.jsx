export default function StatCard({ icon, label, value, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-[#111216] p-6 transition-colors duration-200 hover:border-white/15 ${className}`}
    >
      {/* Icon Box */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1E2028] text-zinc-200">
        {icon}
      </div>

      {/* Label & Stat Value */}
      <div className="mt-6">
        <p className="text-sm font-medium text-zinc-400">{label}</p>
        <p className="mt-1.5 text-3xl font-semibold tracking-tight text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
