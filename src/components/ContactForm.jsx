import { useState } from "react";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "446b0e77-d933-48e0-b9e7-6dc3d1da56f4");

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
        title: "Sent successfully",
      });
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div
      id="Contact"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-16 p-8"
    >
      <h1 className="text-center text-6xl font-light text-[#cc0d09]">
        Writing Evaluation
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-md flex-col gap-8 rounded-lg p-6 md:max-w-lg lg:max-w-xl"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Full Name"
            name="name"
            className="rounded-lg border-2 border-[#cc0d09] px-4 py-3 text-lg outline-none trasnition-all hover:bg-red-50 focus:ring-red-500"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            name="email"
            className="rounded-lg border-2 border-[#cc0d09] px-4 py-3 text-lg outline-none trasnition-all hover:bg-red-50 focus:ring-red-500"
            required
          />
          <input
            type="text"
            placeholder="Your Question"
            name="question"
            className="rounded-lg border-2 border-[#cc0d09] px-4 py-3 text-lg outline-none trasnition-all hover:bg-red-50 focus:ring-red-500"
            required
          />
        </div>
        <textarea
          placeholder="Your Answer"
          name="message"
          className="h-32 w-full resize-none rounded-lg border-2 border-[#cc0d09] px-4 py-3 text-lg outline-none trasnition-all hover:bg-red-50 focus:ring-red-500"
          required
        ></textarea>
        <button className="rounded-lg border-[#cc0d09] bg-[#cc0d09] px-6 py-3 font-semibold text-white trasnition-all duration-200 hover:bg-red-600">
          Send Message
        </button>
      </form>
      <span>{result}</span>
    </div>
  );
};

export default ContactForm;