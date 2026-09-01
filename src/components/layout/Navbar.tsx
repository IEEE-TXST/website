/**
 * MODERN NAVBAR COMPONENT
 *
 * A beautiful, animated navigation bar with:
 * - Glass morphism effect (frosted glass look)
 * - Smooth scroll animations
 * - Active page indicator
 * - Hover effects on links
 * - Mobile-responsive (mobile menu coming soon)
 *
 * FEATURES:
 * - Sticky positioning
 * - Changes opacity/blur on scroll
 * - Smooth link animations
 * - IEEE logo
 *
 * This component uses the navigation links from /src/content/config.ts
 */

"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/config";
import { useState } from "react";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Change navbar background opacity based on scroll position
  const navbarBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 15, 30, 0.7)", "rgba(10, 15, 30, 0.95)"]
  );

  // Close the mobile menu whenever route changes
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <motion.nav
      style={{ backgroundColor: navbarBg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/images/branding/ieee_logo_less.png"
                alt="IEEE TXST Logo"
                width={100}
                height={40}
                priority
                className="h-auto w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-8">
            {(siteConfig.navigation as NavItem[]).map((link, index) => {
              const hasChildren = Boolean(link.children?.length);
              const isActive = pathname === link.href;

              const isDropDownActive = hasChildren && link.children!.some((c) => c.href === pathname);

              // Treat dropdown as active when any child route is active
              const showActive = isActive || isDropDownActive;

              // Standard non-dropdown link
              if(!hasChildren){
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="relative text-white text-lg font-medium transition-colors hover:text-[#00A9E0]"
                    >
                      {link.label}

                      {/* Active Indicator - Underline */}
                      {showActive && (
                        <motion.div
                          style={{originY:0}}
                          layoutId="activeTab"
                          className="h-0.5 bg-[#00A9E0]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Hover Underline */}
                      {!showActive && (
                        <motion.div
                          className="h-0.5 bg-white/50"
                          initial={{opacity: 0}}
                          animate={{opacity: 0}}
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              }

              // Dropdown link for Committees
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="relative group">
                    <Link
                      href={link.href}
                      className="relative inline-flex items-center gap-2 text-white text-lg font-medium transition-colors hover:text-[#00A9E0]"
                    >
                      {link.label}
                      <span className="text-white/80 group-hover:text-[#00A9E0]">
                        ▾
                      </span>

                      {/* Active Indicator - Underline */}
                      {showActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#00A9E0]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Hover Underline */}
                      {!showActive && (
                        <motion.div
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white/50"
                          initial={{opacity: 0}}
                          whileHover={{opacity: 0}}
                        />
                      )}
                    </Link>

                    {/* Dropdown panel */}
                    <div className="absolute left-0 top-full mt--3 w-64 rounded-xl bg-[#0A0F1E]/95 backdrop-blur-md border border-white/10 shadow-2xl opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition">
                      <div className="py-2">
                        {link.children!.map((child) => {
                          const childActive = pathname === child.href;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2 text-sm font-semibold transition-colors ${
                                childActive
                                  ? "text-white bg-white/10"
                                  : "text-white/90 hover:text-white hover:bg-white/10"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          {/* Desktop CTA Button */}
          <motion.div
            className="hidden md:block shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href={siteConfig.cta.membershipFormUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="bg-[#00629B] hover:bg-[#00A9E0] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:text-[#00A9E0] transition-colors"
          >
            {/* Icon: Hamburger / X */}
            {mobileOpen ? (
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-5 pt-2 border-t border-white/10">
                <div className="flex flex-col gap-2">
                  {(siteConfig.navigation as NavItem[]).map((link) => {
                    const isActive = pathname === link.href;
                    const hasChildren = Boolean(link.children?.length);

                    return (
                      <div key={link.href} className="flex flex-col">
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`rounded-lg px-4 py-3 text-base font-semibold transition-colors ${
                            isActive
                              ? "text-white bg-white/10"
                              : "text-white/90 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {link.label}
                        </Link>

                        {hasChildren && (
                          <div className="ml-4 -mt-1 mb-1 flex flex-col gap-1">
                            {link.children!.map((child) => {
                              const childActive = pathname === child.href;

                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                                    childActive
                                      ? "text-white bg-white/10"
                                      : "text-white/80 hover:text-white hover:bg-white/10"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <Link
                    href={siteConfig.cta.membershipFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2"
                  >
                    <button className="w-full bg-[#00629B] hover:bg-[#00A9E0] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      Join Now
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}