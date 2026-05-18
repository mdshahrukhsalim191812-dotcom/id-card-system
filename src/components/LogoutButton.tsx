"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
    const confirmLogoutToast = () => {
        return new Promise((resolve) => {
            toast((t) => (
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium">
                        Are you sure you want to logout?
                    </p>

                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => {
                                toast.dismiss(t.id);
                                resolve(false);
                            }}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-400 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => {
                                toast.dismiss(t.id);
                                resolve(true);
                            }}
                            className="px-3 py-1 bg-red-500 hover:bg-red-800 text-white rounded"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ));
        });
    };
    const router = useRouter();

    const handleLogout = async () => {
        const confirm = await confirmLogoutToast();

        if (!confirm) return; // ❌ user cancelled

        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                localStorage.removeItem("schoolId");

                toast.success("Logged out successfully");

                router.push("/login");
                router.refresh();
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="font-semibold bg-gradient-to-r from-red-800 to-red-500 hover:bg-gradient-to-r from-red-500 to-red-950 hover:text-yellow-300 text-white px-4 py-2 rounded-lg h-[50px]"
        >
            Logout
        </button>
    );
}