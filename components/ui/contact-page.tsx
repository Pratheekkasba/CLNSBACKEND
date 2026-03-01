"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  Copy,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
} from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";

const APP_EMAIL = "office@clns.in";
const APP_PHONE = "8465958825";

// Hyderabad - CLNS Offices
const hyderabadOffices = [
  { city: "Uppal", address: "Plot No. 93, H.No. 2-1-33/1/A, Saraswathi Colony, Uppal, Hyderabad – 500039, Telangana, India.", phone: "8465958825" },
  { city: "L. B. Nagar", address: "3rd Floor, Opposite Pavan Sai Hospital, Rajivgandhi Nagar, Bharat Nagar, L. B. Nagar, Hyderabad – 500068, Telangana, India.", phone: "8465958825" },
];

// BPR Law Chambers - Delhi Offices
const delhiOffices = [
  { city: "Hari Nagar Ashram", address: "235, Ground Floor, Hari Nagar Ashram, South East Delhi – 110014, Delhi, India.", phone: "8465958825" },
  { city: "South Extension Part-2", address: "A-31, Basement, South Extension Part-2, Delhi – 110049, Delhi, India.", phone: "8465958825" },
];

// BPR Law Chambers - Uttar Pradesh Offices
const upOffices = [
  { city: "Prayagraj", address: "313, Baxi Khurd, Daraganj, Prayagraj, Uttar Pradesh – 211006, India.", phone: "8465958825" },
  { city: "Lucknow", address: "Bhagirathi Enclave, Avadh Vihar Yojna, Shaheed Path, Lucknow, Uttar Pradesh – 226002, India.", phone: "8465958825" },
];

// BPR Law Chambers - Rajasthan Office
const rajasthanOffices = [
  { city: "Kota", address: "C-5, Milat Nagar, Borkhera, Kota, Rajasthan – 324002, India.", phone: "8465958825" },
];

// CLNS - Regional Presence
const regionalPresence = [
  { region: "Andhra Pradesh Presence", description: "CLNS provides legal network solutions and associated services across all major cities and districts in Andhra Pradesh." },
  { region: "Maharashtra Presence", description: "CLNS provides legal network solutions and associated services across all major cities and districts in Maharashtra." },
];

// Helper function to extract state from address
function extractStateFromAddress(address: string, city: string): string {
  // Check if address contains state name
  if (address.includes("Telangana")) return "Telangana, India";
  if (address.includes("Delhi")) return "Delhi, India";
  if (address.includes("Uttar Pradesh")) return "Uttar Pradesh, India";
  if (address.includes("Rajasthan")) return "Rajasthan, India";
  if (address.includes("Andhra Pradesh")) return "Andhra Pradesh, India";
  if (address.includes("Maharashtra")) return "Maharashtra, India";
  
  // Fallback: infer from city name
  if (city.includes("Hyderabad")) return "Telangana, India";
  if (city.includes("Delhi")) return "Delhi, India";
  if (city.includes("Prayagraj") || city.includes("Lucknow")) return "Uttar Pradesh, India";
  if (city.includes("Kota")) return "Rajasthan, India";
  if (city === "Andhra Pradesh") return "Andhra Pradesh, India";
  if (city === "Maharashtra") return "Maharashtra, India";
  
  return "India";
}

// Helper function to extract address without state
function extractAddressWithoutState(address: string, city: string): string {
  // For service coverage entries, return as is
  if (address.includes("Service coverage")) {
    return address;
  }
  
  // Remove state and country from the end
  let cleanAddress = address
    .replace(/,?\s*(Telangana|Delhi|Uttar Pradesh|Rajasthan|Andhra Pradesh|Maharashtra),?\s*India\.?/gi, "")
    .replace(/,?\s*India\.?$/gi, "")
    .trim();
  
  // Remove trailing comma or dash if present
  cleanAddress = cleanAddress.replace(/[,–-]+$/, "").trim();
  
  return cleanAddress;
}

