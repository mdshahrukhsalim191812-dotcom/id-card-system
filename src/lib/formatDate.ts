export const formatDate = (dateString: string) => {

    if (!dateString) return "N/A";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {

        day: "2-digit",

        month: "short",

        year: "numeric",
    });
};