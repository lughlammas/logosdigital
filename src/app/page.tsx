"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  Sparkles,
  Mail,
  MapPin,
  ArrowRight,
  Globe,
  Rocket,
  Layout,
  Wand2,
} from "lucide-react";

/* ======================================================
   Types
====================================================== */
type Tier = { name: string; price: string; features: string[]; highlight?: boolean };
type ServiceItem = { icon: JSX.Element; title: string; desc: string };
type Lang = "en" | "pt";

/* ======================================================
   COPY (EN + PT)
====================================================== */
const COPY = {
  en: {
    nav: { work: "Work", pricing: "Pricing", contact: "Contact", langLabel: "Language", toggleEN: "EN", togglePT: "PT" },
    brand: {
      name: "Logos Digital",
      tagline: "Digital lab for niche communities & high-impact landing pages.",
      ctaPrimary: "Start a project",
      ctaSecondary: "View portfolio",
    },
    services: [
      { icon: <Layout className="h-6 w-6" />, title: "Custom Landing Pages", desc: "Fast, mobile-first pages designed to turn visitors into leads." },
      { icon: <Rocket className="h-6 w-6" />, title: "Performance & SEO", desc: "Clean code, best practices, and indexing that helps you show up on Google." },
      { icon: <Wand2 className="h-6 w-6" />, title: "Animations & Micro-UX", desc: "Subtle motion and delightful details without hurting speed." },
    ] as ServiceItem[],
    sections: {
      portfolioKicker: "Portfolio",
      portfolioTitle: "Recent work",
      portfolioSubtitle: "A quick look at styles and layouts you can request.",
      pricingKicker: "Pricing",
      pricingTitle: "Simple plans",
      pricingSubtitle: "Start small, grow as you need. Custom quotes available.",
    },
    pricing: [
      { name: "Start", price: "R$ 600", features: ["Single-page landing", "WhatsApp & CTA buttons", "Basic SEO & analytics"] },
      { name: "Pro", price: "R$ 1.200", features: ["Everything in Start", "Copy + images support", "Google Business setup", "QR business card (PDF)"], highlight: true },
      { name: "Premium", price: "R$ 1.900+", features: ["Custom sections & animations", "SEO plan + schema", "Ads setup guidance", "30 days support"] },
    ] as Tier[],
    contact: {
      kicker: "Contact",
      title: "Tell me about your project",
      subtitle: "Prefer WhatsApp? Email? I answer both.",
      email: "hello@logosdigital.com",
      city: "Brasília, DF",
      mapsUrl: "https://maps.app.goo.gl/",
      site: "https://www.logosdigital.com",
      formName: "Name",
      formEmail: "Email or WhatsApp",
      formMsg: "What do you need?",
      formSend: "Send",
      mapTip: "Tip: want a mini map or just a QR to Maps? I can add a QR that opens your exact location.",
    },
    footerText: "Art Meets Algorithm.",
  },
  pt: {
    nav: { work: "Portfólio", pricing: "Preços", contact: "Contato", langLabel: "Idioma", toggleEN: "EN", togglePT: "PT" },
    brand: {
      name: "Logos Digital",
      tagline: "Laboratório digital para nichos & landing pages de alto impacto.",
      ctaPrimary: "Começar um projeto",
      ctaSecondary: "Ver portfólio",
    },
    services: [
      { icon: <Layout className="h-6 w-6" />, title: "Landing Pages Sob Medida", desc: "Páginas rápidas e mobile-first pensadas para gerar leads." },
      { icon: <Rocket className="h-6 w-6" />, title: "Performance & SEO", desc: "Código limpo, boas práticas e indexação para aparecer no Google." },
      { icon: <Wand2 className="h-6 w-6" />, title: "Animações & Micro-UX", desc: "Movimentos sutis e detalhes agradáveis sem perder velocidade." },
    ] as ServiceItem[],
    sections: {
      portfolioKicker: "Portfólio",
      portfolioTitle: "Trabalhos recentes",
      portfolioSubtitle: "Uma amostra de estilos e layouts que você pode pedir.",
      pricingKicker: "Preços",
      pricingTitle: "Planos simples",
      pricingSubtitle: "Comece pequeno e evolua conforme precisar. Orçamentos sob medida.",
    },
    pricing: [
      { name: "Start", price: "R$ 600", features: ["Landing page única", "Botões WhatsApp & CTA", "SEO básico & analytics"] },
      { name: "Pro", price: "R$ 1.200", features: ["Tudo do Start", "Textos & imagens", "Google Business", "Cartão QR (PDF)"], highlight: true },
      { name: "Premium", price: "R$ 1.900+", features: ["Seções & animações sob medida", "Plano de SEO + schema", "Config de anúncios", "30 dias de suporte"] },
    ] as Tier[],
    contact: {
      kicker: "Contato",
      title: "Conte sobre o seu projeto",
      subtitle: "Prefere WhatsApp? Email? Respondo ambos.",
      email: "hello@logosdigital.com",
      city: "Brasília, DF",
      mapsUrl: "https://maps.app.goo.gl/",
      site: "https://www.logosdigital.com",
      formName: "Nome",
      formEmail: "Email ou WhatsApp",
      formMsg: "Do que você precisa?",
      formSend: "Enviar",
      mapTip: "Dica: quer um mapa mini ou só um QR para o Maps? Posso adicionar um QR que abre sua localização exata.",
    },
    footerText: "Art Meets Algorithm.",
  },
} as const;

