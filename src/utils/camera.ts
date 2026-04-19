export const startCameraStream = async (videoRef: any) => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
    });

    if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
    }
};

export const stopCameraStream = (videoRef: any) => {
    const stream = videoRef.current?.srcObject;

    if (stream) {
        stream.getTracks().forEach((track: any) => track.stop());
        videoRef.current.srcObject = null;
    }
};

export const captureFromVideo = (video: HTMLVideoElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    return canvas.toDataURL("image/png");
};