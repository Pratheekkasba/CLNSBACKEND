"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, GraduationCap, TrendingUp, Users, CheckCircle, ArrowRight } from "lucide-react";

// highlight: { border, glow, badge, divider } Tailwind color tokens
const affiliations = [
  {
    title: "T-Hub",
    logo: "/affiliations/thub-logo.png",
    description: "India's largest innovation ecosystem and one of the world's leading startup incubators. CLNS partners with T-Hub to connect legal-tech startups and advocates within a thriving innovation network.",
    highlight: {
      border: "border-orange-400/50",
      glow: "from-orange-400/50 via-red-500/30 to-orange-600/40",
      badge: "bg-orange-500/15 text-orange-300 border-orange-400/30",
      divider: "via-orange-400",
      title: "group-hover:text-orange-300",
      logoGlow: "group-hover:shadow-[0_0_20px_rgba(251,146,60,0.35)] group-hover:border-orange-400/40",
    },
  },
  {
    title: "WE Hub",
    logo: "/affiliations/wehub-logo.png",
    description: "Telangana's premier state-led incubator dedicated to empowering women entrepreneurs. CLNS collaborates with WE Hub to support women-led legal startups through mentorship and systemic networks.",
    highlight: {
      border: "border-amber-400/50",
      glow: "from-amber-400/50 via-yellow-500/30 to-orange-500/40",
      badge: "bg-amber-500/15 text-amber-300 border-amber-400/30",
      divider: "via-amber-400",
      title: "group-hover:text-amber-300",
      logoGlow: "group-hover:shadow-[0_0_20px_rgba(251,191,36,0.35)] group-hover:border-amber-400/40",
    },
  },
  {
    title: "Ratan Tata Innovation Hub",
    logo: "/affiliations/rtih-logo.png",
    description: "A premier innovation hub backed by Ratan Tata's legacy. CLNS partners with RTIH to bring cutting-edge legal frameworks to innovative businesses, ensuring compliance and IP protection at scale.",
    highlight: {
      border: "border-purple-400/50",
      glow: "from-purple-400/50 via-violet-500/30 to-purple-600/40",
      badge: "bg-purple-500/15 text-purple-300 border-purple-400/30",
      divider: "via-purple-400",
      title: "group-hover:text-purple-300",
      logoGlow: "group-hover:shadow-[0_0_20px_rgba(192,132,252,0.35)] group-hover:border-purple-400/40",
    },
  },
  {
    title: "United Nations",
    logo: "/affiliations/un-logo.jpeg",
    description: "Affiliation for NGOs, international organizations, and global legal-tech startups. Access joint initiatives on sustainable development aligned with UN standards.",
  },
  {
    title: "UIA – Union of International Associations",
    logo: "/affiliations/uia-logo.jpg",
    description: "Affiliation for international associations and cross-border legal networks. Benefit from referral networks, collaborative research, and shared best practices.",
  },
  {
    title: "FICL – Federation of Indian Corporate Lawyers",
    logo: "/affiliations/ficl-logo.jpeg",
    description: "Affiliation for law firms and corporate legal departments across India. Access referral networks, joint training programs, and co-branded corporate legal initiatives.",
  },
  {
    title: "Woxsen University",
    logo: "/partners/woxen-university.jpeg",
    description: "Affiliation bridging legal education with practice. Internship pipelines, joint research projects, and co-branded legal tech programs for students and institutions.",
  },
  {
    title: "National Law University",
    logo: "/partners/law-universities.png",
    description: "Affiliation committed to legal education excellence. Internship pipelines, legal technology initiatives, and referral networks preparing the next generation.",
  },
] as Array<{
  title: string;
  logo: string;
  description: string;
  highlight?: {
    border: string;
    glow: string;
    badge: string;
    divider: string;
    title: string;
    logoGlow: string;
  };
}>;

const academicCollaborations = [
  {
    title: "Law Colleges",
    logo: "/partners/law-universities.png",
    description:
      "Internship pipelines connecting students with real cases from day one of their LLB. Guest lectures by practicing advocates, live case exposure, and moot court support. Certificate programmes that bridge classroom learning with practical advocacy skills, helping students become advocates from day one.",
  },
  {
    title: "Universities",
    logo: "/partners/law-universities.png",
    description:
      "Strategic partnerships with universities for curriculum co-development and research support. Students access live case studies, participate in joint research projects, and gain exposure to real-world legal practice. Long-term collaborations focused on preparing the next generation of legal professionals.",
  },
  {
    title: "Skill & Training Centres",
    logo: "/partners/law-universities.png",
    description:
      "Specialized training programmes and skill development initiatives for law students and young lawyers. Certificate courses, practical workshops, and hands-on training in legal technology. Focused on building advocacy skills, research capabilities, and professional readiness from the start of legal education.",
  },
];


