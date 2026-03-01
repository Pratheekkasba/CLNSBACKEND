"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Trusted by these institutions",
  logos = [],
  className,
}: Logos3Props) => {
  const items: Logo[] =
    logos.length > 0
      ? logos
      : [
          {
            id: "logo-1",
            description: "Supreme Court",
            image: "https://images.unsplash.com/photo-1524230568792-281cb63f202a?w=600&auto=format&fit=crop",
            className: "h-16 w-16 rounded-full object-cover",
          },
          {
            id: "logo-2",
            description: "Bombay High Court",
            image: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=600&auto=format&fit=crop",
            className: "h-16 w-16 rounded-full object-cover",
          },
          {
            id: "logo-3",
            description: "Delhi Courts",
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop",
            className: "h-16 w-16 rounded-full object-cover",
          },
          {
            id: "logo-4",
            description: "National Law Universities",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop",
            className: "h-16 w-16 rounded-full object-cover",
          },
          {
            id: "logo-5",
            description: "Corporate Legal",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop",
            className: "h-16 w-16 rounded-full object-cover",
          },
          {
            id: "logo-6",
            description: "Policy Think Tanks",
            image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&auto=format&fit=crop",
            className: "h-16 w-16 rounded-full object-cover",
          },
        ];

  return (
    <section className={cn("py-24", className)}>
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 className="text-2xl font-semibold text-white lg:text-4xl">{heading}</h2>
      </div>
      <div className="pt-12">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1.5 })]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {items.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/2 justify-center pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="mx-6 flex flex-col items-center gap-3">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={cn("h-16 w-16 rounded-full object-cover", logo.className)}
                    />
                    <p className="text-xs uppercase tracking-wide text-white/70">{logo.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#030914] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#030914] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export { Logos3 };


