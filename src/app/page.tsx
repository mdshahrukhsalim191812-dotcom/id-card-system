"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const images = [
    "/hero/1.jpeg",
    "/hero/2.png",
    "/hero/3.jpeg",
  ];

  const [current, setCurrent] = useState(0);

  // 🔥 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      <Navbar />

      {/* 🔥 IMAGE SLIDER */}
      <section className="relative w-full h-[250px] md:h-[400px] overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="hero"
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
            Create Professional School ID Cards
          </h2>
        </div>
      </section>

      {/* 🔹 Hero Section */}
      <section className="text-center py-12 px-6">
        <p className="text-gray-600 max-w-xl mx-auto">
          Design, customize and generate professional student ID cards in minutes.
          Upload student data, choose design and send directly for printing.
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:brightness-110 transition"
          >
            Start Now
          </Link>

          <Link
            href="/dashboard"
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* 🔹 Features Section */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-12 max-w-6xl mx-auto">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">
            Easy Student Management
          </h3>
          <p className="text-gray-600 mt-2">
            Add students manually or upload bulk data easily.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">
            Multiple ID Designs
          </h3>
          <p className="text-gray-600 mt-2">
            Choose from different templates and customize ribbon colors.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">
            Print Ready Output
          </h3>
          <p className="text-gray-600 mt-2">
            Generate high-quality ID cards ready for printing.
          </p>
        </div>

      </section>

      {/* 🔹 CTA Section */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold">
          Start Creating ID Cards Today
        </h2>

        <p className="mt-2">
          Simple, fast and professional solution for schools.
        </p>

        <Link
          href="/register"
          className="inline-block mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>

      {/* 🔹 Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Genix Graphic. All rights reserved.
      </footer>

    </main>
  );
}