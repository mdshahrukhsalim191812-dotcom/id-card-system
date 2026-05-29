"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

import {
    Shirt,
    Badge,
    BookOpen,
    FileText,
    Printer,
    Medal,
    Image as ImageIcon,
    ChevronRight,
    ChevronLeft,
    Phone,
    Mail,
    MapPin,
    Package,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

const products = [
    {
        title: "Acrylic ID Cards",
        desc: "Premium quality school and office ID cards with professional finishing.",
        icon: Badge,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "School Tie",
        desc: "Custom school ties with logo and premium fabric material.",
        icon: Shirt,
        gradient: "from-indigo-500 to-blue-500",
    },
    {
        title: "School Belt",
        desc: "Durable customized school belts with branding options.",
        icon: Shirt,
        gradient: "from-purple-500 to-pink-500",
    },
    {
        title: "School Diary",
        desc: "Professional school diaries with custom printing and design.",
        icon: BookOpen,
        gradient: "from-orange-500 to-red-500",
    },
    {
        title: "Exam Copy",
        desc: "High quality customized exam copies and answer sheets.",
        icon: FileText,
        gradient: "from-green-500 to-emerald-500",
    },
    {
        title: "Fee Book",
        desc: "Printed fee books with school branding and serial numbering.",
        icon: BookOpen,
        gradient: "from-teal-500 to-cyan-500",
    },
    {
        title: "Brochures",
        desc: "Premium brochures and handbills for school marketing.",
        icon: ImageIcon,
        gradient: "from-pink-500 to-rose-500",
    },
    {
        title: "DTF & UV Printing",
        desc: "Professional UV and DTF printing for all products.",
        icon: Printer,
        gradient: "from-yellow-500 to-orange-500",
    },
    {
        title: "Sports Medals",
        desc: "Customized medals, mementos and trophies for events.",
        icon: Medal,
        gradient: "from-amber-500 to-yellow-500",
    },
];

export default function ProductsPage() {
    const [loadingPage, setLoadingPage] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [productIndex, setProductIndex] = useState(0);
    const itemsPerSlide = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const totalSlides = Math.ceil(products.length / itemsPerSlide);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingPage(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const newItemsPerSlide = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
            const newTotalSlides = Math.ceil(products.length / newItemsPerSlide);
            if (currentSlide >= newTotalSlides) {
                setCurrentSlide(0);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [currentSlide]);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused, totalSlides]);

    useEffect(() => {

        const interval = setInterval(() => {

            setProductIndex((prev) =>
                prev === products.length - 1
                    ? 0
                    : prev + 1
            );

        }, 3500);

        return () => clearInterval(interval);

    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    if (loadingPage) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-[#021B33] via-[#04284B] to-[#063B6E] flex items-center justify-center overflow-hidden z-50">
                <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-blue-400 blur-2xl opacity-40 animate-pulse"></div>
                        <div className="relative w-28 h-28 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl">
                            <Package size={50} className="text-white animate-pulse" />
                        </div>
                    </div>
                    <div className="mt-10 flex gap-3">
                        <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
                        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <h2 className="mt-8 text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                        Loading Our Products
                    </h2>
                    <p className="mt-3 text-blue-100 text-center text-sm sm:text-base max-w-md leading-relaxed">
                        Please wait while we prepare our products details.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F9FF]">
            <Navbar />

            {/* HERO */}
            <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-[#F8FBFF] via-[#F4FAFF] to-white">
                <div className="absolute -top-32 -left-32 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-blue-200/40 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-32 -right-32 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-cyan-200/40 blur-3xl rounded-full"></div>
                <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center flex flex-col items-center">
                    <div className="inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-xl text-blue-700 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm border border-blue-100 shadow-lg">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        Premium School Printing Solutions
                    </div>

                    <h1 className="mt-8 sm:mt-10 max-w-6xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-tight">
                        <span className="inline-block bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                            Everything You Need
                        </span>
                        <br className="hidden sm:block" />
                        <span className="inline-block mt-2 sm:mt-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                            for Your Business
                        </span>
                    </h1>

                    <p className="mt-6 sm:mt-8 max-w-4xl text-base sm:text-lg md:text-xl leading-8 sm:leading-9 text-gray-600">
                        Professional customized printing solutions for schools, institutes and organizations.
                        <span className="hidden sm:inline"> High-quality ID cards, ties, belts, diaries, brochures and more.</span>
                    </p>

                    <p className="sm:hidden mt-3 text-sm text-gray-500 leading-7 max-w-md">
                        High-quality ID cards, ties, belts, diaries, brochures and more.
                    </p>

                    <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4">
                        <button className="group px-7 py-4 sm:px-8 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm sm:text-base shadow-2xl hover:scale-105 hover:shadow-blue-300/40 active:scale-95 transition-all duration-300">
                            Explore Products
                        </button>
                        <button className="px-7 py-4 sm:px-8 sm:py-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 text-gray-800 font-semibold text-sm sm:text-base shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300">
                            <Link href="/contact">Contact Us</Link>
                        </button>
                    </div>
                </div>
            </section>

            {/* SLIDING PRODUCTS SECTION */}
          /* ================= PRODUCTS ================= */
            <section
                className="
        relative
        overflow-hidden

        py-20 sm:py-24 lg:py-28

        bg-gradient-to-b
        from-[#031326]
        via-[#062B52]
        to-[#031326]
    "
            >

                {/* BG GLOW */}
                <div className="
        absolute
        -top-40 -left-40
        w-[500px] h-[500px]
        bg-cyan-400/10
        blur-[120px]
        rounded-full
    "></div>

                <div className="
        absolute
        -bottom-40 -right-40
        w-[500px] h-[500px]
        bg-blue-500/10
        blur-[120px]
        rounded-full
    "></div>

                {/* GRID */}
                <div className="
        absolute inset-0
        opacity-[0.03]

        [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]

        [background-size:60px_60px]
    "></div>

                <div className="
        relative z-10
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-10
    ">

                    {/* HEADING */}
                    <div className="
            text-center
            max-w-3xl
            mx-auto
            mb-16
        ">

                        <div className="
                inline-flex items-center
                gap-2

                px-5 py-2

                rounded-full

                bg-cyan-400/10
                border border-cyan-400/20

                text-cyan-300
                text-sm font-semibold

                backdrop-blur-xl

                mb-6
            ">

                            Premium Business Products

                        </div>

                        <h2 className="
                text-4xl sm:text-5xl lg:text-6xl
                font-extrabold
                text-white
                leading-tight
            ">

                            Our{" "}

                            <span className="
                    bg-gradient-to-r
                    from-cyan-300
                    to-blue-400
                    bg-clip-text
                    text-transparent
                ">
                                Products
                            </span>

                        </h2>

                        <p className="
                mt-6
                text-gray-300
                text-base sm:text-lg
                leading-8
            ">

                            Premium customized printing and branding
                            solutions designed for schools,
                            businesses and institutions.

                        </p>

                    </div>

                    {/* SLIDER */}
                    <div className="relative">

                        {/* LEFT BUTTON */}
                        <button
                            onClick={() =>
                                setProductIndex((prev) =>
                                    prev === 0
                                        ? products.length - 1
                                        : prev - 1
                                )
                            }
                            className="
                    absolute
                    left-0 sm:-left-6
                    top-1/2 -translate-y-1/2
                    z-20

                    w-12 h-12
                    sm:w-14 sm:h-14

                    rounded-full

                    bg-white/10
                    backdrop-blur-xl

                    border border-white/10

                    text-white

                    flex items-center justify-center

                    hover:bg-cyan-500
                    hover:scale-110

                    transition-all duration-300
                "
                        >

                            <ChevronLeft size={28} />

                        </button>

                        {/* RIGHT BUTTON */}
                        <button
                            onClick={() =>
                                setProductIndex((prev) =>
                                    prev === products.length - 1
                                        ? 0
                                        : prev + 1
                                )
                            }
                            className="
                    absolute
                    right-0 sm:-right-6
                    top-1/2 -translate-y-1/2
                    z-20

                    w-12 h-12
                    sm:w-14 sm:h-14

                    rounded-full

                    bg-white/10
                    backdrop-blur-xl

                    border border-white/10

                    text-white

                    flex items-center justify-center

                    hover:bg-cyan-500
                    hover:scale-110

                    transition-all duration-300
                "
                        >

                            <ChevronRight size={28} />

                        </button>

                        {/* PRODUCTS CONTAINER */}
                        <div className="
                overflow-hidden
                rounded-[32px]
            ">

                            <div
                                className="
                        flex
                        transition-transform
                        duration-700
                        ease-in-out
                    "
                                style={{
                                    transform: `translateX(-${productIndex * 100}%)`,
                                }}
                            >

                                {products.map((item, index) => {

                                    const Icon = item.icon;

                                    return (

                                        <div
                                            key={index}
                                            className="
                                    min-w-full

                                    px-2 sm:px-4
                                "
                                        >

                                            <div
                                                className="
                                        group

                                        relative

                                        overflow-hidden

                                        rounded-[32px]

                                        bg-white/[0.06]
                                        backdrop-blur-2xl

                                        border border-white/10

                                        p-8 sm:p-10 lg:p-12

                                        shadow-[0_10px_40px_rgba(0,0,0,0.3)]

                                        hover:border-cyan-400/30

                                        transition-all duration-500
                                    "
                                            >

                                                {/* GLOW */}
                                                <div className="
                                        absolute
                                        top-0 right-0

                                        w-72 h-72

                                        bg-cyan-400/10

                                        rounded-full

                                        blur-3xl

                                        opacity-0
                                        group-hover:opacity-100

                                        transition-all duration-500
                                    "></div>

                                                <div className="
                                        relative z-10

                                        flex flex-col
                                        lg:flex-row

                                        items-center

                                        gap-10
                                    ">

                                                    {/* ICON */}
                                                    <div
                                                        className={`
                                                shrink-0

                                                w-28 h-28

                                                rounded-[30px]

                                                bg-gradient-to-br ${item.gradient}

                                                flex items-center justify-center

                                                shadow-2xl

                                                text-white

                                                group-hover:scale-110
                                                group-hover:rotate-3

                                                transition-all duration-500
                                            `}
                                                    >

                                                        <Icon size={50} />

                                                    </div>

                                                    {/* CONTENT */}
                                                    <div className="
                                            text-center
                                            lg:text-left
                                        ">

                                                        <h2 className="
                                                text-3xl sm:text-4xl
                                                font-extrabold
                                                text-white
                                            ">

                                                            {item.title}

                                                        </h2>

                                                        <p className="
                                                mt-5

                                                text-gray-300

                                                text-base sm:text-lg

                                                leading-8

                                                max-w-2xl
                                            ">

                                                            {item.desc}

                                                        </p>

                                                        {/* BUTTON */}
                                                        <Link
                                                            href="/contact"
                                                            className="
                                                    inline-flex items-center
                                                    gap-3

                                                    mt-8

                                                    px-6 py-4

                                                    rounded-2xl

                                                    bg-gradient-to-r
                                                    from-cyan-500
                                                    to-blue-600

                                                    text-white
                                                    font-semibold

                                                    hover:scale-105

                                                    shadow-xl
                                                    shadow-cyan-500/20

                                                    transition-all duration-300
                                                "
                                                        >

                                                            Get This Product

                                                            <ChevronRight size={20} />

                                                        </Link>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                        </div>

                        {/* DOTS */}
                        <div className="
                flex items-center justify-center
                gap-3
                mt-10
            ">

                            {products.map((_, index) => (

                                <button
                                    key={index}
                                    onClick={() =>
                                        setProductIndex(index)
                                    }
                                    className={`
                            rounded-full
                            transition-all duration-300

                            ${index === productIndex
                                            ? "w-10 h-3 bg-cyan-400"
                                            : "w-3 h-3 bg-white/30 hover:bg-white"
                                        }
                        `}
                                />

                            ))}

                        </div>

                    </div>

                </div>

            </section>

            {/* CONTACT SECTION */}
            <section className="bg-[#021B33] text-white py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                                Ready To Grow
                                <br />
                                Your Business?
                            </h2>
                            <p className="mt-6 text-blue-100 text-lg leading-8">
                                Contact us today for premium your printing and branding services.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-2xl rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 lg:p-8 border border-white/10 shadow-2xl space-y-5 sm:space-y-6 hover:bg-white/15 transition-all duration-300">
                            <div className="group flex items-start sm:items-center gap-4">
                                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                    <Phone size={22} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-blue-100 text-xs sm:text-sm font-medium">Phone</p>
                                    <h3 className="mt-1 font-bold text-lg sm:text-xl text-white break-words">
                                        +91 9525706529
                                    </h3>
                                </div>
                            </div>

                            <div className="group flex items-start gap-4">
                                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                    <Mail size={22} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-blue-100 text-xs sm:text-sm font-medium">Email</p>
                                    <h3 className="mt-1 font-bold text-sm sm:text-lg text-white break-all leading-6 sm:leading-8">
                                        mdhammadnaveed92010@gmail.com
                                    </h3>
                                </div>
                            </div>

                            <div className="group flex items-start gap-4">
                                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                    <MapPin size={22} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-blue-100 text-xs sm:text-sm font-medium">Office</p>
                                    <h3 className="mt-1 font-bold text-base sm:text-lg lg:text-xl text-white leading-7 sm:leading-8">
                                        Islampur, Shahjangi,
                                        Kabirpur Road,
                                        Bhagalpur
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}   