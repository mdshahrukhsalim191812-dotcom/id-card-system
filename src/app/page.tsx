"use client";

import Image from "next/image";
import HomeNavbar from "@/components/HomeNavbar";
import Link from "next/link";
import { motion } from "framer-motion";
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
        "High quality printing, branding and packaging solutions for businesses, schools with premium finishing.",
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
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const products = [
    {
      title: "School ID Cards",
      image: "/homeproducts/id-card.jpg",
      desc: "Premium PVC school ID cards.",
    },
    {
      title: "Acrylic ID Cards",
      image: "/homeproducts/acrylic-id-card.jpg",
      desc: "Modern acrylic ID card designs.",
    },
    {
      title: "School Belts",
      image: "/homeproducts/belt.jpg",
      desc: "Custom school uniform belts.",
    },
    {
      title: "School Ties",
      image: "/homeproducts/tie.jpg",
      desc: "Stylish ties for school uniforms.",
    },
    {
      title: "School Copies",
      image: "/homeproducts/copy.jpg",
      desc: "Printed notebooks and copies.",
    },
    {
      title: "Report Cards",
      image: "/homeproducts/report-card.jpg",
      desc: "Professional report cards.",
    },
    {
      title: "Custom Diaries",
      image: "/homeproducts/diary.jpg",
      desc: "Branded diaries for schools.",
    },
    {
      title: "Printed T-Shirts",
      image: "/homeproducts/tshirt.jpg",
      desc: "Custom printed school t-shirts.",
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
              className="object-cover"
            />
          </div>
        ))}

        {/* ================= LIGHT OVERLAY ================= */}
        <div className="
    absolute inset-0
    bg-gradient-to-r
    from-[#021B33]/80
    via-[#021B33]/60
    to-black/40
  "></div>

        {/* ================= GLOW EFFECTS ================= */}
        <div className="
    absolute -top-40 -right-40
    w-[250px] h-[250px]
    sm:w-[350px] sm:h-[350px]
    md:w-[450px] md:h-[450px]
    lg:w-[500px] lg:h-[500px]
    bg-cyan-400/20
    blur-[80px] sm:blur-[100px] lg:blur-[120px]
    rounded-full
  "></div>

        <div className="
    absolute -bottom-40 -left-40
    w-[250px] h-[250px]
    sm:w-[350px] sm:h-[350px]
    md:w-[450px] md:h-[450px]
    lg:w-[500px] lg:h-[500px]
    bg-blue-500/20
    blur-[80px] sm:blur-[100px] lg:blur-[120px]
    rounded-full
  "></div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="
    relative z-10
    max-w-7xl mx-auto
    px-4 sm:px-6 lg:px-8
    pt-20 sm:pt-24 md:pt-28 lg:pt-32
    pb-16 sm:pb-20 md:pb-24
    grid lg:grid-cols-2
    gap-8 md:gap-10 lg:gap-12 xl:gap-16
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
        px-4 py-1.5 sm:px-5 sm:py-2
        rounded-full
        bg-white/10
        backdrop-blur-2xl
        border border-white/10
        text-[11px] sm:text-sm
        font-medium
        shadow-xl
      ">
              <CheckCircle2
                size={12}
                className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-cyan-300"
              />
              Premium Printing Solutions
            </div>

            {/* Heading */}
            <h1 className="
        mt-5 sm:mt-6 md:mt-7
        text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
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
        mt-4 sm:mt-5 md:mt-6 lg:mt-7
        text-sm sm:text-base md:text-lg
        text-gray-200
        max-w-2xl
        mx-auto lg:mx-0
        leading-relaxed
      ">
              {slides[current].desc}
            </p>

            {/* ================= BUTTONS ================= */}
            <div className="
        mt-7 sm:mt-8 md:mt-9 lg:mt-10
        flex flex-col sm:flex-row
        gap-3 sm:gap-4
        justify-center lg:justify-start
      ">
              {/* Explore Button */}
              <button className="
          group
          relative
          overflow-hidden
          px-6 sm:px-7 md:px-8
          py-3 sm:py-3.5 md:py-4
          rounded-xl sm:rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          text-white
          font-semibold
          text-sm sm:text-base md:text-lg
          shadow-[0_10px_40px_rgba(6,182,212,0.35)]
          transition-all duration-300
          hover:scale-105
          hover:shadow-cyan-500/40
          flex items-center justify-center
          gap-2 sm:gap-3
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
                  size={16}
                  className="sm:w-4 sm:h-4 md:w-5 md:h-5
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
            px-6 sm:px-7 md:px-8
            py-3 sm:py-3.5 md:py-4
            rounded-xl sm:rounded-2xl
            border border-white/15
            bg-white/10
            backdrop-blur-2xl
            hover:bg-white/20
            text-white
            font-semibold
            text-sm sm:text-base md:text-lg
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
        gap-3 sm:gap-4 md:gap-5 lg:gap-6
        mt-8 sm:mt-10 md:mt-12 lg:mt-14
      ">
              {[
                { num: "5+", text: "Experience" },
                { num: "54+", text: "Products" },
                { num: "5K+", text: "Projects" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="
              group
              p-3 sm:p-4 md:p-5
              rounded-xl sm:rounded-2xl
              bg-white/[0.08]
              backdrop-blur-2xl
              border border-white/10
              hover:border-cyan-400/30
              transition-all duration-300
            "
                >
                  <h2 className="
              text-2xl sm:text-3xl md:text-4xl
              font-extrabold
              text-white
            ">
                    {item.num}
                  </h2>
                  <p className="
              text-xs sm:text-sm md:text-base
              text-gray-200
              mt-1 sm:mt-2
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
      items-center
    ">
            <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg">
              {/* Glow */}
              <div className="
          absolute inset-0
          bg-cyan-400/15
          blur-2xl sm:blur-3xl
          rounded-full
          scale-110
        "></div>

              {/* Floating Image - Properly sized without zooming */}
              <div className="relative z-10 flex items-center justify-center">
                <Image
                  src="/hero/tree.png"
                  alt="products"
                  width={450}
                  height={400}
                  priority
                  className="
              w-auto
              h-auto
              max-w-[320px]
              lg:max-w-[380px]
              xl:max-w-[420px]
              object-contain
              drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]
              animate-[float_5s_ease-in-out_infinite]
            "
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= MANUAL BUTTONS ================= */}
        <button
          onClick={prevSlide}
          className="
      group
      absolute left-2 sm:left-4 md:left-6 lg:left-8
      top-1/2 -translate-y-1/2
      z-20
      w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14
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
            size={18}
            className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7
        transition-transform duration-300
        group-hover:-translate-x-1
      "
          />
        </button>

        <button
          onClick={nextSlide}
          className="
      group
      absolute right-2 sm:right-4 md:right-6 lg:right-8
      top-1/2 -translate-y-1/2
      z-20
      w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14
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
            size={18}
            className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7
        transition-transform duration-300
        group-hover:translate-x-1
      "
          />
        </button>

        {/* ================= SLIDER DOTS ================= */}
        <div className="
    absolute bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10
    left-1/2 -translate-x-1/2
    z-20
    flex items-center gap-2 sm:gap-2.5 md:gap-3
  ">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`
          transition-all duration-300
          rounded-full
          ${index === current
                  ? "w-6 sm:w-7 md:w-8 lg:w-10 h-1.5 sm:h-2 md:h-2.5 lg:h-3 bg-cyan-400 shadow-lg shadow-cyan-400/50"
                  : "w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 bg-white/40 hover:bg-white"
                }
        `}
            />
          ))}
        </div>

        {/* Add floating animation keyframes */}
        <style jsx>{`
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-15px);
      }
    }
    .animate-\[float_5s_ease-in-out_infinite\] {
      animation: float 5s ease-in-out infinite;
    }
  `}</style>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section
        className="
    relative
    overflow-hidden
    py-16 sm:py-20 md:py-24 lg:py-28
    bg-gradient-to-b
    from-[#031326]
    via-[#062B52]
    to-[#031326]
  "
      >
        {/* ================= GLOBAL EFFECTS ================= */}
        <div
          className="
      absolute inset-0
      opacity-[0.04]
      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
      [background-size:40px_40px]
      sm:[background-size:50px_50px]
      lg:[background-size:60px_60px]
      pointer-events-none
    "
        ></div>

        {/* Glow Effects - Responsive sizing */}
        <div
          className="
      absolute -top-40 -left-40
      w-[250px] h-[250px] 
      sm:w-[350px] sm:h-[350px] 
      md:w-[450px] md:h-[450px] 
      lg:w-[500px] lg:h-[500px]
      bg-cyan-400/10
      blur-[80px] sm:blur-[100px] lg:blur-[120px]
      rounded-full
    "
        ></div>

        <div
          className="
      absolute -bottom-40 -right-40
      w-[250px] h-[250px] 
      sm:w-[350px] sm:h-[350px] 
      md:w-[450px] md:h-[450px] 
      lg:w-[500px] lg:h-[500px]
      bg-blue-500/10
      blur-[80px] sm:blur-[100px] lg:blur-[120px]
      rounded-full
    "
        ></div>

        <div
          className="
      relative z-10
      max-w-7xl mx-auto
      px-4 sm:px-6 lg:px-8
    "
        >
          {/* ================= HEADING ================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{ once: true }}
            className="
        text-center
        max-w-3xl
        mx-auto
        mb-12 sm:mb-16 md:mb-20
      "
          >
            <div
              className="
          inline-flex items-center
          px-4 py-1.5 sm:px-5 sm:py-2
          rounded-full
          bg-cyan-400/10
          border border-cyan-400/20
          backdrop-blur-md
          text-cyan-300
          text-[11px] sm:text-sm
          font-semibold
          mb-4 sm:mb-5 md:mb-6
        "
            >
              Premium Printing Solutions
            </div>

            <h2
              className="
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          font-extrabold
          leading-tight
          text-white
        "
            >
              Our{" "}
              <span
                className="
            bg-gradient-to-r
            from-cyan-300
            to-blue-400
            bg-clip-text
            text-transparent
          "
              >
                Services & Products
              </span>
            </h2>

            <p
              className="
          text-gray-300
          mt-4 sm:mt-5 md:mt-6
          text-sm sm:text-base md:text-lg
          leading-relaxed
          px-4 sm:px-0
        "
            >
              High-quality printing, branding,
              and professional design solutions
              crafted to elevate your business identity.
            </p>
          </motion.div>

          {/* ================= PRODUCTS GRID ================= */}
          <div
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-5 sm:gap-6 md:gap-7 lg:gap-8
      "
          >
            {products.map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                className="
            group
            relative
            overflow-hidden
            rounded-2xl sm:rounded-2xl md:rounded-3xl
            bg-white/[0.06]
            backdrop-blur-2xl
            border border-white/10
            shadow-[0_10px_40px_rgba(0,0,0,0.25)]
            hover:border-cyan-400/40
            hover:shadow-cyan-500/20
            transition-all duration-500
            cursor-pointer
          "
              >
                {/* Glow Effect */}
                <div
                  className="
              absolute inset-0
              bg-gradient-to-br
              from-cyan-400/0
              to-blue-500/0
              group-hover:from-cyan-400/10
              group-hover:to-blue-500/10
              transition-all duration-500
              pointer-events-none
            "
                ></div>

                {/* Shine Effect on Hover */}
                <div
                  className="
              absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/8
              to-transparent
              group-hover:translate-x-full
              transition-all duration-1000
              ease-in-out
              pointer-events-none
            "
                ></div>

                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="
                w-full
                h-48 sm:h-52 md:h-56 lg:h-60
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-110
              "
                  />
                  <div
                    className="
                absolute inset-0
                bg-gradient-to-t
                from-black/70
                via-black/20
                to-transparent
                opacity-60
                group-hover:opacity-80
                transition-opacity
                duration-500
              "
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-6 md:p-7">
                  <h3
                    className="
                text-lg sm:text-xl md:text-2xl
                font-bold
                text-white
                mb-2 sm:mb-3 md:mb-4
                group-hover:text-cyan-300
                transition-colors duration-300
                line-clamp-1
              "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                text-gray-300
                text-sm sm:text-base
                leading-relaxed
                line-clamp-2
              "
                  >
                    {item.desc}
                  </p>

                  {/* Animated Bottom Line */}
                  <div
                    className="
                mt-4 sm:mt-5 md:mt-6
                w-10 sm:w-12
                h-[2px] sm:h-[3px]
                rounded-full
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                group-hover:w-16 sm:group-hover:w-20
                transition-all duration-500
              "
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OWNER SECTION ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="
    relative
    overflow-hidden
    py-16 sm:py-20 md:py-24
    bg-gradient-to-b
    from-[#031326]
    via-[#062B52]
    to-[#031326]
  "
      >
        {/* ================= GRID BACKGROUND ================= */}
        <div
          className="
      absolute inset-0
      opacity-[0.04]
      [background-image:linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]
      [background-size:40px_40px]
      sm:[background-size:50px_50px]
      lg:[background-size:60px_60px]
      pointer-events-none
    "
        ></div>

        {/* ================= TOP DIVIDER ================= */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "85%" }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="
      absolute top-0 left-1/2
      -translate-x-1/2
      h-px
      bg-gradient-to-r
      from-transparent
      via-cyan-400/30
      to-transparent
    "
        ></motion.div>

        {/* ================= GLOW EFFECTS ================= */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
      absolute
      -top-40
      -left-40
      w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px]
      h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]
      bg-cyan-400/10
      blur-[100px] sm:blur-[120px]
      rounded-full
    "
        ></motion.div>

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
      absolute
      -bottom-40
      -right-40
      w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px]
      h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]
      bg-blue-500/10
      blur-[100px] sm:blur-[120px]
      rounded-full
    "
        ></motion.div>

        {/* ================= MAIN CONTAINER ================= */}
        <div
          className="
      relative z-10
      max-w-7xl
      mx-auto
      px-4 sm:px-6 lg:px-8
    "
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 backdrop-blur-md text-cyan-300 text-xs sm:text-sm font-semibold mb-4">
              <Users size={14} className="sm:w-4 sm:h-4" />
              Leadership
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                Founder
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-3 sm:mt-4 max-w-2xl mx-auto">
              Visionary leadership driving excellence in printing and branding solutions
            </p>
          </motion.div>

          <div
            className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8 md:gap-10 lg:gap-12 xl:gap-16
        items-center
      "
          >
            {/* ================= IMAGE SIDE ================= */}
            <motion.div
              initial={{
                opacity: 0,
                x: -100,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              className="
          relative
          group
          flex
          justify-center
          order-1 lg:order-1
        "
            >
              {/* OUTER GLOW - Animated */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
            absolute
            w-[240px] h-[240px] 
            sm:w-[300px] sm:h-[300px] 
            md:w-[350px] md:h-[350px] 
            lg:w-[400px] lg:h-[400px]
            bg-gradient-to-r
            from-cyan-400/20
            via-blue-500/20
            to-cyan-400/20
            blur-[80px] sm:blur-[100px]
            rounded-full
          "
              ></motion.div>

              {/* Decorative Rings */}
              <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[370px] md:h-[370px] lg:w-[420px] lg:h-[420px] rounded-full border border-white/5 pointer-events-none"></div>
              <div className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[390px] md:h-[390px] lg:w-[440px] lg:h-[440px] rounded-full border border-white/5 pointer-events-none"></div>

              {/* ================= CIRCLE IMAGE CARD ================= */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.4 },
                }}
                className="
            relative
            w-[200px] h-[200px]
            sm:w-[260px] sm:h-[260px]
            md:w-[310px] md:h-[310px]
            lg:w-[360px] lg:h-[360px]
            rounded-full
            border-[3px] sm:border-[4px] lg:border-[5px]
            border-white/15
            bg-gradient-to-br
            from-white/[0.08]
            to-white/[0.02]
            backdrop-blur-xl
            shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            overflow-hidden
            flex
            items-center
            justify-center
          "
              >
                {/* SHINE EFFECT - On Hover */}
                <div
                  className="
              absolute
              inset-0
              bg-gradient-to-r
              from-transparent
              via-white/15
              to-transparent
              -translate-x-full
              group-hover:translate-x-full
              transition-all
              duration-1000
              ease-in-out
              z-20
              pointer-events-none
            "
                ></div>

                {/* ROTATING BORDER - Animated */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
              absolute
              inset-0
              rounded-full
              border-[1.5px] sm:border-[2px] lg:border-[2.5px]
              border-dashed
              border-cyan-400/40
              pointer-events-none
            "
                ></motion.div>

                {/* Rotating inner border - opposite direction */}
                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
              absolute
              inset-[8px] sm:inset-[10px] lg:inset-[12px]
              rounded-full
              border-[1px]
              border-blue-400/25
              pointer-events-none
            "
                ></motion.div>

                {/* OWNER IMAGE */}
                <motion.img
                  src="/hero/owner.png"
                  alt="Naved Arfee - CEO & Founder"
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
              relative z-10
              w-full
              h-full
              object-cover
              object-top
              rounded-full
              scale-105
            "
                />
              </motion.div>

              {/* Floating Experience Badge */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="
            absolute
            -bottom-2 sm:bottom-0 md:bottom-4
            -right-2 sm:right-0 md:right-4
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            rounded-full
            px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5
            shadow-lg shadow-cyan-500/30
            z-30
          "
              >
                <p className="text-white font-bold text-xs sm:text-sm md:text-base">
                  8+ Years
                </p>
              </motion.div>
            </motion.div>

            {/* ================= CONTENT SIDE ================= */}
            <motion.div
              initial={{
                opacity: 0,
                x: 100,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              className="
          text-center
          lg:text-left
          order-2 lg:order-2
        "
            >
              {/* SMALL BADGE - CEO TAG */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                className="
            inline-flex items-center
            gap-2
            px-3 py-1 sm:px-4 sm:py-1.5 lg:px-5 lg:py-2
            rounded-full
            bg-gradient-to-r
            from-cyan-400/15
            to-blue-500/15
            border border-cyan-400/25
            backdrop-blur-xl
            text-cyan-300
            text-[11px] sm:text-xs lg:text-sm
            font-bold
            mb-4 sm:mb-5 lg:mb-6
          "
              >
                <Award size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                CEO & Founder
              </motion.div>

              {/* HEADING - NAME */}
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.6,
                }}
                viewport={{ once: true }}
                className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            font-black
            leading-tight
            text-white
            mb-2 sm:mb-3
          "
              >
                <span
                  className="
              bg-gradient-to-r
              from-cyan-300
              via-blue-300
              to-cyan-400
              bg-clip-text
              text-transparent
            "
                >
                  Naved Arfee
                </span>
              </motion.h2>

              {/* DESIGNATION TITLE */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.6,
                }}
                viewport={{ once: true }}
                className="
            text-cyan-300
            text-base sm:text-lg md:text-xl
            font-semibold
            tracking-wide
          "
              >
                Graphic Designer
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                transition={{ delay: 0.38, duration: 0.6 }}
                viewport={{ once: true }}
                className="
            h-[2px] sm:h-[3px]
            bg-gradient-to-r from-cyan-400 to-blue-500
            rounded-full
            mt-3 sm:mt-4
            mx-auto lg:mx-0
          "
              ></motion.div>

              {/* EXPERIENCE BADGE */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.42,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                className="
            mt-4 sm:mt-5
            inline-flex items-center
            gap-2
            px-3 py-1 sm:px-4 sm:py-1.5
            rounded-full
            bg-white/[0.06]
            border border-white/10
            text-gray-300
            text-xs sm:text-sm
          "
              >
                <Award size={12} className="sm:w-3.5 sm:h-3.5 text-cyan-400" />
                <span className="font-medium text-cyan-300">8+ Years</span>
                <span>of Professional Experience</span>
              </motion.div>

              {/* EDUCATION DETAILS */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.48,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                className="
            mt-5 sm:mt-6
            space-y-2.5 sm:space-y-3
          "
              >
                <div className="flex items-start gap-2 sm:gap-3 justify-center lg:justify-start group">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 mt-2 sm:mt-2.5 group-hover:scale-125 transition-transform"></div>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                    <span className="font-semibold text-white">Graduate</span> From{" "}
                    <span className="text-cyan-300 font-medium">
                      Tilka Manjhi Bhagalpur University
                    </span>
                    , Bhagalpur
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 justify-center lg:justify-start group">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 mt-2 sm:mt-2.5 group-hover:scale-125 transition-transform"></div>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                    <span className="font-semibold text-white">Pursuing Post Graduation</span> From{" "}
                    <span className="text-cyan-300 font-medium">
                      Tilka Manjhi University
                    </span>
                  </p>
                </div>
              </motion.div>

              {/* DESCRIPTION */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.54,
                  duration: 0.6,
                }}
                viewport={{ once: true }}
                className="
            mt-5 sm:mt-6 md:mt-7
            text-gray-400
            text-xs sm:text-sm md:text-base
            leading-relaxed sm:leading-relaxed md:leading-relaxed
            max-w-xl
            mx-auto lg:mx-0
          "
              >
                Passionate about premium printing, branding and modern business solutions.
                Dedicated to delivering high-quality creative services with professionalism
                and innovation.
              </motion.p>

              {/* COMPANY NAME BADGE */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                className="
            mt-6 sm:mt-7 md:mt-8
            inline-flex items-center
            gap-2
            px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5
            rounded-full
            bg-gradient-to-r
            from-cyan-500/10
            via-blue-500/10
            to-cyan-500/10
            border border-cyan-400/25
            backdrop-blur-xl
            hover:border-cyan-400/50
            transition-all duration-300
            cursor-default
          "
              >
                <Briefcase size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-cyan-400" />
                <span className="text-gray-300 text-[10px] sm:text-xs lg:text-sm">Founder of</span>
                <span className="text-cyan-300 font-bold text-xs sm:text-sm lg:text-base tracking-wide">
                  Work GeniX
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ================= FEATURES ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="
    relative
    overflow-hidden
    py-16 sm:py-20 md:py-24 lg:py-28
    bg-gradient-to-b
    from-[#031326]
    via-[#062B52]
    to-[#031326]
  "
      >
        {/* ================= GRID BACKGROUND ================= */}
        <div
          className="
      absolute inset-0
      opacity-[0.03]
      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
      [background-size:40px_40px]
      sm:[background-size:50px_50px]
      lg:[background-size:60px_60px]
      pointer-events-none
    "
        ></div>

        {/* ================= TOP DIVIDER ================= */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "85%" }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="
      absolute top-0 left-1/2
      -translate-x-1/2
      h-px
      bg-gradient-to-r
      from-transparent
      via-cyan-400/30
      to-transparent
    "
        ></motion.div>

        {/* ================= GLOW EFFECTS ================= */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
      absolute
      -top-40
      -left-40
      w-[250px] h-[250px]
      sm:w-[350px] sm:h-[350px]
      md:w-[450px] md:h-[450px]
      lg:w-[500px] lg:h-[500px]
      bg-cyan-400/10
      blur-[80px] sm:blur-[100px] lg:blur-[120px]
      rounded-full
    "
        ></motion.div>

        <motion.div
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
      absolute
      -bottom-40
      -right-40
      w-[250px] h-[250px]
      sm:w-[350px] sm:h-[350px]
      md:w-[450px] md:h-[450px]
      lg:w-[500px] lg:h-[500px]
      bg-blue-500/10
      blur-[80px] sm:blur-[100px] lg:blur-[120px]
      rounded-full
    "
        ></motion.div>

        {/* ================= MAIN CONTAINER ================= */}
        <div
          className="
      relative z-10
      max-w-7xl
      mx-auto
      px-4 sm:px-6 lg:px-8
    "
        >
          {/* ================= HEADING ================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
            }}
            viewport={{ once: true }}
            className="
        text-center
        max-w-3xl
        mx-auto
        mb-12 sm:mb-16 md:mb-20
      "
          >
            {/* Badge */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              className="
          inline-flex
          items-center
          px-4 py-1.5 sm:px-5 sm:py-2
          rounded-full
          bg-cyan-400/10
          border border-cyan-400/20
          backdrop-blur-md
          text-cyan-300
          text-[11px] sm:text-sm
          font-semibold
          mb-4 sm:mb-5 md:mb-6
        "
            >
              Why Businesses Trust Work GeniX
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              viewport={{ once: true }}
              className="
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          font-black
          leading-tight
          text-white
        "
            >
              Why{" "}
              <span
                className="
            bg-gradient-to-r
            from-cyan-300
            via-blue-300
            to-cyan-400
            bg-clip-text
            text-transparent
          "
              >
                Choose Us
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
              viewport={{ once: true }}
              className="
          mt-4 sm:mt-5 md:mt-6
          text-gray-300
          text-sm sm:text-base md:text-lg
          leading-relaxed
          px-4 sm:px-0
        "
            >
              Delivering premium printing,
              branding and creative solutions
              with innovation, trust and
              unmatched quality.
            </motion.p>
          </motion.div>

          {/* ================= CARDS GRID ================= */}
          <div
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-5 sm:gap-6 md:gap-7 lg:gap-8
      "
          >
            {[
              {
                icon: <Award size={36} className="sm:w-10 sm:h-10 lg:w-[42px] lg:h-[42px]" />,
                title: "Creative Design",
                desc: "Modern and innovative branding solutions.",
              },
              {
                icon: <Layers3 size={36} className="sm:w-10 sm:h-10 lg:w-[42px] lg:h-[42px]" />,
                title: "Latest Technology",
                desc: "Advanced machines for perfect printing.",
              },
              {
                icon: <Users size={36} className="sm:w-10 sm:h-10 lg:w-[42px] lg:h-[42px]" />,
                title: "Premium Quality",
                desc: "Durable materials with premium finishing.",
              },
              {
                icon: <Briefcase size={36} className="sm:w-10 sm:h-10 lg:w-[42px] lg:h-[42px]" />,
                title: "Customer Support",
                desc: "Reliable service with client satisfaction.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 100,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
                viewport={{ once: true }}
                className="
            group
            relative
            overflow-hidden
            rounded-2xl sm:rounded-2xl md:rounded-3xl
            bg-white/[0.06]
            backdrop-blur-2xl
            border border-white/10
            min-h-[300px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[360px]
            p-5 sm:p-6 md:p-7 lg:p-8
            flex flex-col items-center justify-between
            text-center
            shadow-[0_10px_40px_rgba(0,0,0,0.25)]
            hover:border-cyan-400/40
            hover:shadow-cyan-500/20
            transition-all duration-500
            cursor-pointer
          "
              >
                {/* ================= HOVER GLOW ================= */}
                <div
                  className="
              absolute inset-0
              bg-gradient-to-br
              from-cyan-400/0
              via-cyan-400/0
              to-blue-500/0
              group-hover:from-cyan-400/10
              group-hover:to-blue-500/10
              transition-all duration-700
              pointer-events-none
            "
                ></div>

                {/* ================= SHINE EFFECT ================= */}
                <div
                  className="
              absolute
              inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/8
              to-transparent
              group-hover:translate-x-full
              transition-all duration-1000
              ease-in-out
              pointer-events-none
            "
                ></div>

                {/* ================= ICON ================= */}
                <motion.div
                  whileHover={{
                    rotate: 6,
                    scale: 1.1,
                  }}
                  className="
              relative z-10
              w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24
              rounded-xl sm:rounded-2xl md:rounded-[26px] lg:rounded-[28px]
              bg-gradient-to-br
              from-cyan-400/20
              to-blue-500/20
              border border-white/10
              text-cyan-300
              flex
              items-center
              justify-center
              shadow-lg
              transition-all duration-500
            "
                >
                  {item.icon}
                </motion.div>

                {/* ================= CONTENT ================= */}
                <div className="relative z-10 mt-5 sm:mt-6 md:mt-7 lg:mt-8">
                  <h3
                    className="
                text-xl sm:text-2xl md:text-2xl lg:text-2xl
                font-bold
                text-white
                leading-snug
                group-hover:text-cyan-300
                transition-colors duration-300
              "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                mt-3 sm:mt-4 md:mt-5
                text-gray-300
                leading-6 sm:leading-7 md:leading-8
                text-sm sm:text-base
                max-w-[250px] mx-auto
              "
                  >
                    {item.desc}
                  </p>
                </div>

                {/* ================= BOTTOM LINE ================= */}
                <motion.div
                  whileHover={{
                    width: 80,
                  }}
                  className="
              relative z-10
              mt-5 sm:mt-6 md:mt-7 lg:mt-8
              w-10 sm:w-12 md:w-14
              h-[2px] sm:h-[3px]
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              transition-all duration-500
            "
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= LOCATION ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="
    relative
    overflow-hidden
    py-16 sm:py-20 md:py-24 lg:py-28
    bg-gradient-to-b
    from-[#031326]
    via-[#062B52]
    to-[#031326]
  "
      >
        {/* ================= GRID BACKGROUND ================= */}
        <div
          className="
      absolute inset-0
      opacity-[0.03]
      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
      [background-size:40px_40px]
      sm:[background-size:50px_50px]
      lg:[background-size:60px_60px]
      pointer-events-none
    "
        ></div>

        {/* ================= TOP DIVIDER ================= */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "85%" }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="
      absolute
      top-0
      left-1/2
      -translate-x-1/2
      h-px
      bg-gradient-to-r
      from-transparent
      via-cyan-400/30
      to-transparent
    "
        ></motion.div>

        {/* ================= GLOW EFFECTS ================= */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
      absolute
      -top-40
      -left-40
      w-[250px] h-[250px]
      sm:w-[350px] sm:h-[350px]
      md:w-[450px] md:h-[450px]
      lg:w-[500px] lg:h-[500px]
      bg-cyan-400/10
      blur-[80px] sm:blur-[100px] lg:blur-[120px]
      rounded-full
    "
        ></motion.div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
      absolute
      -bottom-40
      -right-40
      w-[250px] h-[250px]
      sm:w-[350px] sm:h-[350px]
      md:w-[450px] md:h-[450px]
      lg:w-[500px] lg:h-[500px]
      bg-blue-500/10
      blur-[80px] sm:blur-[100px] lg:blur-[120px]
      rounded-full
    "
        ></motion.div>

        {/* ================= MAIN CONTAINER ================= */}
        <div
          className="
      relative z-10
      max-w-7xl
      mx-auto
      px-4 sm:px-6 lg:px-8
    "
        >
          <div
            className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-10 md:gap-12 lg:gap-16 xl:gap-20
        items-center
      "
          >
            {/* ================= LEFT CONTENT ================= */}
            <motion.div
              initial={{
                opacity: 0,
                x: -80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
              }}
              viewport={{ once: true }}
              className="
          text-center
          lg:text-left
          order-2 lg:order-1
        "
            >
              {/* Badge */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                className="
            inline-flex
            items-center
            px-4 py-1.5 sm:px-5 sm:py-2
            rounded-full
            bg-cyan-400/10
            border border-cyan-400/20
            backdrop-blur-xl
            text-cyan-300
            text-[11px] sm:text-sm
            font-semibold
            shadow-lg
            mb-4 sm:mb-5 md:mb-6
          "
              >
                FIND US
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                }}
                viewport={{ once: true }}
                className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            font-black
            leading-tight
            text-white
          "
              >
                Visit Our{" "}
                <span
                  className="
              bg-gradient-to-r
              from-cyan-300
              via-blue-300
              to-cyan-400
              bg-clip-text
              text-transparent
            "
                >
                  Office
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                }}
                viewport={{ once: true }}
                className="
            mt-4 sm:mt-5 md:mt-6
            text-gray-300
            text-sm sm:text-base md:text-lg
            leading-6 sm:leading-7 md:leading-8
            max-w-2xl
            mx-auto lg:mx-0
            px-4 sm:px-0
          "
              >
                Work GeniX provides complete
                printing, designing and branding
                solutions with advanced technology
                and premium quality finishing.
              </motion.p>

              {/* ================= CONTACT CARDS ================= */}
              <div className="mt-8 sm:mt-9 md:mt-10 space-y-4 sm:space-y-5">
                {[
                  {
                    icon: <MapPin size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />,
                    title: "Office Address",
                    desc: "Islampur, Shahjangi, Kabirpur Road, Bhagalpur, Bihar - 813113",
                  },
                  {
                    icon: <Phone size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />,
                    title: "Phone Number",
                    desc: "+91 9525 706 529",
                  },
                  {
                    icon: <Mail size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />,
                    title: "Email Address",
                    desc: "mdhammadnaved92010@gmail.com",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: i * 0.15,
                      duration: 0.6,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -4,
                      scale: 1.01,
                    }}
                    className="
                group
                relative
                overflow-hidden
                flex
                items-start
                gap-3 sm:gap-4 md:gap-5
                p-4 sm:p-5 md:p-6
                rounded-2xl sm:rounded-2xl md:rounded-3xl
                bg-white/[0.06]
                backdrop-blur-2xl
                border border-white/10
                hover:border-cyan-400/30
                hover:bg-white/[0.08]
                transition-all
                duration-500
                cursor-pointer
              "
                  >
                    {/* Hover Glow */}
                    <div
                      className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-cyan-400/0
                  to-blue-500/0
                  group-hover:from-cyan-400/10
                  group-hover:to-blue-500/10
                  transition-all
                  duration-500
                  pointer-events-none
                "
                    ></div>

                    {/* Shine Effect */}
                    <div
                      className="
                  absolute inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/8
                  to-transparent
                  group-hover:translate-x-full
                  transition-all
                  duration-1000
                  ease-in-out
                  pointer-events-none
                "
                    ></div>

                    {/* Icon */}
                    <div
                      className="
                  relative z-10
                  w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                  rounded-xl sm:rounded-2xl
                  bg-gradient-to-br
                  from-cyan-400/20
                  to-blue-500/20
                  border border-white/10
                  flex
                  items-center
                  justify-center
                  text-cyan-300
                  shrink-0
                  group-hover:scale-110
                  group-hover:text-white
                  transition-all
                  duration-300
                "
                    >
                      {item.icon}
                    </div>

                    {/* Text */}
                    <div className="relative z-10 min-w-0 flex-1">
                      <h3
                        className="
                    text-white
                    font-bold
                    text-base sm:text-lg md:text-xl
                    mb-1 sm:mb-2
                  "
                      >
                        {item.title}
                      </h3>
                      <p
                        className="
                    text-gray-300
                    text-xs sm:text-sm md:text-base
                    leading-6 sm:leading-7
                    break-words
                  "
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ================= RIGHT MAP ================= */}
            <motion.div
              initial={{
                opacity: 0,
                x: 80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
              }}
              viewport={{ once: true }}
              className="
          relative
          group
          order-1 lg:order-2
          mx-auto w-full max-w-md lg:max-w-none
        "
            >
              {/* Glow Effect */}
              <div
                className="
            absolute inset-0
            bg-cyan-400/20
            blur-2xl sm:blur-3xl
            rounded-2xl sm:rounded-3xl md:rounded-4xl
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
            pointer-events-none
          "
              ></div>

              {/* Map Card */}
              <motion.div
                whileHover={{
                  y: -6,
                }}
                className="
            relative
            overflow-hidden
            rounded-2xl sm:rounded-3xl md:rounded-4xl
            border border-white/10
            bg-white/[0.06]
            backdrop-blur-2xl
            shadow-[0_10px_40px_rgba(0,0,0,0.3)]
          "
              >
                {/* Shine Effect */}
                <div
                  className="
              absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/8
              to-transparent
              group-hover:translate-x-full
              transition-all
              duration-1000
              ease-in-out
              z-20
              pointer-events-none
            "
                ></div>

                <Link
                  href="https://maps.app.goo.gl/9AoEaHakFHWNiWyS7"
                  target="_blank"
                  className="block cursor-pointer"
                >
                  <Image
                    src="/icons/map.jpeg"
                    alt="Work GeniX Office Location Map"
                    width={900}
                    height={700}
                    className="
                w-full
                h-[220px] sm:h-[320px] md:h-[400px] lg:h-[480px] xl:h-[520px]
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-105
              "
                  />
                </Link>

                {/* Bottom Overlay */}
                <div
                  className="
              absolute
              bottom-0
              left-0
              right-0
              p-4 sm:p-5 md:p-6
              bg-gradient-to-t
              from-[#021B33]
              via-[#021B33]/90
              to-transparent
              z-10
            "
                >
                  <h3
                    className="
                text-white
                text-lg sm:text-xl md:text-2xl
                font-bold
              "
                  >
                    Work GeniX Office
                  </h3>
                  <p
                    className="
                mt-1 sm:mt-2
                text-gray-300
                text-xs sm:text-sm md:text-base
              "
                  >
                    Tap to open location in Google Maps
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ================= FOOTER ================= */}
      <footer
        className="
    relative
    overflow-hidden
    bg-gradient-to-b
    from-[#031326]
    via-[#062B52]
    to-[#021B33]
    text-white
  "
      >
        {/* ================= BACKGROUND EFFECTS ================= */}

        {/* Top Glow */}
        <div
          className="
      absolute
      -top-40
      -right-40
      w-[250px] h-[250px]
      sm:w-[350px] sm:h-[350px]
      md:w-[450px] md:h-[450px]
      bg-cyan-400/10
      blur-[80px] sm:blur-[100px] lg:blur-[120px]
      rounded-full
      pointer-events-none
    "
        ></div>

        {/* Bottom Glow */}
        <div
          className="
      absolute
      -bottom-40
      -left-40
      w-[250px] h-[250px]
      sm:w-[350px] sm:h-[350px]
      md:w-[450px] md:h-[450px]
      bg-blue-500/10
      blur-[80px] sm:blur-[100px] lg:blur-[120px]
      rounded-full
      pointer-events-none
    "
        ></div>

        {/* Grid Overlay */}
        <div
          className="
      absolute inset-0
      opacity-[0.03]
      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
      [background-size:40px_40px]
      sm:[background-size:50px_50px]
      lg:[background-size:60px_60px]
      pointer-events-none
    "
        ></div>

        {/* Top Divider */}
        <div
          className="
      absolute
      top-0
      left-1/2
      -translate-x-1/2
      w-[90%]
      h-px
      bg-gradient-to-r
      from-transparent
      via-cyan-400/30
      to-transparent
    "
        ></div>

        {/* ================= MAIN CONTENT ================= */}
        <div
          className="
      relative z-10
      max-w-7xl
      mx-auto
      px-4 sm:px-6 lg:px-8
      py-12 sm:py-16 md:py-20 lg:py-24
    "
        >
          <div
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-8 md:gap-10 lg:gap-12
      "
          >
            {/* ================= BRAND SECTION ================= */}
            <div className="sm:pr-4 lg:pr-6">
              {/* Logo */}
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-7">
                <div
                  className="
              relative
              w-12 h-12
              sm:w-14 sm:h-14
              md:w-16 md:h-16
              lg:w-20 lg:h-20
              rounded-xl sm:rounded-2xl
              bg-white/[0.08]
              backdrop-blur-2xl
              border border-white/10
              shadow-[0_10px_40px_rgba(0,0,0,0.3)]
              flex items-center justify-center
              overflow-hidden
            "
                >
                  {/* Glow */}
                  <div
                    className="
                absolute inset-0
                bg-gradient-to-br
                from-cyan-400/20
                to-blue-500/20
              "
                  ></div>
                  <Image
                    src="/genix-logo.png"
                    alt="Work GeniX Logo"
                    width={50}
                    height={50}
                    className="
                relative z-10
                object-contain
                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14
              "
                  />
                </div>

                <div>
                  <h2
                    className="
                text-xl sm:text-2xl md:text-3xl
                font-black
                tracking-wide
                leading-tight
              "
                  >
                    Work{" "}
                    <span
                      className="
                  bg-gradient-to-r
                  from-cyan-300
                  via-blue-300
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                "
                    >
                      GeniX
                    </span>
                  </h2>
                  <p
                    className="
                text-gray-400
                text-[10px] sm:text-xs
                mt-1
              "
                  >
                    Printing • Branding • Designing
                  </p>
                </div>
              </div>

              {/* Description */}
              <p
                className="
            text-gray-400
            leading-6 sm:leading-7 md:leading-8
            text-xs sm:text-sm md:text-base
          "
              >
                Delivering premium printing,
                branding and creative solutions
                with modern technology and
                high-quality finishing.
              </p>
            </div>

            {/* ================= QUICK LINKS ================= */}
            <div>
              <h3
                className="
            text-xl sm:text-2xl
            font-bold
            mb-5 sm:mb-6 md:mb-7
            text-white
          "
              >
                Quick Links
              </h3>

              <ul className="space-y-3 sm:space-y-4">
                {[
                  { name: "Home", link: "/" },
                  { name: "Dashboard", link: "/dashboard" },
                  { name: "Products", link: "/products" },
                  { name: "Gallery", link: "/gallery" },
                  { name: "Contact", link: "/contact" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.link}
                      className="
                  group
                  inline-flex
                  items-center
                  gap-2 sm:gap-3
                  text-gray-400
                  hover:text-cyan-300
                  transition-all
                  duration-300
                  text-sm sm:text-base
                "
                    >
                      <span
                        className="
                    w-1.5 h-1.5 sm:w-2 sm:h-2
                    rounded-full
                    bg-cyan-400
                    scale-0
                    group-hover:scale-100
                    transition-all
                    duration-300
                  "
                      ></span>
                      <span
                        className="
                    group-hover:translate-x-1
                    transition-transform
                    duration-300
                  "
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= CONTACT INFO ================= */}
            <div>
              <h3
                className="
            text-xl sm:text-2xl
            font-bold
            mb-5 sm:mb-6 md:mb-7
            text-white
          "
              >
                Contact Us
              </h3>

              <div className="space-y-4 sm:space-y-5">
                {[
                  {
                    icon: <Phone size={18} className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" />,
                    title: "Alternative Phone",
                    desc: "+91 9525706529 +91 8521060741 +91 9709675175",
                  },
                  {
                    icon: <Clock size={18} className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" />,
                    title: "Working Hours",
                    desc: "Mon - Sat | 10:00 AM - 6:00 PM",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
                group
                relative
                overflow-hidden
                flex
                items-start
                gap-3 sm:gap-4
                p-3 sm:p-4 md:p-5
                rounded-xl sm:rounded-2xl
                bg-white/[0.06]
                backdrop-blur-xl
                border border-white/10
                hover:border-cyan-400/30
                hover:bg-white/[0.08]
                transition-all
                duration-500
              "
                  >
                    {/* Hover Glow */}
                    <div
                      className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-cyan-400/0
                  to-blue-500/0
                  group-hover:from-cyan-400/10
                  group-hover:to-blue-500/10
                  transition-all
                  duration-500
                  pointer-events-none
                "
                    ></div>

                    {/* Icon */}
                    <div
                      className="
                  relative z-10
                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                  rounded-lg sm:rounded-xl
                  bg-gradient-to-br
                  from-cyan-400/20
                  to-blue-500/20
                  border border-white/10
                  flex
                  items-center
                  justify-center
                  text-cyan-300
                  shrink-0
                  group-hover:scale-110
                  group-hover:text-white
                  transition-all
                  duration-300
                "
                    >
                      {item.icon}
                    </div>

                    {/* Text */}
                    <div className="relative z-10">
                      <h4
                        className="
                    text-white
                    font-semibold
                    text-sm sm:text-base
                    mb-0.5 sm:mb-1
                  "
                      >
                        {item.title}
                      </h4>
                      <p
                        className="
                    text-gray-400
                    text-xs sm:text-sm
                    leading-6 sm:leading-7
                    break-words
                  "
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= LOCATION ================= */}
            <div>
              <h3
                className="
            text-xl sm:text-2xl
            font-bold
            mb-5 sm:mb-6 md:mb-7
            text-white
          "
              >
                Our Location
              </h3>

              <Link
                href="https://maps.app.goo.gl/9AoEaHakFHWNiWyS7"
                target="_blank"
                className="
            group
            relative
            overflow-hidden
            flex
            items-center
            justify-center
            w-full
            h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px]
            rounded-2xl sm:rounded-3xl
            border border-white/10
            bg-white/[0.05]
            backdrop-blur-2xl
            hover:border-cyan-400/30
            transition-all
            duration-500
            hover:scale-[1.02]
            shadow-[0_10px_40px_rgba(0,0,0,0.3)]
          "
              >
                {/* Glow */}
                <div
                  className="
              absolute inset-0
              bg-gradient-to-br
              from-cyan-400/10
              to-blue-500/10
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-500
              pointer-events-none
            "
                ></div>

                {/* Shine */}
                <div
                  className="
              absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/8
              to-transparent
              group-hover:translate-x-full
              transition-all
              duration-1000
              ease-in-out
              pointer-events-none
            "
                ></div>

                <div
                  className="
              relative z-10
              flex
              flex-col
              items-center
              justify-center
              text-center
              p-4
            "
                >
                  <Image
                    src="/icons/map.svg"
                    alt="Map Location"
                    width={60}
                    height={60}
                    className="
                object-contain
                transition-transform
                duration-500
                group-hover:scale-110
                w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[70px] lg:h-[70px]
              "
                  />
                  <p
                    className="
                mt-3 sm:mt-4 md:mt-5
                text-gray-400
                text-xs sm:text-sm
              "
                  >
                    Open In Google Maps
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div
          className="
      relative z-10
      border-t
      border-white/10
      bg-black/20
      backdrop-blur-xl
    "
        >
          <div
            className="
        max-w-7xl
        mx-auto
        px-4 sm:px-6 lg:px-8
        py-4 sm:py-5
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-3 sm:gap-4
      "
          >
            <p
              className="
          text-gray-500
          text-[11px] sm:text-xs md:text-sm
          text-center
          md:text-left
        "
            >
              © 2026 Work GeniX. All Rights Reserved.
            </p>

            <div
              className="
          flex
          items-center
          gap-4 sm:gap-5 md:gap-6
          text-[11px] sm:text-xs md:text-sm
        "
            >
              <Link
                href="/privacy-policy"
                className="
            text-gray-500
            hover:text-cyan-300
            transition-colors
            duration-300
          "
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="
            text-gray-500
            hover:text-cyan-300
            transition-colors
            duration-300
          "
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
} 