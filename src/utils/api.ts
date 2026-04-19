export const fetchStudentsAPI = async () => {
    const res = await fetch("/api/students", {
        credentials: "include",
    });

    if (res.status === 401) {
        localStorage.removeItem("schoolId");
        window.location.href = "/login";
        throw new Error("Unauthorized");
    }

    return res.json();
};