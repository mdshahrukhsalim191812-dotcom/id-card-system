export const addWhiteBackground = (imageSrc: string) => {
    return new Promise<string>((resolve) => {
        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 300;
            canvas.height = 400;

            const ctx = canvas.getContext("2d");

            // WHITE BG
            ctx!.fillStyle = "#ffffff";
            ctx!.fillRect(0, 0, canvas.width, canvas.height);

            // IMAGE
            ctx!.drawImage(img, 0, 0, 300, 400);

            resolve(canvas.toDataURL("image/jpeg", 0.95));
        };
    });
};