const leadingLegalResearchCentres = [
  {
    title: "Centre for Research and Planning, Supreme Court of India",
    subtitle: "New Delhi",
    description:
      "Dedicated policy and research centre of the Supreme Court working on judicial reforms, data-driven justice delivery, and court-focused research initiatives. CLNS seeks to collaborate with and take inspiration from such research centres.",
  },
  {
    title: "Indian Law Institute (ILI)",
    subtitle: "New Delhi",
    description:
      "National-level institution promoting advanced legal research and education through journals, projects, and training programmes for the legal fraternity. CLNS aims to explore potential collaborations with such institutions.",
  },
  {
    title: "Centre for Law & Policy Research (CLPR)",
    subtitle: "Bengaluru",
    description:
      "Independent organisation doing constitutional and public policy research, strategic litigation, and governance reform projects to strengthen rights and institutions. CLNS seeks to collaborate with and learn from such research centres.",
  },
  {
    title: "Vidhi Centre for Legal Policy",
    subtitle: "New Delhi (with state units)",
    description:
      "Non-partisan legal think-tank providing research-based support to governments and public institutions for drafting better laws and improving governance. CLNS aims to explore potential collaborations with such institutions.",
  },
  {
    title: "Centre for Policy Research (CPR)",
    subtitle: "New Delhi",
    description:
      "Public policy think-tank conducting interdisciplinary research on governance, regulation, and development with strong law and policy dimensions. CLNS seeks to collaborate with and take inspiration from such research centres.",
  },
];

const researchCollaborations = [
  {
    title: "Legal Research Centres",
    logo: "/partners/law-universities.png",
    description:
      "Joint research projects on case law analysis, legal precedents, and empirical studies. Students and young lawyers work as research associates, contributing to academic publications and data-driven insights. Opportunities to participate in impact assessments and evidence-based legal research.",
  },
  {
    title: "Policy Think-Tanks",
    logo: "/partners/policy-thinktank.png",
    description:
      "Collaborative policy reports, white papers, and regulatory impact studies. Research associates contribute to thought leadership that shapes legal policy and practice. Joint initiatives on legal framework analysis and policy advocacy for tech-enabled justice solutions.",
  },
  {
    title: "Innovation Labs",
    logo: "/partners/corporate-legal.png",
    description:
      "Legal-tech experiments and innovation projects that test new solutions for justice delivery. Students and young lawyers participate as contributors, gaining hands-on experience with cutting-edge legal technology. Focus on building data-driven, tech-enabled justice solutions.",
  },
  {
    title: "Tech & AI Partners",
    logo: "/partners/corporate-legal.png",
    description:
      "Partnerships with technology and AI companies for legal-tech research and development. Joint projects on AI-powered legal tools, automation solutions, and digital justice platforms. Opportunities for students and young lawyers to work on innovative legal technology projects.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.25, ease: [0, 0, 0.2, 1] }, // ease-out, only transform and opacity
  }),
};