// Offices array for card display
const offices = [
  {
    name: "T-Hub (Corporate Office)",
    address: "Plot No 1/C, Sy No 83/1, Raidurgam, Panmaktha, Hyderabad Knowledge City, Serilingampally, Hyderabad, Telangana 500081, India.",
    phone: "8465958825",
    badge: "Head / Corporate Office",
  },
  {
    name: "Uppal",
    address: "Plot No. 93, H.No. 2-1-33/1/A, Saraswathi Colony, Uppal, Hyderabad – 500039, Telangana, India.",
    phone: "8465958825",
  },
  {
    name: "L. B. Nagar",
    address: "3rd Floor, Opposite Pavan Sai Hospital, Rajivgandhi Nagar, Bharat Nagar, L. B. Nagar, Hyderabad – 500068, Telangana, India.",
    phone: "8465958825",
  },
  {
    name: "Chaitanyapuri",
    address: "Above Mahesh Bank Beside Bhagyasree Function Hall Chaitanyapuri, Hyderabad, Telangana, India.",
    phone: "8465958825",
  },
  {
    name: "Delhi (Hari Nagar Ashram)",
    address: "235, Ground Floor, Hari Nagar Ashram, South East Delhi – 110014, Delhi, India.",
    phone: "8465958825",
  },
  {
    name: "Delhi (South Extension Part-2)",
    address: "A-31, Basement, South Extension Part-2, Delhi – 110049, Delhi, India.",
    phone: "8465958825",
  },
  {
    name: "Prayagraj",
    address: "313, Baxi Khurd, Daraganj, Prayagraj, Uttar Pradesh – 211006, India.",
    phone: "8465958825",
  },
  {
    name: "Lucknow",
    address: "Bhagirathi Enclave, Avadh Vihar Yojna, Shaheed Path, Lucknow, Uttar Pradesh – 226002, India.",
    phone: "8465958825",
  },
  {
    name: "Kota",
    address: "C-5, Milat Nagar, Borkhera, Kota, Rajasthan – 324002, India.",
    phone: "8465958825",
  },
  {
    name: "Andhra Pradesh",
    address: "Service coverage across all major cities in Andhra Pradesh, India.",
    phone: "8465958825",
  },
  {
    name: "Maharashtra",
    address: "Service coverage across all major cities in Maharashtra, India.",
    phone: "8465958825",
  },
];

const officeTableDataRaw = [
  { city: "Hyderabad (Uppal)", address: "Plot No. 93, H.No. 2-1-33/1/A, Saraswathi Colony, Uppal, Hyderabad – 500039, Telangana, India." },
  { city: "Hyderabad (L. B. Nagar)", address: "3rd Floor, Opposite Pavan Sai Hospital, Rajivgandhi Nagar, Bharat Nagar, L. B. Nagar, Hyderabad – 500068, Telangana, India." },
  { city: "Hyderabad (Chaitanyapuri)", address: "Above Mahesh Bank Beside Bhagyasree Function Hall Chaitanyapuri, Hyderabad, Telangana, India." },
  { city: "Hyderabad (T-Hub)", address: "Plot No 1/C, Sy No 83/1, Raidurgam, Panmaktha, Hyderabad Knowledge City, Serilingampally, Hyderabad, Telangana 500081, India." },
  { city: "Delhi (Hari Nagar Ashram)", address: "235, Ground Floor, Hari Nagar Ashram, South East Delhi – 110014, Delhi, India." },
  { city: "Delhi (South Extension Part-2)", address: "A-31, Basement, South Extension Part-2, Delhi – 110049, Delhi, India." },
  { city: "Prayagraj", address: "313, Baxi Khurd, Daraganj, Prayagraj, Uttar Pradesh – 211006, India." },
  { city: "Lucknow", address: "Bhagirathi Enclave, Avadh Vihar Yojna, Shaheed Path, Lucknow, Uttar Pradesh – 226002, India" },
  { city: "Kota", address: "C-5, Milat Nagar, Borkhera, Kota, Rajasthan – 324002, India." },
  { city: "Andhra Pradesh", address: "Service coverage across all major cities" },
  { city: "Maharashtra", address: "Service coverage across all major cities" },
];

