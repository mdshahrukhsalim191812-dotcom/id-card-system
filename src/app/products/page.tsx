"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import HomeNavbar from "@/components/HomeNavbar";

import {
    Phone,
    Mail,
    MapPin,
    Package,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    ArrowRight,
} from "lucide-react";


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

const slides = [
    {
        title: "Premium Printing Services",
        desc: "High-quality printing solutions for all your business needs.",
        image: "/products/4.jpg",
    },
    {
        title: "Creative Brand Solutions ",
        desc: "Elevate your brand with our innovative design services.",
        image: "/products/5.png",
    },
    {
        title: "Professional Design Services",
        desc: "Expert design services to make your brand stand out.",
        image: "/products/6.png",
    }
];

export default function ProductsPage() {

    const [loadingPage, setLoadingPage] =
        useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {

        const timer = setTimeout(() => {

            setLoadingPage(false);

        }, 2000);

        return () => clearTimeout(timer);

    }, []);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentSlide((prev) =>
                prev === slides.length - 1
                    ? 0
                    : prev + 1
            );

        }, 3000);

        return () => clearInterval(interval);

    }, []);

    const nextSlide = () => {

        setCurrentSlide((prev) =>
            prev === slides.length - 1
                ? 0
                : prev + 1
        );
    };

    // ================= PREV =================
    const prevSlide = () => {

        setCurrentSlide((prev) =>
            prev === 0
                ? slides.length - 1
                : prev - 1
        );
    };

    if (loadingPage) {

        return (

            <div className="
                fixed inset-0
                bg-gradient-to-br
                from-[#021B33]
                via-[#04284B]
                to-[#063B6E]

                flex items-center
                justify-center

                overflow-hidden
                z-50
            ">

                <div className="
                    absolute
                    w-[350px]
                    h-[350px]

                    bg-blue-500/20
                    blur-3xl
                    rounded-full

                    animate-pulse
                "></div>

                <div className="
                    relative z-10
                    flex flex-col
                    items-center
                ">

                    <div className="relative">

                        <div className="
                            absolute inset-0
                            rounded-full
                            bg-blue-400
                            blur-2xl
                            opacity-40
                            animate-pulse
                        "></div>

                        <div className="
                            relative
                            w-28 h-28

                            rounded-full

                            bg-white/10
                            backdrop-blur-xl

                            border border-white/10

                            flex items-center
                            justify-center

                            shadow-2xl
                        ">

                            <Package
                                size={50}
                                className="
                                    text-white
                                    animate-pulse
                                "
                            />

                        </div>

                    </div>

                    <div className="mt-10 flex gap-3">

                        <div className="
                            w-4 h-4
                            rounded-full
                            bg-white
                            animate-bounce
                        "></div>

                        <div className="
                            w-4 h-4
                            rounded-full
                            bg-white
                            animate-bounce
                            [animation-delay:0.2s]
                        "></div>

                        <div className="
                            w-4 h-4
                            rounded-full
                            bg-white
                            animate-bounce
                            [animation-delay:0.4s]
                        "></div>

                    </div>

                    <h2 className="
                        mt-8
                        text-3xl sm:text-4xl
                        font-extrabold
                        text-white
                        tracking-wide
                    ">
                        Loading Our Products
                    </h2>

                    <p className="
                        mt-3
                        text-blue-100
                        text-center
                        text-sm sm:text-base
                        max-w-md
                        leading-relaxed
                    ">
                        Please wait while we prepare
                        our products details.
                    </p>

                </div>

            </div>

        );

    }

    return (
        <div className="
            min-h-screen
            bg-[#F5F9FF]
        ">

            <HomeNavbar />

            {/* SPACE FOR FIXED NAVBAR */}
            <div className="h-[0px]"></div>

            {/* ================= SLIDER ================= */}
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
                    ${index === currentSlide
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

                            <span className="
                      bg-gradient-to-r
                      from-cyan-300
                      via-blue-300
                      to-cyan-400
                      bg-clip-text
                      text-transparent
                    ">
                                {slides[currentSlide].title}
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
                            {slides[currentSlide].desc}
                        </p>

                        {/* ================= BUTTONS ================= */}
                        <div className="
                    mt-10
                    flex flex-col sm:flex-row
                    gap-4
                    justify-center lg:justify-start
                  ">
                        </div>

                        {/* ================= STATS ================= */}
                        <div className="
                    grid grid-cols-3
                    gap-4 sm:gap-6
                    mt-14
                  ">

                            {[
                                {
                                    num: "5+",
                                    text: "Experience",
                                },
                                {
                                    num: "54+",
                                    text: "Products",
                                },
                                {
                                    num: "5K+",
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

                        </div>

                    </div>

                </div>

                {/* ================= MANUAL BUTTONS ================= */}
                <button
                    onClick={prevSlide}
                    className="
                  group
                  absolute left-3 sm:left-6 lg:left-8
                  top-[450px] -translate-y-1/2
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
                  top-[450px] -translate-y-1/2
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
                                setCurrentSlide(index)
                            }
                            className={`
                      transition-all duration-300
                      rounded-full
                      ${index === currentSlide
                                    ? "w-10 h-3 bg-cyan-400 shadow-lg shadow-cyan-400/50"
                                    : "w-3 h-3 bg-white/40 hover:bg-white"
                                }
                    `}
                        />

                    ))}

                </div>

            </section>

            {/* ================= PRODUCTS SECTION ================= */}
            <section className="
                relative
                overflow-hidden

                py-24

                bg-gradient-to-b
                from-[#031326]
                via-[#062B52]
                to-[#031326]
            ">

                {/* GRID */}
                <div className="
                    absolute inset-0
                    opacity-[0.04]

                    [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]

                    [background-size:60px_60px]
                "></div>

                {/* GLOW */}
                <div className="
                    absolute
                    -top-40 -left-40

                    w-[500px]
                    h-[500px]

                    bg-cyan-400/10

                    blur-[120px]
                    rounded-full
                "></div>

                <div className="
                    absolute
                    -bottom-40 -right-40

                    w-[500px]
                    h-[500px]

                    bg-blue-500/10

                    blur-[120px]
                    rounded-full
                "></div>

                <div className="
                    relative z-10

                    max-w-7xl
                    mx-auto

                    px-4 sm:px-6 lg:px-8
                ">

                    {/* HEADING */}
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
                            text-sm
                            font-semibold

                            mb-6
                        ">

                            Premium Printing Solutions

                        </div>

                        <h2 className="
                            text-4xl
                            sm:text-5xl
                            lg:text-6xl

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

                            text-base
                            sm:text-lg

                            leading-relaxed
                        ">

                            High-quality printing,
                            branding, and professional
                            design solutions crafted to
                            elevate your business identity.

                        </p>

                    </div>

                    {/* PRODUCTS GRID */}
                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        xl:grid-cols-4

                        gap-8
                    ">

                        {products.map((item, i) => (

                            <motion.div
                                key={i}

                                initial={{
                                    opacity: 0,
                                    y: 60,
                                }}

                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                transition={{
                                    duration: 0.7,
                                    delay: i * 0.12,
                                }}

                                viewport={{
                                    once: true,
                                    amount: 0.2,
                                }}

                                className="
                                group
                                relative

                                overflow-hidden

                                rounded-[30px]

                        bg-white/[0.06]
                        backdrop-blur-2xl

                    border border-white/10
                    before:absolute
                    before:inset-0
                    before:rounded-[30px]
                    before:p-[1px]
                    before:bg-gradient-to-br
                    before:from-cyan-400/0
                    before:via-cyan-400/0
                    before:to-blue-500/0
                    group-hover:before:from-cyan-400/40
                    group-hover:before:via-blue-500/30
                    group-hover:before:to-cyan-400/40
                    before:transition-all
                    before:duration-700

                    before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                    before:[mask-composite:xor]
                    before:[-webkit-mask-composite:xor]

                        shadow-[0_10px_40px_rgba(0,0,0,0.25)]

                        hover:border-cyan-400/40
                        hover:shadow-cyan-500/20

                        transition-all
                        duration-500

                        hover:-translate-y-4
                        hover:scale-[1.02]
                        "
                            >

                                {/* HOVER GLOW */}
                                <div className="
    absolute inset-0

    bg-gradient-to-br

    from-cyan-400/0
    via-blue-500/0
    to-cyan-400/0

    group-hover:from-cyan-400/10
    group-hover:via-blue-500/10
    group-hover:to-cyan-400/10

    opacity-0
    group-hover:opacity-100

    transition-all
    duration-700
"></div>

                                {/* IMAGE */}
                                <div className="
                                    relative
                                    overflow-hidden
                                ">

                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={500}
                                        height={300}
                                        priority={false}
                                        className="
                                            w-full
                                            h-60

                                            object-cover

                                            transition-transform
                                            duration-700

                                            group-hover:scale-125
                                            group-hover:rotate-1
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

                                {/* CONTENT */}
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

                                        transition-colors
                                        duration-300
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

                                        transition-all
                                        duration-500
                                    "></div>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                </div>

            </section >

            {/* ================= CONTACT SECTION ================= */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="
    relative
    overflow-hidden

    bg-gradient-to-b
    from-[#021B33]
    via-[#062B52]
    to-[#021B33]

    text-white

    py-20
    sm:py-24
    lg:py-28
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

      w-[400px]
      sm:w-[500px]

      h-[400px]
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

      w-[400px]
      sm:w-[500px]

      h-[400px]
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

        gap-12
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

                            {/* SMALL BADGE */}
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

                                Contact Our Team

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
          "
                            >

                                Ready To Grow
                                <br />

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

                                    Your Business?

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

            text-blue-100

            text-base
            sm:text-lg

            leading-8

            max-w-xl

            mx-auto
            lg:mx-0
          "
                            >

                                Contact us today for premium printing,
                                branding and professional design services
                                tailored for schools, institutes and businesses.

                            </motion.p>

                            {/* BUTTONS */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.5,
                                    duration: 0.8,
                                }}
                                viewport={{ once: true }}
                                className="
            mt-10

            flex
            flex-col
            sm:flex-row

            items-center
            lg:items-start

            justify-center
            lg:justify-start

            gap-4
          "
                            >

                                {/* CALL BUTTON */}
                                <motion.a
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    href="tel:+919525706529"
                                    className="
              group

              inline-flex
              items-center
              justify-center
              gap-3

              w-full
              sm:w-auto

              px-8 py-4

              rounded-2xl

              bg-gradient-to-r
              from-cyan-500
              to-blue-600

              font-semibold

              shadow-[0_10px_40px_rgba(6,182,212,0.35)]

              hover:shadow-cyan-500/40

              transition-all
              duration-300
            "
                                >

                                    Call Now

                                    <ArrowRight
                                        size={20}
                                        className="
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
                                    />

                                </motion.a>

                                {/* EMAIL BUTTON */}
                                <motion.a
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    href="mailto:mdhammadnaveed92010@gmail.com"
                                    className="
              inline-flex
              items-center
              justify-center

              w-full
              sm:w-auto

              px-8 py-4

              rounded-2xl

              border border-white/15

              bg-white/10
              backdrop-blur-2xl

              hover:bg-white/20

              font-semibold

              transition-all
              duration-300
            "
                                >

                                    Send Email

                                </motion.a>

                            </motion.div>

                        </motion.div>

                        {/* ================= RIGHT CONTACT CARD ================= */}
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
                            whileHover={{
                                y: -8,
                            }}
                            className="
          relative

          rounded-[30px]
          sm:rounded-[35px]

          bg-white/[0.08]
          backdrop-blur-2xl

          border border-white/10

          p-5
          sm:p-8
          lg:p-10

          shadow-[0_20px_80px_rgba(0,0,0,0.35)]

          overflow-hidden
        "
                        >

                            {/* CARD GLOW */}
                            <div
                                className="
            absolute
            top-0
            right-0

            w-72
            h-72

            bg-cyan-400/10

            blur-3xl
            rounded-full
          "
                            ></div>

                            <div className="relative z-10 space-y-5 sm:space-y-7">

                                {[
                                    {
                                        icon: <Phone size={24} />,
                                        title: "Phone",
                                        desc: "+91 9525706529",
                                        bg: "bg-blue-500/20",
                                    },
                                    {
                                        icon: <Mail size={24} />,
                                        title: "Email",
                                        desc: "mdhammadnaveed92010@gmail.com",
                                        bg: "bg-cyan-500/20",
                                    },
                                    {
                                        icon: <MapPin size={24} />,
                                        title: "Office",
                                        desc: "Islampur, Shahjangi, Kabirpur Road, Bhagalpur",
                                        bg: "bg-blue-500/20",
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
                                            scale: 1.02,
                                        }}

                                        className="
                group

                flex
                items-start

                gap-4
                sm:gap-5

                p-4
                sm:p-5

                rounded-3xl

                bg-white/[0.04]

                border border-white/10

                hover:border-cyan-400/30
                hover:bg-white/[0.08]

                transition-all
                duration-300
              "
                                    >

                                        {/* ICON */}
                                        <div
                                            className={`
                  shrink-0

                  w-12 h-12
                  sm:w-14 sm:h-14

                  rounded-2xl

                  ${item.bg}

                  flex items-center justify-center

                  text-cyan-300

                  group-hover:scale-110

                  transition-transform duration-300
                `}
                                        >

                                            {item.icon}

                                        </div>

                                        {/* TEXT */}
                                        <div className="min-w-0 flex-1">

                                            <p className="text-blue-100 text-sm">

                                                {item.title}

                                            </p>

                                            <h3
                                                className="
                    mt-1

                    text-base
                    sm:text-lg
                    lg:text-xl

                    font-bold

                    leading-7

                    break-words
                  "
                                            >

                                                {item.desc}

                                            </h3>

                                        </div>

                                    </motion.div>

                                ))}

                            </div>

                        </motion.div>

                    </div>

                </div>

            </motion.section>

        </div >

    );

}