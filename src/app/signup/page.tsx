"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signUp, signInWithGoogle } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="mr-2.5 shrink-0">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(redirect);
    }
  }, [user, authLoading, redirect, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signUp(email, password);
      router.replace(redirect);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email address already exists.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address format.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.");
      } else {
        setError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      router.replace(redirect);
    } catch (err: any) {
      if (err?.code === "auth/popup-closed-by-user" || err?.code === "auth/cancelled-popup-request") {
        return;
      }
      console.error("Google sign in error code:", err.code);
      if (err.code === "auth/account-exists-with-different-credential" || err.code === "auth/credential-already-in-use") {
        setError("This email is already registered with a password. Please sign in with your password first.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Google sign-in popup was blocked by your browser. Please allow popups for this site.");
      } else {
        setError(err.message || "Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Left Column (Full Screen Height 100vh) */}
      <div className="lg:col-span-6 bg-forest-ink text-white p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[480px] lg:min-h-screen">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-highlighter-yellow/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-14 group">
            <Image src="/icon.webp" alt="IELTS 7+ House" width={36} height={36} className="rounded-md" priority />
            <span className="font-bricolage text-xl font-extrabold text-white tracking-tight">
              IELTS 7+ House
            </span>
          </Link>

          <div className="max-w-lg space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-highlighter-yellow border border-white/15">
              <ShieldCheck className="w-4 h-4" />
              <span>Student Portal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold font-bricolage text-white leading-tight">
              Master your IELTS exam with authentic practice.
            </h1>
            <p className="text-white/75 font-inter text-base leading-relaxed">
              Get instant access to Cambridge 20 test materials, real exam timers, and comprehensive skill feedback.
            </p>
          </div>

          <div className="space-y-4 pt-10 mt-10 border-t border-white/15 font-inter text-sm text-white/90 max-w-md">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-highlighter-yellow shrink-0" />
              <span>Genuine Academic & General Training test passages</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-highlighter-yellow shrink-0" />
              <span>Interactive audio player with native British accents</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-highlighter-yellow shrink-0" />
              <span>Saved practice history & score progress analytics</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-10 border-t border-white/15 font-inter text-sm text-white/80">
          <p className="italic mb-1.5">
            "The authentic practice environment gave me full confidence for exam day."
          </p>
          <span className="font-bold text-highlighter-yellow">— Candidate Band 8.0</span>
        </div>
      </div>

      {/* Right Column Form (Full Screen Height 100vh) */}
      <div className="lg:col-span-6 p-8 lg:p-20 flex flex-col justify-center items-center bg-white min-h-screen font-inter">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold font-bricolage text-forest-ink mb-2">
              Create your account
            </h2>
            <p className="text-forest-ink/65 text-sm">
              Sign up in seconds to start taking practice tests.
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full h-12 border-pencil-gray/30 hover:bg-cream-paper/80 text-forest-ink font-semibold shadow-2xs cursor-pointer"
          >
            {googleLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <GoogleLogo />}
            <span>Continue with Google</span>
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-pencil-gray/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-pencil-gray font-mono font-semibold">
                Or register with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold text-forest-ink uppercase font-mono tracking-wider">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-forest-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || googleLoading}
                  className="pl-10 h-11 border-pencil-gray/30 focus-visible:border-forest-ink focus-visible:ring-forest-ink/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-bold text-forest-ink uppercase font-mono tracking-wider">
                Password
              </Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-forest-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || googleLoading}
                  className="pl-10 pr-10 h-11 border-pencil-gray/30 focus-visible:border-forest-ink focus-visible:ring-forest-ink/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-ink/40 hover:text-forest-ink cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-bold text-forest-ink uppercase font-mono tracking-wider">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-forest-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading || googleLoading}
                  className="pl-10 pr-10 h-11 border-pencil-gray/30 focus-visible:border-forest-ink focus-visible:ring-forest-ink/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-ink/40 hover:text-forest-ink cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading || googleLoading} variant="forest" className="w-full h-11 mt-4 text-sm font-bold shadow-sm">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-forest-ink/60 font-inter pt-4">
            Already registered?{" "}
            <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="font-bold text-forest-ink underline hover:text-terracotta">
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 text-forest-ink animate-spin mb-2" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
