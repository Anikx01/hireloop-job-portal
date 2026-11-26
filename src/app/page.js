import CtaSection from "@/components/CtaSection";
import FeaturesSection from "@/components/FeaturesSection";
import JobDiscoverySection from "@/components/JobDiscoverySection";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <StatsSection />
      <JobDiscoverySection />
      <FeaturesSection />
      <PricingSection />
      <CtaSection />
    </main>
  );
}
