import toast from "react-hot-toast";

export async function fetchWithAuth(url: string, options?: RequestInit) {
    const res = await fetch(url, {
        ...options,
        credentials: "include",
    });

    if (res.status === 401) {
        toast.error("Session expired 🔒");

        localStorage.removeItem("schoolId");

        window.location.href = "/login";

        return null;
    }

    return res;
}