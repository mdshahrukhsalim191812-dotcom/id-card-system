export const getSchool = () => {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem("school") || "null");
};