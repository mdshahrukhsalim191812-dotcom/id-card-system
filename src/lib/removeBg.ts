export const removeBackground = async (base64Image: string) => {
    try {
        const blob = await fetch(base64Image).then(res => res.blob());

        const formData = new FormData();
        formData.append("image_file", blob);

        const res = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": "J7igWfEh9xEaG7F61UuXGKK1",
            },
            body: formData,
        });

        if (!res.ok) {
            console.error("Remove.bg error");
            return base64Image;
        }

        const resultBlob = await res.blob();

        return await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(resultBlob);
        });

    } catch (err) {
        console.error(err);
        return base64Image;
    }
};