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
} from "lucide-react";

export default function ContactPage() {

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

    return (

        <div className="min-h-screen bg-[#F5F9FF]">

            {/* NAVBAR */}
            <Navbar />

            {/* HERO */}
            <section className="
                relative overflow-hidden
                py-24
            ">

                {/* BG EFFECT */}
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
                        Contact Work GeniX
                    </div>

                    <h1 className="
                        mt-8
                        text-5xl lg:text-7xl
                        font-extrabold
                        text-gray-900
                        leading-tight
                    ">

                        Let's Build Your
                        <br />

                        <span className="
                            bg-gradient-to-r
                            from-blue-600 to-cyan-500
                            bg-clip-text text-transparent
                        ">
                            School Brand
                        </span>

                    </h1>

                    <p className="
                        mt-8
                        text-lg lg:text-xl
                        text-gray-600
                        max-w-3xl mx-auto
                        leading-8
                    ">

                        Contact us for premium school printing,
                        ID cards, diaries, belts, ties, brochures,
                        DTF printing and more.

                    </p>

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
                    <div className="space-y-6">

                        {/* PHONE */}
                        <div className="
                            bg-white
                            rounded-[32px]
                            p-8
                            border border-gray-100
                            shadow-sm
                            hover:shadow-xl
                            transition-all duration-300
                        ">

                            <div className="
                                flex items-start gap-5
                            ">

                                <div className="
                                    w-16 h-16 rounded-3xl
                                    bg-gradient-to-br
                                    from-blue-500 to-cyan-500
                                    text-white
                                    flex items-center justify-center
                                    shadow-lg
                                ">

                                    <Phone size={30} />

                                </div>

                                <div>

                                    <p className="
                                        text-gray-500
                                        font-medium
                                    ">
                                        Phone Number
                                    </p>

                                    <h2 className="
                                        mt-2
                                        text-2xl
                                        font-extrabold
                                        text-gray-800
                                    ">
                                        +91 9525706529
                                    </h2>

                                    <p className="
                                        mt-3
                                        text-gray-500
                                        leading-7
                                    ">
                                        Call us for school branding,
                                        printing and customized products.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* EMAIL */}
                        <div className="
                            bg-white
                            rounded-[32px]
                            p-8
                            border border-gray-100
                            shadow-sm
                            hover:shadow-xl
                            transition-all duration-300
                        ">

                            <div className="
                                flex items-start gap-5
                            ">

                                <div className="
                                    w-16 h-16 rounded-3xl
                                    bg-gradient-to-br
                                    from-indigo-500 to-blue-500
                                    text-white
                                    flex items-center justify-center
                                    shadow-lg
                                ">

                                    <Mail size={30} />

                                </div>

                                <div>

                                    <p className="
                                        text-gray-500
                                        font-medium
                                    ">
                                        Email Address
                                    </p>

                                    <h2 className="
                                        mt-2
                                        text-xl
                                        font-extrabold
                                        text-gray-800
                                        break-all
                                    ">
                                        mdhammadnaveed92010@gmail.com
                                    </h2>

                                    <p className="
                                        mt-3
                                        text-gray-500
                                        leading-7
                                    ">
                                        Send us your requirements anytime.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* LOCATION */}
                        <div className="
                            bg-white
                            rounded-[32px]
                            p-8
                            border border-gray-100
                            shadow-sm
                            hover:shadow-xl
                            transition-all duration-300
                        ">

                            <div className="
                                flex items-start gap-5
                            ">

                                <div className="
                                    w-16 h-16 rounded-3xl
                                    bg-gradient-to-br
                                    from-orange-500 to-red-500
                                    text-white
                                    flex items-center justify-center
                                    shadow-lg
                                ">

                                    <MapPin size={30} />

                                </div>

                                <div>

                                    <p className="
                                        text-gray-500
                                        font-medium
                                    ">
                                        Office Address
                                    </p>

                                    <h2 className="
                                        mt-2
                                        text-2xl
                                        font-extrabold
                                        text-gray-800
                                        leading-10
                                    ">
                                        Islampur, Shahjangi,
                                        Kabirpur Road,
                                        Bhagalpur
                                    </h2>

                                </div>

                            </div>

                        </div>

                        {/* TIME */}
                        <div className="
                            bg-white
                            rounded-[32px]
                            p-8
                            border border-gray-100
                            shadow-sm
                            hover:shadow-xl
                            transition-all duration-300
                        ">

                            <div className="
                                flex items-start gap-5
                            ">

                                <div className="
                                    w-16 h-16 rounded-3xl
                                    bg-gradient-to-br
                                    from-green-500 to-emerald-500
                                    text-white
                                    flex items-center justify-center
                                    shadow-lg
                                ">

                                    <Clock3 size={30} />

                                </div>

                                <div>

                                    <p className="
                                        text-gray-500
                                        font-medium
                                    ">
                                        Working Hours
                                    </p>

                                    <h2 className="
                                        mt-2
                                        text-2xl
                                        font-extrabold
                                        text-gray-800
                                    ">
                                        Mon - Sat
                                    </h2>

                                    <p className="
                                        mt-3
                                        text-gray-500
                                    ">
                                        9:00 AM - 8:00 PM
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* CONTACT FORM */}
                    <div className="
                        bg-white
                        rounded-[40px]
                        p-8 lg:p-10
                        border border-gray-100
                        shadow-sm
                    ">

                        <div className="
                            flex items-center gap-3
                        ">

                            <div className="
                                w-14 h-14 rounded-2xl
                                bg-blue-100
                                text-blue-600
                                flex items-center justify-center
                            ">

                                <MessageCircle size={28} />

                            </div>

                            <div>

                                <h2 className="
                                    text-3xl
                                    font-extrabold
                                    text-gray-800
                                ">
                                    Send Message
                                </h2>

                                <p className="
                                    text-gray-500 mt-1
                                ">
                                    We reply quickly to all inquiries.
                                </p>

                            </div>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleWhatsApp}
                            className="mt-10 space-y-6"
                        >

                            {/* NAME */}
                            <div>

                                <label className="
                                    text-sm font-semibold
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
mt-3
px-5 py-4
rounded-2xl
bg-white
border border-gray-200
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
                                    text-sm font-semibold
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
mt-3
px-5 py-4
rounded-2xl
bg-white
border border-gray-200
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
                                    text-sm font-semibold
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
mt-3
px-5 py-4
rounded-2xl
bg-white
border border-gray-200
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
                                    text-sm font-semibold
                                    text-gray-700
                                ">
                                    Message
                                </label>

                                <input
                                    type="text"
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
mt-3
px-5 py-4
rounded-2xl
bg-white
border border-gray-200
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
                                    w-full
                                    py-4
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-blue-600 to-cyan-500
                                    text-white
                                    font-bold
                                    text-lg
                                    shadow-xl
                                    hover:scale-[1.02]
                                    transition-all duration-300
                                    flex items-center
                                    justify-center gap-3
                                "
                            >

                                Send Message

                                <Send size={20} />

                            </button>

                        </form>

                    </div>

                </div>

            </section>

            {/* CTA */}
            <section className="
                bg-[#021B33]
                py-20
                text-white
            ">

                <div className="
                    max-w-7xl mx-auto
                    px-6 lg:px-10
                    text-center
                ">

                    <h2 className="
                        text-4xl lg:text-5xl
                        font-extrabold
                    ">

                        Premium Printing
                        <br />
                        For Every School

                    </h2>

                    <p className="
                        mt-6
                        text-blue-100
                        max-w-2xl mx-auto
                        text-lg
                        leading-8
                    ">

                        High quality acrylic ID cards,
                        diaries, exam copies, belts,
                        brochures and custom printing solutions.

                    </p>

                    <button className="
                        mt-10
                        inline-flex items-center gap-3
                        bg-white
                        text-blue-700
                        px-8 py-4
                        rounded-2xl
                        font-bold
                        shadow-xl
                        hover:scale-105
                        transition-all duration-300
                    ">

                        Explore Products

                        <ChevronRight size={22} />

                    </button>

                </div>

            </section>

        </div>
    );
}