"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Instagram,
  Facebook,
  Youtube,
  Phone,
  MapPin,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Practice Tests", href: "/tests" },
    { name: "Writing Evaluation", href: "/writing-review" },
    { name: "Free Resources", href: "/resources" },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "Canada Office",
      text: "334 King St N, Waterloo, ON N2J 2Z2",
      href: "https://maps.google.com/?q=334 King St N, Waterloo, ON N2J 2Z2",
    },
    {
      icon: MapPin,
      label: "India Office",
      text: "252, Block A3, Janakpuri, Delhi, 110058",
      href: "https://maps.google.com/?q=252, Block A3, Janakpuri, Delhi, 110058",
    },
    {
      icon: Phone,
      label: "Phone",
      text: "+91 81780 55015",
      href: "tel:+918178055015",
    },
    {
      icon: Mail,
      label: "Email",
      text: "contact@ielts7plus.com",
      href: "mailto:contact@ielts7plus.com",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/ielts_7plus_house/",
      ariaLabel: "Follow us on Instagram",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/people/IELTS-7-house/61561875090567/",
      ariaLabel: "Like us on Facebook",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://www.youtube.com/@harsharannarula7868",
      ariaLabel: "Subscribe to our YouTube channel",
    },
  ];

  return (
    <footer className="bg-forest-ink text-white pt-20 pb-12 font-inter relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3">
                <Image
                  src="/icon.webp"
                  alt="IELTS 7+ House"
                  width={40}
                  height={40}
                  className="rounded-sm brightness-110"
                />
                <span className="text-xl font-bold text-cream-paper font-bricolage tracking-tight">IELTS 7+ House</span>
              </div>
            </Link>
            <p className="text-cream-paper/80 text-[15px] leading-relaxed max-w-sm">
              Your comprehensive platform for IELTS preparation. Achieve Band 7 and above with our expertly curated materials.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="w-10 h-10 rounded-full bg-cream-paper/10 flex items-center justify-center text-cream-paper/80 hover:bg-highlighter-yellow hover:text-forest-ink transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-[15px] font-bold text-cream-paper uppercase tracking-wider font-roboto-mono">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group inline-flex items-center text-cream-paper/80 hover:text-highlighter-yellow transition-colors text-[15px]">
                    <span className="inline-flex items-center">
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-[15px] font-bold text-cream-paper uppercase tracking-wider font-roboto-mono">
              Contact Us
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-3.5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cream-paper/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-highlighter-yellow group-hover:text-forest-ink transition-colors duration-300">
                      <Icon className="w-4 h-4 text-cream-paper/80 group-hover:text-forest-ink transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="block text-[11px] text-cream-paper/60 font-roboto-mono uppercase tracking-wider mb-0.5 font-bold">
                        {info.label}
                      </span>
                      <span className="text-[14px] text-cream-paper/90 group-hover:text-highlighter-yellow transition-colors font-medium leading-relaxed block">
                        {info.text}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream-paper/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream-paper/60 text-[13px] font-roboto-mono">
            &copy; {currentYear} IELTS 7+ House. All rights reserved.
          </p>
          <div className="flex gap-6 text-[13px] text-cream-paper/60 font-roboto-mono">
            <Link href="/privacy" className="hover:text-cream-paper transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream-paper transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
