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
    Phone,
    Mail,
    MapPin,
} from "lucide-react";

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

    return (

        <div className="min-h-screen bg-[#F5F9FF]">

            {/* NAVBAR */}
            <Navbar />

            {/* HERO */}
            <section className="
                relative overflow-hidden
                py-20 lg:py-28
            ">

                {/* BG */}
                <div className="
                    absolute top-0 left-0
                    w-[500px] h-[500px]
                    bg-blue-200/40
                    blur-3xl rounded-full
                "></div>

                <div className="
                    absolute bottom-0 right-0
                    w-[450px] h-[450px]
                    bg-cyan-200/40
                    blur-3xl rounded-full
                "></div>

                <div className="
                    relative z-10
                    max-w-7xl mx-auto
                    px-6 lg:px-10
                    text-center
                ">

                    <div className="
                        inline-flex items-center
                        gap-2
                        bg-blue-50
                        text-blue-700
                        px-5 py-2
                        rounded-full
                        font-semibold
                        text-sm
                        border border-blue-100
                    ">
                        Premium School Printing Solutions
                    </div>

                    <h1 className="
                        mt-8
                        text-5xl lg:text-7xl
                        font-extrabold
                        text-gray-900
                        leading-tight
                    ">

                        Acrylic ID Cards
                        <br />

                        <span className="
                            bg-gradient-to-r
                            from-blue-600 to-cyan-500
                            bg-clip-text text-transparent
                        ">
                            & School Products
                        </span>

                    </h1>

                    <p className="
                        mt-8
                        text-lg lg:text-xl
                        text-gray-600
                        max-w-3xl mx-auto
                        leading-8
                    ">

                        Professional customized printing solutions
                        for schools, institutes and organizations.
                        High-quality ID cards, ties, belts, diaries,
                        brochures and more.

                    </p>

                </div>

            </section>

            {/* PRODUCTS */}
            <section className="
                max-w-7xl mx-auto
                px-6 lg:px-10
                pb-24
            ">

                <div className="
                    grid grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-8
                ">

                    {products.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={index}
                                className="
                                    group
                                    bg-white
                                    rounded-[32px]
                                    p-8
                                    border border-gray-100
                                    shadow-sm
                                    hover:shadow-2xl
                                    hover:-translate-y-2
                                    transition-all duration-500
                                "
                            >

                                {/* ICON */}
                                <div className={`
                                    w-20 h-20 rounded-3xl
                                    bg-gradient-to-br ${item.gradient}
                                    flex items-center justify-center
                                    text-white
                                    shadow-xl
                                `}>

                                    <Icon size={38} />

                                </div>

                                {/* TITLE */}
                                <h2 className="
                                    mt-7
                                    text-2xl
                                    font-bold
                                    text-gray-800
                                ">

                                    {item.title}

                                </h2>

                                {/* DESC */}
                                <p className="
                                    mt-4
                                    text-gray-500
                                    leading-7
                                ">

                                    {item.desc}

                                </p>

                                {/* BUTTON */}
                                <button className="
                                    mt-8
                                    flex items-center gap-2
                                    text-blue-600
                                    font-semibold
                                    group-hover:gap-3
                                    transition-all
                                ">

                                    Explore Product

                                    <ChevronRight size={18} />

                                </button>

                            </div>

                        );
                    })}

                </div>

            </section>

            {/* CONTACT SECTION */}
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

                                Ready To Grow
                                <br />
                                Your School Brand?

                            </h2>

                            <p className="
                                mt-6
                                text-blue-100
                                text-lg
                                leading-8
                            ">

                                Contact us today for premium
                                school printing and branding services.

                            </p>

                        </div>

                        {/* RIGHT */}
                        <div className="
                            bg-white/10
                            backdrop-blur-xl
                            rounded-[32px]
                            p-8
                            border border-white/10
                            space-y-6
                        ">

                            <div className="
                                flex items-center gap-4
                            ">

                                <div className="
                                    w-14 h-14 rounded-2xl
                                    bg-blue-500/20
                                    flex items-center justify-center
                                ">
                                    <Phone size={24} />
                                </div>

                                <div>

                                    <p className="text-blue-100 text-sm">
                                        Phone
                                    </p>

                                    <h3 className="font-bold text-xl">
                                        +91 9525706529
                                    </h3>

                                </div>

                            </div>

                            <div className="
                                flex items-center gap-4
                            ">

                                <div className="
                                    w-14 h-14 rounded-2xl
                                    bg-cyan-500/20
                                    flex items-center justify-center
                                ">
                                    <Mail size={24} />
                                </div>

                                <div>

                                    <p className="text-blue-100 text-sm">
                                        Email
                                    </p>

                                    <h3 className="
                                        font-bold
                                        text-lg
                                        break-all
                                    ">
                                        mdhammadnaveed92010@gmail.com
                                    </h3>

                                </div>

                            </div>

                            <div className="
                                flex items-start gap-4
                            ">

                                <div className="
                                    w-14 h-14 rounded-2xl
                                    bg-blue-500/20
                                    flex items-center justify-center
                                ">
                                    <MapPin size={24} />
                                </div>

                                <div>

                                    <p className="text-blue-100 text-sm">
                                        Office
                                    </p>

                                    <h3 className="
                                        font-bold
                                        text-lg
                                        leading-8
                                    ">
                                        Islampur, Shahjangi,
                                        Kabirpur Road, Bhagalpur
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