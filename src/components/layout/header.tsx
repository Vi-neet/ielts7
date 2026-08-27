"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/lib/AuthContext";
import { logOut } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, History, Loader2 } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const activeItem = pathname || "/";
  const isHomePage = activeItem === "/";
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const { user, loading } = useAuth();

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8]);
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Practice", path: "/tests" },
    { name: "About Us", path: "/about" },
    { name: "Writing Review", path: "/writing-review" },
    { name: "Free Resources", path: "/resources" },
  ];

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    hover: {
      scale: 1.05,
      filter: "brightness(1.15) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12))",
      transition: {
        scale: { duration: 0.3, ease: "easeOut" },
        filter: { duration: 0.4 },
      },
    },
    tap: { scale: 0.97, filter: "brightness(0.95)" },
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    hover: { y: -3, transition: { duration: 0.2, ease: "easeOut" } },
  };

  // New enhanced hover effect for navigation links
  const linkHoverVariants = {
    initial: { scaleX: 0 },
    hover: {
      scaleX: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.3, delay: 0.1 },
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        opacity: { duration: 0.3, delay: 0.1 },
        height: { duration: 0.4 },
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const mobileNavItemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
    open: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <>
      {/* Centralized spacer to prevent header from overlapping page content */}
      <div className={`w-full shrink-0 ${isHomePage ? 'h-[80px]' : 'h-[72px]'}`} aria-hidden="true" />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          opacity: headerOpacity,
          paddingTop: 16,
          paddingBottom: 16,
          y: headerY,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm flex items-center ${
          isHomePage
            ? `mt-4 mx-4 md:mx-auto max-w-5xl rounded-[16px] border border-pencil-gray/20 h-[64px] ${isScrolled ? "bg-cream-paper/90 shadow-sm" : "bg-cream-paper/70"}`
            : `h-[72px] ${isScrolled ? "bg-cream-paper/90 shadow-sm border-b border-pencil-gray/20" : "bg-transparent"}`
        }`}
      >
      <motion.div
        style={{ backdropFilter: `blur(${headerBlur}px)` }}
        className={`absolute inset-0 -z-10 ${isHomePage ? "rounded-[16px]" : ""}`}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced animations and highlight effect */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            className="relative"
          >
            <Link href="/" className="flex items-center">
              <div className="relative">
                {/* Glow effect behind logo */}
                <motion.div
                  className="absolute inset-0 bg-primary/10 rounded-xl blur-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isScrolled ? 0 : 0.5, scale: 1 }}
                  whileHover={{ opacity: 0.7, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                />

                <Image
                  src="/logo.webp"
                  alt="IELTS 7+ House Logo"
                  width={170}
                  height={55}
                  className="h-auto relative z-10 drop-shadow-sm transition-all"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation with improved hover animations and Auth integration */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-5">
                {navItems.map((item, i) => (
                  <NavigationMenuItem key={item.name}>
                    <motion.div
                      custom={i}
                      variants={navItemVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      onHoverStart={() => setHoveredItem(item.path)}
                      onHoverEnd={() => setHoveredItem(null)}
                      className="relative"
                    >
                      <Link
                        href={item.path}
                        className={`relative px-3 py-2 font-medium font-inter text-base transition-colors ${
                          activeItem === item.path
                            ? "text-forest-ink"
                            : "text-forest-ink/70 hover:text-forest-ink"
                        } duration-300`}
                      >
                        <span className="relative z-10">{item.name}</span>

                        {/* Enhanced hover effect */}
                        {hoveredItem === item.path && (
                          <motion.span
                            layoutId="hoverHighlight"
                            className={`absolute -inset-1 -z-10 rounded-md ${
                              isHomePage
                                ? "bg-black/5"
                                : "bg-black/5"
                            }`}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}

                        {/* Active underline indicator */}
                        {activeItem === item.path && (
                          <motion.div
                            layoutId="underline"
                            className={`absolute left-0 right-0 bottom-0 h-0.5 ${
                              isHomePage
                                ? "bg-forest-ink"
                                : "bg-forest-ink"
                            } rounded-full`}
                            initial={{ width: 0, left: "50%", right: "50%" }}
                            animate={{
                              width: "100%",
                              left: "0%",
                              right: "0%",
                            }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        )}

                        {/* New hover line effect */}
                        {hoveredItem === item.path &&
                          activeItem !== item.path && (
                            <motion.div
                              variants={linkHoverVariants}
                              initial="initial"
                              animate="hover"
                              className={`absolute left-0 right-0 bottom-0 h-[2px] ${
                                isHomePage
                                  ? "bg-forest-ink/30"
                                  : item.name === "Free Resources"
                                  ? "bg-forest-ink/50"
                                  : "bg-forest-ink/30"
                              } origin-left rounded-full`}
                            />
                          )}
                      </Link>
                    </motion.div>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Integration */}
            <div className="flex items-center border-l border-pencil-gray/20 pl-6 gap-4">
              {loading ? (
                <div className="w-[80px] h-[36px] flex items-center justify-center">
                  <Loader2 size={16} className="animate-spin text-forest-ink/40" />
                </div>
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center w-9 h-9 rounded-full bg-forest-ink text-cream-paper font-bold hover:shadow-md transition-all cursor-pointer overflow-hidden">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        user.email?.[0].toUpperCase() || "U"
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-cream-paper border-pencil-gray/25 p-2 rounded-xl text-forest-ink shadow-lg mt-1" align="end">
                    <div className="px-2 py-1.5 text-xs text-forest-ink/60 font-mono truncate">
                      {user.email}
                    </div>
                    <DropdownMenuSeparator className="bg-pencil-gray/20" />
                    <DropdownMenuItem asChild className="focus:bg-whisper-gray focus:text-forest-ink rounded-lg py-2">
                      <Link href="/profile" className="flex items-center gap-2 cursor-pointer w-full font-medium">
                        <History size={16} />
                        My Tests
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-pencil-gray/20" />
                    <DropdownMenuItem
                      onClick={() => logOut()}
                      className="focus:bg-red-50 focus:text-red-600 text-red-600 rounded-lg py-2 cursor-pointer flex items-center gap-2 font-medium"
                    >
                      <LogOut size={16} />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href={`/login?redirect=${encodeURIComponent(activeItem)}`}
                    className="text-forest-ink/70 hover:text-forest-ink font-semibold font-inter transition-colors text-base"
                  >
                    Log In
                  </Link>
                  <Link href={`/signup?redirect=${encodeURIComponent(activeItem)}`}>
                    <Button variant="forest" size="sm" className="h-9 px-4">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full ${isHomePage ? "bg-forest-ink/5 text-forest-ink/70 hover:text-forest-ink hover:bg-forest-ink/10" : "bg-forest-ink/5 text-forest-ink/70 hover:text-forest-ink hover:bg-forest-ink/10"} focus:outline-none transition-all duration-300`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden absolute top-full left-0 right-0 bg-cream-paper/95 backdrop-blur-md shadow-lg overflow-hidden border-t border-pencil-gray/20"
            >
              <motion.nav className="flex flex-col py-4 px-6 max-w-6xl mx-auto">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    variants={mobileNavItemVariants}
                    className="border-b border-pencil-gray/10 last:border-b-0"
                  >
                    <Link
                      href={item.path}
                      className={`
                        block py-4 font-inter transition-all duration-300
                        ${
                          activeItem === item.path
                            ? "text-forest-ink pl-4 border-l-2 border-forest-ink font-semibold"
                            : item.name === "Free Resources"
                            ? "text-forest-ink/90 pl-0 font-medium"
                            : "text-forest-ink/70 pl-0 font-medium"
                        }
                        ${
                          item.name === "Free Resources"
                            ? "hover:text-forest-ink hover:pl-4 hover:border-l-2 hover:border-forest-ink"
                            : "hover:text-forest-ink hover:pl-4 hover:border-l-2 hover:border-forest-ink/50"
                        }
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Links */}
                <motion.div
                  custom={navItems.length}
                  variants={mobileNavItemVariants}
                  className="pt-4 mt-2 border-t border-pencil-gray/10 flex flex-col gap-3"
                >
                  {loading ? (
                    <span className="text-forest-ink/40 font-mono text-sm py-2">Loading...</span>
                  ) : user ? (
                    <>
                      <div className="flex items-center gap-2 px-1 py-2">
                        <div className="w-8 h-8 rounded-full bg-forest-ink text-cream-paper flex items-center justify-center font-bold text-sm overflow-hidden">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            user.email?.[0].toUpperCase() || "U"
                          )}
                        </div>
                        <span className="font-medium text-forest-ink/75 truncate text-sm">{user.email}</span>
                      </div>
                      <Link
                        href="/profile"
                        className="py-2 text-forest-ink/75 hover:text-forest-ink font-semibold font-inter flex items-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Tests
                      </Link>
                      <button
                        onClick={async () => {
                          setIsMenuOpen(false);
                          await logOut();
                        }}
                        className="py-2 text-left text-red-600 font-semibold font-inter hover:underline"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3 pt-2">
                      <Link
                        href={`/login?redirect=${encodeURIComponent(activeItem)}`}
                        className="py-2 text-forest-ink/70 hover:text-forest-ink font-semibold font-inter text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Log In
                      </Link>
                      <Link
                        href={`/signup?redirect=${encodeURIComponent(activeItem)}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button variant="forest" size="sm" className="w-full h-10 justify-center">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </motion.header>
    </>
  );
};

export default Header;
