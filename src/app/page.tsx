"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Layers3,
  Users,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 2000);

    return () => clearTimeout(timer);
  })

  const products = [
    {
      title: "Brochures & Pamphlets",
      image: "/products/Brochure-&-Pamphlet.jpeg",
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
      image: "/products/wedding-card.jpg",
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

  if (loadingPage) {

    return (

      <div className="
            fixed inset-0 z-[999]
            overflow-hidden
            bg-gradient-to-br
            from-[#021B33]
            via-[#04284B]
            to-[#063B6E]
            flex items-center justify-center
        ">

        {/* BACKGROUND GLOW */}
        <div className="
                absolute -top-32 -left-32
                w-[400px] h-[400px]
                bg-blue-500/20
                blur-3xl rounded-full
                animate-pulse
            "></div>

        <div className="
                absolute -bottom-32 -right-32
                w-[400px] h-[400px]
                bg-cyan-400/20
                blur-3xl rounded-full
                animate-pulse
            "></div>

        {/* CENTER */}
        <div className="
                relative z-10
                flex flex-col
                items-center
                text-center
                px-6
            ">

          {/* LOGO CONTAINER */}
          <div className="
                    relative
                    w-36 h-36
                    flex items-center justify-center
                ">

            {/* OUTER RING */}
            <div className="
                        absolute inset-0
                        rounded-full
                        border-[6px]
                        border-white/10
                    "></div>

            {/* ANIMATED RING */}
            <div className="
                        absolute inset-0
                        rounded-full
                        border-[6px]
                        border-transparent
                        border-t-cyan-400
                        border-r-blue-500
                        animate-spin
                    "></div>

            {/* SECOND RING */}
            <div className="
                        absolute inset-3
                        rounded-full
                        border-[4px]
                        border-transparent
                        border-b-blue-300
                        animate-spin
                        [animation-direction:reverse]
                        [animation-duration:3s]
                    "></div>

            {/* LOGO */}
            <div className="
                        w-24 h-24
                        rounded-full
                        shadow-2xl
                        flex items-center justify-center
                        animate-pulse
                        overflow-hidden
                    ">

              <img
                src="/genix-logo.png"
                alt="logo"
                className="
                                w-16 h-16
                                object-contain
                            "
              />

            </div>

          </div>

          {/* BRAND */}
          <h1 className="
                    mt-8
                    text-4xl sm:text-5xl
                    font-extrabold
                    text-white
                    tracking-wide
                ">
            Work GeniX
          </h1>

          <p className="
                    mt-3
                    text-blue-100
                    text-base sm:text-lg
                    max-w-md
                    leading-relaxed
                ">
            Preparing premium printing
            experience for you...
          </p>

          {/* LOADING BAR */}
          <div className="
                    mt-10
                    w-[280px] sm:w-[340px]
                    h-3
                    bg-white/10
                    rounded-full
                    overflow-hidden
                    backdrop-blur-md
                ">

            <div className="
                        h-full
                        w-[40%]
                        bg-gradient-to-r
                        from-cyan-400
                        via-blue-500
                        to-cyan-400
                        rounded-full
                        animate-[loading_1.5s_infinite]
                    "></div>

          </div>

          {/* DOTS */}
          <div className="
                    flex items-center
                    gap-3
                    mt-8
                ">

            <div className="
                        w-3 h-3
                        rounded-full
                        bg-white
                        animate-bounce
                    "></div>

            <div className="
                        w-3 h-3
                        rounded-full
                        bg-cyan-300
                        animate-bounce
                        delay-150
                    "></div>

            <div className="
                        w-3 h-3
                        rounded-full
                        bg-blue-400
                        animate-bounce
                        delay-300
                    "></div>

          </div>

        </div>

        {/* CUSTOM ANIMATION */}
        <style jsx>{`
                @keyframes loading {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(350%);
                    }
                }
            `}</style>

      </div>
    );
  }

  return (

    <div className="bg-white text-gray-800 overflow-x-hidden scroll-smooth">

      {/* ================= WHATSAPP FLOAT ================= */}
      <a
        href="https://wa.me/919525706529"
        target="_blank"
        className="
          fixed bottom-5 right-5 z-50
          flex items-center justify-center
          transition-all duration-300
          hover:scale-110
          animate-bounce
        "
      >

        <Image
          src="/icons/whatsapp.svg"
          alt="whatsapp"
          width={65}
          height={65}
        />

      </a>

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* BG IMAGE */}
        <Image
          src="/hero/1.jpeg"
          alt="hero"
          fill
          priority
          className="object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />

        {/* GLOW */}
        <div className="
          absolute top-0 right-0
          w-[500px] h-[500px]
          bg-blue-500/20 blur-3xl rounded-full
        "></div>

        <div className="
          relative z-10
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          py-28
          grid lg:grid-cols-2
          gap-14 items-center
        ">

          {/* LEFT */}
          <div className="
            text-white
            text-center lg:text-left
          ">

            {/* BADGE */}
            <div className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              bg-white/10 backdrop-blur-xl
              border border-white/10
              text-sm font-medium
            ">

              <CheckCircle2 size={16} />

              Premium Printing Solutions

            </div>

            <h1 className="
              mt-6
              text-4xl sm:text-5xl md:text-6xl xl:text-7xl
              font-extrabold
              leading-tight
              tracking-tight
            ">
              Printing Solutions
              <br />

              That Create
              <span className="text-blue-500"> Impact</span>

            </h1>

            <p className="
              mt-6
              text-base sm:text-lg
              text-gray-300
              max-w-2xl
              mx-auto lg:mx-0
              leading-relaxed
            ">
              High quality printing, branding and packaging
              solutions for businesses, schools and personal
              needs with modern technology and premium finishing.
            </p>

            {/* BUTTONS */}
            <div className="
              mt-10
              flex flex-col sm:flex-row
              gap-4
              justify-center lg:justify-start
            ">

              <button className="
                bg-blue-600 hover:bg-blue-700
                px-8 py-4 rounded-2xl
                font-semibold text-lg
                shadow-2xl
                transition-all duration-300
                hover:scale-105
                flex items-center justify-center gap-2
              ">

                Explore Products

                <ArrowRight size={20} />

              </button>

              <a
                href="tel:+919525706529"
                className="
                  border border-white/20
                  bg-white/10 backdrop-blur-xl
                  hover:bg-white/20
                  px-8 py-4 rounded-2xl
                  font-semibold text-lg
                  transition-all duration-300
                "
              >
                Call Now
              </a>

            </div>

            {/* STATS */}
            <div className="
              grid grid-cols-3
              gap-4 sm:gap-8
              mt-12
            ">

              {[
                { num: "35+", text: "Experience" },
                { num: "100+", text: "Products" },
                { num: "10K+", text: "Projects" },
              ].map((item, i) => (

                <div key={i}>

                  <h2 className="
                    text-3xl sm:text-4xl
                    font-extrabold
                  ">
                    {item.num}
                  </h2>

                  <p className="
                    text-sm sm:text-base
                    text-gray-300 mt-2
                  ">
                    {item.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex justify-center">

            <div className="relative">

              <div className="
                absolute inset-0
                bg-blue-500/20
                blur-3xl rounded-full
              "></div>

              <Image
                src="/hero-products.png"
                alt="products"
                width={700}
                height={500}
                className="
                  relative z-10
                  w-full max-w-2xl
                  object-contain
                  drop-shadow-2xl
                  animate-[float_5s_ease-in-out_infinite]
                "
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="text-center mb-14">

          <h2 className="
            text-3xl sm:text-5xl
            font-extrabold
          ">
            Why Choose Us
          </h2>

          <p className="
            text-gray-600
            mt-4
            text-lg
          ">
            Delivering quality and trust for decades.
          </p>

        </div>

        <div className="
          grid sm:grid-cols-2
          xl:grid-cols-4
          gap-6
        ">

          {[
            {
              icon: <Award size={42} />,
              title: "Creative Design",
              desc: "Unique and innovative designs.",
            },
            {
              icon: <Layers3 size={42} />,
              title: "Latest Technology",
              desc: "Advanced printing machines.",
            },
            {
              icon: <Users size={42} />,
              title: "Premium Quality",
              desc: "Best materials for long lasting.",
            },
            {
              icon: <Briefcase size={42} />,
              title: "Customer Satisfaction",
              desc: "Building trust with clients.",
            },
          ].map((item, i) => (

            <div
              key={i}
              className="
                group
                bg-white
                rounded-[30px]
                shadow-md
                border border-gray-100
                p-8
                text-center
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all duration-500
              "
            >

              <div className="
                w-20 h-20
                rounded-3xl
                bg-blue-50
                text-blue-600
                flex items-center justify-center
                mx-auto mb-6
                group-hover:bg-blue-600
                group-hover:text-white
                transition-all duration-300
              ">

                {item.icon}

              </div>

              <h2 className="
                text-2xl font-bold
                mb-4
              ">
                {item.title}
              </h2>

              <p className="
                text-gray-600
                leading-relaxed
              ">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="bg-[#F5F9FF] py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">

            <h2 className="
              text-3xl sm:text-5xl
              font-extrabold
            ">
              Our Services & Products
            </h2>

            <p className="
              text-gray-600
              mt-4 text-lg
            ">
              We provide high quality printing solutions.
            </p>

          </div>

          <div className="
            grid grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-8
          ">

            {products.map((item, i) => (

              <div
                key={i}
                className="
                  group
                  bg-white
                  rounded-[30px]
                  overflow-hidden
                  shadow-md
                  border border-gray-100
                  hover:shadow-2xl
                  transition-all duration-500
                  hover:-translate-y-2
                "
              >

                <div className="overflow-hidden">

                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="
                      w-full h-56
                      object-cover
                      group-hover:scale-110
                      transition-transform duration-700
                    "
                  />

                </div>

                <div className="p-6">

                  <h3 className="
                    text-2xl font-bold
                    mb-3
                  ">
                    {item.title}
                  </h3>

                  <p className="
                    text-gray-600
                    leading-relaxed
                  ">
                    {item.desc}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= CLIENTS ================= */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">

            <h2 className="
              text-3xl sm:text-5xl
              font-extrabold
            ">
              Our Valuable Clients
            </h2>

          </div>

          <div className="
            grid grid-cols-2
            md:grid-cols-3
            xl:grid-cols-5
            gap-6
          ">

            {clients.map((client, i) => (

              <div
                key={i}
                className="
                  bg-white
                  rounded-[30px]
                  p-6
                  shadow-md
                  border border-gray-100
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all duration-500
                  flex items-center justify-center
                "
              >

                <Image
                  src={client}
                  alt="client"
                  width={140}
                  height={140}
                  className="
                    object-contain
                    grayscale hover:grayscale-0
                    transition
                  "
                />

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= LOCATION ================= */}
      <section className="bg-[#F8FAFC] py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>

              <p className="text-blue-600 font-semibold">
                FIND US
              </p>

              <h2 className="
                text-4xl sm:text-5xl
                font-extrabold
                mt-4
              ">
                Visit Our Office
              </h2>

              <p className="
                text-gray-600
                mt-5
                text-lg
                leading-relaxed
              ">
                Work GeniX provides complete printing,
                designing and branding solutions with
                modern printing technology.
              </p>

              <div className="mt-8 space-y-5">

                <div className="flex gap-4">

                  <MapPin className="text-blue-600 shrink-0" />

                  <p className="text-gray-700 leading-7">
                    Islampur, Shahjangi, Kabirpur Road, Bhagalpur, Pin Code - 813113
                  </p>

                </div>

                <div className="flex gap-4">

                  <Phone className="text-blue-600 shrink-0" />

                  <p className="text-gray-700">
                    +91 9525 706 529
                  </p>

                </div>

                <div className="flex gap-4">

                  <Mail className="text-blue-600 shrink-0" />

                  <p className="text-gray-700">
                    mail@workgenix.in
                  </p>

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="
              overflow-hidden
              shadow-2xl
              w-[400px] h-[400px]
            ">
              <Link href="https://maps.app.goo.gl/9AoEaHakFHWNiWyS7">
                <Image
                  src="/icons/map.jpeg"
                  alt="map"
                  width={420}
                  height={420}
                />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="
        bg-[#021B33]
        text-white
        relative overflow-hidden
      ">

        {/* GLOW */}
        <div className="
          absolute top-0 right-0
          w-[400px] h-[400px]
          bg-blue-500/10
          blur-3xl rounded-full
        "></div>

        <div className="
          relative z-10
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          py-20
          grid sm:grid-cols-2
          xl:grid-cols-4
          gap-12
        ">

          {/* BRAND */}
          <div>

            <div className="
              flex items-center gap-3
              mb-6
            ">

              <Image
                src="/genix-logo.png"
                alt="logo"
                width={60}
                height={60}
              />

              <h2 className="
                text-3xl font-bold
              ">
                Work GeniX
              </h2>

            </div>

            <p className="
              text-gray-300
              leading-8
            ">
              Delivering excellence in printing,
              designing and branding services
              with modern technology.
            </p>

          </div>

          {/* LINKS */}
          <div>

            <h3 className="
              text-2xl font-bold
              mb-6
            ">
              Quick Links
            </h3>

            <ul className="
              space-y-4
              text-gray-300
            ">

              <li className="hover:text-white transition cursor-pointer">
                Home
              </li>

              <li className="hover:text-white transition cursor-pointer">
                About
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Products
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Gallery
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Contact
              </li>

            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="
              text-2xl font-bold
              mb-6
            ">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-300">

              <div className="flex gap-3">

                <Phone className="text-blue-400 shrink-0" />

                <div>
                  +91 9470 266 299
                  <br />
                  +91 887 333 4440
                </div>

              </div>

              <div className="flex gap-3">

                <Mail className="text-blue-400 shrink-0" />

                <div>
                  mail@workgenix.in
                </div>

              </div>

              <div className="flex gap-3">

                <Clock className="text-blue-400 shrink-0" />

                <div>
                  Mon - Sat
                  <br />
                  10:00 AM - 6:00 PM
                </div>

              </div>

            </div>

          </div>

          {/* MAP */}
          <div>

            <h3 className="
              text-2xl font-bold
              mb-6
            ">
              Location
            </h3>

            <Image
              src="/icons/map.svg"
              alt="map"
              width={400}
              height={250}
              className="
                rounded-[24px]
                shadow-xl
              "
            />

          </div>

        </div>

        {/* BOTTOM */}
        <div className="
          border-t border-white/10
          py-5
          text-center
          text-gray-400
          text-sm
        ">

          © 2026 Work GeniX. All Rights Reserved.

        </div>

      </footer>

    </div>
  );
}