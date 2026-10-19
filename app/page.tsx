import Hero from "@/components/home/Hero";
import StatsBand from "@/components/home/StatsBand";
import Categories from "@/components/home/Categories";
import PharmacistCare from "@/components/home/PharmacistCare";
import WhyUs from "@/components/home/WhyUs";
import StoreFinder from "@/components/home/StoreFinder";
import GroupSection from "@/components/home/GroupSection";
import CtaBand from "@/components/home/CtaBand";
import { getPharmacies } from "@/lib/branches";
import { DISTRICTS, districtOf } from "@/lib/district";
import { latestClosing } from "@/lib/schedule";

export const revalidate = 3600;

export default async function Home() {
  const branches = await getPharmacies();
  const districts = DISTRICTS.filter((d) => branches.some((b) => districtOf(b) === d));

  const stats = [
    { value: String(branches.length), label: "Салбар эмийн сан" },
    { value: String(districts.length), label: "Дүүрэгт үйлчилж байна" },
    { value: latestClosing(branches.map((b) => b.schedule)) ?? "22:00", label: "Хүртэл нээлттэй салбартай" },
    { value: "3600+", label: "Бүтээгдэхүүний нэр төрөл" },
  ];

  return (
    <>
      <Hero branches={branches} districts={districts} />
      <StatsBand stats={stats} />
      <Categories />
      <PharmacistCare />
      <WhyUs />
      <StoreFinder branches={branches} />
      <GroupSection />
      <CtaBand />
    </>
  );
}