type Copy = typeof COPY["en"];

/* ======================================================
   Anim helpers
====================================================== */
const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/* ======================================================
   SectionTitle
====================================================== */
function SectionTitle(props: { kicker?: string; title: string; subtitle?: string }) {
  const { kicker, title, subtitle } = props;
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker && (
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          <Sparkles className="h-3 w-3" /> {kicker}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/* ======================================================
   Navbar
====================================================== */
function Navbar({ lang, setLang, c }: { lang: Lang; setLang: (l: Lang) => void; c: Copy }) {
  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo only */}
        <a href="#" className="flex items-center">
          <Image
            src="/logosdigital-logo.png"
            alt="Logos Digital logo"
            width={240}
            height={240}
            className="h-32 w-auto object-contain md:h-40 lg:h-48"
            priority
          />
        </a>

        <div className="flex items-center gap-4">
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#work" className="opacity-80 hover:opacity-100">
              {c.nav.work}
            </a>
            <a href="#pricing" className="opacity-80 hover:opacity-100">
              {c.nav.pricing}
            </a>
            <a href="#contact" className="opacity-80 hover:opacity-100">
              {c.nav.contact}
            </a>
          </nav>

          <div className="flex items-center gap-2" title={`${c.nav.langLabel}: English / Português`}>
            <span className="hidden text-xs text-muted-foreground sm:inline">{c.nav.langLabel}</span>
            <div className="inline-flex overflow-hidden rounded-full border shadow-sm">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-xs ${lang === "en" ? "bg-primary text-white" : "bg-background text-foreground"}`}
                aria-pressed={lang === "en"}
              >
                {c.nav.toggleEN}
              </button>
              <button
                onClick={() => setLang("pt")}
                className={`px-3 py-1 text-xs ${lang === "pt" ? "bg-primary text-white" : "bg-background text-foreground"}`}
                aria-pressed={lang === "pt"}
              >
                {c.nav.togglePT}
              </button>
            </div>
          </div>

          <Button
            className="hidden md:inline-flex"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            {c.brand.ctaPrimary}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   Hero
====================================================== */
function Hero({ brand, services }: { brand: Copy["brand"]; services: ServiceItem[] }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent blur-3xl" />
      </div>

      <div className="container flex flex-col items-center py-24 sm:py-28">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center">
          <motion.h1 variants={fade} className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            {brand.name}
          </motion.h1>
          <motion.p variants={fade} className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            {brand.tagline}
          </motion.p>
          <motion.div variants={fade} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              className="h-11 px-6 text-base"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {brand.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              className="h-11 px-6 text-base"
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            >
              {brand.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={fade} className="mt-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {services.map((s, i) => (
            <Card key={i} className="border-muted/40">
              <CardHeader>
                <div className="mb-2 text-emerald-600">{s.icon}</div>
                <CardTitle className="text-base">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ======================================================
   Work
====================================================== */
function Work({ c }: { c: Copy }) {
  return (
    <section id="work" className="container py-20">
      <SectionTitle
        kicker={c.sections.portfolioKicker}
        title={c.sections.portfolioTitle}
        subtitle={c.sections.portfolioSubtitle}
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((idx) => (
          <motion.a
            key={idx}
            href="#"
            target="_blank"
            rel="noreferrer"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-sm hover:shadow-md"
          >
            <div className="aspect-[16/10] w-full rounded-xl bg-slate-700/40" />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Project {idx + 1}</h3>
                <p className="text-xs text-slate-300">Demo • Layout • Motion</p>
              </div>
              <ArrowRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ======================================================
   Pricing
====================================================== */
function Pricing({ c }: { c: Copy }) {
  const lang = c.nav.langLabel === "Language" ? "en" : "pt";
  return (
    <section id="pricing" className="bg-slate-50/40 py-20">
      <div className="container">
        <SectionTitle
          kicker={c.sections.pricingKicker}
          title={c.sections.pricingTitle}
          subtitle={c.sections.pricingSubtitle}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.pricing.map((tier, i) => (
            <Card
              key={i}
              className={tier.highlight ? "border-emerald-300 shadow-[0_0_0_2px_rgba(16,185,129,0.25)]" : ""}
            >
              <CardHeader>
                <CardTitle className="flex items-baseline justify-between">
                  <span>{tier.name}</span>
                  <span className="text-xl font-extrabold">{tier.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-6 w-full">
                  {lang === "en" ? "Choose" : "Escolher"} {tier.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   Contact
====================================================== */
function Contact({ c }: { c: Copy }) {
  const C = c.contact;
  const lang = c.nav.langLabel === "Language" ? "en" : "pt";

  return (
    <section id="contact" className="container py-20">
      <SectionTitle kicker={C.kicker} title={C.title} subtitle={C.subtitle} />
      <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{lang === "en" ? "Quick message" : "Mensagem rápida"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3">
              <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm" placeholder={C.formName} />
              <input className="w-full rounded-lg border bg-background px-3 py-2 text-sm" placeholder={C.formEmail} />
              <textarea className="min-h-[120px] w-full rounded-lg border bg-background px-3 py-2 text-sm" placeholder={C.formMsg} />
              <Button className="w-full">{C.formSend}</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4 text-sm">
          <a href={`mailto:${C.email}`} className="flex items-center gap-2 text-foreground/90 hover:text-emerald-600">
            <Mail className="h-4 w-4" /> {C.email}
          </a>
          <a href={C.mapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-foreground/90 hover:text-emerald-600">
            <MapPin className="h-4 w-4" /> {C.city}
          </a>
          <a href={C.site} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-foreground/90 hover:text-emerald-600">
            <Globe className="h-4 w-4" /> {C.site}
          </a>

          <div className="mt-6 rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground">{C.mapTip}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   Footer
====================================================== */
function Footer({ text }: { text: string }) {
  return (
    <footer className="border-t py-10">
      <div className="container flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Logos Digital</p>
        <div className="flex items-center gap-2">
          <Image
            src="/footer-vetor-image.png"
            alt={text}
            width={1600}
            height={400}
            className="block h-32 w-auto object-contain md:h-48 lg:h-64"
            priority
          />
          <span className="sr-only">{text}</span>
        </div>
      </div>
    </footer>
  );
}

/* ======================================================
   Page
====================================================== */
export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("pt"); // default PT
  const c: Copy = COPY[lang];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50 text-slate-900">
      <Navbar lang={lang} setLang={setLang} c={c} />
      <Hero brand={c.brand} services={c.services} />
      <Pricing c={c} />
      <Work c={c} />
      <Contact c={c} />
      <Footer text={c.footerText} />
    </main>
  );
}
