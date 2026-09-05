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
import { LogOut, History, Loader2, User } from "lucide-react";

function UserAvatarButton({ user }: { user: any }) {
  const [imgError, setImgError] = useState(false);
  return (
    <DropdownMenuTrigger asChild>
      <button className="flex items-center justify-center w-9 h-9 rounded-full bg-forest-ink text-cream-paper font-bold hover:shadow-md transition-all cursor-pointer overflow-hidden border border-forest-ink/20 shrink-0">
        {user?.photoURL && !imgError ? (
          <img
            src={user.photoURL}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"
        )}
      </button>
    </DropdownMenuTrigger>
  );
}

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeItem = pathname || "/";
  const isHomePage = activeItem === "/";
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const { user, loading, isAdmin } = useAuth();

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

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Practice", path: "/tests" },
    { name: "About Us", path: "/about" },
    { name: "Speaking Practice", path: "/speaking-booking" },
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

  const isExamPage = /^\/tests\/[^\/]+\/[^\/]+/.test(pathname) && !pathname.includes("/results/");
  if (pathname === "/login" || pathname === "/signup" || isExamPage) {
    return null;
  }

  return (
    <>
      <div className={isHomePage ? "w-full shrink-0 h-[80px]" : "w-full shrink-0 h-[72px]"} aria-hidden="true" />
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
            ? `mt-4 mx-4 md:mx-auto max-w-6xl rounded-[16px] border border-pencil-gray/20 h-[64px] ${isScrolled ? "bg-cream-paper/90 shadow-sm" : "bg-cream-paper/70"}`
            : `h-[72px] ${isScrolled ? "bg-cream-paper/90 shadow-sm border-b border-pencil-gray/20" : "bg-transparent"}`
        }`}
      >
        <motion.div
          style={{ backdropFilter: `blur(${headerBlur}px)` }}
          className={`absolute inset-0 -z-10 ${isHomePage ? "rounded-[16px]" : ""}`}
        />

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              className="relative shrink-0"
            >
              <Link href="/" className="flex items-center gap-2.5">
                <Image
                  src="/icon.webp"
                  alt="IELTS 7+ House"
                  width={34}
                  height={34}
                  className="rounded-sm brightness-105"
                  priority
                />
                <span className="text-lg lg:text-xl font-extrabold text-forest-ink tracking-tight font-bricolage whitespace-nowrap">
                  IELTS 7+ House
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-1 lg:gap-1.5 xl:gap-2">
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={item.name}>
                    <motion.div
                      custom={index}
                      variants={navItemVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                    >
                      <Link
                        href={item.path}
                        onMouseEnter={() => setHoveredItem(item.path)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`relative px-2.5 py-1.5 lg:px-3.5 lg:py-2 text-xs lg:text-sm font-semibold font-inter transition-colors duration-200 block whitespace-nowrap ${
                          activeItem === item.path
                            ? "text-forest-ink font-bold"
                            : "text-forest-ink/75 hover:text-forest-ink"
                        }`}
                      >
                        <span className="relative z-10 whitespace-nowrap">{item.name}</span>

                        {activeItem === item.path && (
                          <motion.div
                            layoutId="underline"
                            className="absolute left-0 right-0 bottom-0 h-0.5 bg-forest-ink rounded-full"
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

                        {hoveredItem === item.path && activeItem !== item.path && (
                          <motion.div
                            variants={linkHoverVariants}
                            initial="initial"
                            animate="hover"
                            className="absolute left-0 right-0 bottom-0 h-[2px] bg-forest-ink/30 origin-left rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Integration */}
            <div className="flex items-center border-l border-pencil-gray/20 pl-3 lg:pl-5 gap-2 lg:gap-3 shrink-0">
              {loading ? (
                <div className="w-[80px] h-[36px] flex items-center justify-center">
                  <Loader2 size={16} className="animate-spin text-forest-ink/40" />
                </div>
              ) : user ? (
                <DropdownMenu>
                  <UserAvatarButton user={user} />
                  <DropdownMenuContent className="w-56 bg-cream-paper border-pencil-gray/25 p-2 rounded-xl text-forest-ink shadow-lg mt-1" align="end">
                    <div className="px-2 py-1.5 text-xs text-forest-ink/60 font-mono truncate">
                      {user.email}
                    </div>
                    <DropdownMenuSeparator className="bg-pencil-gray/20" />
                    <DropdownMenuItem asChild className="focus:bg-whisper-gray focus:text-forest-ink rounded-lg py-2">
                      <Link href="/profile" className="flex items-center gap-2 cursor-pointer w-full font-medium">
                        <User size={16} />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild className="focus:bg-whisper-gray focus:text-forest-ink rounded-lg py-2">
                        <Link href="/admin" className="flex items-center gap-2 cursor-pointer w-full font-semibold text-emerald-800">
                          <User size={16} />
                          <span>Admin Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-pencil-gray/20" />
                    <DropdownMenuItem
                      onClick={() => logOut()}
                      className="focus:bg-red-50 text-red-600 focus:text-red-700 rounded-lg py-2 cursor-pointer flex items-center gap-2 font-medium"
                    >
                      <LogOut size={16} />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                  <Link href={`/login?redirect=${encodeURIComponent(activeItem)}`}>
                    <Button variant="ghost" size="sm" className="font-semibold text-xs lg:text-sm px-2.5 sm:px-3.5 h-8 lg:h-9 text-forest-ink hover:text-forest-ink hover:bg-forest-ink/5 whitespace-nowrap shrink-0">
                      Log In
                    </Button>
                  </Link>
                  <Link href={`/signup?redirect=${encodeURIComponent(activeItem)}`}>
                    <Button variant="forest" size="sm" className="font-bold text-xs lg:text-sm px-3 sm:px-4 h-8 lg:h-9 shadow-xs whitespace-nowrap shrink-0">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu trigger button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-xl text-forest-ink hover:bg-forest-ink/5 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="md:hidden overflow-hidden bg-cream-paper/95 backdrop-blur-md rounded-2xl mt-3 p-4 border border-pencil-gray/20 shadow-lg"
              >
                <motion.nav className="flex flex-col gap-3">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      custom={index}
                      variants={mobileNavItemVariants}
                    >
                      <Link
                        href={item.path}
                        className={`py-2 text-base font-semibold font-inter block ${
                          activeItem === item.path
                            ? "text-forest-ink font-bold"
                            : "text-forest-ink/75 hover:text-forest-ink"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile auth links */}
                  <motion.div custom={navItems.length} variants={mobileNavItemVariants} className="pt-2 border-t border-pencil-gray/20">
                    {user ? (
                      <div className="flex flex-col gap-2">
                        <div className="text-xs text-forest-ink/60 font-mono pb-1">{user.email}</div>
                        <Link
                          href="/profile"
                          className="py-2 text-forest-ink/75 hover:text-forest-ink font-semibold font-inter flex items-center gap-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            className="py-2 text-emerald-800 font-semibold font-inter flex items-center gap-2"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={async () => {
                            setIsMenuOpen(false);
                            await logOut();
                          }}
                          className="py-2 text-left text-red-600 font-semibold font-inter hover:underline"
                        >
                          Log out
                        </button>
                      </div>
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
