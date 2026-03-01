"use client";

import { Home, Mail, Settings, User, Briefcase, Users } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "About", url: "/about", icon: User },
  { name: "Services", url: "/services", icon: Settings },
  { name: "Affiliation", url: "/affiliation", icon: Users },
  { name: "Careers", url: "/careers", icon: Briefcase },
  { name: "Contact", url: "/contact", icon: Mail },
];

export function NavBarDemo() {
  return <NavBar items={navItems} />;
}


