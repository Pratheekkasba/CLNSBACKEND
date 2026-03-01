"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

// Lazy load VideoHero for better initial page load
const VideoHero = dynamic(() => import("@/components/ui/video-hero").then((mod) => ({ default: mod.VideoHero })), {
  loading: () => (
    <section className="relative isolate flex min-h-[92vh] w-full items-center justify-center overflow-hidden text-white bg-[#020817]">
      <div className="absolute inset-0 flex items-center justify-center bg-black/70">
        <Image
          src="/video-hero/CLNS-removebg-preview123.png"
          alt="CLNS loading"
          width={400}
          height={400}
          priority
          className="object-contain p-8 sm:p-16"
        />
      </div>
    </section>
  ),
  ssr: false,
});

// Lazy load below-the-fold components
const ServiceCategoriesSection = dynamic(
  () => import("@/components/ui/service-categories-section").then((mod) => ({ default: mod.ServiceCategoriesSection })),
  { loading: () => <div className="min-h-[600px] bg-[#030914]" /> }
);
const AboutSection = dynamic(() => import("@/components/ui/about-section"), {
  loading: () => <div className="min-h-[400px] bg-[#030914]" />,
});
const MarqueePartners = dynamic(
  () => import("@/components/ui/marquee-partners").then((mod) => ({ default: mod.MarqueePartners })),
  { loading: () => <div className="min-h-[200px] bg-[#030914]" /> }
);
const TestimonialsSection = dynamic(
  () => import("@/components/ui/testimonials-with-marquee").then((mod) => ({ default: mod.TestimonialsSection })),
  { loading: () => <div className="min-h-[300px] bg-[#030914]" /> }
);
const HandWrittenTitle = dynamic(
  () => import("@/components/ui/hand-writing-text").then((mod) => ({ default: mod.HandWrittenTitle })),
  { ssr: false }
);
const Footerdemo = dynamic(
  () => import("@/components/ui/footer-section").then((mod) => ({ default: mod.Footerdemo })),
  { loading: () => <div className="min-h-[200px] bg-[#030914]" /> }
);
const CTAContactSection = dynamic(
  () => import("@/components/ui/cta-contact-section").then((mod) => ({ default: mod.CTAContactSection })),
  { loading: () => <div className="min-h-[200px] bg-[#030914]" /> }
);

export default function Home() {
  const marqueeTestimonials = [
    {
      author: {
        name: "Ishita Rao",
        handle: "@ishita.rao",
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
      },
      text: "CLNS gave our clients a transparent channel to follow every filing. The trust impact has been massive.",
    },
    {
      author: {
        name: "Neeraj Singh",
        handle: "@neeraj.law",
        avatar: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
      },
      text: "As a student, having internships, briefs, and mentors in one dashboard keeps me laser focused.",
      href: "https://twitter.com/neeraj",
    },
    {
      author: {
        name: "Rhea Kapur",
        handle: "@rhea.clns",
        avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
      },
      text: "₹1 consults with verified advocates changed how our startup approaches compliance.",
    },
    {
      author: {
        name: "Aarav Mehta",
        handle: "@aarav.chambers",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
      },
      text: "Diary sync and cause-list alerts removed last-minute surprises inside the chambers.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#030914] text-white">
      <VideoHero />
      <ServiceCategoriesSection />
      <AboutSection />
      <section id="partners" className="w-full bg-[#030914] py-32 transition-standard">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center text-white">
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Trusted by these institutions</h2>
        </div>
        <div className="mt-12 px-6">
          <MarqueePartners />
        </div>
      </section>
      <TestimonialsSection
        title="What our users say"
        description="See how clients, students, and advocates rely on CLNS to stay fast, transparent, and compliant."
        testimonials={marqueeTestimonials}
        className="bg-[#030914] text-white"
      />
      <section id="download" className="w-full bg-[#020712] px-6 py-28 text-white transition-standard">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <HandWrittenTitle
            title="Access CLNS On The Go"
            subtitle="Manage cases, connect with lawyers, and stay updated anywhere."
            className="mb-10"
          />
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <a
              href="https://play.google.com/store/apps/details?id=com.clns.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-xs items-center gap-3 rounded-3xl border border-white/20 bg-white/5 px-5 py-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-200 ease-out hover:border-white/40 sm:w-auto"
            >
              <Image src="/play-store.jpg" alt="Google Play" width={32} height={32} className="h-8 w-8 object-contain" loading="lazy" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">Get it on</span>
                <span className="text-lg font-semibold text-white">Google Play</span>
              </div>
            </a>
            <a
              href="https://apps.apple.com/in/app/clns-law-services-made-easy/id6741812022"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-xs items-center gap-3 rounded-3xl border border-white/20 bg-white/5 px-5 py-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-200 ease-out hover:border-white/40 sm:w-auto"
            >
              <Image src="/app-store.jpg" alt="App Store" width={32} height={32} className="h-8 w-8 object-contain" loading="lazy" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">Download on the</span>
                <span className="text-lg font-semibold text-white">App Store</span>
              </div>
            </a>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-white/60">
            The CLNS mobile app keeps your briefs, hearings, and legal network synced in real time across every device.
          </p>
        </div>
      </section>

      <CTAContactSection />
      <Footerdemo />
    </main>
  );
}
