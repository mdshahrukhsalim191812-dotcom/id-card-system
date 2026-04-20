export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        const newForm = new FormData();
        newForm.append("image_file", file);

        const res = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": process.env.REMOVE_BG_API_KEY!,
            },
            body: newForm,
        });

        if (!res.ok) {
            return Response.json({ success: false });
        }

        const blob = await res.blob();

        return new Response(blob, {
            headers: {
                "Content-Type": "image/png",
            },
        });

    } catch (err) {
        return Response.json({ success: false });
    }
}