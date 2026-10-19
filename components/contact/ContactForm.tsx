"use client";

import { useState } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { buttonClass } from "@/components/ui/ButtonLink";
import { CONTACT_TOPICS, site } from "@/lib/site";

type State = { status: "idle" | "sending" | "sent" } | { status: "error"; message: string };

const field =
  "w-full rounded-2xl border border-line bg-cream px-4 py-3 text-base text-ink-700 placeholder:text-ink-300 focus:border-brand-500 focus:bg-white focus:outline-none";

export default function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Илгээхэд алдаа гарлаа.");
      form.reset();
      setState({ status: "sent" });
    } catch (err) {
      setState({ status: "error", message: err instanceof Error ? err.message : "Илгээхэд алдаа гарлаа." });
    }
  }

  if (state.status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-[32px] border border-line bg-white p-10 text-center">
        <CircleCheck className="size-14 text-brand-500" strokeWidth={1.5} />
        <h2 className="font-display text-2xl font-extrabold text-pine-900">Баярлалаа!</h2>
        <p className="max-w-sm text-ink-500">Таны хүсэлтийг хүлээн авлаа. Бид удахгүй тантай холбогдоно.</p>
        <button onClick={() => setState({ status: "idle" })} className={buttonClass("ghost")}>
          Дахин илгээх
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-[32px] border border-line bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl leading-8 font-extrabold text-pine-900">Санал, хүсэлт илгээх</h2>
        <p className="text-sm text-ink-500">* тэмдэгтэй талбарыг заавал бөглөнө үү.</p>
      </div>

      {/* Spam хамгаалалт — хүн бөглөхгүй нуугдмал талбар */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
          Нэр *
          <input name="name" required maxLength={80} autoComplete="name" className={field} placeholder="Таны нэр" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
          Утас *
          <input
            name="phone"
            required
            type="tel"
            inputMode="tel"
            pattern="[0-9+\s\-]{8,16}"
            autoComplete="tel"
            className={field}
            placeholder="9911 2233"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
        Имэйл
        <input name="email" type="email" maxLength={120} autoComplete="email" className={field} placeholder="name@example.com" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
        Сэдэв *
        <select name="topic" required defaultValue="" className={field}>
          <option value="" disabled>
            Сонгоно уу
          </option>
          {CONTACT_TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-ink-700">
        Дэлгэрэнгүй *
        <textarea name="message" required rows={5} maxLength={2000} className={`${field} resize-y`} placeholder="Санал, хүсэлтээ бичнэ үү" />
      </label>

      {state.status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message} Яаралтай бол {site.phone} дугаарт залгана уу.
        </p>
      )}

      <button type="submit" disabled={state.status === "sending"} className={buttonClass("primary", "self-start disabled:opacity-60")}>
        {state.status === "sending" ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
        Илгээх
      </button>
    </form>
  );
}
