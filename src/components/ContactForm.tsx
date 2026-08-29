"use client";

import { useState } from "react";
import { Send, Check, AlertTriangle, HelpCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "61d09f73-58b6-4762-8542-87325de248f3");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormState({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });
        setResult("Your inquiry has been submitted successfully! We will get back to you shortly.");
      } else {
        console.error("Web3Forms submission error:", data);
        setResult(data.message || "Failed to submit message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting inquiry form:", error);
      setResult("Network error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className="bg-white rounded-3xl overflow-hidden border border-pencil-gray/20 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-whisper-gray/50 p-6 border-b border-pencil-gray/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold font-bricolage text-forest-ink flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-forest-ink/70" />
                Support & General Inquiry
              </h2>
              <p className="text-xs text-forest-ink/65 font-inter mt-1">
                Have questions about pricing, course structures, or need technical help? Send us a message.
              </p>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          className="p-6 md:p-8 space-y-5 font-inter"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Details */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-semibold text-forest-ink">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 rounded-xl border border-pencil-gray/25 focus:outline-none focus:border-forest-ink/50 focus:ring-1 focus:ring-forest-ink/20 text-sm bg-white text-forest-ink"
                placeholder="Your Name"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-forest-ink">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 rounded-xl border border-pencil-gray/25 focus:outline-none focus:border-forest-ink/50 focus:ring-1 focus:ring-forest-ink/20 text-sm bg-white text-forest-ink"
                placeholder="email@example.com"
              />
            </div>
          </motion.div>

          {/* Subject Dropdown */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label htmlFor="subject" className="block text-xs font-semibold text-forest-ink">
              Inquiry Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleInputChange}
              required
              className="w-full p-2.5 rounded-xl border border-pencil-gray/25 focus:outline-none focus:border-forest-ink/50 focus:ring-1 focus:ring-forest-ink/20 text-sm bg-white text-forest-ink cursor-pointer"
            >
              <option value="General Inquiry">General Course Inquiry</option>
              <option value="Student Support">Student Technical Support</option>
              <option value="Razorpay Issue">Payment Verification Help</option>
              <option value="Partnership">Business Partnerships</option>
            </select>
          </motion.div>

          {/* Message Area */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label htmlFor="message" className="block text-xs font-semibold text-forest-ink">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full p-3 rounded-xl border border-pencil-gray/25 focus:outline-none focus:border-forest-ink/50 focus:ring-1 focus:ring-forest-ink/20 text-sm bg-white text-forest-ink resize-y"
              placeholder="How can we help you today? If referencing a payment, please include details..."
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="forest"
              className="w-full h-11 font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>

            {result && (
              <motion.div
                className={`mt-4 p-3 rounded-xl text-xs ${
                  result.includes("successfully")
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1.5">
                  {result.includes("successfully") ? (
                    <Check className="w-4 h-4 flex-shrink-0 text-emerald-700" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-700" />
                  )}
                  <span>{result}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
