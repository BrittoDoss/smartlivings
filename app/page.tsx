import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { getLocaleFromLangParam, getSiteCopy } from "@/lib/i18n";

type HomeProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const locale = getLocaleFromLangParam(params.lang);
  const copy = getSiteCopy(locale);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "31623053300";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(copy.whatsapp.message)}`;

  return (
    <>
      <Navbar locale={locale} copy={copy.navbar} />
      <main>
        <Hero copy={copy.hero} />
        <Services copy={copy.services} />
        <WhyUs copy={copy.whyUs} />
        <Projects copy={copy.projects} />
        <ContactForm copy={copy.contact} />
      </main>
      <Footer copy={copy.footer} />
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-5 bottom-5 z-40 inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-500"
      >
        {copy.whatsapp.label}
      </a>
    </>
  );
}
