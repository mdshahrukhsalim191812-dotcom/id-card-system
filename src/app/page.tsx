"use client";

import Image from "next/image";
import {
  Menu,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Layers3,
  Users,
  Briefcase,
} from "lucide-react";

export default function HomePage() {
  const products = [
    {
      title: "Brochures & Pamphlets",
      image: "/products/brochure.jpg",
      desc: "Creative brochures to promote your business.",
    },
    {
      title: "Visiting Cards",
      image: "/products/visiting.jpg",
      desc: "Premium quality visiting cards.",
    },
    {
      title: "Banners & Flex",
      image: "/products/banner.jpg",
      desc: "Eye catching banners & flex.",
    },
    {
      title: "Posters & Flyers",
      image: "/products/poster.jpg",
      desc: "Attractive posters & flyers.",
    },
    {
      title: "Packaging Products",
      image: "/products/package.jpg",
      desc: "Custom packaging solutions.",
    },
    {
      title: "Wedding Cards",
      image: "/products/wedding.jpg",
      desc: "Elegant wedding invitation cards.",
    },
    {
      title: "Booklets & Catalogs",
      image: "/products/booklet.jpg",
      desc: "Professional booklets & catalogs.",
    },
    {
      title: "Stickers & Labels",
      image: "/products/sticker.jpg",
      desc: "Custom stickers & labels.",
    },
  ];

  const clients = [
    "/clients/client1.png",
    "/clients/client2.png",
    "/clients/client3.png",
    "/clients/client4.png",
    "/clients/client5.png",
  ];

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <header className="bg-[#021B33] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <Image
              src="/genix-logo.png"
              alt="logo"
              width={50}
              height={50}
            />

            <div>
              <h1 className="font-bold text-xl sm:text-2xl">
                Work GeniX
              </h1>

              <p className="text-xs sm:text-sm text-gray-300">
                Printing | Designing | Branding
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex gap-8 font-medium">
            <a href="#" className="hover:text-blue-400">Home</a>
            <a href="#" className="hover:text-blue-400">About</a>
            <a href="#" className="hover:text-blue-400">Products</a>
            <a href="#" className="hover:text-blue-400">Services</a>
            <a href="#" className="hover:text-blue-400">Gallery</a>
            <a href="#" className="hover:text-blue-400">Contact</a>
          </nav>

          <button className="lg:hidden">
            <Menu size={30} />
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center">

        <Image
          src="/hero.jpg"
          alt="hero"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div className="text-white text-center lg:text-left">

            <p className="text-blue-400 mb-4 text-base sm:text-lg">
              Welcome to Work GeniX
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Printing Solutions <br />
              That Make an{" "}
              <span className="text-blue-500">
                Impact
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
              High quality printing services for your business,
              brand and personal needs.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10">

              <div>
                <h2 className="text-2xl sm:text-4xl font-bold">
                  35+
                </h2>

                <p className="text-xs sm:text-base text-gray-300">
                  Experience
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-bold">
                  100+
                </h2>

                <p className="text-xs sm:text-base text-gray-300">
                  Products
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-bold">
                  10000+
                </h2>

                <p className="text-xs sm:text-base text-gray-300">
                  Projects
                </p>
              </div>

            </div>

            <button className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold text-base sm:text-lg transition">
              Explore Products
            </button>

          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex justify-center">
            <Image
              src="/hero-products.png"
              alt="products"
              width={700}
              height={500}
              className="w-full max-w-2xl object-contain"
            />
          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            {
              icon: <Award size={40} />,
              title: "Creative Design",
              desc: "Unique and innovative designs.",
            },
            {
              icon: <Layers3 size={40} />,
              title: "Latest Technology",
              desc: "Advanced printing machines.",
            },
            {
              icon: <Users size={40} />,
              title: "Premium Quality",
              desc: "Best materials for long lasting.",
            },
            {
              icon: <Briefcase size={40} />,
              title: "Customer Satisfaction",
              desc: "Building trust with clients.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-lg p-8 text-center border hover:shadow-2xl transition"
            >
              <div className="text-blue-600 flex justify-center mb-5">
                {item.icon}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                {item.title}
              </h2>

              <p className="text-gray-600 text-sm sm:text-base">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="bg-[#F5F9FF] py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-14">

            <h2 className="text-3xl sm:text-5xl font-bold">
              Our Services & Products
            </h2>

            <p className="text-gray-600 mt-4 text-base sm:text-lg">
              We provide high quality printing solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >

                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-xl font-bold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    {item.desc}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">

          {[
            { num: "35+", text: "Years Experience" },
            { num: "100+", text: "Products" },
            { num: "500+", text: "Happy Clients" },
            { num: "10000+", text: "Projects" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-blue-600">
                {item.num}
              </h2>

              <p className="mt-4 text-sm sm:text-xl">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CLIENTS ================= */}
      <section className="bg-[#F5F9FF] py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

          <h2 className="text-3xl sm:text-5xl font-bold mb-14">
            Our Valuable Clients
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">

            {clients.map((client, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-full shadow-lg hover:scale-105 transition"
              >
                <Image
                  src={client}
                  alt="client"
                  width={140}
                  height={140}
                  className="mx-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="bg-[#021B33] rounded-[40px] overflow-hidden text-white grid lg:grid-cols-2 items-center">

            <div className="p-8 sm:p-14 text-center lg:text-left">

              <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
                Have a Project in Mind?
              </h2>

              <p className="mt-6 text-lg text-gray-300">
                Let’s create something amazing together.
              </p>

              <button className="mt-8 bg-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition">
                Get a Free Quote
              </button>
            </div>

            <div className="hidden lg:block">
              <Image
                src="/cta-print.png"
                alt="cta"
                width={700}
                height={400}
                className="w-full"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="bg-[#F8FAFC] py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold">
              Our Contacts
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white p-8 rounded-3xl shadow">
              <MapPin className="text-blue-600 mb-4" size={40} />

              <h3 className="font-bold text-2xl mb-3">
                Address
              </h3>

              <p className="text-gray-600 leading-8">
                Ghanichak, Jarlahi Road,
                Bhagalpur-812002,
                Bihar, India
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow">
              <Phone className="text-blue-600 mb-4" size={40} />

              <h3 className="font-bold text-2xl mb-3">
                Phone
              </h3>

              <p className="text-gray-600 leading-8">
                +91 9470 266 299 <br />
                +91 887 333 4440
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow">
              <Mail className="text-blue-600 mb-4" size={40} />

              <h3 className="font-bold text-2xl mb-3">
                Email
              </h3>

              <p className="text-gray-600 leading-8">
                mail@workgenix.in
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow">
              <Clock className="text-blue-600 mb-4" size={40} />

              <h3 className="font-bold text-2xl mb-3">
                Working Hours
              </h3>

              <p className="text-gray-600 leading-8">
                Monday - Saturday <br />
                10:00 AM - 6:00 PM
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#021B33] text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>

            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/genix-logo.png"
                alt="logo"
                width={55}
                height={55}
              />

              <h2 className="text-2xl font-bold">
                Work GeniX
              </h2>
            </div>

            <p className="text-gray-300 leading-8">
              Delivering excellence in printing,
              designing and branding services.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>Home</li>
              <li>About</li>
              <li>Products</li>
              <li>Gallery</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-5">
              Products
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>Visiting Cards</li>
              <li>Brochures</li>
              <li>Banners</li>
              <li>Wedding Cards</li>
              <li>Packaging</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-5">
              Find Us
            </h3>

            <Image
              src="/map.png"
              alt="map"
              width={400}
              height={250}
              className="rounded-2xl"
            />
          </div>

        </div>

        <div className="border-t border-white/10 py-5 text-center text-gray-400 text-sm">
          © 2026 Work GeniX. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}