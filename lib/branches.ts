import { createClient } from "@sanity/client";
import type { Branch } from "./types";
import { fallbackBranches } from "./branches.fallback";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-30";

// ento.mn-тэй ижил Sanity project. Зөвхөн "Эмийн сан" төрлийн салбаруудыг авна.
const PHARMACY_QUERY = `*[_type == "branch" && type->value == "pharmacy"] | order(name asc){
  _id,
  name,
  address,
  lat,
  lng,
  phone,
  schedule,
  "image": image.asset->url
}`;

export async function getPharmacies(): Promise<Branch[]> {
  if (!projectId) return fallbackBranches;

  try {
    const client = createClient({ projectId, dataset, apiVersion, useCdn: true });
    const branches = await client.fetch<Branch[]>(
      PHARMACY_QUERY,
      {},
      { next: { revalidate: 3600 } }
    );
    return branches?.length ? branches : fallbackBranches;
  } catch (error) {
    console.error("Sanity-аас салбар татахад алдаа гарлаа:", error);
    return fallbackBranches;
  }
}
