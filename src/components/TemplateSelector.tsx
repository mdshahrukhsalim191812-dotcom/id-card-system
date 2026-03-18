"use client";

export default function TemplateSelector({ setTemplate }: { setTemplate: any }) {
    return (
        <div className="flex gap-4">
            <button
                onClick={() => setTemplate("classic")}
                className="border p-3"
            >
                Classic
            </button>

            <button
                onClick={() => setTemplate("modern")}
                className="border p-3"
            >
                Modern
            </button>
        </div>
    );
}