import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";

export default function Home() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "31600000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20SmartLivings%2C%20I%20want%20a%20consultation%20for%20my%20home%20project.`;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-5 bottom-5 z-40 inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-500"
      >
        WhatsApp
      </a>
    </>
  );
}
