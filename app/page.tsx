import Hero from "@/components/home/Hero";
import StatsShowcase from "@/components/home/StatsShowcase";
import WhyUs from "@/components/home/WhyUs";
import Services from "@/components/home/Services";
import BranchesPreview from "@/components/home/BranchesPreview";
import GroupSection from "@/components/home/GroupSection";
import CtaBand from "@/components/home/CtaBand";
import GlowBackdrop from "@/components/ui/GlowBackdrop";
import { getPharmacies } from "@/lib/branches";
import { districtOf } from "@/lib/district";
import { latestClosing } from "@/lib/schedule";

export const revalidate = 3600;

export default async function Home() {
  const branches = await getPharmacies();
  const districts = new Set(branches.map(districtOf));

  const stats = [
    { value: String(branches.length), label: "Салбар эмийн сан" },
    { value: String(districts.size), label: "Дүүрэгт үйлчилж байна" },
    { value: latestClosing(branches.map((b) => b.schedule)) ?? "22:00", label: "Хүртэл нээлттэй салбартай" },
    { value: "3600+", label: "Бүтээгдэхүүний нэр төрөл" },
  ];

  return (
    <div className="relative overflow-x-hidden">
      <GlowBackdrop />
      <div className="relative z-10">
        <Hero count={branches.length} />
        <StatsShowcase branches={branches} stats={stats} />
        <WhyUs />
        <Services />
        <BranchesPreview branches={branches} />
        <GroupSection />
        <CtaBand />
      </div>
    </div>
  );
}
