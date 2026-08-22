"use client";

import React, { useState } from "react";
import Link from "next/link";
import { sendPasswordReset } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await sendPasswordReset(email);
      setSuccess(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      // Security constraint: Do not leak whether the user account exists
      if (err.code === "auth/user-not-found") {
        setSuccess(true); // Pretend it succeeded
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else {
        setError(err.message || "Failed to send reset link. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-cream-paper flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-pencil-gray/20 p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold font-bricolage text-forest-ink mb-2">
            Reset Password
          </h1>
          <p className="text-forest-ink/60 font-inter text-sm">
            Enter your email to receive a secure password reset link.
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

        {success ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <div className="flex justify-center mb-4 text-forest-ink">
              <CheckCircle size={48} className="text-forest-ink" />
            </div>
            <h3 className="text-lg font-bold font-bricolage text-forest-ink mb-2">
              Email Sent
            </h3>
            <p className="text-forest-ink/75 font-inter text-sm mb-8">
              If an account is associated with <strong>{email}</strong>, a secure password reset link has been sent. Please check your inbox.
            </p>
            <Link href="/login">
              <Button variant="forest" className="w-full h-11 flex items-center justify-center gap-2">
                <ArrowLeft size={16} /> Back to Login
              </Button>
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-forest-ink font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="border-pencil-gray/30 focus-visible:border-forest-ink focus-visible:ring-forest-ink/20"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="forest"
              className="w-full h-11"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Sending Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-ink/70 hover:text-forest-ink hover:underline font-inter"
              >
                <ArrowLeft size={14} />
                <span>Back to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
