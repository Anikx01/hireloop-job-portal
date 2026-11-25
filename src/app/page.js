import JobDiscoverySection from "@/components/JobDiscoverySection";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <StatsSection />
      <JobDiscoverySection />
    </main>
  );
}
