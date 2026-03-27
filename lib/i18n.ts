export type Locale = "en" | "nl";

export type SiteCopy = {
  navbar: {
    home: string;
    services: string;
    projects: string;
    contact: string;
    clientLogin: string;
    consultationCta: string;
    language: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    videoAriaLabel: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };
  projects: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    name: string;
    email: string;
    phone: string;
    projectType: string;
    budgetRange: string;
    fileUpload: string;
    message: string;
    projectTypePlaceholder: string;
    budgetPlaceholder: string;
    fileHelp: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successFallback: string;
    requestFailed: string;
    submitFailed: string;
    errors: {
      name: string;
      email: string;
      phone: string;
      projectType: string;
      budgetRange: string;
      message: string;
      file: string;
    };
    projectTypeOptions: Array<{
      value: "New Build" | "Renovation" | "Interiors";
      label: string;
    }>;
    budgetRangeOptions: Array<{
      value: "Below €25k" | "€25k - €50k" | "€50k - €100k" | "€100k+";
      label: string;
    }>;
  };
  footer: {
    description: string;
  };
  whatsapp: {
    label: string;
    message: string;
  };
};

const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    navbar: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      clientLogin: "Client Login",
      consultationCta: "Free Consultation",
      language: "Language",
    },
    hero: {
      badge: "Interior Design & Execution in NL",
      title: "Build your dream home in the Netherlands — smarter and more affordable",
      subtitle: "Interior design, global sourcing, and full execution.",
      primaryCta: "Get Free Consultation",
      secondaryCta: "View Projects",
      videoAriaLabel: "SmartLivings introduction video",
    },
    services: {
      eyebrow: "Services",
      title: "Built around quality, cost, and speed",
      items: [
        {
          title: "Interior Design",
          description:
            "2D and 3D planning tailored to your lifestyle, layout, and long-term comfort.",
        },
        {
          title: "Material Sourcing",
          description:
            "Direct procurement from trusted manufacturers for premium finishes at better value.",
        },
        {
          title: "Full Implementation",
          description:
            "End-to-end project execution from site coordination to handover and quality checks.",
        },
      ],
    },
    whyUs: {
      eyebrow: "Why Choose Us",
      title: "One team, one process, zero guesswork",
      description:
        "SmartLivings combines design intelligence, sourcing power, and disciplined execution to deliver better outcomes for homeowners in the Netherlands.",
      points: [
        "Cost-efficient solutions",
        "Premium quality materials",
        "End-to-end service",
        "Reliable execution in NL",
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Recent work snapshots",
      items: [
        {
          title: "Canal Apartment",
          description: "Renovation and interior planning for a compact urban home.",
        },
        {
          title: "Family Villa",
          description: "Premium materials package and custom furniture sourcing.",
        },
        {
          title: "Modern Loft",
          description: "Full execution with timeline-led coordination in Rotterdam.",
        },
        {
          title: "New Build Finish",
          description: "End-to-end implementation for a newly delivered residence.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Request your free quote",
      description:
        "Share your project details and upload any floor plans or references. Our team will respond with the next steps.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      projectType: "Project Type",
      budgetRange: "Budget Range",
      fileUpload: "File Upload",
      message: "Message",
      projectTypePlaceholder: "Select project type",
      budgetPlaceholder: "Select budget range",
      fileHelp: "Upload floor plans, inspiration images, or PDFs (max 10MB).",
      messagePlaceholder: "Tell us about your timeline, preferences, and goals.",
      submit: "Get Free Consultation",
      submitting: "Sending...",
      successFallback: "Thank you. We will contact you shortly.",
      requestFailed: "Could not submit your request.",
      submitFailed: "Submission failed. Please try again.",
      errors: {
        name: "Please enter your full name.",
        email: "Please enter a valid email address.",
        phone: "Please enter a valid phone number.",
        projectType: "Please choose a project type.",
        budgetRange: "Please choose a budget range.",
        message: "Please share a short project brief (minimum 10 characters).",
        file: "File must be under 10MB.",
      },
      projectTypeOptions: [
        { value: "New Build", label: "New Build" },
        { value: "Renovation", label: "Renovation" },
        { value: "Interiors", label: "Interiors" },
      ],
      budgetRangeOptions: [
        { value: "Below €25k", label: "Below €25k" },
        { value: "€25k - €50k", label: "€25k - €50k" },
        { value: "€50k - €100k", label: "€50k - €100k" },
        { value: "€100k+", label: "€100k+" },
      ],
    },
    footer: {
      description:
        "Interior design, material sourcing, and full home execution in the Netherlands.",
    },
    whatsapp: {
      label: "WhatsApp",
      message: "Hi SmartLivings, I want a consultation for my home project.",
    },
  },
  nl: {
    navbar: {
      home: "Home",
      services: "Diensten",
      projects: "Projecten",
      contact: "Contact",
      clientLogin: "Client Login",
      consultationCta: "Gratis Advies",
      language: "Taal",
    },
    hero: {
      badge: "Interieurontwerp & Uitvoering in NL",
      title: "Bouw uw droomhuis in Nederland — slimmer en betaalbaarder",
      subtitle: "Interieurontwerp, wereldwijde inkoop en volledige uitvoering.",
      primaryCta: "Gratis Advies Aanvragen",
      secondaryCta: "Bekijk Projecten",
      videoAriaLabel: "SmartLivings introductievideo",
    },
    services: {
      eyebrow: "Diensten",
      title: "Gebouwd rond kwaliteit, kosten en snelheid",
      items: [
        {
          title: "Interieurontwerp",
          description:
            "2D- en 3D-planning afgestemd op uw levensstijl, indeling en comfort.",
        },
        {
          title: "Materiaalinkoop",
          description:
            "Directe inkoop bij betrouwbare fabrikanten voor premium afwerking tegen betere waarde.",
        },
        {
          title: "Volledige Uitvoering",
          description:
            "Volledige projectuitvoering van coördinatie op locatie tot oplevering en kwaliteitscontrole.",
        },
      ],
    },
    whyUs: {
      eyebrow: "Waarom Kiezen Voor Ons",
      title: "Eén team, één proces, geen giswerk",
      description:
        "SmartLivings combineert ontwerp, inkoopkracht en strakke uitvoering voor betere resultaten voor woningeigenaren in Nederland.",
      points: [
        "Kostenefficiënte oplossingen",
        "Premium kwaliteitsmaterialen",
        "End-to-end service",
        "Betrouwbare uitvoering in NL",
      ],
    },
    projects: {
      eyebrow: "Projecten",
      title: "Recente projectimpressies",
      items: [
        {
          title: "Grachtenappartement",
          description: "Renovatie en interieurplanning voor een compacte stadswoning.",
        },
        {
          title: "Gezinsvilla",
          description: "Premium materiaalpakket en maatwerk meubelinkoop.",
        },
        {
          title: "Moderne Loft",
          description: "Volledige uitvoering met strakke planning en coördinatie in Rotterdam.",
        },
        {
          title: "Nieuwbouw Afwerking",
          description: "Volledige implementatie voor een nieuw opgeleverde woning.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Vraag uw gratis offerte aan",
      description:
        "Deel uw projectdetails en upload plattegronden of referenties. Ons team neemt snel contact met u op.",
      name: "Naam",
      email: "E-mail",
      phone: "Telefoon",
      projectType: "Projecttype",
      budgetRange: "Budget",
      fileUpload: "Bestand Uploaden",
      message: "Bericht",
      projectTypePlaceholder: "Selecteer projecttype",
      budgetPlaceholder: "Selecteer budget",
      fileHelp: "Upload plattegronden, inspiratiebeelden of pdf's (max 10MB).",
      messagePlaceholder: "Vertel ons over uw planning, voorkeuren en doelen.",
      submit: "Gratis Advies Aanvragen",
      submitting: "Verzenden...",
      successFallback: "Bedankt. We nemen snel contact met u op.",
      requestFailed: "Uw aanvraag kon niet worden verzonden.",
      submitFailed: "Verzenden mislukt. Probeer opnieuw.",
      errors: {
        name: "Vul uw volledige naam in.",
        email: "Vul een geldig e-mailadres in.",
        phone: "Vul een geldig telefoonnummer in.",
        projectType: "Kies een projecttype.",
        budgetRange: "Kies een budget.",
        message: "Deel een korte projectomschrijving (minimaal 10 tekens).",
        file: "Bestand moet kleiner zijn dan 10MB.",
      },
      projectTypeOptions: [
        { value: "New Build", label: "Nieuwbouw" },
        { value: "Renovation", label: "Renovatie" },
        { value: "Interiors", label: "Interieur" },
      ],
      budgetRangeOptions: [
        { value: "Below €25k", label: "Onder €25k" },
        { value: "€25k - €50k", label: "€25k - €50k" },
        { value: "€50k - €100k", label: "€50k - €100k" },
        { value: "€100k+", label: "€100k+" },
      ],
    },
    footer: {
      description:
        "Interieurontwerp, materiaalinkoop en volledige woninguitvoering in Nederland.",
    },
    whatsapp: {
      label: "WhatsApp",
      message: "Hi SmartLivings, ik wil graag advies voor mijn woningproject.",
    },
  },
};

export function getLocaleFromLangParam(lang?: string | null): Locale {
  return lang === "en" ? "en" : "nl";
}

export function getSiteCopy(locale: Locale): SiteCopy {
  return siteCopy[locale];
}
