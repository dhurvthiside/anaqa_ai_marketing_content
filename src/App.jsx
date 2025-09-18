import { motion } from "framer-motion";
import { useState } from "react";

export default function App() {
  const [fileError, setFileError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  // Handle Cloudinary file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      setFileError("File size must be less than 3MB");
      e.target.value = "";
      return;
    } else {
      setFileError("");
    }

    // Get name & email for metadata
    const name = document.querySelector('input[name="name"]').value || "Anonymous";
    const email = document.querySelector('input[name="email"]').value || "";

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Ai_marketing_content");
    formData.append("context", `name=${name}|email=${email}`); // Add metadata

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxa6dotza/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setLogoUrl(data.secure_url);
      } else {
        setFileError("Upload failed, please try again.");
      }
    } catch (err) {
      setFileError("Upload failed, please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.img
          src="/favicon.png"
          alt="AI Marketing Logo"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
        >
          AI <span className="font-extrabold text-white">Marketing Content</span> Creator
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 max-w-3xl text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          We help brands{" "}
          <span className="text-white font-semibold">
            create stunning, consistent, and AI-powered visuals
          </span>{" "}
          in seconds. No design team, no high costs — just smart, professional marketing content.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-4 max-w-2xl text-md md:text-lg text-gray-400"
        >
          As part of our launch, we’re testing the platform and offering you
          <span className="font-semibold text-indigo-400"> 3 free brand-specific images</span> delivered straight to your inbox.
        </motion.p>

        <div className="mt-10 flex flex-col md:flex-row gap-4">
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-600 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition"
          >
            Tell Me More
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-indigo-600 rounded-2xl text-lg font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            Get 3 Free Images
          </motion.a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-8"
        >
          What is <span className="text-indigo-400">Our Platform?</span>
        </motion.h2>
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
          We are building an{" "}
          <span className="font-semibold text-white">
            AI-powered marketing content creator
          </span>{" "}
          — a tool to help businesses create consistent, on-brand content at lightning speed.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Why Choose <span className="text-indigo-400">Our Platform?</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[{
            title: "AI-Generated Visuals",
            desc: "Create beautiful branded images tailored to your business in seconds.",
            icon: "🎨"
          }, {
            title: "Fresh Campaign Ideas",
            desc: "Never run out of creative concepts for ads, posts, and marketing.",
            icon: "💡"
          }, {
            title: "Brand Consistency",
            desc: "Keep your brand identity strong and recognizable across all content.",
            icon: "✨"
          }].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          We’re Testing Our New Product 🚀
        </motion.h2>
        <p className="max-w-2xl mx-auto text-lg text-white mb-6">
          Share your details and we’ll send you 3 free, branded images crafted by our AI.
        </p>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-10 py-4 bg-white text-indigo-600 font-semibold rounded-2xl shadow-lg hover:bg-gray-100 transition"
        >
          Fill Out Your Brand Details
        </motion.a>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Submit Your <span className="text-indigo-400">Brand Details</span>
        </motion.h2>
        <p className="text-center text-gray-400 mb-8">
          Please share the following details so we can create and send you
          <span className="font-semibold text-indigo-400"> 3 brand-specific images for free</span>.
        </p>

        <form
          action="https://formspree.io/f/mgvljjkv"
          method="POST"
          className="space-y-6 bg-gray-800 p-10 rounded-2xl shadow-xl"
        >
          {/* Name */}
          <div>
            <label className="block text-left text-sm font-semibold text-gray-300 mb-2">Name</label>
            <input type="text" name="name" required className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-400 outline-none" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-left text-sm font-semibold text-gray-300 mb-2">Email</label>
            <input type="email" name="email" required className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-400 outline-none" />
          </div>

          {/* Instagram / Website */}
          <div>
            <label className="block text-left text-sm font-semibold text-gray-300 mb-2">Instagram Page / Website Link</label>
            <input type="url" name="link" placeholder="https://instagram.com/yourbrand" className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-400 outline-none" />
          </div>

          {/* Brand Logo */}
          <div>
            <label className="block text-left text-sm font-semibold text-gray-300 mb-2">Upload Brand Logo (JPG/PNG, Max 3MB)</label>
            <input type="file" name="logo_file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="w-full text-gray-300" />
            {uploading && <p className="text-indigo-400 mt-2">Uploading logo...</p>}
            {fileError && <p className="text-red-400 mt-2">{fileError}</p>}
            {logoUrl && <p className="text-green-400 mt-2">Logo uploaded successfully ✅</p>}
            {logoUrl && <input type="hidden" name="logo" value={logoUrl} />}
          </div>

          {/* Brand About */}
          <div>
            <label className="block text-left text-sm font-semibold text-gray-300 mb-2">What is your brand about?</label>
            <textarea name="brand_about" rows="3" placeholder="Tell us about your brand..." className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-400 outline-none"></textarea>
          </div>

          {/* Image Preferences */}
          <div>
            <label className="block text-left text-sm font-semibold text-gray-300 mb-2">What kind of images do you want?</label>
            <textarea name="image_preferences" rows="3" placeholder="E.g., social media posts, ads, banners..." className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-400 outline-none"></textarea>
          </div>

          {/* Submit */}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition">
            Submit & Get My Free Images
          </motion.button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Anaqa Tech. All rights reserved.
      </footer>
    </div>
  );
}
