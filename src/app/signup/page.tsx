"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signInWithGoogle } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Chrome, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
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
        setError("An account with this email already exists");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak");
      } else {
        setError(err.message || "Failed to sign up. Please try again.");
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
        setError("This email is already registered with email and password. Sign in with your password first, then connect Google from your profile.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Google sign-in popup was blocked by your browser. Please enable popups and try again.");
      } else {
        setError(err.message || "Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };


  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-8 md:p-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold font-bricolage text-forest-ink mb-2">
          Create Account
        </h1>
        <p className="text-forest-ink/60 font-inter text-sm">
          Sign up to save your practice history and access study reviews.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3.5 mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-forest-ink">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || googleLoading}
            className="border-pencil-gray/30 focus-visible:border-forest-ink focus-visible:ring-forest-ink/20"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-forest-ink">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading || googleLoading}
            className="border-pencil-gray/30 focus-visible:border-forest-ink focus-visible:ring-forest-ink/20"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-forest-ink">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading || googleLoading}
            className="border-pencil-gray/30 focus-visible:border-forest-ink focus-visible:ring-forest-ink/20"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading || googleLoading}
          variant="forest"
          className="w-full h-11 mt-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Creating account...
            </>
          ) : (
            <>
              Register <ArrowRight size={16} className="ml-1" />
            </>
          )}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-pencil-gray/20"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-forest-ink/40 font-mono">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignIn}
        disabled={loading || googleLoading}
        className="w-full h-11 border-pencil-gray/20 hover:bg-whisper-gray text-forest-ink"
      >
        {googleLoading ? (
          <Loader2 size={16} className="animate-spin mr-2" />
        ) : (
          <Chrome size={16} className="mr-2 text-forest-ink" />
        )}
        Continue with Google
      </Button>

      <p className="mt-8 text-center text-sm text-forest-ink/60 font-inter">
        Already have an account?{" "}
        <Link
          href={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="font-semibold text-[#cb5521] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-cream-paper flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-pencil-gray/20 shadow-sm">
            <Loader2 className="h-8 w-8 text-forest-ink animate-spin mb-2" />
            <span className="text-forest-ink/60 font-inter text-sm">
              Loading...
            </span>
          </div>
        }
      >
        <SignupForm />
      </Suspense>
    </div>
  );
}