type OfficeData = {
  city: string;
  state: string;
  address: string;
};

const officeTableData: OfficeData[] = officeTableDataRaw.map((row) => ({
  city: row.city,
  state: extractStateFromAddress(row.address, row.city),
  address: extractAddressWithoutState(row.address, row.city),
}));

// Group offices by state
function groupOfficesByState(offices: OfficeData[]) {
  const grouped: Record<string, OfficeData[]> = {};
  
  offices.forEach((office) => {
    const stateName = office.state.split(',')[0]; // Get state name without "India"
    if (!grouped[stateName]) {
      grouped[stateName] = [];
    }
    grouped[stateName].push(office);
  });
  
  return grouped;
}

const groupedOffices = groupOfficesByState(officeTableData);

// Define the order of state sections
const stateOrder = ['Telangana', 'Delhi', 'Uttar Pradesh', 'Rajasthan', 'Andhra Pradesh', 'Maharashtra'];

export function ContactPage() {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#020712] text-white">
      <div className="mx-auto h-full max-w-6xl">
        {/* HEADER */}
        <div className="flex flex-col px-4 pt-28 pb-16 md:px-6">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Contact CLNS
          </h1>
          <p className="mb-5 mt-6 text-base text-white/70">
            Our support team is here to help students, clients, and advocates.
          </p>
        </div>

        <BorderSeparator />

        {/* CONTACT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-6">
          <Box icon={Mail} title="Email" description="Our team responds within 24 hours." className="md:col-span-1">
            <div className="flex items-center gap-x-2">
              <a
                href={`mailto:${APP_EMAIL}`}
                className="font-mono text-base font-medium text-white/90 hover:text-teal-300 hover:underline transition-colors"
              >
                {APP_EMAIL}
              </a>
              <CopyButton className="size-6" test={APP_EMAIL} />
            </div>
          </Box>


          <Box icon={Phone} title="Phone" description="Available Mon–Fri, 9 AM–7 PM." className="md:col-span-1">
            <div className="flex items-center gap-x-2">
              <a
                href={`tel:${APP_PHONE}`}
                className="font-mono text-base font-medium text-white/90 hover:text-teal-300 hover:underline transition-colors"
              >
                {APP_PHONE}
              </a>
              <CopyButton className="size-6" test={APP_PHONE} />
            </div>
          </Box>
        </div>

        <BorderSeparator />

        {/* OFFICE LOCATIONS GRID */}
        <div className="px-4 pt-6 pb-16 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Our Offices</h2>
            <p className="text-base text-white/70">Our offices & presence across India.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <OfficeCard key={index} office={office} index={index} />
            ))}
          </div>
        </div>

        <BorderSeparator />

        {/* ADDITIONAL SECTIONS BELOW */}
        <div className="space-y-14 px-6 py-12">
          {/* SUPPORT CATEGORIES */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Support Categories</h2>
            <ul className="grid gap-6 text-sm md:grid-cols-3">
              <li className="rounded-lg border border-white/10 bg-white/5 p-4 text-white/70 backdrop-blur-xl">
                <span className="font-semibold text-teal-300">Client Support</span> Case tracking, consultations, access issues.
              </li>
              <li className="rounded-lg border border-white/10 bg-white/5 p-4 text-white/70 backdrop-blur-xl">
                <span className="font-semibold text-teal-300">Student Support</span> Internships, dashboard help, learning paths.
              </li>
              <li className="rounded-lg border border-white/10 bg-white/5 p-4 text-white/70 backdrop-blur-xl">
                <span className="font-semibold text-teal-300">Advocate Support</span> Document vault, billing, assignments.
              </li>
            </ul>
          </div>

          {/* HELP CENTER CTA */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-teal-950/40 via-cyan-950/30 to-blue-950/40 p-8 text-center backdrop-blur-xl">
            <h3 className="mb-3 text-2xl font-bold text-white">Need urgent help?</h3>
            <p className="mb-6 text-white/70">
              Our support team is available 7 days a week for priority assistance.
            </p>
            <Button
              size="lg"
              className="bg-teal-500/20 border border-teal-400/30 text-white hover:bg-teal-500/30 hover:border-teal-400/50"
            >
              Open Help Center
            </Button>
          </div>

          {/* DOWNLOAD APP SECTION */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950/40 via-indigo-950/30 to-purple-950/40 p-8 text-center backdrop-blur-xl">
            <h3 className="mb-3 text-2xl font-bold text-white">Download CLNS App</h3>
            <p className="mb-6 text-white/70">
              Access legal services on the go with our mobile app.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.clns.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-medium text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <img src="/play-store.jpg" alt="Google Play" className="h-5 w-5 object-contain" />
                Google Play
              </a>
              <a
                href="https://apps.apple.com/in/app/clns-law-services-made-easy/id6741812022"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-medium text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <img src="/app-store.jpg" alt="App Store" className="h-5 w-5 object-contain" />
                App Store
              </a>
            </div>
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="relative flex min-h-[320px] items-center justify-center">
          <div
            className={cn(
              "absolute inset-0 size-full",
              "bg-[radial-gradient(color-mix(in_oklab,rgba(34,211,238,0.1)_30%,transparent)_1px,transparent_1px)]",
              "bg-[size:32px_32px]",
              "[mask-image:radial-gradient(ellipse_at_center,var(--background)_30%,transparent)]"
            )}
          />

          <div className="relative z-10 space-y-6">
            <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
              Find us online
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/80 backdrop-blur-xl transition-all hover:border-teal-400/30 hover:bg-white/10 hover:text-teal-300"
                  >
                    <Icon className="size-4" />
                    <span className="font-mono text-sm font-medium">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BorderSeparator() {
  return <div className="h-px w-full border-b border-white/10" />;
}

type ContactBox = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  title: string;
  description: string;
};

function Box({ title, description, className, children, ...props }: ContactBox) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between border border-white/10 rounded-lg",
        className
      )}
    >
      <div className="flex items-center gap-x-3 border-b border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <props.icon className="size-5 text-teal-300" strokeWidth={1.5} />
        <h2 className="font-heading text-lg font-semibold text-white">{title}</h2>
      </div>

      <div className="p-4 py-12">{children}</div>

      <div className="border-t border-white/10 p-4">
        <p className="text-sm text-white/60">{description}</p>
      </div>
    </div>
  );
}

