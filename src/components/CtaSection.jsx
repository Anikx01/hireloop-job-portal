import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-24 sm:py-32 md:py-36">
      {/* Top-center arched indigo/violet glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden"
      >
        <div
          className="h-[520px] w-[1300px] max-w-none rounded-t-[100%]"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 50% 0%, rgba(88, 76, 244, 0.9) 0%, rgba(63, 52, 196, 0.5) 36%, rgba(28, 22, 84, 0.2) 64%, rgba(0, 0, 0, 0) 82%)",
          }}
        />
      </div>

      {/* Wireframe dome grid from public/cta-bg.png */}
      <img
        src="/cta-bg.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-90 mix-blend-screen"
      />

      {/* Soft bottom fade into Footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"
      />

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-[54px]">
          Your next role is
          <br />
          already looking for you
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-200 hover:bg-zinc-200"
          >
            Create a free account
          </Link>

          <Link
            href="/#pricing"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-[#15141C]/90 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors duration-200 hover:border-white/25 hover:bg-[#1E1D28] hover:text-white"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
