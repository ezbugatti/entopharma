// Компанийн үндсэн мэдээлэл — нэг газраас засна.
export const site = {
  name: "Энто Фарм ХХК",
  shortName: "ЭНТО ФАРМ",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://entopharma.mn",
  description:
    "ЭНТО ФАРМ сүлжээ эмийн сан — Улаанбаатар хотын 20 салбараар чанартай эм, эрүүл мэндийн бүтээгдэхүүн, эмзүйн мэргэжлийн зөвлөгөөг хүргэж байна.",
  phone: "70003686",
  phoneHref: "tel:+97670003686",
  email: "info@entopharma.mn",
  address: "Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Нарны зам-89, 301 тоот",
  social: {
    facebook: "https://www.facebook.com/ento.mn",
    instagram: "https://www.instagram.com/entopharmacy/",
    youtube: "https://www.youtube.com/@entopharmacy",
  },
  group: {
    ento: "https://ento.mn",
    clinic: "https://ento.mn/mn/business-area/clinic",
    trade: "https://ento.mn/mn/business-area/trade",
    supplier: "https://ento.mn/mn/business-area/ento",
  },
  // Нээлттэй ажлын байр — одоогоор ЭНТО ГРУПП-ийн Zangia хуудас (ento.mn/human-тэй ижил)
  careers: "https://www.zangia.mn/company/ento",
};

export const navigation = [
  { name: "Нүүр", href: "/" },
  { name: "Бидний тухай", href: "/about" },
  { name: "Салбарууд", href: "/branches" },
  { name: "Хүний нөөц", href: "/hr" },
  { name: "Холбоо барих", href: "/contact" },
];

export const CONTACT_TOPICS = ["Ерөнхий лавлагаа", "Бүтээгдэхүүний тухай", "Санал, хүсэлт", "Гомдол", "Хамтран ажиллах", "Хүний нөөц, ажлын байр"];
