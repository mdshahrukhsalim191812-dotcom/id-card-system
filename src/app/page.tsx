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
      <section
        className="
    relative
    overflow-hidden
    py-24
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
      [background-size:60px_60px]
    "
        ></div>

        <div
          className="
      absolute -top-40 -left-40
      w-[500px] h-[500px]
      bg-cyan-400/10
      blur-[120px]
      rounded-full
    "
        ></div>

        <div
          className="
      absolute -bottom-40 -right-40
      w-[500px] h-[500px]
      bg-blue-500/10
      blur-[120px]
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
        mb-20
      "
          >

            <div
              className="
          inline-flex items-center
          px-5 py-2
          rounded-full
          bg-cyan-400/10
          border border-cyan-400/20
          backdrop-blur-md
          text-cyan-300
          text-sm font-semibold
          mb-6
        "
            >
              Premium Printing Solutions
            </div>

            <h2
              className="
          text-4xl sm:text-5xl lg:text-6xl
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
          mt-6
          text-base sm:text-lg
          leading-relaxed
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
        xl:grid-cols-4
        gap-8
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
            rounded-[30px]

            bg-white/[0.06]
            backdrop-blur-2xl

            border border-white/10

            shadow-[0_10px_40px_rgba(0,0,0,0.25)]

            hover:border-cyan-400/40
            hover:shadow-cyan-500/20

            transition-all duration-500
          "
              >

                {/* Glow */}
                <div
                  className="
              absolute inset-0

              bg-gradient-to-br
              from-cyan-400/0
              to-blue-500/0

              group-hover:from-cyan-400/10
              group-hover:to-blue-500/10

              transition-all duration-500
            "
                ></div>

                {/* Image */}
                <div
                  className="
              relative
              overflow-hidden
            "
                >

                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="
                w-full
                h-60

                object-cover

                transition-transform
                duration-700

                group-hover:scale-110
              "
                  />

                  <div
                    className="
                absolute inset-0

                bg-gradient-to-t
                from-black/60
                via-transparent
                to-transparent
              "
                  ></div>

                </div>

                {/* CONTENT */}
                <div
                  className="
              relative z-10
              p-7
            "
                >

                  <h3
                    className="
                text-2xl
                font-bold
                text-white

                mb-4

                group-hover:text-cyan-300

                transition-colors duration-300
              "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                text-gray-300
                leading-relaxed
              "
                  >
                    {item.desc}
                  </p>

                  <div
                    className="
                mt-6
                w-12 h-[3px]

                rounded-full

                bg-gradient-to-r
                from-cyan-400
                to-blue-500

                group-hover:w-20

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
    py-24
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
      [background-size:60px_60px]
    "
        ></div>

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

      w-[500px]
      h-[500px]

      bg-cyan-400/10

      blur-[120px]

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

      w-[500px]
      h-[500px]

      bg-blue-500/10

      blur-[120px]

      rounded-full
    "
        ></motion.div>

        {/* ================= MAIN CONTAINER ================= */}
        <div
          className="
      relative z-10

      max-w-7xl
      mx-auto

      px-6
      lg:px-10
    "
        >

          <div
            className="
        grid
        grid-cols-1
        lg:grid-cols-2

        gap-16
        items-center
      "
          >

            {/* ================= IMAGE SIDE ================= */}
            <motion.div
              initial={{
                opacity: 0,
                x: -120,
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

          flex
          justify-center
        "
            >

              {/* OUTER GLOW */}
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

            w-[420px]
            h-[420px]

            bg-cyan-400/20

            blur-[100px]

            rounded-full
          "
              ></motion.div>

              {/* ================= CIRCLE IMAGE CARD ================= */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="
            relative

            w-[320px]
            h-[320px]

            sm:w-[380px]
            sm:h-[380px]

            rounded-full

            border-[6px]
            border-white/10

            bg-white/[0.06]
            backdrop-blur-2xl

            shadow-[0_20px_80px_rgba(0,0,0,0.4)]

            overflow-hidden

            flex
            items-center
            justify-center
          "
              >

                {/* SHINE EFFECT */}
                <div
                  className="
              absolute
              inset-0

              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent

              -translate-x-full

              group-hover:translate-x-full

              transition-all
              duration-1500

              z-20
            "
                ></div>

                {/* ROTATING BORDER */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
              absolute
              inset-0

              rounded-full

              border-[3px]
              border-cyan-400/30
            "
                ></motion.div>

                {/* OWNER IMAGE */}
                <motion.img
                  src="/hero/owner.png"
                  alt="Owner"

                  animate={{
                    y: [0, -8, 0],
                  }}

                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}

                  className="
              relative z-10

              w-full
              h-full

              object-cover

              rounded-full
            "
                />

              </motion.div>

            </motion.div>

            {/* ================= CONTENT SIDE ================= */}
            <motion.div
              initial={{
                opacity: 0,
                x: 120,
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
          text-center
          lg:text-left
        "
            >

              {/* SMALL BADGE */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.7,
                }}
                viewport={{ once: true }}
                className="
            inline-flex items-center
            gap-2

            px-5 py-2

            rounded-full

            bg-cyan-400/10
            border border-cyan-400/20

            backdrop-blur-xl

            text-cyan-300
            text-sm
            font-semibold

            mb-7
          "
              >

                Founder & Owner

              </motion.div>

              {/* HEADING */}
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
            text-4xl
            sm:text-5xl
            lg:text-6xl

            font-black

            leading-tight

            text-white
          "
              >

                Meet The{" "}
                <br></br>
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

                  Naweed Arfi

                </span>

              </motion.h2>

              {/* DESCRIPTION */}
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
            mt-8

            text-gray-300

            text-base
            sm:text-lg

            leading-8

            max-w-2xl
          "
              >

                Passionate about premium printing,
                branding and modern business solutions.
                Dedicated to delivering high-quality
                creative services with professionalism
                and innovation.

              </motion.p>

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
    py-24

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

      [background-size:60px_60px]
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

      w-[500px]
      h-[500px]

      bg-cyan-400/10

      blur-[120px]

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

      w-[500px]
      h-[500px]

      bg-blue-500/10

      blur-[120px]

      rounded-full
    "
        ></motion.div>

        {/* ================= MAIN CONTAINER ================= */}
        <div
          className="
      relative z-10

      max-w-7xl
      mx-auto

      px-4
      sm:px-6
      lg:px-8
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
        mb-20
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

          px-5 py-2

          rounded-full

          bg-cyan-400/10

          border border-cyan-400/20

          backdrop-blur-md

          text-cyan-300
          text-sm
          font-semibold

          mb-6
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
          text-4xl
          sm:text-5xl
          lg:text-6xl

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
          mt-6

          text-gray-300

          text-base
          sm:text-lg

          leading-relaxed
        "
            >

              Delivering premium printing,
              branding and creative solutions
              with innovation, trust and
              unmatched quality.

            </motion.p>

          </motion.div>

          {/* ================= CARDS ================= */}
          <div
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4

        gap-8
      "
          >

            {[
              {
                icon: <Award size={42} />,
                title: "Creative Design",
                desc: "Modern and innovative branding solutions.",
              },
              {
                icon: <Layers3 size={42} />,
                title: "Latest Technology",
                desc: "Advanced machines for perfect printing.",
              },
              {
                icon: <Users size={42} />,
                title: "Premium Quality",
                desc: "Durable materials with premium finishing.",
              },
              {
                icon: <Briefcase size={42} />,
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
                  y: -16,
                  scale: 1.03,
                }}

                animate={{
                  y: [0, -6, 0],
                }}

                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}

                viewport={{ once: true }}

                className="
            group
            relative

            overflow-hidden

            rounded-[32px]

            bg-white/[0.06]
            backdrop-blur-2xl

            border border-white/10

            min-h-[360px]

            p-8

            flex
            flex-col
            items-center
            justify-between

            text-center

            shadow-[0_10px_40px_rgba(0,0,0,0.25)]

            hover:border-cyan-400/40
            hover:shadow-cyan-500/20

            transition-all
            duration-500
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

              transition-all
              duration-700
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
              via-white/10
              to-transparent

              group-hover:translate-x-full

              transition-all
              duration-1000
            "
                ></div>

                {/* ================= ICON ================= */}
                <motion.div
                  whileHover={{
                    rotate: 6,
                    scale: 1.12,
                  }}
                  className="
              relative z-10

              w-24
              h-24

              rounded-[28px]

              bg-gradient-to-br
              from-cyan-400/20
              to-blue-500/20

              border border-white/10

              text-cyan-300

              flex
              items-center
              justify-center

              shadow-lg

              transition-all
              duration-500
            "
                >

                  {item.icon}

                </motion.div>

                {/* ================= CONTENT ================= */}
                <div className="relative z-10 mt-8">

                  <h3
                    className="
                text-2xl

                font-bold

                text-white

                leading-snug

                group-hover:text-cyan-300

                transition-colors
                duration-300
              "
                  >

                    {item.title}

                  </h3>

                  <p
                    className="
                mt-5

                text-gray-300

                leading-8

                text-[15px]
              "
                  >

                    {item.desc}

                  </p>

                </div>

                {/* ================= BOTTOM LINE ================= */}
                <motion.div
                  whileHover={{
                    width: 100,
                  }}
                  className="
              relative z-10

              mt-8

              w-14
              h-[3px]

              rounded-full

              bg-gradient-to-r
              from-cyan-400
              to-blue-500

              transition-all
              duration-500
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

    py-20
    sm:py-24
    lg:py-28

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

      [background-size:60px_60px]
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

      w-[350px]
      sm:w-[500px]

      h-[350px]
      sm:h-[500px]

      bg-cyan-400/10

      blur-[120px]

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

      w-[350px]
      sm:w-[500px]

      h-[350px]
      sm:h-[500px]

      bg-blue-500/10

      blur-[120px]

      rounded-full
    "
        ></motion.div>

        {/* ================= MAIN CONTAINER ================= */}
        <div
          className="
      relative z-10

      max-w-7xl
      mx-auto

      px-4
      sm:px-6
      lg:px-8
    "
        >

          <div
            className="
        grid
        grid-cols-1
        lg:grid-cols-2

        gap-14
        lg:gap-20

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

            px-5 py-2.5

            rounded-full

            bg-cyan-400/10

            border border-cyan-400/20

            backdrop-blur-xl

            text-cyan-300
            text-sm
            font-semibold

            shadow-lg

            mb-6
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
            text-4xl
            sm:text-5xl
            lg:text-6xl

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
            mt-6

            text-gray-300

            text-base
            sm:text-lg

            leading-8

            max-w-2xl

            mx-auto
            lg:mx-0
          "
              >

                Work GeniX provides complete
                printing, designing and branding
                solutions with advanced technology
                and premium quality finishing.

              </motion.p>

              {/* ================= CONTACT CARDS ================= */}
              <div
                className="
            mt-10

            space-y-5
          "
              >

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
                      delay: i * 0.2,
                      duration: 0.7,
                    }}

                    viewport={{ once: true }}

                    whileHover={{
                      y: -6,
                      scale: 1.01,
                    }}

                    className="
                group
                relative

                overflow-hidden

                flex
                items-start

                gap-4
                sm:gap-5

                p-5
                sm:p-6

                rounded-[28px]

                bg-white/[0.06]
                backdrop-blur-2xl

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
                "
                    ></div>

                    {/* Shine */}
                    <div
                      className="
                  absolute inset-0

                  -translate-x-full

                  bg-gradient-to-r
                  from-transparent
                  via-white/10
                  to-transparent

                  group-hover:translate-x-full

                  transition-all
                  duration-1000
                "
                    ></div>

                    {/* Icon */}
                    <div
                      className="
                  relative z-10

                  w-14
                  h-14

                  sm:w-16
                  sm:h-16

                  rounded-2xl

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

                    text-lg
                    sm:text-xl

                    mb-2
                  "
                      >

                        {item.title}

                      </h3>

                      <p
                        className="
                    text-gray-300

                    text-sm
                    sm:text-base

                    leading-7

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
        "
            >

              {/* Glow */}
              <div
                className="
            absolute inset-0

            bg-cyan-400/20

            blur-3xl

            rounded-[40px]

            opacity-0

            group-hover:opacity-100

            transition-all
            duration-500
          "
              ></div>

              {/* Map Card */}
              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="
            relative

            overflow-hidden

            rounded-[32px]
            sm:rounded-[40px]

            border border-white/10

            bg-white/[0.06]
            backdrop-blur-2xl

            shadow-[0_10px_40px_rgba(0,0,0,0.3)]
          "
              >

                {/* Shine */}
                <div
                  className="
              absolute inset-0

              -translate-x-full

              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent

              group-hover:translate-x-full

              transition-all
              duration-1000

              z-20
            "
                ></div>

                <Link
                  href="https://maps.app.goo.gl/9AoEaHakFHWNiWyS7"
                  target="_blank"
                >

                  <Image
                    src="/icons/map.jpeg"
                    alt="map"
                    width={900}
                    height={700}
                    className="
                w-full

                h-[320px]
                sm:h-[420px]
                lg:h-[520px]

                object-cover

                transition-transform
                duration-700

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

              p-5
              sm:p-6

              bg-gradient-to-t
              from-[#021B33]
              via-[#021B33]/80
              to-transparent

              z-10
            "
                >

                  <h3
                    className="
                text-white

                text-xl
                sm:text-2xl

                font-bold
              "
                  >

                    Work GeniX Office

                  </h3>

                  <p
                    className="
                mt-2

                text-gray-300

                text-sm
                sm:text-base
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

      w-[450px]
      h-[450px]

      bg-cyan-400/10

      blur-[120px]

      rounded-full
    "
        ></div>

        {/* Bottom Glow */}
        <div
          className="
      absolute
      -bottom-40
      -left-40

      w-[450px]
      h-[450px]

      bg-blue-500/10

      blur-[120px]

      rounded-full
    "
        ></div>

        {/* Grid Overlay */}
        <div
          className="
      absolute inset-0

      opacity-[0.03]

      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]

      [background-size:60px_60px]
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

      px-4
      sm:px-6
      lg:px-8

      py-20
      sm:py-24
    "
        >

          <div
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4

        gap-10
        lg:gap-12
      "
          >

            {/* ================= BRAND SECTION ================= */}
            <div className="xl:pr-6">

              {/* Logo */}
              <div
                className="
            flex
            items-center

            gap-4

            mb-7
          "
              >

                <div
                  className="
              relative

              w-16 h-16
              sm:w-28 sm:h-20

              rounded-2xl

              bg-white/[0.08]
              backdrop-blur-2xl

              border border-white/10

              shadow-[0_10px_40px_rgba(0,0,0,0.3)]

              flex
              items-center
              justify-center

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
                    width={65}
                    height={65}
                    className="
                relative z-10
                object-contain
              "
                  />

                </div>

                <div>

                  <h2
                    className="
                text-2xl
                sm:text-3xl

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
                text-gray-300

                text-xs
                sm:text-sm

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
            text-gray-300

            leading-8

            text-sm
            sm:text-base
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
            text-2xl

            font-bold

            mb-7
          "
              >

                Quick Links

              </h3>

              <ul
                className="
            space-y-4
          "
              >

                {[
                  {
                    name: "Home",
                    link: "/",
                  },
                  {
                    name: "Dashboard",
                    link: "/dashboard",
                  },
                  {
                    name: "Products",
                    link: "/products",
                  },
                  {
                    name: "Gallery",
                    link: "/gallery",
                  },
                  {
                    name: "Contact",
                    link: "/contact",
                  },
                ].map((item, i) => (

                  <li key={i}>

                    <Link
                      href={item.link}
                      className="
                  group

                  inline-flex
                  items-center

                  gap-3

                  text-gray-300

                  hover:text-cyan-300

                  transition-all
                  duration-300
                "
                    >

                      <span
                        className="
                    w-2.5
                    h-2.5

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
            text-2xl

            font-bold

            mb-7
          "
              >

                Contact Us

              </h3>

              <div className="space-y-5">

                {[
                  {
                    icon: <Phone size={22} />,
                    title: "Alternative Phone",
                    desc: "+91 8521060741",
                  },
                  {
                    icon: <Clock size={22} />,
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

                gap-4

                p-4
                sm:p-5

                rounded-[24px]

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
                "
                    ></div>

                    {/* Icon */}
                    <div
                      className="
                  relative z-10

                  w-12
                  h-12

                  rounded-xl

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

                    mb-1
                  "
                      >

                        {item.title}

                      </h4>

                      <p
                        className="
                    text-gray-300

                    text-sm
                    sm:text-base

                    leading-7

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
            text-2xl

            font-bold

            mb-7
          "
              >

                Our Location

              </h3>

              <Link
                href="https://maps.app.goo.gl/9AoEaHakFHWNiWyS7"
                className="
            group
            relative

            overflow-hidden

            flex
            items-center
            justify-center

            w-full
            h-[260px]
            sm:h-[280px]

            rounded-[32px]

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
            "
                ></div>

                {/* Shine */}
                <div
                  className="
              absolute inset-0

              -translate-x-full

              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent

              group-hover:translate-x-full

              transition-all
              duration-1000
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
            "
                >

                  <Image
                    src="/icons/map.svg"
                    alt="map"
                    width={110}
                    height={110}
                    className="
                object-contain

                transition-transform
                duration-500

                group-hover:scale-110
              "
                  />

                  <p
                    className="
                mt-5

                text-gray-300

                text-sm
                sm:text-base
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

        px-4
        sm:px-6
        lg:px-8

        py-5

        flex
        flex-col
        md:flex-row

        items-center
        justify-between

        gap-4
      "
          >

            <p
              className="
          text-gray-400

          text-sm

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

          gap-6

          text-sm
        "
            >

              <Link
                href="/privacy-policy"
                className="
            text-gray-400

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
            text-gray-400

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