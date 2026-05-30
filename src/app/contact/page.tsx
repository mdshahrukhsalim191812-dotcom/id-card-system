"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import HomeNavbar from "@/components/HomeNavbar";

import {
    Phone,
    Mail,
    MapPin,
    Clock3,
    Send,
    MessageCircle,
    ChevronRight,
    Contact,
} from "lucide-react";

export default function ContactPage() {

    const [loadingPage, setLoadingPage] = useState(true);

    useState(() => {
        const timer = setTimeout(() => {
            setLoadingPage(false);
        }, 2000);

        return () => clearTimeout(timer);
    });

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleWhatsApp = (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        // VALIDATION
        if (
            !form.name ||
            !form.phone ||
            !form.message
        ) {

            alert(
                "Please fill required fields"
            );

            return;
        }

        const text = `
*New Work GeniX Inquiry*

Full Name:
${form.name}

Email:
${form.email}

Phone:
${form.phone}

Message:
${form.message}
`;

        const whatsappURL =
            `https://wa.me/919525706529?text=${encodeURIComponent(text)}`;

        window.open(
            whatsappURL,
            "_blank"
        );

        // RESET FORM
        setForm({
            name: "",
            email: "",
            phone: "",
            message: "",
        });
    };

    if (loadingPage) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-[#021B33] via-[#04284B] to-[#063B6E] flex items-center justify-center overflow-hidden z-50">

                {/* Glow */}
                <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">

                    {/* Logo Circle */}
                    <div className="relative">

                        <div className="absolute inset-0 rounded-full bg-blue-400 blur-2xl opacity-40 animate-pulse"></div>

                        <div className="relative w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl">

                            <Contact
                                size={50}
                                className="text-white animate-pulse"
                            />

                        </div>

                    </div>

                    {/* Loading Dots */}
                    <div className="mt-10 flex gap-3">

                        <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>

                        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:0.2s]"></div>

                        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:0.4s]"></div>

                    </div>

                    {/* Text */}
                    <h2 className="mt-8 text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                        Loading Contact
                    </h2>

                    <p className="mt-3 text-blue-100 text-center text-sm sm:text-base max-w-md leading-relaxed">
                        Please wait while we prepare your contact details.
                    </p>

                </div>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-[#F5F9FF]">

            {/* NAVBAR */}
            <HomeNavbar />

            {/* HERO */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="
    relative

    overflow-hidden

    py-20
    sm:py-24
    lg:py-32

    bg-gradient-to-b
    from-[#021B33]
    via-[#062B52]
    to-[#031326]
  "
            >

                {/* ================= GRID BACKGROUND ================= */}
                <div
                    className="
      absolute inset-0

      opacity-[0.04]

      [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]

      [background-size:60px_60px]
    "
                ></div>

                {/* ================= TOP GLOW ================= */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.4, 0.7, 0.4],
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

      w-[320px]
      h-[320px]

      sm:w-[500px]
      sm:h-[500px]

      bg-cyan-400/20

      blur-[120px]

      rounded-full
    "
                ></motion.div>

                {/* ================= BOTTOM GLOW ================= */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.8, 0.4],
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

      w-[300px]
      h-[300px]

      sm:w-[450px]
      sm:h-[450px]

      bg-blue-500/20

      blur-[120px]

      rounded-full
    "
                ></motion.div>

                {/* ================= CENTER LIGHT ================= */}
                <div
                    className="
      absolute
      left-1/2
      top-1/2
      -translate-x-1/2
      -translate-y-1/2

      w-[700px]
      h-[700px]

      bg-cyan-400/10

      blur-[160px]

      rounded-full
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
      via-cyan-400/40
      to-transparent
    "
                ></motion.div>

                {/* ================= MAIN CONTENT ================= */}
                <div
                    className="
      relative z-10

      max-w-7xl
      mx-auto

      px-4
      sm:px-6
      lg:px-10

      text-center

      flex
      flex-col
      items-center
    "
                >

                    {/* ================= BADGE ================= */}
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
                            duration: 0.7,
                        }}
                        viewport={{ once: true }}
                        className="
        inline-flex
        items-center
        justify-center

        gap-2

        bg-white/[0.08]
        backdrop-blur-2xl

        text-cyan-300

        px-4 py-2
        sm:px-5 sm:py-2.5

        rounded-full

        font-semibold

        text-xs
        sm:text-sm

        border border-cyan-400/20

        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
      "
                    >

                        <div
                            className="
          w-2 h-2

          rounded-full

          bg-cyan-400

          animate-pulse
        "
                        ></div>

                        Contact Work GeniX

                    </motion.div>

                    {/* ================= HEADING ================= */}
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 50,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 0.9,
                        }}
                        viewport={{ once: true }}
                        className="
        mt-8
        sm:mt-10

        max-w-6xl

        text-4xl
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        xl:text-8xl

        font-black

        leading-[1.05]

        tracking-tight
      "
                    >

                        {/* LINE 1 */}
                        <span className="text-white">
                            Let's Build Your
                        </span>

                        <br className="hidden sm:block" />

                        {/* LINE 2 */}
                        <span
                            className="
          inline-block

          mt-2
          sm:mt-4

          bg-gradient-to-r
          from-cyan-300
          via-blue-300
          to-cyan-400

          bg-clip-text
          text-transparent

          drop-shadow-[0_0_25px_rgba(34,211,238,0.45)]
        "
                        >
                            Business
                        </span>

                    </motion.h1>

                    {/* ================= PARAGRAPH ================= */}
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
        sm:mt-8

        max-w-4xl

        text-sm
        sm:text-lg
        md:text-xl

        leading-7
        sm:leading-9

        text-gray-300
      "
                    >

                        Contact us for premium school
                        printing, ID cards, diaries,
                        belts, ties, brochures,
                        DTF printing and more.

                    </motion.p>

                    {/* ================= BUTTONS ================= */}
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
                            delay: 0.6,
                            duration: 0.8,
                        }}
                        viewport={{ once: true }}
                        className="
        mt-10
        sm:mt-12

        flex
        flex-col
        sm:flex-row

        items-center

        w-full
        sm:w-auto

        gap-4
      "
                    >

                        {/* CONTACT BUTTON */}
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{
                                scale: 0.95,
                            }}
                            className="
          group

          w-full
          sm:w-auto

          px-7 py-4
          sm:px-8 sm:py-4

          rounded-2xl

          bg-gradient-to-r
          from-cyan-500
          to-blue-600

          text-white

          font-bold

          text-sm
          sm:text-base

          shadow-[0_15px_50px_rgba(6,182,212,0.35)]

          hover:shadow-cyan-500/40

          transition-all duration-300
        "
                        >

                            Contact Now

                        </motion.button>

                        {/* PRODUCTS BUTTON */}
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{
                                scale: 0.95,
                            }}
                            className="w-full sm:w-auto"
                        >

                            <Link
                                href="/products"
                                className="
            flex
            items-center
            justify-center

            w-full
            sm:w-auto

            px-7 py-4
            sm:px-8 sm:py-4

            rounded-2xl

            bg-white/[0.08]
            backdrop-blur-2xl

            border border-white/10

            text-white

            font-semibold

            text-sm
            sm:text-base

            shadow-lg

            hover:bg-white/[0.12]
            hover:border-cyan-400/30

            transition-all duration-300
          "
                            >

                                Explore Products

                            </Link>

                        </motion.div>

                    </motion.div>

                    {/* ================= STATS ================= */}
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
                            delay: 0.8,
                            duration: 0.9,
                        }}
                        viewport={{ once: true }}
                        className="
        mt-14
        sm:mt-16

        grid
        grid-cols-2
        lg:grid-cols-4

        gap-4
        sm:gap-6
        lg:gap-8

        w-full
        max-w-6xl
      "
                    >

                        {[
                            {
                                number: "10K+",
                                label: "Products Delivered",
                            },
                            {
                                number: "500+",
                                label: "Customer Served",
                            },
                            {
                                number: "35+",
                                label: "Years Experience",
                            },
                            {
                                number: "24/7",
                                label: "Customer Support",
                            },
                        ].map((item, index) => (

                            <motion.div
                                key={index}

                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}

                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                transition={{
                                    delay: index * 0.15,
                                    duration: 0.7,
                                }}

                                viewport={{ once: true }}

                                whileHover={{
                                    y: -8,
                                    scale: 1.03,
                                }}

                                className="
            relative

            overflow-hidden

            rounded-3xl

            border border-white/10

            bg-white/[0.06]
            backdrop-blur-2xl

            p-5
            sm:p-6

            shadow-[0_10px_40px_rgba(0,0,0,0.25)]

            transition-all duration-300
          "
                            >

                                {/* CARD GLOW */}
                                <div
                                    className="
              absolute inset-0

              bg-gradient-to-br
              from-cyan-400/0
              to-blue-500/0

              group-hover:from-cyan-400/10
              group-hover:to-blue-500/10
            "
                                ></div>

                                <div className="relative z-10">

                                    <h3
                                        className="
                text-2xl
                sm:text-3xl
                lg:text-4xl

                font-black

                bg-gradient-to-r
                from-cyan-300
                to-blue-400

                bg-clip-text
                text-transparent
              "
                                    >
                                        {item.number}
                                    </h3>

                                    <p
                                        className="
                mt-2

                text-xs
                sm:text-sm
                lg:text-base

                text-gray-300

                leading-6
              "
                                    >
                                        {item.label}
                                    </p>

                                </div>

                            </motion.div>

                        ))}

                    </motion.div>

                </div>

            </motion.section>

            {/* CONTACT SECTION */}
            <section
                className="
    relative

    overflow-hidden

    py-16
    sm:py-20
    lg:py-24

    bg-gradient-to-b
    from-[#021B33]
    via-[#062B52]
    to-[#031326]
  "
            >

                {/* ================= GRID BG ================= */}
                <div
                    className="
      absolute inset-0

      opacity-[0.03]

      [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]

      [background-size:60px_60px]
    "
                ></div>

                {/* ================= GLOW EFFECTS ================= */}
                <div
                    className="
      absolute
      -top-40
      -left-40

      w-[400px]
      h-[400px]

      bg-cyan-400/10

      blur-[120px]

      rounded-full
    "
                ></div>

                <div
                    className="
      absolute
      -bottom-40
      -right-40

      w-[400px]
      h-[400px]

      bg-blue-500/10

      blur-[120px]

      rounded-full
    "
                ></div>

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

                    {/* ================= SECTION HEADING ================= */}
                    <div
                        className="
        text-center

        max-w-3xl

        mx-auto

        mb-14
        sm:mb-16
        lg:mb-20
      "
                    >

                        {/* BADGE */}
                        <div
                            className="
          inline-flex
          items-center

          gap-2

          px-5 py-2.5

          rounded-full

          bg-cyan-400/10

          border border-cyan-400/20

          backdrop-blur-xl

          text-cyan-300

          text-sm
          font-semibold

          shadow-lg
        "
                        >

                            <div
                                className="
            w-2 h-2

            rounded-full

            bg-cyan-400

            animate-pulse
          "
                            ></div>

                            Contact Work GeniX

                        </div>

                        {/* TITLE */}
                        <h2
                            className="
          mt-6

          text-4xl
          sm:text-5xl
          lg:text-6xl

          font-black

          leading-tight

          text-white
        "
                        >

                            Get In{" "}

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

                                Touch

                            </span>

                        </h2>

                        {/* DESC */}
                        <p
                            className="
          mt-5

          text-gray-300

          text-sm
          sm:text-base
          lg:text-lg

          leading-7
          sm:leading-8
        "
                        >

                            Contact us for premium printing,
                            branding, ID cards, brochures,
                            DTF printing and customized
                            business solutions.

                        </p>

                    </div>

                    {/* ================= GRID ================= */}
                    <div
                        className="
        grid
        grid-cols-1
        xl:grid-cols-2

        gap-8
        lg:gap-10
      "
                    >

                        {/* ================= LEFT CONTACT CARDS ================= */}
                        <div
                            className="
          grid

          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-1

          gap-5
          sm:gap-6
        "
                        >

                            {[
                                {
                                    icon: <Phone size={28} />,
                                    title: "Phone Number",
                                    value: "+91 9525706529",
                                    desc: "Call us for printing and branding services.",
                                    color:
                                        "from-cyan-500 to-blue-600",
                                },

                                {
                                    icon: <Mail size={28} />,
                                    title: "Email Address",
                                    value:
                                        "mdhammadnaved92010@gmail.com",
                                    desc: "Send us your requirements anytime.",
                                    color:
                                        "from-blue-500 to-indigo-500",
                                },

                                {
                                    icon: <MapPin size={28} />,
                                    title: "Office Address",
                                    value:
                                        "Islampur, Shahjangi, Bhagalpur",
                                    desc: "Visit our office for direct consultation.",
                                    color:
                                        "from-orange-500 to-red-500",
                                },

                                {
                                    icon: <Clock3 size={28} />,
                                    title: "Working Hours",
                                    value: "Mon - Sat",
                                    desc: "9:00 AM - 8:00 PM",
                                    color:
                                        "from-green-500 to-emerald-500",
                                },
                            ].map((item, i) => (

                                <div
                                    key={i}
                                    className="
              group

              relative

              overflow-hidden

              rounded-[28px]
              sm:rounded-[32px]

              border border-white/10

              bg-white/[0.06]
              backdrop-blur-2xl

              p-5
              sm:p-6
              lg:p-7

              shadow-[0_10px_40px_rgba(0,0,0,0.25)]

              hover:-translate-y-2
              hover:border-cyan-400/30
              hover:bg-white/[0.08]

              transition-all
              duration-500
            "
                                >

                                    {/* HOVER GLOW */}
                                    <div
                                        className="
                absolute inset-0

                bg-gradient-to-br
                from-cyan-400/0
                to-blue-500/0

                group-hover:from-cyan-400/10
                group-hover:to-blue-500/10

                transition-all
                duration-500
              "
                                    ></div>

                                    <div
                                        className="
                relative z-10

                flex

                items-start

                gap-4
                sm:gap-5
              "
                                    >

                                        {/* ICON */}
                                        <div
                                            className={`
                  shrink-0

                  w-14 h-14
                  sm:w-16 sm:h-16

                  rounded-2xl

                  bg-gradient-to-br ${item.color}

                  flex
                  items-center
                  justify-center

                  text-white

                  shadow-xl

                  group-hover:scale-110
                  group-hover:rotate-6

                  transition-all
                  duration-500
                `}
                                        >

                                            {item.icon}

                                        </div>

                                        {/* TEXT */}
                                        <div className="min-w-0 flex-1">

                                            <p
                                                className="
                    text-cyan-300

                    text-sm
                    sm:text-base

                    font-semibold
                  "
                                            >

                                                {item.title}

                                            </p>

                                            <h3
                                                className="
                    mt-2

                    text-lg
                    sm:text-xl
                    lg:text-2xl

                    font-black

                    text-white

                    break-words
                  "
                                            >

                                                {item.value}

                                            </h3>

                                            <p
                                                className="
                    mt-3

                    text-sm
                    sm:text-base

                    text-gray-300

                    leading-7
                  "
                                            >

                                                {item.desc}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>
                        {/* ================= CONTACT FORM ================= */}
                        <div
                            className="
          relative

          overflow-hidden

          rounded-[28px]
          sm:rounded-[36px]
          lg:rounded-[40px]

          border border-white/10

          bg-white/[0.06]
          backdrop-blur-2xl

          p-5
          sm:p-7
          lg:p-10

          shadow-[0_10px_50px_rgba(0,0,0,0.25)]

          hover:border-cyan-400/30

          transition-all
          duration-500
        "
                        >

                            {/* BG GLOW */}
                            <div
                                className="
            absolute
            -top-20
            -right-20

            w-72
            h-72

            bg-cyan-400/10

            rounded-full

            blur-3xl
          "
                            ></div>

                            {/* HEADER */}
                            <div
                                className="
            relative z-10

            flex
            items-start
            sm:items-center

            gap-4
          "
                            >

                                {/* ICON */}
                                <div
                                    className="
              shrink-0

              w-14
              h-14

              rounded-2xl

              bg-gradient-to-br
              from-cyan-500
              to-blue-600

              text-white

              flex
              items-center
              justify-center

              shadow-xl
            "
                                >

                                    <MessageCircle size={28} />

                                </div>

                                {/* TEXT */}
                                <div>

                                    <h2
                                        className="
                text-2xl
                sm:text-3xl

                font-black

                text-white
              "
                                    >

                                        Send Message

                                    </h2>

                                    <p
                                        className="
                mt-1

                text-sm
                sm:text-base

                text-gray-300
              "
                                    >

                                        We reply quickly to all inquiries.

                                    </p>

                                </div>

                            </div>

                            {/* ================= FORM ================= */}
                            <form
                                onSubmit={handleWhatsApp}
                                className="
            relative z-10

            mt-8
            sm:mt-10

            space-y-5
            sm:space-y-6
          "
                            >

                                {/* ================= NAME ================= */}
                                <div>

                                    <label
                                        className="
                text-sm
                sm:text-base

                font-semibold

                text-cyan-300
              "
                                    >

                                        Full Name

                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                name: e.target.value,
                                            })
                                        }
                                        className="
                w-full

                mt-3

                px-4
                sm:px-5

                py-3.5
                sm:py-4

                rounded-2xl

                bg-white/[0.08]

                border border-white/10

                text-white

                placeholder:text-gray-400

                outline-none

                transition-all
                duration-300

                focus:border-cyan-400
                focus:ring-4
                focus:ring-cyan-400/20

                hover:border-cyan-400/30
              "
                                    />

                                </div>

                                {/* ================= EMAIL ================= */}
                                <div>

                                    <label
                                        className="
                text-sm
                sm:text-base

                font-semibold

                text-cyan-300
              "
                                    >

                                        Email Address

                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                email: e.target.value,
                                            })
                                        }
                                        className="
                w-full

                mt-3

                px-4
                sm:px-5

                py-3.5
                sm:py-4

                rounded-2xl

                bg-white/[0.08]

                border border-white/10

                text-white

                placeholder:text-gray-400

                outline-none

                transition-all
                duration-300

                focus:border-cyan-400
                focus:ring-4
                focus:ring-cyan-400/20

                hover:border-cyan-400/30
              "
                                    />

                                </div>

                                {/* ================= PHONE ================= */}
                                <div>

                                    <label
                                        className="
                text-sm
                sm:text-base

                font-semibold

                text-cyan-300
              "
                                    >

                                        Phone Number

                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        value={form.phone}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="
                w-full

                mt-3

                px-4
                sm:px-5

                py-3.5
                sm:py-4

                rounded-2xl

                bg-white/[0.08]

                border border-white/10

                text-white

                placeholder:text-gray-400

                outline-none

                transition-all
                duration-300

                focus:border-cyan-400
                focus:ring-4
                focus:ring-cyan-400/20

                hover:border-cyan-400/30
              "
                                    />

                                </div>

                                {/* ================= MESSAGE ================= */}
                                <div>

                                    <label
                                        className="
                text-sm
                sm:text-base

                font-semibold

                text-cyan-300
              "
                                    >

                                        Your Message

                                    </label>

                                    <textarea
                                        rows={6}
                                        placeholder="Write your message..."
                                        value={form.message}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                message: e.target.value,
                                            })
                                        }
                                        className="
                w-full

                mt-3

                px-4
                sm:px-5

                py-4

                rounded-2xl

                bg-white/[0.08]

                border border-white/10

                text-white

                placeholder:text-gray-400

                outline-none
                resize-none

                transition-all
                duration-300

                focus:border-cyan-400
                focus:ring-4
                focus:ring-cyan-400/20

                hover:border-cyan-400/30
              "
                                    />

                                </div>

                                {/* ================= BUTTON ================= */}
                                <button
                                    type="submit"
                                    className="
              group

              w-full

              py-4

              rounded-2xl

              bg-gradient-to-r
              from-cyan-500
              to-blue-600

              text-white

              font-bold

              text-base
              sm:text-lg

              shadow-[0_10px_40px_rgba(6,182,212,0.35)]

              hover:scale-[1.02]
              hover:shadow-cyan-500/30

              active:scale-[0.98]

              transition-all
              duration-300

              flex
              items-center
              justify-center

              gap-3
            "
                                >

                                    Send Message

                                    <Send
                                        size={20}
                                        className="
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
                                    />

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}
            <section
                className="
    relative

    overflow-hidden

    py-16
    sm:py-20
    lg:py-28

    bg-gradient-to-b
    from-[#021B33]
    via-[#062B52]
    to-[#031326]

    text-white
  "
            >

                {/* ================= GRID BACKGROUND ================= */}
                <div
                    className="
      absolute inset-0

      opacity-[0.03]

      [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]

      [background-size:60px_60px]
    "
                ></div>

                {/* ================= TOP GLOW ================= */}
                <div
                    className="
      absolute
      -top-40
      -left-40

      w-[400px]
      h-[400px]

      bg-cyan-400/10

      blur-[120px]

      rounded-full
    "
                ></div>

                {/* ================= BOTTOM GLOW ================= */}
                <div
                    className="
      absolute
      -bottom-40
      -right-40

      w-[400px]
      h-[400px]

      bg-blue-500/10

      blur-[120px]

      rounded-full
    "
                ></div>

                {/* ================= MAIN CONTAINER ================= */}
                <div
                    className="
      relative z-10

      max-w-7xl
      mx-auto

      px-4
      sm:px-6
      lg:px-10
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
                        <div
                            className="
          text-center
          lg:text-left
        "
                        >

                            {/* BADGE */}
                            <div
                                className="
            inline-flex
            items-center

            gap-2

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

                                <div
                                    className="
              w-2 h-2

              rounded-full

              bg-cyan-400

              animate-pulse
            "
                                ></div>

                                Premium Printing Solutions

                            </div>

                            {/* HEADING */}
                            <h2
                                className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl

            font-black

            leading-tight
            sm:leading-[1.1]

            tracking-tight
          "
                            >

                                Premium Printing
                                <br className="hidden sm:block" />

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

                                    & Branding Services

                                </span>

                            </h2>

                            {/* DESCRIPTION */}
                            <p
                                className="
            mt-6
            sm:mt-8

            max-w-2xl

            mx-auto
            lg:mx-0

            text-gray-300

            text-base
            sm:text-lg
            lg:text-xl

            leading-8
            sm:leading-9
          "
                            >

                                High-quality printing products,
                                creative branding solutions and
                                fast turnaround services designed
                                to grow your business professionally.

                            </p>

                            {/* BUTTONS */}
                            <div
                                className="
            mt-10

            flex
            flex-col
            sm:flex-row

            items-center
            lg:items-start

            gap-4
          "
                            >

                                {/* PRIMARY BUTTON */}
                                <button
                                    className="
              group

              px-7
              sm:px-8

              py-4

              rounded-2xl

              bg-gradient-to-r
              from-cyan-500
              to-blue-600

              text-white

              font-bold

              text-sm
              sm:text-base

              shadow-[0_10px_40px_rgba(6,182,212,0.35)]

              hover:scale-105
              hover:shadow-cyan-500/30

              transition-all
              duration-300
            "
                                >
                                    <Link href="/products" className="flex items-center gap-2">
                                    Explore Products
                                    </Link>
                                </button>

                              

                            </div>

                        </div>

                        {/* ================= RIGHT PREMIUM CARD ================= */}
                        <div
                            className="
          relative

          group
        "
                        >

                            {/* OUTER GLOW */}
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

                            {/* CARD */}
                            <div
                                className="
            relative

            overflow-hidden

            rounded-[32px]
            sm:rounded-[40px]

            border border-white/10

            bg-white/[0.06]
            backdrop-blur-2xl

            p-6
            sm:p-8
            lg:p-10

            shadow-[0_10px_50px_rgba(0,0,0,0.35)]
          "
                            >

                                {/* SHINE EFFECT */}
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

                                {/* STATS */}
                                <div
                                    className="
              relative z-10

              grid
              grid-cols-2

              gap-5
            "
                                >

                                    {[
                                        {
                                            number: "10K+",
                                            label: "Products Delivered",
                                        },
                                        {
                                            number: "500+",
                                            label: "Happy Clients",
                                        },
                                        {
                                            number: "35+",
                                            label: "Years Experience",
                                        },
                                        {
                                            number: "24/7",
                                            label: "Customer Support",
                                        },
                                    ].map((item, i) => (

                                        <div
                                            key={i}
                                            className="
                  rounded-2xl

                  border border-white/10

                  bg-white/[0.05]

                  p-5
                  sm:p-6

                  text-center

                  hover:bg-white/[0.08]

                  transition-all
                  duration-300
                "
                                        >

                                            <h3
                                                className="
                    text-2xl
                    sm:text-3xl

                    font-black

                    bg-gradient-to-r
                    from-cyan-300
                    to-blue-400

                    bg-clip-text
                    text-transparent
                  "
                                            >

                                                {item.number}

                                            </h3>

                                            <p
                                                className="
                    mt-2

                    text-sm
                    sm:text-base

                    text-gray-300

                    leading-6
                  "
                                            >

                                                {item.label}

                                            </p>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}