import FeaturedJobs from "@/components/FeaturedJobs";
import Hero from "@/components/Hero";
import OurServices from "@/components/OurServices";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedJobs/>
      <OurServices/>
      <PricingSection/>
    </div>
  );
}