type CopyButtonProps = ButtonProps & { test: string };

export function ContactLocationsSection() {
  return (
    <div className="px-6 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <MapPin className="h-6 w-6 text-teal-400" />
        <h2 className="text-2xl font-semibold text-white">Our Offices & Presence</h2>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-xl border border-teal-500/20 bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg">
        <table className="w-full min-w-[600px] table-fixed">
          <thead>
            <tr className="border-b border-teal-500/30 bg-teal-500/10">
              <th className="w-[25%] px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-teal-400">
                State
              </th>
              <th className="w-[75%] px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-teal-400">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {officeTableData.map((row, index) => (
              <tr
                key={index}
                className={cn(
                  "border-b border-teal-500/10 transition-colors duration-200 hover:bg-teal-500/5",
                  index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                )}
              >
                <td className="px-6 py-4 text-sm font-semibold text-teal-300">
                  {row.state}
                </td>
                <td className="px-6 py-4 text-sm leading-relaxed text-gray-400">
                  <span className="font-medium text-teal-400/90">{row.city}:</span> {row.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactLocationsSection;

function OfficeCard({ 
  office, 
  index 
}: { 
  office: { name: string; address: string; phone: string; badge?: string }; 
  index: number;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-teal-400/30 hover:bg-white/8 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]">
      {/* Soft Blur Backdrop + Teal Glass Look */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Icon on top */}
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur">
            <MapPin className="h-5 w-5 text-teal-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{office.name}</h3>
            {office.badge && (
              <p className="mt-1 text-xs font-medium text-teal-400">
                {office.badge}
              </p>
            )}
          </div>
        </div>
        
        {/* Address as subtitle */}
        <p className="mb-6 flex-1 text-sm leading-relaxed text-white/60">
          {office.address}
        </p>
        
        {/* Contact Button */}
        <a
          href={`tel:${office.phone}`}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-teal-500/50 bg-transparent px-6 py-2.5 text-sm font-medium text-teal-400 transition-all duration-200 ease-out hover:border-teal-400 hover:bg-teal-500/10 hover:text-teal-300"
        >
          <Phone className="h-4 w-4" />
          Contact
        </a>
      </div>
    </div>
  );
}

function RegionCard({ region }: { region: { region: string; description: string } }) {
  return (
    <div className="group cursor-default overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-slate-900 to-purple-950/30 shadow-md transition-all duration-200 ease-out hover:cursor-pointer hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] active:cursor-grabbing">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-purple-500/20 bg-purple-500/10 px-6 py-4">
        <Globe className="h-5 w-5 text-purple-400" />
        <div>
          <p className="text-xs uppercase tracking-widest text-purple-300/70">Service Region</p>
          <h3 className="text-lg font-bold text-white transition-colors duration-200 ease-out group-hover:text-purple-300">
            {region.region}
          </h3>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-6">
        <p className="text-sm leading-relaxed text-gray-400 transition-colors duration-200 ease-out group-hover:text-gray-300">
          {region.description}
        </p>
      </div>
    </div>
  );
}

function LocationRow({ office }: { office: { city: string; address: string; phone: string } }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(`${office.address}, Phone: ${office.phone}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group grid grid-cols-3 gap-6 border-b border-teal-500/20 px-6 py-4 transition-all duration-200 ease-out hover:cursor-pointer hover:bg-slate-800/50 active:cursor-grabbing">
      {/* Column 1: City Name */}
      <div className="cursor-default font-bold text-teal-400 transition-colors duration-200 ease-out group-hover:cursor-pointer group-hover:text-teal-300">
        {office.city}
      </div>

      {/* Column 2: Address */}
      <div className="cursor-default text-sm leading-relaxed text-gray-400 transition-colors duration-200 ease-out group-hover:cursor-pointer group-hover:text-gray-300">
        {office.address}
      </div>

      {/* Column 3: Phone/Action */}
      <div className="flex items-center gap-2">
        <a
          href={`tel:${office.phone}`}
          className="cursor-pointer rounded-lg bg-teal-500 px-4 py-2 font-bold text-white transition-all duration-200 ease-out hover:cursor-pointer hover:bg-teal-400 hover:shadow-[0_0_15px_rgba(0,255,200,0.5)] active:scale-95 active:cursor-grabbing"
        >
          Call
        </a>

        <button
          onClick={handleCopyAddress}
          className="cursor-pointer rounded-lg border border-teal-400 px-4 py-2 font-bold text-teal-400 transition-all duration-200 ease-out hover:cursor-pointer hover:bg-teal-400/20 hover:text-teal-300 active:scale-95 active:cursor-grabbing"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function CopyButton({
  className,
  variant = "ghost",
  size = "icon",
  test,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(test);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "disabled:opacity-100 text-white/60 hover:text-teal-300 hover:bg-white/5",
        className
      )}
      onClick={handleCopy}
      disabled={copied}
      {...props}
    >
      <div
        className={cn(
          "transition-all",
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        <Check className="size-3.5 stroke-teal-400" />
      </div>
      <div
        className={cn(
          "absolute transition-all",
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Copy className="size-3.5" />
      </div>
    </Button>
  );
}

