"use client";

import {
    Suspense,
    useState,
} from "react";

import Image from "next/image";

import Link from "next/link";

import {
    useSearchParams,
    useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import {
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

// ================= PASSWORD RULES =================
function checkPassword(
    password: string
) {

    return {
        length:
            password.length >= 8,

        uppercase:
            /[A-Z]/.test(password),

        lowercase:
            /[a-z]/.test(password),

        number:
            /[0-9]/.test(password),

        special:
            /[^A-Za-z0-9]/.test(password),
    };
}

function getScore(
    rules: any
) {

    return Object
        .values(rules)
        .filter(Boolean)
        .length;
}

// ================= MAIN CONTENT =================
function ResetPasswordContent() {

    const searchParams =
        useSearchParams();

    const router =
        useRouter();

    const email =
        searchParams.get("email");

    // ================= STATES =================
    const [password, setPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const [show1, setShow1] =
        useState(false);

    const [show2, setShow2] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    // ================= PASSWORD =================
    const rules =
        checkPassword(password);

    const score =
        getScore(rules);

    const strength =
        score <= 2
            ? "Weak"
            : score <= 4
                ? "Medium"
                : "Strong";

    const color =
        score <= 2
            ? "bg-red-500"
            : score <= 4
                ? "bg-yellow-500"
                : "bg-green-500";

    // ================= SUBMIT =================
    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!email) {

            toast.error(
                "Invalid request ❌"
            );

            return;
        }

        if (
            password !==
            confirmPassword
        ) {

            toast.error(
                "Passwords do not match ❌"
            );

            return;
        }

        if (score < 4) {

            toast.error(
                "Password is too weak ❌"
            );

            return;
        }

        setLoading(true);

        try {

            const res =
                await fetch(
                    "/api/auth/reset-password",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    }
                );

            const data =
                await res.json();

            if (res.ok) {

                toast.success(
                    "Password updated successfully ✅"
                );

                setTimeout(() => {

                    router.push(
                        "/login"
                    );

                }, 1200);

            } else {

                toast.error(
                    data.message ||
                    "Error ❌"
                );
            }

        } catch {

            toast.error(
                "Server Error ❌"
            );

        } finally {

            setLoading(false);
        }
    };

    // ================= UI =================
    return (

        <div className="
            relative
            min-h-screen
            overflow-hidden
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-cyan-950
            flex
            items-center
            justify-center
            px-4
            py-8
            sm:px-6
            lg:px-8
        ">

            {/* ================= GLOW EFFECTS ================= */}
            <div className="
                absolute
                top-0 left-0
                w-72 h-72
                bg-cyan-500/20
                rounded-full
                blur-3xl
            "></div>

            <div className="
                absolute
                bottom-0 right-0
                w-72 h-72
                bg-blue-500/20
                rounded-full
                blur-3xl
            "></div>

            {/* ================= CARD ================= */}
            <div className="
                relative z-10
                w-full
                max-w-md
                sm:max-w-lg
            ">

                <div className="
                    backdrop-blur-2xl
                    bg-white/10
                    border border-white/20
                    rounded-3xl
                    shadow-2xl
                    p-5
                    sm:p-8
                ">

                    {/* ================= BRAND ================= */}
                    <div className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        sm:gap-4
                    ">

                        {/* LOGO */}
                        <div className="
                            flex-shrink-0
                        ">

                            <Image
                                src="/genix-logo.png"
                                alt="Work GeniX Logo"
                                width={80}
                                height={80}
                                priority
                                className="
                                    object-contain
                                    w-14 h-14
                                    sm:w-16 sm:h-16
                                    md:w-20 md:h-20
                                "
                            />

                        </div>

                        {/* BRAND TEXT */}
                        <div>

                            <h1 className="
                                text-2xl
                                sm:text-3xl
                                md:text-4xl
                                font-extrabold
                                tracking-wide
                                text-white
                                leading-tight
                            ">

                                Work{" "}

                                <span className="
                                    text-cyan-400
                                ">
                                    GeniX
                                </span>

                            </h1>

                            <p className="
                                text-gray-300
                                text-[10px]
                                sm:text-xs
                                md:text-sm
                                mt-1
                            ">

                                Printing | Designing | Branding

                            </p>

                        </div>

                    </div>

                    {/* ================= HEADING ================= */}
                    <div className="
                        text-center
                        mt-8
                    ">

                        <h2 className="
                            text-2xl
                            sm:text-3xl
                            font-bold
                            text-white
                        ">

                            Reset Password

                        </h2>

                        <p className="
                            text-gray-300
                            text-sm
                            sm:text-base
                            mt-2
                        ">

                            Create your new secure password

                        </p>

                    </div>

                    {/* ================= FORM ================= */}
                    <form
                        onSubmit={handleSubmit}
                        className="
                            mt-8
                            space-y-5
                        "
                    >

                        {/* ================= NEW PASSWORD ================= */}
                        <div>

                            <label className="
                                text-sm
                                text-gray-300
                            ">

                                New Password

                            </label>

                            <div className="
                                relative
                                mt-2
                            ">

                                <input
                                    type={
                                        show1
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Create strong password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="
                                        w-full
                                        p-3 sm:p-4
                                        rounded-2xl
                                        bg-white/10
                                        border border-white/20
                                        text-white
                                        placeholder-gray-400
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-cyan-400
                                        pr-12
                                        transition-all
                                        duration-300
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShow1(
                                            !show1
                                        )
                                    }
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-300
                                        hover:text-white
                                        transition
                                    "
                                >

                                    {show1
                                        ? <FaEyeSlash />
                                        : <FaEye />}

                                </button>

                            </div>

                            {/* ================= STRENGTH ================= */}
                            {password && (

                                <div className="
                                    mt-4
                                ">

                                    {/* BAR */}
                                    <div className="
                                        w-full
                                        h-2
                                        bg-white/10
                                        rounded-full
                                        overflow-hidden
                                    ">

                                        <div
                                            className={`
                                                h-full
                                                ${color}
                                                transition-all
                                                duration-300
                                            `}
                                            style={{
                                                width:
                                                    `${(score / 5) * 100}%`,
                                            }}
                                        />

                                    </div>

                                    {/* TEXT */}
                                    <p className="
                                        text-sm
                                        text-gray-300
                                        mt-2
                                    ">

                                        Password Strength:

                                        <span className="
                                            ml-1
                                            font-semibold
                                        ">

                                            {strength}

                                        </span>

                                    </p>

                                    {/* RULES */}
                                    <div className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        gap-2
                                        mt-4
                                        text-sm
                                    ">

                                        <p className={
                                            rules.length
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }>
                                            {rules.length ? "✔" : "✖"} 8 Characters
                                        </p>

                                        <p className={
                                            rules.uppercase
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }>
                                            {rules.uppercase ? "✔" : "✖"} Uppercase
                                        </p>

                                        <p className={
                                            rules.lowercase
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }>
                                            {rules.lowercase ? "✔" : "✖"} Lowercase
                                        </p>

                                        <p className={
                                            rules.number
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }>
                                            {rules.number ? "✔" : "✖"} Number
                                        </p>

                                        <p className={
                                            rules.special
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }>
                                            {rules.special ? "✔" : "✖"} Special Character
                                        </p>

                                    </div>

                                </div>
                            )}

                        </div>

                        {/* ================= CONFIRM PASSWORD ================= */}
                        <div>

                            <label className="
                                text-sm
                                text-gray-300
                            ">

                                Confirm Password

                            </label>

                            <div className="
                                relative
                                mt-2
                            ">

                                <input
                                    type={
                                        show2
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="
                                        w-full
                                        p-3 sm:p-4
                                        rounded-2xl
                                        bg-white/10
                                        border border-white/20
                                        text-white
                                        placeholder-gray-400
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-cyan-400
                                        pr-12
                                        transition-all
                                        duration-300
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShow2(
                                            !show2
                                        )
                                    }
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-300
                                        hover:text-white
                                        transition
                                    "
                                >

                                    {show2
                                        ? <FaEyeSlash />
                                        : <FaEye />}

                                </button>

                            </div>

                            {/* ================= MATCH STATUS ================= */}
                            {confirmPassword && (

                                <p className={`
                                    mt-3
                                    text-sm
                                    font-medium
                                    ${password === confirmPassword
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }
                                `}>

                                    {password === confirmPassword
                                        ? "Passwords match ✔"
                                        : "Passwords do not match ❌"}

                                </p>
                            )}

                        </div>

                        {/* ================= BUTTON ================= */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                py-3 sm:py-4
                                rounded-2xl
                                bg-gradient-to-r
                                from-cyan-500
                                to-blue-600
                                hover:scale-[1.02]
                                active:scale-[0.98]
                                transition-all
                                duration-300
                                text-white
                                font-semibold
                                text-base sm:text-lg
                                shadow-xl
                                shadow-cyan-500/30
                            "
                        >

                            {loading
                                ? "Updating Password..."
                                : "Update Password"}

                        </button>

                    </form>

                    {/* ================= FOOTER ================= */}
                    <p className="
                        text-center
                        text-gray-300
                        text-sm
                        mt-7
                    ">

                        Back to

                        <Link
                            href="/login"
                            className="
                                text-cyan-400
                                font-semibold
                                ml-1
                                hover:underline
                            "
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

// ================= SUSPENSE =================
export default function ResetPasswordPage() {

    return (

        <Suspense
            fallback={
                <div className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-slate-950
                    text-white
                ">
                    Loading...
                </div>
            }
        >

            <ResetPasswordContent />

        </Suspense>
    );
}