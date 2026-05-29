"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ================= PASSWORD CHECKER =================
function checkPassword(password: string) {

  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

function getStrengthScore(rules: any) {

  return Object.values(rules)
    .filter(Boolean).length;
}

export default function RegisterPage() {

  const router = useRouter();

  // ================= STATES =================
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword1, setShowPassword1] =
    useState(false);

  const [showPassword2, setShowPassword2] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // ================= PASSWORD RULES =================
  const rules =
    checkPassword(form.password);

  const score =
    getStrengthScore(rules);

  const strengthLabel =
    score <= 1
      ? "Weak"
      : score <= 3
        ? "Medium"
        : "Strong";

  const strengthColor =
    score <= 1
      ? "bg-red-500"
      : score <= 3
        ? "bg-yellow-500"
        : "bg-green-500";

  // ================= INPUT CHANGE =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (form.password !== confirmPassword) {

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

      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data =
        await res.json();

      if (res.ok) {

        toast.success(
          "Account Created Successfully ✅"
        );

        setTimeout(() => {

          router.push("/login");

        }, 1200);

      } else {

        if (res.status === 400) {

          toast.error(
            "User already exists"
          );

          router.push("/login");

        } else {

          toast.error(
            data.message ||
            "Registration Failed"
          );
        }
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong!"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

      {/* ================= GLOW EFFECTS ================= */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

      {/* ================= CARD ================= */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg">

        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-5 sm:p-8">

          {/* ================= BRAND SECTION ================= */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">

            {/* Logo */}
            <div className="flex-shrink-0">

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

            {/* Brand Text */}
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

                <span className="text-cyan-400">

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
          <div className="text-center mt-8">

            <h2 className="
                            text-2xl
                            sm:text-3xl
                            font-bold
                            text-white
                        ">

              Create Account

            </h2>

            <p className="
                            text-gray-300
                            text-sm
                            sm:text-base
                            mt-2
                        ">

              Register your school dashboard

            </p>

          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* ================= SCHOOL NAME ================= */}
            <div>

              <label className="text-sm text-gray-300">

                School Name

              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter school name"
                value={form.name}
                onChange={handleChange}
                required
                className="
                                    w-full
                                    mt-2
                                    p-3 sm:p-4
                                    rounded-2xl
                                    bg-white/10
                                    border border-white/20
                                    text-white
                                    placeholder-gray-400
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400
                                    transition-all
                                "
              />

            </div>

            {/* ================= EMAIL ================= */}
            <div>

              <label className="text-sm text-gray-300">

                Email Address

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={handleChange}
                required
                className="
                                    w-full
                                    mt-2
                                    p-3 sm:p-4
                                    rounded-2xl
                                    bg-white/10
                                    border border-white/20
                                    text-white
                                    placeholder-gray-400
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-400
                                    transition-all
                                "
              />

            </div>

            {/* ================= PASSWORD ================= */}
            <div>

              <label className="text-sm text-gray-300">

                Password

              </label>

              <div className="relative mt-2">

                <input
                  type={
                    showPassword1
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create strong password"
                  value={form.password}
                  onChange={handleChange}
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
                                    "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword1(
                      !showPassword1
                    )
                  }
                  className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-300
                                        hover:text-white
                                    "
                >
                  {showPassword1
                    ? <FaEyeSlash />
                    : <FaEye />}
                </button>

              </div>

              {/* ================= STRENGTH ================= */}
              {form.password && (

                <div className="mt-4">

                  <div className="
                                        w-full
                                        h-2
                                        bg-white/10
                                        rounded-full
                                        overflow-hidden
                                    ">

                    <div
                      className={`h-full ${strengthColor} transition-all duration-300`}
                      style={{
                        width: `${(score / 4) * 100}%`,
                      }}
                    />

                  </div>

                  <p className="
                                        text-sm
                                        text-gray-300
                                        mt-2
                                    ">

                    Password Strength:

                    <span className="font-semibold ml-1">

                      {strengthLabel}

                    </span>

                  </p>

                  {/* ================= RULES ================= */}
                  <div className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        gap-2
                                        mt-4
                                        text-sm
                                    ">

                    <p className={rules.length ? "text-green-400" : "text-red-400"}>
                      {rules.length ? "✔" : "✖"} 8 Characters
                    </p>

                    <p className={rules.uppercase ? "text-green-400" : "text-red-400"}>
                      {rules.uppercase ? "✔" : "✖"} Uppercase
                    </p>

                    <p className={rules.number ? "text-green-400" : "text-red-400"}>
                      {rules.number ? "✔" : "✖"} One Number
                    </p>

                    <p className={rules.special ? "text-green-400" : "text-red-400"}>
                      {rules.special ? "✔" : "✖"} Special Character
                    </p>

                  </div>

                </div>
              )}

            </div>

            {/* ================= CONFIRM PASSWORD ================= */}
            <div>

              <label className="text-sm text-gray-300">

                Confirm Password

              </label>

              <div className="relative mt-2">

                <input
                  type={
                    showPassword2
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
                                    "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword2(
                      !showPassword2
                    )
                  }
                  className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-300
                                        hover:text-white
                                    "
                >
                  {showPassword2
                    ? <FaEyeSlash />
                    : <FaEye />}
                </button>

              </div>

              {/* ================= MATCH ================= */}
              {confirmPassword && (

                <p
                  className={`mt-3 text-sm font-medium ${form.password === confirmPassword
                    ? "text-green-400"
                    : "text-red-400"
                    }`}
                >
                  {form.password === confirmPassword
                    ? "Passwords match ✔"
                    : "Passwords do not match ❌"}
                </p>
              )}

            </div>

            {/* ================= BUTTON ================= */}
            <button
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
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* ================= FOOTER ================= */}
          <p className="
                        text-center
                        text-gray-300
                        text-sm
                        mt-7
                    ">

            Already have an account?

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