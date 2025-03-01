import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { Send, XCircle } from "lucide-react";

const ContactForm = () => {
  const [result, setResult] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    task_type: "",
    writing_content: "",
    notes: "",
  });
  const formRef = useRef(null);

  // Generate unique animation keyframes for floating elements
  const generateKeyframes = () => {
    let styles = "";

    for (let i = 0; i < 12; i++) {
      const x1 = Math.random() * 20 - 10;
      const y1 = Math.random() * 20 - 10;
      const x2 = Math.random() * 20 - 10;
      const y2 = Math.random() * 20 - 10;

      styles += `
        @keyframes float-${i} {
          0% { transform: translate(calc(-50% + ${x1}px), calc(-50% + ${y1}px)) rotate(${
        Math.random() * 360
      }deg); }
          50% { transform: translate(calc(-50% + ${x2}px), calc(-50% + ${y2}px)) rotate(${
        Math.random() * 360
      }deg); }
          100% { transform: translate(calc(-50% + ${x1}px), calc(-50% + ${y1}px)) rotate(${
        Math.random() * 360
      }deg); }
        }
        
        @keyframes pulse-${i} {
          0% { opacity: ${0.1 + Math.random() * 0.2}; }
          100% { opacity: ${0.2 + Math.random() * 0.3}; }
        }
      `;
    }

    return styles;
  };

  useEffect(() => {
    setIsVisible(true);

    // Add keyframes to document
    const style = document.createElement("style");
    style.textContent = generateKeyframes();
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(event.target);
    formData.append("access_key", "446b0e77-d933-48e0-b9e7-6dc3d1da56f4");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: "success",
          title: "Submitted successfully",
        });

        // Reset form and state
        event.target.reset();
        setFormState({
          name: "",
          email: "",
          task_type: "",
          writing_content: "",
          notes: "",
        });

        // Scroll to top of form with smooth animation
        if (formRef.current) {
          formRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Field animation logic
  const handleFocus = (e) => {
    const label = e.target.previousElementSibling;
    if (label) {
      label.classList.add("floating");
    }
  };

  const handleBlur = (e) => {
    const label = e.target.previousElementSibling;
    if (label && e.target.value === "") {
      label.classList.remove("floating");
    }
  };

  return (
    <div className="w-full">
      {/* Custom Styles for Animation */}
      <style>{`
        .input-group {
          position: relative;
        }

        .input-group label {
          position: absolute;
          left: 1rem;
          top: 0.75rem;
          color: #4b5563;
          pointer-events: none;
          transform-origin: left top;
          transition: all 0.2s ease-out;
        }

        .input-group label.floating,
        .input-group input:focus + label,
        .input-group textarea:focus + label,
        .input-group select:focus + label {
          transform: translateY(-2rem) scale(0.85);
          color: #d56e1f;
          font-weight: 500;
        }

        .input-group input,
        .input-group textarea,
        .input-group select {
          padding-top: 1.25rem; /* Increased padding-top */
        }

        .input-group input:focus,
        .input-group textarea:focus,
        .input-group select:focus {
          outline: none;
          border-color: #d56e1f;
          box-shadow: 0 0 0 3px rgba(213, 110, 31, 0.2);
        }

        .submit-button-wrapper {
          position: relative;
          overflow: hidden;
        }

        .submit-button-wrapper::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150%;
          height: 150%;
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.15),
            rgba(255, 255, 255, 0)
          );
          transform: translate(-50%, -50%) rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% {
            transform: translate(-50%, -50%) rotate(45deg) translateX(-100%);
          }
          20% {
            transform: translate(-50%, -50%) rotate(45deg) translateX(100%);
          }
          100% {
            transform: translate(-50%, -50%) rotate(45deg) translateX(100%);
          }
        }
      `}</style>

      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] min-h-[50vh] w-full">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Animated geometric patterns */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: Math.random() * 200 + 100 + "px",
                  height: Math.random() * 200 + 100 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  transform: `translate(-50%, -50%) rotate(${
                    Math.random() * 360
                  }deg)`,
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                  animation: `float-${i} ${
                    Math.random() * 20 + 10
                  }s infinite ease-in-out`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: `pulse-${i} ${
                      Math.random() * 4 + 2
                    }s infinite ease-in-out alternate`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`py-20 text-center transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative inline-block">
              <h1 className="text-6xl font-bold text-white mb-6">
                IELTS Writing
                <span className="block mt-2 text-7xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Evaluation Service
                </span>
              </h1>
              <div className="absolute -left-4 -top-4 w-20 h-20 border-2 border-white/20 rounded-lg transform rotate-12"></div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 border-2 border-white/20 rounded-lg transform -rotate-12"></div>
            </div>
            <p className="text-white/90 text-xl max-w-2xl mx-auto mt-6">
              Get detailed feedback on your IELTS writing tasks from our expert
              evaluators. Improve your score with professional guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 max-w-3xl mx-auto px-4" ref={formRef}>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <form
            onSubmit={onSubmit}
            className="relative p-8 bg-white rounded-lg shadow-lg space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  className="w-full px-4 pt-4 pb-2 border border-gray-300 rounded-lg transition-all"
                />
                <label
                  htmlFor="name"
                  className={formState.name ? "floating" : ""}
                >
                  Full Name
                </label>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  className="w-full px-4 pt-4 pb-2 border border-gray-300 rounded-lg transition-all"
                />
                <label
                  htmlFor="email"
                  className={formState.email ? "floating" : ""}
                >
                  Email
                </label>
              </div>
            </div>

            <div className="input-group">
              <select
                id="task_type"
                name="task_type"
                value={formState.task_type}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                className="w-full px-4 pt-4 pb-2 border border-gray-300 rounded-lg transition-all appearance-none"
              >
                <option value=""></option>
                <option value="task1">Task 1 (Graph/Chart Description)</option>
                <option value="task2">Task 2 (Essay)</option>
                <option value="both">Both Tasks</option>
              </select>
              <label
                htmlFor="task_type"
                className={formState.task_type ? "floating" : ""}
              >
                Writing Task Type
              </label>
            </div>

            <div className="input-group">
              <textarea
                id="writing_content"
                name="writing_content"
                value={formState.writing_content}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                rows="8"
                className="w-full px-4 pt-4 pb-2 border border-gray-300 rounded-lg transition-all resize-none"
              ></textarea>
              <label
                htmlFor="writing_content"
                className={formState.writing_content ? "floating" : ""}
              >
                Your Writing
              </label>
            </div>

            <div className="input-group">
              <textarea
                id="notes"
                name="notes"
                value={formState.notes}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                rows="2"
                className="w-full px-4 pt-4 pb-2 border border-gray-300 rounded-lg transition-all resize-none"
              ></textarea>
              <label
                htmlFor="notes"
                className={formState.notes ? "floating" : ""}
              >
                Additional Notes (Optional)
              </label>
            </div>

            <div className="submit-button-wrapper rounded-lg overflow-hidden">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] text-white rounded-lg font-semibold hover:brightness-110 transition-all duration-300 flex items-center justify-center space-x-2 group relative"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Submit for Evaluation</span>
                    <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {result && (
              <div className="flex items-center space-x-2 text-red-500 text-sm animate-pulse">
                <XCircle className="w-4 h-4" />
                <span>{result}</span>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
