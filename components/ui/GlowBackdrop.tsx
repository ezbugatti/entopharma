// ento.mn нүүр хуудасны дээд буланд байдаг бүдэг ногоон гэрлийн толбо
export default function GlowBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[680px] overflow-hidden">
      <div className="absolute top-[90px] left-[150px] size-[206px] rounded-full bg-glow blur-[120px]" />
      <div className="absolute top-[230px] right-[150px] size-[206px] rounded-full bg-glow blur-[120px]" />
    </div>
  );
}
