import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import BranchExplorer from "@/components/branches/BranchExplorer";
import { getPharmacies } from "@/lib/branches";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Салбарын байршил",
  description: "ЭНТО ФАРМ сүлжээ эмийн сангийн Улаанбаатар хот дахь салбаруудын хаяг, ажлын цаг, утас.",
};

export default async function BranchesPage({
  searchParams,
}: {
  searchParams: Promise<{ district?: string }>;
}) {
  const [branches, { district }] = await Promise.all([getPharmacies(), searchParams]);

  return (
    <>
      <PageHero
        title="Салбарын байршил"
        subtitle={`Улаанбаатар хотын ${branches.length} салбар эмийн сангаас өөрт ойрыг олж, ажлын цаг, утас, чиглэлийг нэг дороос харна уу.`}
      />
      <BranchExplorer branches={branches} initialDistrict={district} />
    </>
  );
}
