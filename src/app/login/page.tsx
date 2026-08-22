"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signInWithGoogle } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Chrome, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      router.push(redirect);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else {
        setError(err.message || "Failed to sign in. Please try again.");
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
      router.push(redirect);
    } catch (err: any) {
      console.error("Google sign in error code:", err.code);
      if (err.code === "auth/account-exists-with-different-credential" || err.code === "auth/credential-already-in-use") {
        setError("This email is already registered with email and password. Sign in with your password first, then connect Google from your profile.");
      } else if (err.code === "auth/popup-blocked") {
        setError("Google sign-in popup was blocked by your browser. Please enable popups and try again.");
      } else if (err.code !== "auth/popup-closed-by-user") {
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
          Welcome Back
        </h1>
        <p className="text-forest-ink/60 font-inter text-sm">
          Sign in to track your IELTS practice history and scores.
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

      <form onSubmit={handleSubmit} className="space-y-5">
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
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-forest-ink">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#cb5521] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
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

        <Button
          type="submit"
          disabled={loading || googleLoading}
          variant="forest"
          className="w-full h-11"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Signing in...
            </>
          ) : (
            <>
              Sign In <ArrowRight size={16} className="ml-1" />
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
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup?redirect=${encodeURIComponent(redirect)}`}
          className="font-semibold text-[#cb5521] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
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
        <LoginForm />
      </Suspense>
    </div>
  );
}
