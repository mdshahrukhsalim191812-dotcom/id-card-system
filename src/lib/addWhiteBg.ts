export const addWhiteBackground = (
    imageSrc: string
) => {

    return new Promise<string>((resolve) => {

        const img = new Image();

        img.crossOrigin = "anonymous";

        img.src = imageSrc;

        img.onload = () => {

            // 🔥 MATCH EXACT ID FRAME RATIO
            const WIDTH = 107;
            const HEIGHT = 132;

            const canvas =
                document.createElement("canvas");

            canvas.width = WIDTH;
            canvas.height = HEIGHT;

            const ctx =
                canvas.getContext("2d");

            if (!ctx) return;

            // WHITE BG
            ctx.fillStyle = "#ffffff";

            ctx.fillRect(
                0,
                0,
                WIDTH,
                HEIGHT
            );

            // IMAGE
            ctx.drawImage(
                img,
                0,
                0,
                WIDTH,
                HEIGHT
            );

            resolve(
                canvas.toDataURL(
                    "image/png",
                    1
                )
            );
        };
    });
};