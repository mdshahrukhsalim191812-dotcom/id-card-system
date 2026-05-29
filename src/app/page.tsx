"use client";

import Image from "next/image";
import HomeNavbar from "@/components/HomeNavbar";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {

  const [loadingPage, setLoadingPage] = useState(true);
  const [current, setCurrent] = useState(0);

  const slides = [

    {
      image: "/hero/1.jpeg",
      title: "Printing",
      highlight: "Impact",
      desc:
        "High quality printing, branding and packaging solutions for businesses, schools and personal needs with premium finishing.",
    },

    {
      image: "/hero/2.jpg",
      title: "Creative Designs",
      highlight: "Brands",
      desc:
        "Modern graphic designing and branding solutions crafted to elevate your business identity professionally.",
    },

    {
      image: "/hero/3.jpg",
      title: "Premium Quality",
      highlight: "Printing",
      desc:
        "Advanced printing technology delivering premium quality products with precision and perfection.",
    },

  ];

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );

    }, 5000);

    return () =>
      clearInterval(interval);

  }, [slides.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 2000);

    return () => clearTimeout(timer);
  })

  const products = [
    {
      title: "Brochures & Pamphlets",
      image: "/products/Brochure-&-Pamphlet.jpg",
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

  const nextSlide = () => {

    setCurrent((prev) =>
      prev === slides.length - 1
        ? 0
        : prev + 1
    );
  };

  // ================= PREV =================
  const prevSlide = () => {

    setCurrent((prev) =>
      prev === 0
        ? slides.length - 1
        : prev - 1
    );
  };

  // ================= LOADING PAGE =================

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

  <div className="bg-white text-gray-800 scroll-smooth">

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
      <HomeNavbar />

      {/* ================= HERO ================= */}
      <section className="
  relative
  min-h-screen
  overflow-hidden
  flex items-center
  bg-black
">

        {/* ================= BACKGROUND IMAGES ================= */}
        {slides.map((slide, index) => (

          <div
            key={index}
            className={`
        absolute inset-0
        transition-all duration-[1800ms]
        ease-in-out
        ${index === current
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
              }
      `}
          >

            <Image
              src={slide.image}
              alt="hero"
              fill
              priority
              className="
          object-cover
        "
            />

          </div>

        ))}

        {/* ================= LIGHT OVERLAY ================= */}
        <div className="
    absolute inset-0
    bg-gradient-to-r
    from-[#021B33]/75
    via-[#021B33]/50
    to-black/30
  "></div>

        {/* ================= GLOW EFFECTS ================= */}
        <div className="
    absolute -top-40 -right-40
    w-[500px] h-[500px]
    bg-cyan-400/20
    blur-[120px]
    rounded-full
  "></div>

        <div className="
    absolute -bottom-40 -left-40
    w-[500px] h-[500px]
    bg-blue-500/20
    blur-[120px]
    rounded-full
  "></div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="
    relative z-10
    max-w-7xl mx-auto
    px-4 sm:px-6 lg:px-8
    pt-32 pb-24
    grid lg:grid-cols-2
    gap-16
    items-center
  ">

          {/* ================= LEFT CONTENT ================= */}
          <div className="
      text-white
      text-center lg:text-left
    ">

            {/* Badge */}
            <div className="
        inline-flex items-center gap-2
        px-5 py-2.5
        rounded-full
        bg-white/10
        backdrop-blur-2xl
        border border-white/10
        text-sm font-medium
        shadow-xl
      ">

              <CheckCircle2
                size={16}
                className="text-cyan-300"
              />

              Premium Printing Solutions

            </div>

            {/* Heading */}
            <h1 className="
        mt-7
        text-4xl sm:text-5xl md:text-6xl xl:text-7xl
        font-black
        leading-tight
        tracking-tight
      ">

              {slides[current].title}

              <br />

              That Create{" "}

              <span className="
          bg-gradient-to-r
          from-cyan-300
          via-blue-300
          to-cyan-400
          bg-clip-text
          text-transparent
        ">
                {slides[current].highlight}
              </span>

            </h1>

            {/* Description */}
            <p className="
        mt-7
        text-base sm:text-lg
        text-gray-200
        max-w-2xl
        mx-auto lg:mx-0
        leading-relaxed
      ">
              {slides[current].desc}
            </p>

            {/* ================= BUTTONS ================= */}
            <div className="
        mt-10
        flex flex-col sm:flex-row
        gap-4
        justify-center lg:justify-start
      ">

              {/* Explore Button */}
              <button className="
          group
          relative
          overflow-hidden
          px-8 py-4
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          text-white
          font-semibold
          text-base sm:text-lg
          shadow-[0_10px_40px_rgba(6,182,212,0.35)]
          transition-all duration-300
          hover:scale-105
          hover:shadow-cyan-500/40
          flex items-center justify-center gap-3
        ">

                {/* Shine */}
                <span className="
            absolute inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            group-hover:translate-x-full
            transition-all duration-1000
          "></span>

                <span className="relative z-10">
                  <Link href="/products">
                    Explore Products
                  </Link>
                </span>

                <ArrowRight
                  size={20}
                  className="
              relative z-10
              transition-transform duration-300
              group-hover:translate-x-1
            "
                />

              </button>

              {/* Call Button */}
              <Link
                href="tel:+919525706529"
                className="
            group
            px-8 py-4
            rounded-2xl
            border border-white/15
            bg-white/10
            backdrop-blur-2xl
            hover:bg-white/20
            text-white
            font-semibold
            text-base sm:text-lg
            transition-all duration-300
            hover:scale-105
            flex items-center justify-center
            shadow-lg
          "
              >

                Call Now

              </Link>

            </div>

            {/* ================= STATS ================= */}
            <div className="
        grid grid-cols-3
        gap-4 sm:gap-6
        mt-14
      ">

              {[
                {
                  num: "35+",
                  text: "Experience",
                },
                {
                  num: "100+",
                  text: "Products",
                },
                {
                  num: "10K+",
                  text: "Projects",
                },
              ].map((item, i) => (

                <div
                  key={i}
                  className="
              group
              p-4 sm:p-5
              rounded-2xl
              bg-white/[0.08]
              backdrop-blur-2xl
              border border-white/10
              hover:border-cyan-400/30
              transition-all duration-300
            "
                >

                  <h2 className="
              text-3xl sm:text-4xl
              font-extrabold
              text-white
            ">
                    {item.num}
                  </h2>

                  <p className="
              text-sm sm:text-base
              text-gray-200
              mt-2
            ">
                    {item.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="
      hidden lg:flex
      justify-center
    ">

            <div className="relative">

              {/* Glow */}
              <div className="
          absolute inset-0
          bg-cyan-400/20
          blur-3xl
          rounded-full
        "></div>

              {/* Floating Image */}
              <Image
                src="/hero/tree.png"
                alt="products"
                width={700}
                height={500}
                className="
            relative z-10
            w-full max-w-2xl
            object-contain
            drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            animate-[float_5s_ease-in-out_infinite]
          "
              />

            </div>

          </div>

        </div>

        {/* ================= MANUAL BUTTONS ================= */}
        <button
          onClick={prevSlide}
          className="
      group
      absolute left-3 sm:left-6 lg:left-8
      top-1/2 -translate-y-1/2
      z-20
      w-12 h-12 sm:w-14 sm:h-14
      rounded-full
      bg-white/10
      backdrop-blur-2xl
      border border-white/10
      text-white
      flex items-center justify-center
      hover:bg-cyan-500
      hover:border-cyan-400
      transition-all duration-300
      shadow-xl
    "
        >

          <ChevronLeft
            size={28}
            className="
        transition-transform duration-300
        group-hover:-translate-x-1
      "
          />

        </button>

        <button
          onClick={nextSlide}
          className="
      group
      absolute right-3 sm:right-6 lg:right-8
      top-1/2 -translate-y-1/2
      z-20
      w-12 h-12 sm:w-14 sm:h-14
      rounded-full
      bg-white/10
      backdrop-blur-2xl
      border border-white/10
      text-white
      flex items-center justify-center
      hover:bg-cyan-500
      hover:border-cyan-400
      transition-all duration-300
      shadow-xl
    "
        >

          <ChevronRight
            size={28}
            className="
        transition-transform duration-300
        group-hover:translate-x-1
      "
          />

        </button>

        {/* ================= SLIDER DOTS ================= */}
        <div className="
    absolute bottom-8 sm:bottom-10
    left-1/2 -translate-x-1/2
    z-20
    flex items-center gap-3
  ">

          {slides.map((_, index) => (

            <button
              key={index}
              onClick={() =>
                setCurrent(index)
              }
              className={`
          transition-all duration-300
          rounded-full
          ${index === current
                  ? "w-10 h-3 bg-cyan-400 shadow-lg shadow-cyan-400/50"
                  : "w-3 h-3 bg-white/40 hover:bg-white"
                }
        `}
            />

          ))}

        </div>

      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="
  relative
  overflow-hidden
  py-24
  bg-gradient-to-b
  from-[#031326]
  via-[#062B52]
  to-[#031326]
">

        {/* ================= GLOBAL EFFECTS ================= */}
        <div className="
    absolute inset-0
    opacity-[0.04]
    [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
    [background-size:60px_60px]
  "></div>

        <div className="
    absolute -top-40 -left-40
    w-[500px] h-[500px]
    bg-cyan-400/10
    blur-[120px]
    rounded-full
  "></div>

        <div className="
    absolute -bottom-40 -right-40
    w-[500px] h-[500px]
    bg-blue-500/10
    blur-[120px]
    rounded-full
  "></div>

        <div className="
    relative z-10
    max-w-7xl mx-auto
    px-4 sm:px-6 lg:px-8
  ">

          {/* ================= COMMON HEADING ================= */}
          <div className="
      text-center
      max-w-3xl
      mx-auto
      mb-20
    ">

            <div className="
        inline-flex items-center
        px-5 py-2
        rounded-full
        bg-cyan-400/10
        border border-cyan-400/20
        backdrop-blur-md
        text-cyan-300
        text-sm font-semibold
        mb-6
      ">
              Premium Printing Solutions
            </div>

            <h2 className="
        text-4xl sm:text-5xl lg:text-6xl
        font-extrabold
        leading-tight
        text-white
      ">

              Our{" "}

              <span className="
          bg-gradient-to-r
          from-cyan-300
          to-blue-400
          bg-clip-text
          text-transparent
        ">
                Services & Products
              </span>

            </h2>

            <p className="
        text-gray-300
        mt-6
        text-base sm:text-lg
        leading-relaxed
      ">
              High-quality printing, branding, and
              professional design solutions crafted
              to elevate your business identity.
            </p>

          </div>

          {/* ================= GRID ================= */}
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
            relative
            overflow-hidden
            rounded-[30px]
            bg-white/[0.06]
            backdrop-blur-2xl
            border border-white/10
            shadow-[0_10px_40px_rgba(0,0,0,0.25)]
            hover:border-cyan-400/40
            hover:shadow-cyan-500/20
            transition-all duration-500
            hover:-translate-y-3
          "
              >

                {/* Glow */}
                <div className="
            absolute inset-0
            bg-gradient-to-br
            from-cyan-400/0
            to-blue-500/0
            group-hover:from-cyan-400/10
            group-hover:to-blue-500/10
            transition-all duration-500
          "></div>

                {/* Image */}
                <div className="relative overflow-hidden">

                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="
                w-full h-60
                object-cover
                transition-transform duration-700
                group-hover:scale-110
              "
                  />

                  <div className="
              absolute inset-0
              bg-gradient-to-t
              from-black/60
              via-transparent
              to-transparent
            "></div>

                </div>

                {/* Content */}
                <div className="
            relative z-10
            p-7
          ">

                  <h3 className="
              text-2xl
              font-bold
              text-white
              mb-4
              group-hover:text-cyan-300
              transition-colors duration-300
            ">
                    {item.title}
                  </h3>

                  <p className="
              text-gray-300
              leading-relaxed
            ">
                    {item.desc}
                  </p>

                  <div className="
              mt-6
              w-12 h-[3px]
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              group-hover:w-20
              transition-all duration-500
            "></div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="
  relative
  overflow-hidden
  py-24
  bg-gradient-to-b
  from-[#031326]
  via-[#062B52]
  to-[#031326]
">

        {/* Divider */}
        <div className="
    absolute top-0 left-1/2
    -translate-x-1/2
    w-[85%] h-px
    bg-gradient-to-r
    from-transparent
    via-cyan-400/30
    to-transparent
  "></div>

        <div className="
    relative z-10
    max-w-7xl mx-auto
    px-4 sm:px-6 lg:px-8
  ">

          {/* Heading */}
          <div className="
      text-center
      max-w-3xl
      mx-auto
      mb-20
    ">

            <div className="
        inline-flex items-center
        px-5 py-2
        rounded-full
        bg-cyan-400/10
        border border-cyan-400/20
        backdrop-blur-md
        text-cyan-300
        text-sm font-semibold
        mb-6
      ">
              Why Businesses Trust Work GeniX
            </div>

            <h2 className="
        text-4xl sm:text-5xl lg:text-6xl
        font-extrabold
        leading-tight
        text-white
      ">

              Why{" "}

              <span className="
          bg-gradient-to-r
          from-cyan-300
          to-blue-400
          bg-clip-text
          text-transparent
        ">
                Choose Us
              </span>

            </h2>

            <p className="
        text-gray-300
        mt-6
        text-base sm:text-lg
        leading-relaxed
      ">
              Delivering premium printing, branding,
              and creative solutions with innovation,
              trust, and unmatched quality.
            </p>

          </div>

          {/* Cards */}
          <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
      gap-8
    ">

            {[
              {
                icon: <Award size={42} />,
                title: "Creative Design",
                desc: "Unique and innovative designs tailored for modern businesses.",
              },
              {
                icon: <Layers3 size={42} />,
                title: "Latest Technology",
                desc: "Advanced printing machines delivering precision and quality.",
              },
              {
                icon: <Users size={42} />,
                title: "Premium Quality",
                desc: "Using durable materials for long-lasting premium results.",
              },
              {
                icon: <Briefcase size={42} />,
                title: "Customer Satisfaction",
                desc: "Building long-term trust through reliable professional service.",
              },
            ].map((item, i) => (

              <div
                key={i}
                className="
            group
            relative
            overflow-hidden
            rounded-[30px]
            bg-white/[0.06]
            backdrop-blur-2xl
            border border-white/10
            p-8
            text-center
            shadow-[0_10px_40px_rgba(0,0,0,0.25)]
            hover:-translate-y-3
            hover:border-cyan-400/40
            hover:shadow-cyan-500/20
            transition-all duration-500
          "
              >

                {/* Icon */}
                <div className="
            relative z-10
            w-24 h-24
            rounded-[28px]
            bg-gradient-to-br
            from-cyan-400/20
            to-blue-500/20
            border border-white/10
            text-cyan-300
            flex items-center justify-center
            mx-auto mb-7
            group-hover:scale-110
            group-hover:text-white
            transition-all duration-500
          ">

                  {item.icon}

                </div>

                <h3 className="
            text-2xl
            font-bold
            mb-4
            text-white
            group-hover:text-cyan-300
            transition-colors duration-300
          ">
                  {item.title}
                </h3>

                <p className="
            text-gray-300
            leading-relaxed
          ">
                  {item.desc}
                </p>

                <div className="
            mt-6 mx-auto
            w-12 h-[3px]
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
            group-hover:w-20
            transition-all duration-500
          "></div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= LOCATION ================= */}
      <section className="
  relative
  overflow-hidden
  py-24
  bg-gradient-to-b
  from-[#031326]
  via-[#062B52]
  to-[#031326]
">

        {/* Divider */}
        <div className="
    absolute top-0 left-1/2
    -translate-x-1/2
    w-[85%] h-px
    bg-gradient-to-r
    from-transparent
    via-cyan-400/30
    to-transparent
  "></div>

        <div className="
    relative z-10
    max-w-7xl mx-auto
    px-4 sm:px-6 lg:px-8
  ">

          <div className="
      grid lg:grid-cols-2
      gap-16
      items-center
    ">

            {/* LEFT */}
            <div>

              <div className="
          inline-flex items-center
          px-5 py-2
          rounded-full
          bg-cyan-400/10
          border border-cyan-400/20
          backdrop-blur-md
          text-cyan-300
          text-sm font-semibold
          mb-6
        ">
                FIND US
              </div>

              <h2 className="
          text-4xl sm:text-5xl lg:text-6xl
          font-extrabold
          leading-tight
          text-white
        ">

                Visit Our{" "}

                <span className="
            bg-gradient-to-r
            from-cyan-300
            to-blue-400
            bg-clip-text
            text-transparent
          ">
                  Office
                </span>

              </h2>

              <p className="
          text-gray-300
          mt-6
          text-base sm:text-lg
          leading-relaxed
        ">
                Work GeniX provides complete printing,
                designing, and branding solutions with
                advanced technology and premium quality
                finishing for businesses and institutions.
              </p>

              {/* Contact Cards */}
              <div className="
          mt-10
          space-y-5
        ">

                {[
                  {
                    icon: <MapPin size={28} />,
                    title: "Office Address",
                    desc: "Islampur, Shahjangi, Kabirpur Road, Bhagalpur, Bihar - 813113",
                  },
                  {
                    icon: <Phone size={28} />,
                    title: "Phone Number",
                    desc: "+91 9525 706 529",
                  },
                  {
                    icon: <Mail size={28} />,
                    title: "Email Address",
                    desc: "mail@workgenix.in",
                  },
                ].map((item, i) => (

                  <div
                    key={i}
                    className="
                group
                flex items-start gap-5
                p-5
                rounded-[28px]
                bg-white/[0.06]
                backdrop-blur-xl
                border border-white/10
                hover:border-cyan-400/30
                transition-all duration-300
              "
                  >

                    <div className="
                w-14 h-14
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400/20
                to-blue-500/20
                flex items-center justify-center
                text-cyan-300
                shrink-0
                group-hover:scale-110
                group-hover:text-white
                transition-all duration-300
              ">
                      {item.icon}
                    </div>

                    <div>

                      <h3 className="
                  text-white
                  font-bold
                  text-lg
                  mb-1
                ">
                        {item.title}
                      </h3>

                      <p className="
                  text-gray-300
                  leading-7
                ">
                        {item.desc}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* RIGHT MAP */}
            <div className="
        relative
        group
      ">

              <div className="
          absolute inset-0
          bg-cyan-400/20
          blur-3xl
          rounded-[40px]
          opacity-0
          group-hover:opacity-100
          transition duration-500
        "></div>

              <div className="
          relative
          overflow-hidden
          rounded-[40px]
          border border-white/10
          bg-white/[0.06]
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.3)]
        ">

                <Link
                  href="https://maps.app.goo.gl/9AoEaHakFHWNiWyS7"
                >

                  <Image
                    src="/icons/map.jpeg"
                    alt="map"
                    width={700}
                    height={700}
                    className="
                w-full
                h-[350px] sm:h-[450px]
                object-cover
                transition-transform duration-700
                group-hover:scale-105
              "
                  />

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="
  relative
  overflow-hidden
  bg-gradient-to-b
  from-[#031326]
  via-[#062B52]
  to-[#021B33]
  text-white
">

        {/* ================= BACKGROUND EFFECTS ================= */}

        {/* Glow Top Right */}
        <div className="
    absolute -top-32 -right-32
    w-[450px] h-[450px]
    bg-cyan-400/10
    blur-[120px]
    rounded-full
  "></div>

        {/* Glow Bottom Left */}
        <div className="
    absolute -bottom-32 -left-32
    w-[450px] h-[450px]
    bg-blue-500/10
    blur-[120px]
    rounded-full
  "></div>

        {/* Grid Overlay */}
        <div className="
    absolute inset-0
    opacity-[0.04]
    [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
    [background-size:60px_60px]
  "></div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="
    relative z-10
    max-w-7xl mx-auto
    px-4 sm:px-6 lg:px-8
    py-20
  ">

          <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
      gap-12 xl:gap-10
    ">

            {/* ================= BRAND ================= */}
            <div>

              {/* Logo */}
              <div className="
          flex items-center gap-4
          mb-7
        ">

                <div className="
            relative
            w-16 h-16 sm:w-20 sm:h-20
            rounded-2xl
            bg-white/10
            backdrop-blur-xl
            border border-white/10
            flex items-center justify-center
            shadow-lg
          ">

                  <Image
                    src="/genix-logo.png"
                    alt="Work GeniX Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />

                </div>

                <div>

                  <h2 className="
              text-2xl sm:text-3xl
              font-extrabold
              tracking-wide
            ">
                    Work{" "}

                    <span className="
                bg-gradient-to-r
                from-cyan-300
                to-blue-400
                bg-clip-text
                text-transparent
              ">
                      GeniX
                    </span>

                  </h2>

                  <p className="
              text-gray-300
              text-sm
              mt-1
            ">
                    Printing | Designing | Branding
                  </p>

                </div>

              </div>

              {/* Description */}
              <p className="
          text-gray-300
          leading-8
          text-sm sm:text-base
        ">
                Delivering excellence in printing,
                designing, branding, and creative
                solutions using modern technology
                and premium quality materials.
              </p>

            </div>

            {/* ================= QUICK LINKS ================= */}
            <div>

              <h3 className="
          text-2xl
          font-bold
          mb-7
        ">
                Quick Links
              </h3>

              <ul className="
          space-y-4
          text-gray-300
        ">

                {[
                  "Home",
                  "About",
                  "Products",
                  "Gallery",
                  "Contact",
                ].map((item, i) => (

                  <li key={i}>

                    <Link
                      href="/"
                      className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  hover:text-cyan-300
                  transition-all duration-300
                "
                    >

                      <span className="
                  w-2 h-2
                  rounded-full
                  bg-cyan-400
                  scale-0
                  group-hover:scale-100
                  transition-all duration-300
                "></span>

                      {item}

                    </Link>

                  </li>

                ))}

              </ul>

            </div>

            {/* ================= CONTACT ================= */}
            <div>

              <h3 className="
          text-2xl
          font-bold
          mb-7
        ">
                Contact Us
              </h3>

              <div className="space-y-5">

                {/* Phone */}
                <div className="
            flex items-start gap-4
            p-4
            rounded-2xl
            bg-white/[0.06]
            backdrop-blur-xl
            border border-white/10
            hover:border-cyan-400/30
            transition-all duration-300
          ">

                  <div className="
              w-12 h-12
              rounded-xl
              bg-gradient-to-br
              from-cyan-400/20
              to-blue-500/20
              flex items-center justify-center
              text-cyan-300
              shrink-0
            ">

                    <Phone size={22} />

                  </div>

                  <div className="text-gray-300 leading-7">

                    +91 9470 266 299
                    <br />
                    +91 887 333 4440

                  </div>

                </div>

                {/* Email */}
                <div className="
            flex items-start gap-4
            p-4
            rounded-2xl
            bg-white/[0.06]
            backdrop-blur-xl
            border border-white/10
            hover:border-cyan-400/30
            transition-all duration-300
          ">

                  <div className="
              w-12 h-12
              rounded-xl
              bg-gradient-to-br
              from-cyan-400/20
              to-blue-500/20
              flex items-center justify-center
              text-cyan-300
              shrink-0
            ">

                    <Mail size={22} />

                  </div>

                  <div className="text-gray-300 leading-7">
                    mail@workgenix.in
                  </div>

                </div>

                {/* Timing */}
                <div className="
            flex items-start gap-4
            p-4
            rounded-2xl
            bg-white/[0.06]
            backdrop-blur-xl
            border border-white/10
            hover:border-cyan-400/30
            transition-all duration-300
          ">

                  <div className="
              w-12 h-12
              rounded-xl
              bg-gradient-to-br
              from-cyan-400/20
              to-blue-500/20
              flex items-center justify-center
              text-cyan-300
              shrink-0
            ">

                    <Clock size={22} />

                  </div>

                  <div className="text-gray-300 leading-7">

                    Mon - Sat
                    <br />
                    10:00 AM - 6:00 PM

                  </div>

                </div>

              </div>

            </div>

            {/* ================= LOCATION ================= */}
            <div>

              <h3
                className="
      text-2xl
      font-bold
      mb-7
      text-white
    "
              >
                Location
              </h3>

              <Link
                href="https://maps.app.goo.gl/9AoEaHakFHWNiWyS7"
                className="
      group
      flex items-center justify-center
      w-[180px]
      h-[180px]
      rounded-[28px]
      border border-white/10
      bg-white/[0.04]
      backdrop-blur-xl
      hover:border-cyan-400/30
      transition-all duration-500
      hover:scale-105
    "
              >

                {/* SVG ICON */}
                <Image
                  src="/icons/map.svg"
                  alt="map"
                  width={110}
                  height={110}
                  className="
        object-contain
        transition-transform duration-500
        group-hover:scale-110
      "
                />

              </Link>

            </div>

          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="
    relative z-10
    border-t border-white/10
    bg-black/20
    backdrop-blur-xl
  ">

          <div className="
      max-w-7xl mx-auto
      px-4 sm:px-6 lg:px-8
      py-5
      flex flex-col md:flex-row
      items-center justify-between
      gap-4
      text-sm
      text-gray-400
    ">

            <p className="text-center md:text-left">
              © 2026 Work GeniX. All Rights Reserved.
            </p>

            <div className="
        flex items-center
        gap-5
      ">

              <Link
                href="/privacy-policy"
                className="
            hover:text-cyan-300
            transition
          "
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="
            hover:text-cyan-300
            transition
          "
              >
                Terms
              </Link>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
} 