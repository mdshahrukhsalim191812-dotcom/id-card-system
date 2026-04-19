"use client";

import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";

export default function ImageCropper({ image, onCropComplete }: any) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const handleCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        onCropComplete(croppedAreaPixels);
    }, []);

    return (
        <div className="flex flex-col gap-3">

            {/* 🔥 CROPPER AREA */}
            <div className="relative w-full h-64 bg-black">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={3 / 4}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                />
            </div>

            {/* 🔥 ZOOM SLIDER */}
            <div className="flex items-center gap-3">
                <span className="text-sm">🔍</span>

                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                />

                <span className="text-sm">{zoom.toFixed(1)}x</span>
            </div>

        </div>
    );
}