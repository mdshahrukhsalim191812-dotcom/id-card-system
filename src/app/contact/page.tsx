"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";

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
            <Navbar />

            {/* HERO */}
            <section
                className="
        relative

        overflow-hidden

        py-20
        sm:py-24
        lg:py-32

        bg-gradient-to-b
        from-[#F8FBFF]
        via-[#F5FAFF]
        to-white
    "
            >

                {/* ================= BG GLOW ================= */}
                <div
                    className="
            absolute
            -top-32
            -left-32

            w-[320px] h-[320px]
            sm:w-[500px] sm:h-[500px]

            bg-blue-200/40

            blur-3xl

            rounded-full
        "
                ></div>

                <div
                    className="
            absolute
            -bottom-32
            -right-32

            w-[300px] h-[300px]
            sm:w-[450px] sm:h-[450px]

            bg-cyan-200/40

            blur-3xl

            rounded-full
        "
                ></div>

                {/* GRID LIGHT */}
                <div
                    className="
            absolute inset-0

            opacity-[0.03]

            [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]

            [background-size:60px_60px]
        "
                ></div>

                {/* ================= CONTENT ================= */}
                <div
                    className="
            relative z-10

            max-w-7xl
            mx-auto

            px-4
            sm:px-6
            lg:px-10

            text-center

            flex flex-col
            items-center
        "
                >

                    {/* BADGE */}
                    <div
                        className="
                inline-flex items-center
                justify-center

                gap-2

                bg-white/90
                backdrop-blur-xl

                text-blue-700

                px-4 py-2
                sm:px-5 sm:py-2.5

                rounded-full

                font-semibold

                text-xs
                sm:text-sm

                border border-blue-100

                shadow-lg
            "
                    >

                        <div
                            className="
                    w-2 h-2
                    rounded-full
                    bg-blue-500
                    animate-pulse
                "
                        ></div>

                        Contact Work GeniX

                    </div>

                    {/* HEADING */}
                    <h1
                        className="
                mt-8 sm:mt-10

                max-w-6xl

                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl

                font-extrabold

                leading-[1.05]

                tracking-tight
            "
                    >

                        {/* LINE 1 */}
                        <span
                            className="
                    inline-block

                    text-gray-900
                "
                        >
                            Let's Build Your
                        </span>

                        {/* BREAK */}
                        <br className="hidden sm:block" />

                        {/* LINE 2 */}
                        <span
                            className="
                    inline-block

                    mt-2 sm:mt-4

                    bg-gradient-to-r
                    from-blue-700
                    via-cyan-500
                    to-blue-600

                    bg-clip-text
                    text-transparent

                    drop-shadow-sm
                "
                        >
                            Business
                        </span>

                    </h1>

                    {/* PARAGRAPH */}
                    <p
                        className="
                mt-6 sm:mt-8

                max-w-4xl

                text-base
                sm:text-lg
                md:text-xl

                leading-8
                sm:leading-9

                text-gray-600
            "
                    >

                        Contact us for premium school
                        printing, ID cards, diaries,
                        belts, ties, brochures,
                        DTF printing and more.

                    </p>

                    {/* BUTTONS */}
                    <div
                        className="
                mt-10 sm:mt-12

                flex flex-col
                sm:flex-row

                items-center

                gap-4
            "
                    >

                        {/* PRIMARY BUTTON */}
                        <button
                            className="
                    group

                    px-7 py-4
                    sm:px-8 sm:py-4

                    rounded-2xl

                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500

                    text-white

                    font-bold

                    text-sm
                    sm:text-base

                    shadow-2xl

                    hover:scale-105
                    hover:shadow-blue-300/40

                    active:scale-95

                    transition-all duration-300
                "
                        >

                            Contact Now

                        </button>

                        {/* SECOND BUTTON */}
                        <button
                            className="
                    px-7 py-4
                    sm:px-8 sm:py-4

                    rounded-2xl

                    bg-white/80
                    backdrop-blur-xl

                    border border-gray-200

                    text-gray-800

                    font-semibold

                    text-sm
                    sm:text-base

                    shadow-lg

                    hover:bg-white
                    hover:shadow-xl

                    transition-all duration-300
                "
                        >
                            <Link href="/products">
                                Explore Products
                            </Link>

                        </button>

                    </div>

                    {/* STATS */}
                    <div
                        className="
                mt-14 sm:mt-16

                grid grid-cols-2
                sm:grid-cols-4

                gap-5
                sm:gap-8

                w-full
                max-w-5xl
            "
                    >

                        {[
                            {
                                number: "10K+",
                                label: "Products Delivered",
                            },
                            {
                                number: "500+",
                                label: "Schools Served",
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

                            <div
                                key={index}
                                className="
                        bg-white/70
                        backdrop-blur-xl

                        border border-white

                        rounded-3xl

                        p-5 sm:p-6

                        shadow-lg

                        hover:shadow-2xl
                        hover:-translate-y-1

                        transition-all duration-300
                    "
                            >

                                <h3
                                    className="
                            text-2xl
                            sm:text-3xl

                            font-extrabold

                            bg-gradient-to-r
                            from-blue-600
                            to-cyan-500

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

                            text-gray-600

                            leading-6
                        "
                                >
                                    {item.label}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* CONTACT SECTION */}
            <section className="
                max-w-7xl mx-auto
                px-6 lg:px-10
                pb-24
            ">

                <div className="
                    grid grid-cols-1
                    lg:grid-cols-2
                    gap-10
                ">

                    {/* LEFT CONTACT CARDS */}
                    <div
                        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-1

        gap-5
        sm:gap-6
        lg:gap-7
    "
                    >

                        {/* ================= PHONE ================= */}
                        <div
                            className="
            group

            relative overflow-hidden

            bg-white/90
            backdrop-blur-xl

            rounded-[26px]
            sm:rounded-[30px]
            lg:rounded-[34px]

            p-5
            sm:p-6
            md:p-7
            lg:p-8

            border border-white

            shadow-lg
            shadow-blue-100/40

            hover:shadow-2xl
            hover:shadow-blue-200/40

            hover:-translate-y-2

            transition-all duration-500
        "
                        >

                            {/* GLOW */}
                            <div
                                className="
                absolute
                -top-20
                -right-20

                w-40 h-40

                bg-blue-100/50

                rounded-full

                blur-3xl
            "
                            ></div>

                            <div
                                className="
                relative z-10

                flex items-start

                gap-4
                sm:gap-5
            "
                            >

                                {/* ICON */}
                                <div
                                    className="
                    shrink-0

                    w-14 h-14
                    sm:w-16 sm:h-16
                    lg:w-[72px] lg:h-[72px]

                    rounded-2xl
                    sm:rounded-3xl

                    bg-gradient-to-br
                    from-blue-600
                    to-cyan-500

                    text-white

                    flex items-center justify-center

                    shadow-xl

                    group-hover:scale-110
                    group-hover:rotate-6

                    transition-all duration-500
                "
                                >

                                    <Phone size={30} />

                                </div>

                                {/* CONTENT */}
                                <div className="flex-1 min-w-0">

                                    <p
                                        className="
                        text-gray-500
                        font-semibold

                        text-sm
                        sm:text-base
                    "
                                    >
                                        Phone Number
                                    </p>

                                    <h2
                                        className="
                        mt-2

                        text-xl
                        sm:text-2xl
                        lg:text-[28px]

                        font-extrabold

                        text-gray-900

                        tracking-tight
                    "
                                    >
                                        +91 9525706529
                                    </h2>

                                    <p
                                        className="
                        mt-3

                        text-sm
                        sm:text-base

                        text-gray-600

                        leading-7
                    "
                                    >
                                        Call us for school branding,
                                        printing and customized products.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* ================= EMAIL ================= */}
                        <div
                            className="
            group

            relative overflow-hidden

            bg-white/90
            backdrop-blur-xl

            rounded-[26px]
            sm:rounded-[30px]
            lg:rounded-[34px]

            p-5
            sm:p-6
            md:p-7
            lg:p-8

            border border-white

            shadow-lg
            shadow-indigo-100/40

            hover:shadow-2xl
            hover:shadow-indigo-200/40

            hover:-translate-y-2

            transition-all duration-500
        "
                        >

                            {/* GLOW */}
                            <div
                                className="
                absolute
                -top-20
                -right-20

                w-40 h-40

                bg-indigo-100/50

                rounded-full

                blur-3xl
            "
                            ></div>

                            <div
                                className="
                relative z-10

                flex items-start

                gap-4
                sm:gap-5
            "
                            >

                                {/* ICON */}
                                <div
                                    className="
                    shrink-0

                    w-14 h-14
                    sm:w-16 sm:h-16
                    lg:w-[72px] lg:h-[72px]

                    rounded-2xl
                    sm:rounded-3xl

                    bg-gradient-to-br
                    from-indigo-500
                    to-blue-500

                    text-white

                    flex items-center justify-center

                    shadow-xl

                    group-hover:scale-110
                    group-hover:rotate-6

                    transition-all duration-500
                "
                                >

                                    <Mail size={30} />

                                </div>

                                {/* CONTENT */}
                                <div className="flex-1 min-w-0">

                                    <p
                                        className="
                        text-gray-500
                        font-semibold

                        text-sm
                        sm:text-base
                    "
                                    >
                                        Email Address
                                    </p>

                                    <h2
                                        className="
                        mt-2

                        text-base
                        sm:text-lg
                        md:text-xl

                        font-extrabold

                        text-gray-900

                        break-all

                        leading-7
                    "
                                    >
                                        mdhammadnaveed92010@gmail.com
                                    </h2>

                                    <p
                                        className="
                        mt-3

                        text-sm
                        sm:text-base

                        text-gray-600

                        leading-7
                    "
                                    >
                                        Send us your requirements anytime.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* ================= LOCATION ================= */}
                        <div
                            className="
            group

            relative overflow-hidden

            bg-white/90
            backdrop-blur-xl

            rounded-[26px]
            sm:rounded-[30px]
            lg:rounded-[34px]

            p-5
            sm:p-6
            md:p-7
            lg:p-8

            border border-white

            shadow-lg
            shadow-orange-100/40

            hover:shadow-2xl
            hover:shadow-orange-200/40

            hover:-translate-y-2

            transition-all duration-500
        "
                        >

                            {/* GLOW */}
                            <div
                                className="
                absolute
                -top-20
                -right-20

                w-40 h-40

                bg-orange-100/50

                rounded-full

                blur-3xl
            "
                            ></div>

                            <div
                                className="
                relative z-10

                flex items-start

                gap-4
                sm:gap-5
            "
                            >

                                {/* ICON */}
                                <div
                                    className="
                    shrink-0

                    w-14 h-14
                    sm:w-16 sm:h-16
                    lg:w-[72px] lg:h-[72px]

                    rounded-2xl
                    sm:rounded-3xl

                    bg-gradient-to-br
                    from-orange-500
                    to-red-500

                    text-white

                    flex items-center justify-center

                    shadow-xl

                    group-hover:scale-110
                    group-hover:rotate-6

                    transition-all duration-500
                "
                                >

                                    <MapPin size={30} />

                                </div>

                                {/* CONTENT */}
                                <div className="flex-1 min-w-0">

                                    <p
                                        className="
                        text-gray-500
                        font-semibold

                        text-sm
                        sm:text-base
                    "
                                    >
                                        Office Address
                                    </p>

                                    <h2
                                        className="
                        mt-2

                        text-lg
                        sm:text-xl
                        lg:text-2xl

                        font-extrabold

                        text-gray-900

                        leading-8
                        sm:leading-9
                    "
                                    >
                                        Islampur, Shahjangi,
                                        Kabirpur Road,
                                        Bhagalpur
                                    </h2>

                                </div>

                            </div>

                        </div>

                        {/* ================= WORKING HOURS ================= */}
                        <div
                            className="
            group

            relative overflow-hidden

            bg-white/90
            backdrop-blur-xl

            rounded-[26px]
            sm:rounded-[30px]
            lg:rounded-[34px]

            p-5
            sm:p-6
            md:p-7
            lg:p-8

            border border-white

            shadow-lg
            shadow-green-100/40

            hover:shadow-2xl
            hover:shadow-green-200/40

            hover:-translate-y-2

            transition-all duration-500
        "
                        >

                            {/* GLOW */}
                            <div
                                className="
                absolute
                -top-20
                -right-20

                w-40 h-40

                bg-green-100/50

                rounded-full

                blur-3xl
            "
                            ></div>

                            <div
                                className="
                relative z-10

                flex items-start

                gap-4
                sm:gap-5
            "
                            >

                                {/* ICON */}
                                <div
                                    className="
                    shrink-0

                    w-14 h-14
                    sm:w-16 sm:h-16
                    lg:w-[72px] lg:h-[72px]

                    rounded-2xl
                    sm:rounded-3xl

                    bg-gradient-to-br
                    from-green-500
                    to-emerald-500

                    text-white

                    flex items-center justify-center

                    shadow-xl

                    group-hover:scale-110
                    group-hover:rotate-6

                    transition-all duration-500
                "
                                >

                                    <Clock3 size={30} />

                                </div>

                                {/* CONTENT */}
                                <div className="flex-1 min-w-0">

                                    <p
                                        className="
                        text-gray-500
                        font-semibold

                        text-sm
                        sm:text-base
                    "
                                    >
                                        Working Hours
                                    </p>

                                    <h2
                                        className="
                        mt-2

                        text-xl
                        sm:text-2xl
                        lg:text-[28px]

                        font-extrabold

                        text-gray-900
                    "
                                    >
                                        Mon - Sat
                                    </h2>

                                    <p
                                        className="
                        mt-3

                        text-sm
                        sm:text-base

                        text-gray-600
                    "
                                    >
                                        9:00 AM - 8:00 PM
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* CONTACT FORM */}
                    <div className="
    bg-white
    rounded-[28px] sm:rounded-[36px] lg:rounded-[40px]
    p-5 sm:p-8 lg:p-10
    border border-gray-100
    shadow-sm
    hover:shadow-2xl
    transition-all duration-300
">

                        {/* HEADER */}
                        <div className="
        flex items-start sm:items-center
        gap-3 sm:gap-4
    ">

                            {/* ICON */}
                            <div className="
            shrink-0
            w-12 h-12
            sm:w-14 sm:h-14
            rounded-2xl
            bg-blue-100
            text-blue-600
            flex items-center justify-center
        ">

                                <MessageCircle size={26} />

                            </div>

                            {/* TEXT */}
                            <div>

                                <h2 className="
                text-2xl sm:text-3xl
                font-extrabold
                text-gray-800
                leading-tight
            ">
                                    Send Message
                                </h2>

                                <p className="
                text-sm sm:text-base
                text-gray-500
                mt-1
            ">
                                    We reply quickly to all inquiries.
                                </p>

                            </div>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleWhatsApp}
                            className="
            mt-8 sm:mt-10
            space-y-5 sm:space-y-6
        "
                        >

                            {/* NAME */}
                            <div>

                                <label className="
                text-sm sm:text-[15px]
                font-semibold
                text-gray-700
            ">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value
                                        })
                                    }
                                    className="
                    w-full
                    mt-2 sm:mt-3
                    px-4 sm:px-5
                    py-3 sm:py-4
                    rounded-2xl

                    bg-white
                    border border-gray-200

                    text-sm sm:text-base
                    text-gray-800
                    placeholder:text-gray-400

                    shadow-sm
                    outline-none

                    transition-all duration-300

                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100

                    hover:border-blue-300
                    hover:shadow-md
                "
                                />

                            </div>

                            {/* EMAIL */}
                            <div>

                                <label className="
                text-sm sm:text-[15px]
                font-semibold
                text-gray-700
            ">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value
                                        })
                                    }
                                    className="
                    w-full
                    mt-2 sm:mt-3
                    px-4 sm:px-5
                    py-3 sm:py-4
                    rounded-2xl

                    bg-white
                    border border-gray-200

                    text-sm sm:text-base
                    text-gray-800
                    placeholder:text-gray-400

                    shadow-sm
                    outline-none

                    transition-all duration-300

                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100

                    hover:border-blue-300
                    hover:shadow-md
                "
                                />

                            </div>

                            {/* PHONE */}
                            <div>

                                <label className="
                text-sm sm:text-[15px]
                font-semibold
                text-gray-700
            ">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value
                                        })
                                    }
                                    className="
                    w-full
                    mt-2 sm:mt-3
                    px-4 sm:px-5
                    py-3 sm:py-4
                    rounded-2xl

                    bg-white
                    border border-gray-200

                    text-sm sm:text-base
                    text-gray-800
                    placeholder:text-gray-400

                    shadow-sm
                    outline-none

                    transition-all duration-300

                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100

                    hover:border-blue-300
                    hover:shadow-md
                "
                                />

                            </div>

                            {/* MESSAGE */}
                            <div>

                                <label className="
                text-sm sm:text-[15px]
                font-semibold
                text-gray-700
            ">
                                    Message
                                </label>

                                <textarea
                                    rows={5}
                                    placeholder="Enter your message"
                                    value={form.message}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            message: e.target.value
                                        })
                                    }
                                    className="
                    w-full
                    mt-2 sm:mt-3
                    px-4 sm:px-5
                    py-3 sm:py-4
                    rounded-2xl

                    bg-white
                    border border-gray-200

                    text-sm sm:text-base
                    text-gray-800
                    placeholder:text-gray-400

                    shadow-sm
                    outline-none
                    resize-none

                    transition-all duration-300

                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100

                    hover:border-blue-300
                    hover:shadow-md
                "
                                />

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="
                group
                w-full

                py-3 sm:py-4

                rounded-2xl

                bg-gradient-to-r
                from-blue-600
                to-cyan-500

                text-white
                font-bold
                text-base sm:text-lg

                shadow-xl

                hover:scale-[1.02]
                hover:shadow-2xl

                active:scale-[0.98]

                transition-all duration-300

                flex items-center
                justify-center
                gap-3
            "
                            >

                                Send Message

                                <Send
                                    size={20}
                                    className="
                    group-hover:translate-x-1
                    transition-transform
                "
                                />

                            </button>

                        </form>

                    </div>

                </div>

            </section>

            {/* CTA */}
            <section className="
                bg-[#021B33]
                text-white
                py-20
            ">

                <div className="
                    max-w-7xl mx-auto
                    px-6 lg:px-10
                ">

                    <div className="
                        grid grid-cols-1
                        lg:grid-cols-2
                        gap-12
                        items-center
                    ">

                        {/* LEFT */}
                        <div>

                            <h2 className="
                                text-4xl lg:text-5xl
                                font-extrabold
                                leading-tight
                            ">

                                Premium Printing & Branding Services for
                                <br />
                                Your Business

                            </h2>

                            <p className="
                                mt-6
                                text-blue-100
                                text-lg
                                leading-8
                            ">

                                High quality products, fast turnaround, and exceptional customer service.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}