export default function AffiliationPage() {
  return (
    <div className="min-h-screen w-full bg-[#020712] text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
          className="mb-20 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Affiliation
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Our strategic partnerships and affiliations with leading global and national organizations.
          </p>
        </motion.header>

        {/* Featured 3 — T-Hub, WEHub, RTIH */}
        <div className="grid gap-4 sm:grid-cols-3 mb-4">
          {affiliations.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              className="group relative"
            >
              {/* Colored gradient border glow */}
              <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${item.highlight!.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ filter: "blur(0.5px)" }} />

              <article className={`relative h-full flex flex-col items-center text-center rounded-2xl border ${item.highlight!.border} bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-5 overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-1`}>

                {/* Featured badge */}
                <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.highlight!.badge}`}>
                  Featured
                </span>

                {/* Logo */}
                <div className={`relative z-10 mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-white/10 bg-white/95 p-2 shadow-md transition-all duration-300 ${item.highlight!.logoGlow}`}>
                  <Image src={item.logo} alt={`${item.title} logo`} width={60} height={60} className="h-full w-full object-contain" loading="lazy" quality={90} />
                </div>

                {/* Divider */}
                <div className={`relative z-10 mb-3 h-[2px] w-6 rounded-full bg-gradient-to-r from-transparent ${item.highlight!.divider} to-transparent opacity-60 transition-all duration-500 group-hover:w-12 group-hover:opacity-100`} />

                <h3 className={`relative z-10 mb-2 text-sm font-bold leading-tight text-white transition-colors duration-200 ${item.highlight!.title}`}>
                  {item.title}
                </h3>
                <p className="relative z-10 text-xs leading-relaxed text-white/50 group-hover:text-white/65 transition-colors duration-200">
                  {item.description}
                </p>
              </article>
            </motion.div>
          ))}
        </div>

        {/* Standard 5 cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {affiliations.slice(3).map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index + 3}
              className="group relative"
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-teal-400/40 via-cyan-500/25 to-blue-600/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ filter: "blur(0.5px)" }} />

              <article className="relative h-full flex flex-col items-center text-center rounded-2xl border border-white/8 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-4 overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-1">
                <div className="relative z-10 mb-3 flex h-[60px] w-[60px] items-center justify-center rounded-lg border border-white/10 bg-white/95 p-2 shadow-sm transition-all duration-300 group-hover:border-teal-400/40 group-hover:shadow-[0_0_14px_rgba(34,211,238,0.2)]">
                  <Image src={item.logo} alt={`${item.title} logo`} width={48} height={48} className="h-full w-full object-contain" loading="lazy" quality={90} />
                </div>
                <div className="relative z-10 mb-2 h-[1.5px] w-5 rounded-full bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-40 transition-all duration-500 group-hover:w-10 group-hover:opacity-90" />
                <h3 className="relative z-10 mb-1.5 text-xs font-bold leading-tight text-white transition-colors duration-200 group-hover:text-teal-300">
                  {item.title}
                </h3>
                <p className="relative z-10 text-[11px] leading-relaxed text-white/45 group-hover:text-white/60 transition-colors duration-200">
                  {item.description}
                </p>
              </article>
            </motion.div>
          ))}
        </div>

        {/* Academic Collaborations Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
          className="mt-32 mb-20 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Academic Collaborations
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            CLNS partners with universities and law colleges to bridge classroom learning with real-world legal practice.
          </p>
        </motion.section>

        {/* Affiliations with National Law Universities Subsection */}
        <section className="relative my-32 overflow-hidden">
          {/* Smooth dark-to-teal gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-navy-950 to-teal-950" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-8 lg:py-32">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                {/* Left Column: Heading + Paragraph + Button */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
                  className="flex flex-col space-y-8"
                >
                  <div className="space-y-6">
                    <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-5xl lg:text-6xl">
                      Affiliations with National Law Universities
                    </h2>

                    <p className="max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
                      CLNS collaborates exclusively with National Law Universities across India, delivering premium academic partnerships, research initiatives, and professional training programmes that elevate legal education.
                    </p>
                  </div>

                  {/* Primary CTA Button */}
                  <div className="pt-4">
                    <a
                      href="https://wa.me/918465958825?text=Hi%20CLNS%2C%20I%20want%20to%20partner%20with%20you"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center rounded-full bg-teal-500 px-10 py-4 text-base font-semibold text-white shadow-[0_4px_20px_rgba(34,211,238,0.4)] transition-all duration-200 ease-out hover:scale-105 hover:bg-teal-400 hover:shadow-[0_8px_30px_rgba(34,211,238,0.6)] md:px-12 md:py-5 md:text-lg"
                    >
                      Partner with CLNS
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>

                {/* Right Column: Key Benefits Card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.15, ease: [0, 0, 0.2, 1] }}
                  className="flex flex-col"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:p-8">
                    <h3 className="mb-6 text-xl font-semibold text-white md:text-2xl">
                      Key Benefits
                    </h3>
                    <ul className="space-y-5">
                      {[
                        { icon: Briefcase, label: "Premium Internships", description: "Real-world case exposure from day one" },
                        { icon: TrendingUp, label: "Research Opportunities", description: "Joint initiatives advancing legal technology" },
                        { icon: GraduationCap, label: "Expert Training", description: "Workshops designed by leading NLU faculty" },
                        { icon: Users, label: "Mentorship Access", description: "Direct pathways to distinguished practitioners" },
                      ].map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.3, delay: 0.25 + index * 0.1, ease: [0, 0, 0.2, 1] }}
                          className="flex items-start gap-4"
                        >
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-400/10 text-teal-300">
                            <benefit.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-1 text-base font-semibold text-white md:text-lg">
                              {benefit.label}
                            </h4>
                            <p className="text-sm leading-relaxed text-white/70 md:text-base">
                              {benefit.description}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Collaborations Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
          className="mb-20 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Research Collaborations
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Collaborating with research centres and policy institutions to build data-driven, tech-enabled justice solutions.
          </p>
        </motion.section>

        {/* Leading Legal Research Centres in India Subsection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
          className="mb-12 text-center"
        >
          <h3 className="mb-8 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            Leading Legal Research Centres in India
          </h3>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8 mb-16">
          {leadingLegalResearchCentres.map((centre, index) => (
            <motion.article
              key={centre.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-200 ease-out hover:border-teal-400/40 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] md:p-8"
            >
              {/* Text Content */}
              <div className="text-center">
                <h3 className="mb-2 text-xl font-bold leading-tight text-white transition-colors group-hover:text-teal-300 md:text-2xl">
                  {centre.title}
                </h3>
                <p className="mb-4 text-sm text-white/50 md:text-base">
                  {centre.subtitle}
                </p>
                <p className="text-sm leading-relaxed text-white/60 md:text-base">
                  {centre.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
