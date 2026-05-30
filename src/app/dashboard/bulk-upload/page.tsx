"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import {
    Upload,
    FileSpreadsheet,
    FileArchive,
    CheckCircle2,
    X,
    LoaderCircle,
    ImageIcon,
    CloudUpload,
    Sparkles,
    LayoutDashboard,
    Users,
    ArrowRight,
    PlusCircle,
} from "lucide-react";

export default function BulkUploadPage() {

    const [file, setFile] = useState<File | null>(null);
    const [zipFile, setZipFile] = useState<File | null>(null);

    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [imageProgress, setImageProgress] = useState(0);
    const [totalImages, setTotalImages] = useState(0);

    const [dragActive, setDragActive] = useState(false);
    const [lastFileName, setLastFileName] = useState("");

    const [showImage, setShowImage] = useState(false);

    const [loadingPage, setLoadingPage] = useState(true);

    const xhrRef = useRef<XMLHttpRequest | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const zipRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false);
        }, 4000);
    }, []);


    // RESET
    const resetFiles = () => {

        setFile(null);
        setZipFile(null);
        setLastFileName("");

        if (fileRef.current) fileRef.current.value = "";
        if (zipRef.current) zipRef.current.value = "";
    };

    // FILE SIZE
    const formatSize = (size: number) => {
        return (size / 1024 / 1024).toFixed(2) + " MB";
    };

    // DRAG DROP
    const handleDrop = (e: React.DragEvent) => {

        e.preventDefault();

        setDragActive(false);

        const droppedFile = e.dataTransfer.files[0];

        if (!droppedFile) return;

        if (droppedFile.name === lastFileName) {

            toast.error("Same file already selected ❌");

            return;
        }

        setFile(droppedFile);

        setLastFileName(droppedFile.name);

        toast.success("Excel file selected ✅");
    };

    // UPLOAD
    const handleUpload = () => {

        if (!file) {

            toast.error("Please select Excel file ❌");

            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        if (zipFile) {
            formData.append("images", zipFile);
        }

        const xhr = new XMLHttpRequest();

        xhrRef.current = xhr;

        xhr.open("POST", "/api/students/bulk", true);

        xhr.withCredentials = true;

        setUploading(true);
        setProgress(0);
        setProcessing(false);

        xhr.upload.onprogress = (event) => {

            if (event.lengthComputable) {

                const percent = Math.round(
                    (event.loaded / event.total) * 100
                );

                setProgress(percent);
            }
        };

        xhr.onload = () => {

            let data: any = {};

            try {

                data = JSON.parse(xhr.responseText);

            } catch { }

            if (xhr.status === 200) {

                setProgress(100);

                setUploading(false);

                setProcessing(true);

                toast.success("Students uploaded successfully ✅");

                const total = data.inserted || 10;

                setTotalImages(total);

                let count = 0;

                const interval = setInterval(() => {

                    count++;

                    setImageProgress(count);

                    if (count >= total) {

                        clearInterval(interval);

                        resetFiles();

                        setTimeout(() => {

                            router.push("/dashboard/create-id");

                        }, 1200);
                    }

                }, 80);

            } else {

                setUploading(false);

                setProgress(0);

                resetFiles();

                toast.error(
                    data.message || "Upload failed ❌"
                );
            }
        };

        xhr.onerror = () => {

            setUploading(false);

            setProgress(0);

            resetFiles();

            toast.error("Server error ❌");
        };

        xhr.send(formData);
    };

    // CANCEL
    const handleCancel = () => {

        xhrRef.current?.abort();

        setUploading(false);

        setProcessing(false);

        setProgress(0);

        resetFiles();

        toast("Upload cancelled ❌");
    };

    if (loadingPage) {

        return (

            <div className="
            fixed inset-0
            bg-gradient-to-br
            from-[#021B33]
            via-[#04284B]
            to-[#063B6E]
            overflow-hidden
            z-[999]
        ">

                {/* BACKGROUND GLOW */}
                <div className="
                absolute top-[-120px] left-[-120px]
                w-[320px] h-[320px]
                bg-cyan-400/20 blur-3xl rounded-full
                animate-pulse
            " />

                <div className="
                absolute bottom-[-120px] right-[-120px]
                w-[320px] h-[320px]
                bg-blue-500/20 blur-3xl rounded-full
                animate-pulse
            " />

                {/* MAIN */}
                <div className="
                relative z-10
                min-h-screen
                flex items-center justify-center
                px-4
            ">

                    <div className="
                    w-full max-w-xl
                    bg-white/10 backdrop-blur-2xl
                    border border-white/10
                    rounded-[32px]
                    p-8 sm:p-12
                    shadow-2xl
                    text-center
                ">

                        {/* ICON */}
                        <div className="relative w-fit mx-auto">

                            {/* GLOW */}
                            <div className="
                            absolute inset-0
                            bg-cyan-400/30 blur-3xl
                            rounded-full animate-pulse
                        " />

                            {/* MAIN CIRCLE */}
                            <div className="
                            relative
                            w-28 h-28
                            rounded-full
                            bg-white/10
                            border border-white/10
                            flex items-center justify-center
                            shadow-2xl
                        ">

                                <CloudUpload
                                    size={52}
                                    className="text-white"
                                />

                                {/* SPINNER */}
                                <div className="
                                absolute -bottom-1 -right-1
                                w-10 h-10 rounded-full
                                bg-cyan-500
                                flex items-center justify-center
                                shadow-lg
                            ">

                                    <LoaderCircle
                                        size={22}
                                        className="
                                        text-white animate-spin
                                    "
                                    />

                                </div>

                            </div>

                        </div>

                        {/* TITLE */}
                        <h1 className="
                        mt-10
                        text-3xl sm:text-4xl
                        font-extrabold
                        text-white
                        tracking-tight
                    ">
                            Loading Bulk Upload
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="
                        mt-4
                        text-blue-100
                        text-sm sm:text-base
                        leading-relaxed
                        max-w-md mx-auto
                    ">
                            Preparing upload system, Excel engine and image processing tools...
                        </p>

                        {/* FEATURE CARDS */}
                        <div className="
                        mt-10
                        grid grid-cols-1 sm:grid-cols-2
                        gap-4
                    ">

                            {/* CARD */}
                            <div className="
                            bg-white/10
                            border border-white/10
                            rounded-2xl
                            p-5
                            text-left
                        ">

                                <div className="
                                w-12 h-12
                                rounded-xl
                                bg-cyan-500/20
                                flex items-center justify-center
                            ">

                                    <FileSpreadsheet
                                        className="text-cyan-300"
                                        size={24}
                                    />

                                </div>

                                <h3 className="
                                mt-4
                                text-white
                                font-bold
                                text-lg
                            ">
                                    Excel Validator
                                </h3>

                                <p className="
                                mt-2
                                text-blue-100
                                text-sm
                            ">
                                    Loading spreadsheet validation engine.
                                </p>

                            </div>

                            {/* CARD */}
                            <div className="
                            bg-white/10
                            border border-white/10
                            rounded-2xl
                            p-5
                            text-left
                        ">

                                <div className="
                                w-12 h-12
                                rounded-xl
                                bg-green-500/20
                                flex items-center justify-center
                            ">

                                    <ImageIcon
                                        className="text-green-300"
                                        size={24}
                                    />

                                </div>

                                <h3 className="
                                mt-4
                                text-white
                                font-bold
                                text-lg
                            ">
                                    Image Processor
                                </h3>

                                <p className="
                                mt-2
                                text-blue-100
                                text-sm
                            ">
                                    Initializing image optimization system.
                                </p>

                            </div>

                        </div>

                        {/* LOADING DOTS */}
                        <div className="
                        mt-10
                        flex justify-center gap-3
                    ">

                            <div className="
                            w-3 h-3 rounded-full
                            bg-white animate-bounce
                        " />

                            <div className="
                            w-3 h-3 rounded-full
                            bg-white animate-bounce
                            [animation-delay:0.2s]
                        " />

                            <div className="
                            w-3 h-3 rounded-full
                            bg-white animate-bounce
                            [animation-delay:0.4s]
                        " />

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-[#F4F7FB]">

            {/* HEADER */}
            <div
                className="
                relative
mt-[80px]
                overflow-hidden

                bg-gradient-to-r
                from-[#021B33]
                via-[#04284B]
                to-[#063B6E]

                text-white
            "
            >

                {/* Glow */}
                <div
                    className="
                    absolute
                    -top-32
                    -left-32

                    w-[400px]
                    h-[400px]

                    bg-cyan-400/10

                    blur-[120px]

                    rounded-full
                "
                ></div>

                <div
                    className="
                    absolute
                    -bottom-32
                    -right-32

                    w-[400px]
                    h-[400px]

                    bg-blue-500/10

                    blur-[120px]

                    rounded-full
                "
                ></div>

                {/* Grid */}
                <div
                    className="
                    absolute inset-0

                    opacity-[0.04]

                    [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]

                    [background-size:60px_60px]
                "
                ></div>

                <div
                    className="
                    relative z-10

                    max-w-7xl
                    mx-auto

                    px-4
                    sm:px-6
                    lg:px-8

                    py-8
                    sm:py-10
                "
                >

                    <div
                        className="
                        flex flex-col
                        xl:flex-row

                        xl:items-center
                        xl:justify-between

                        gap-6
                    "
                    >

                        {/* ================= LEFT ================= */}
                        <div className="flex items-start gap-4">

                            <div
                                className="
                                w-14 h-14
                                sm:w-16 sm:h-16

                                rounded-3xl

                                bg-white/10
                                backdrop-blur-2xl

                                border border-white/10

                                flex items-center justify-center

                                shadow-[0_10px_40px_rgba(0,0,0,0.35)]

                                shrink-0
                            "
                            >

                                <Upload size={34} />

                            </div>

                            <div>

                                <h1
                                    className="
                                    text-3xl
                                    sm:text-4xl
                                    lg:text-5xl

                                    font-extrabold

                                    tracking-tight
                                "
                                >
                                    Bulk Upload
                                </h1>

                                <p
                                    className="
                                    mt-3

                                    text-blue-100

                                    text-sm
                                    sm:text-base

                                    max-w-2xl

                                    leading-relaxed
                                "
                                >
                                    Welcome! Upload student data in bulk using Excel. Drag and drop your file or select it manually to get started.
                                </p>

                            </div>

                        </div>

                        {/* ================= RIGHT BUTTONS ================= */}
                        <div
                            className="
    flex

    flex-col
    sm:flex-row

    items-stretch
    sm:items-center
    justify-center
    xl:justify-end

    gap-3
    sm:gap-4

    w-full
    xl:w-auto

    mt-2
    xl:mt-0
  "
                        >

                            {/* ================= STUDENTS BUTTON ================= */}
                            <Link
                                href="/dashboard/students"
                                className="
group
                            
                                                            flex items-center
                                                            justify-center
                                                            gap-2
                            
                                                            bg-white
                            
                                                            text-[#021B33]
                            
                                                            hover:bg-blue-50
                            
                                                            font-semibold
                            
                                                            px-5 py-3
                            
                                                            rounded-2xl
                            
                                                            shadow-xl
                            
                                                            transition-all duration-300
                            
                                                            hover:scale-[1.02]
                            
                                                            w-full h-[50px] sm:w-auto
    "
                            >

                                <Users
                                    size={18}
                                    className="
        shrink-0

        group-hover:scale-110

        transition-transform
        duration-300
      "
                                />

                                <span className="leading-none whitespace-nowrap">
                                    Students
                                </span>

                                <ArrowRight
                                    size={18}
                                    className="
        shrink-0

        group-hover:translate-x-1

        transition-transform
        duration-300
      "
                                />

                            </Link>

                            {/* ================= CREATE ID BUTTON ================= */}
                            <Link
                                href="/dashboard/create-id"
                                className="
      group

                                flex items-center
                                justify-center
                                gap-2

                                bg-gradient-to-r
                                from-green-500
                                to-green-700

                                hover:scale-[1.02]

                                text-white

                                font-semibold

                                px-5 py-3

                                rounded-2xl

                                shadow-[0_10px_40px_rgba(34,211,238,0.35)]

                                transition-all duration-300

                                w-full sm:w-auto h-[50px]
    "
                            >

                                <PlusCircle
                                    size={20}
                                    className="
        shrink-0

        group-hover:rotate-90

        transition-transform
        duration-300
      "
                                />

                                <span className="leading-none whitespace-nowrap">
                                    Create ID Card
                                </span>

                            </Link>

                            {/* ================= DASHBOARD BUTTON ================= */}
                            <Link
                                href="/dashboard"
                                className="
     group

                                flex items-center
                                justify-center
                                gap-2

                                bg-gradient-to-r
                                from-cyan-500
                                to-blue-600

                                hover:scale-[1.02]

                                text-white

                                font-semibold

                                px-5 py-3

                                rounded-2xl

                                shadow-[0_10px_40px_rgba(34,211,238,0.35)]

                                transition-all duration-300

                                w-full h-[50px] sm:w-auto
    "
                            >

                                <LayoutDashboard
                                    size={20}
                                    className="
        shrink-0

        group-hover:rotate-6

        transition-transform
        duration-300
      "
                                />

                                <span className="leading-none whitespace-nowrap">
                                    Dashboard
                                </span>

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

            <div className="
                max-w-7xl mx-auto
                px-4 sm:px-6 lg:px-8
                py-8
            ">

                {/* NORMAL UI */}
                {!uploading && !processing && (

                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* LEFT */}
                        <div className="
                            bg-white rounded-3xl
                            shadow-sm border border-gray-100
                            p-6
                        ">

                            <div className="flex items-center gap-3">

                                <Sparkles className="text-blue-600" />

                                <h2 className="
                                    text-2xl font-bold text-gray-800
                                ">
                                    Excel Format Guide
                                </h2>

                            </div>

                            <p className="
                                text-gray-500 mt-2 text-sm leading-relaxed
                            ">
                                Use the correct Excel format for successful uploads.
                            </p>

                            {/* IMAGE */}
                            <div
                                onClick={() => setShowImage(true)}
                                className="
                                    mt-6 overflow-hidden
                                    rounded-2xl cursor-pointer
                                    group border
                                "
                            >

                                <img
                                    src="/excel format.jpeg"
                                    alt="Excel Format"
                                    className="
                                        w-full transition duration-500
                                        group-hover:scale-105
                                    "
                                />

                            </div>

                            {/* DOWNLOAD */}
                            <a
                                href="/sample.xlsx"
                                download
                                className="
                                    mt-6 w-full flex items-center
                                    justify-center gap-2
                                    bg-green-600 hover:bg-green-700
                                    text-white py-3 rounded-2xl
                                    font-semibold transition
                                "
                            >

                                <FileSpreadsheet size={20} />

                                Download Sample Excel

                            </a>

                        </div>

                        {/* RIGHT */}
                        <div className="
                            bg-white rounded-3xl
                            shadow-sm border border-gray-100
                            p-6
                        ">

                            <div className="flex items-center gap-3">

                                <Upload className="text-blue-600" />

                                <h2 className="
                                    text-2xl font-bold text-gray-800
                                ">
                                    Upload Files
                                </h2>

                            </div>

                            {/* DRAG AREA */}
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragActive(true);
                                }}
                                onDragLeave={() =>
                                    setDragActive(false)
                                }
                                onDrop={handleDrop}
                                className={`
                                    mt-6 border-2 border-dashed
                                    rounded-3xl p-10
                                    text-center transition-all duration-300
                                    ${dragActive
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-gray-300"
                                    }
                                `}
                            >

                                <div className="
                                    w-20 h-20 mx-auto rounded-full
                                    bg-blue-100 flex items-center justify-center
                                ">
                                    <CloudUpload
                                        size={40}
                                        className="text-blue-600"
                                    />
                                </div>

                                <h3 className="
                                    mt-5 text-xl font-bold text-gray-800
                                ">
                                    Drag & Drop Excel File
                                </h3>

                                <p className="
                                    mt-2 text-sm text-gray-500
                                ">
                                    Upload .xlsx or .xls files
                                </p>

                            </div>

                            {/* EXCEL */}
                            <div className="mt-6">

                                <label className="
                                    text-sm font-semibold text-gray-700
                                ">
                                    Excel File
                                </label>

                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={(e) => {

                                        const selected =
                                            e.target.files?.[0];

                                        if (!selected) return;

                                        if (
                                            selected.name === lastFileName
                                        ) {

                                            toast.error("Same file ❌");

                                            return;
                                        }

                                        setFile(selected);

                                        setLastFileName(selected.name);
                                    }}
                                    className="
                                        mt-2 w-full border border-gray-200
                                        rounded-2xl p-3
                                    "
                                />

                                {file && (

                                    <div className="
                                        mt-4 bg-blue-50
                                        border border-blue-100
                                        rounded-2xl p-4
                                        flex items-center justify-between
                                    ">

                                        <div className="flex items-center gap-3">

                                            <div className="
                                                w-12 h-12 rounded-xl
                                                bg-blue-600 text-white
                                                flex items-center justify-center
                                            ">
                                                <FileSpreadsheet size={24} />
                                            </div>

                                            <div>

                                                <h4 className="
                                                    font-semibold text-gray-800
                                                ">
                                                    {file.name}
                                                </h4>

                                                <p className="
                                                    text-xs text-gray-500
                                                ">
                                                    {formatSize(file.size)}
                                                </p>

                                            </div>

                                        </div>

                                        <button
                                            onClick={() => {

                                                setFile(null);

                                                setLastFileName("");

                                                if (fileRef.current) {
                                                    fileRef.current.value = "";
                                                }
                                            }}
                                            className="
                                                w-9 h-9 rounded-full
                                                bg-red-100 text-red-500
                                                flex items-center justify-center
                                            "
                                        >
                                            <X size={18} />
                                        </button>

                                    </div>
                                )}

                            </div>

                            {/* ZIP */}
                            <div className="mt-6">

                                <label className="
                                    text-sm font-semibold text-gray-700
                                ">
                                    Images ZIP (Optional)
                                </label>

                                <input
                                    ref={zipRef}
                                    type="file"
                                    accept=".zip"
                                    onChange={(e) => {

                                        const selected =
                                            e.target.files?.[0];

                                        if (!selected) return;

                                        setZipFile(selected);
                                    }}
                                    className="
                                        mt-2 w-full border border-gray-200
                                        rounded-2xl p-3
                                    "
                                />

                                {zipFile && (

                                    <div className="
                                        mt-4 bg-orange-50
                                        border border-orange-100
                                        rounded-2xl p-4
                                        flex items-center justify-between
                                    ">

                                        <div className="flex items-center gap-3">

                                            <div className="
                                                w-12 h-12 rounded-xl
                                                bg-orange-500 text-white
                                                flex items-center justify-center
                                            ">
                                                <FileArchive size={24} />
                                            </div>

                                            <div>

                                                <h4 className="
                                                    font-semibold text-gray-800
                                                ">
                                                    {zipFile.name}
                                                </h4>

                                                <p className="
                                                    text-xs text-gray-500
                                                ">
                                                    {formatSize(zipFile.size)}
                                                </p>

                                            </div>

                                        </div>

                                        <button
                                            onClick={() => {

                                                setZipFile(null);

                                                if (zipRef.current) {
                                                    zipRef.current.value = "";
                                                }
                                            }}
                                            className="
                                                w-9 h-9 rounded-full
                                                bg-red-100 text-red-500
                                                flex items-center justify-center
                                            "
                                        >
                                            <X size={18} />
                                        </button>

                                    </div>
                                )}

                            </div>

                            {/* BUTTON */}
                            <button
                                onClick={handleUpload}
                                disabled={!file}
                                className={`
                                    mt-8 w-full py-4 rounded-2xl
                                    font-semibold text-white
                                    transition-all duration-300
                                    flex items-center justify-center gap-3
                                    ${!file
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-xl hover:scale-[1.01]"
                                    }
                                `}
                            >

                                <Upload size={20} />

                                Upload Student Data

                            </button>

                        </div>

                    </div>
                )}

                {/* UPLOADING */}
                {uploading && (

                    <div className="
                        max-w-2xl mx-auto
                        bg-white rounded-3xl
                        p-10 shadow-sm border
                        text-center
                    ">

                        <div className="
                            w-24 h-24 mx-auto rounded-full
                            bg-blue-100 flex items-center justify-center
                        ">

                            <LoaderCircle
                                size={50}
                                className="
                                    text-blue-600 animate-spin
                                "
                            />

                        </div>

                        <h2 className="
                            mt-6 text-3xl font-extrabold text-gray-800
                        ">
                            Uploading Files...
                        </h2>

                        <p className="
                            mt-2 text-gray-500
                        ">
                            Please wait while your data is uploading.
                        </p>

                        {/* PROGRESS */}
                        <div className="
                            mt-8 w-full bg-gray-200
                            h-4 rounded-full overflow-hidden
                        ">

                            <div
                                className="
                                    bg-gradient-to-r
                                    from-blue-600 to-cyan-500
                                    h-4 rounded-full transition-all
                                "
                                style={{
                                    width: `${progress}%`,
                                }}
                            />

                        </div>

                        <p className="
                            mt-3 text-lg font-bold text-blue-600
                        ">
                            {progress}%
                        </p>

                        <button
                            onClick={handleCancel}
                            className="
                                mt-6 bg-red-500 hover:bg-red-600
                                text-white px-6 py-3 rounded-2xl
                                font-semibold transition
                            "
                        >
                            Cancel Upload
                        </button>

                    </div>
                )}

                {/* PROCESSING */}
                {processing && (

                    <div className="
                        max-w-2xl mx-auto
                        bg-white rounded-3xl
                        p-10 shadow-sm border
                        text-center
                    ">

                        <div className="
                            w-24 h-24 mx-auto rounded-full
                            bg-green-100 flex items-center justify-center
                        ">

                            <ImageIcon
                                size={50}
                                className="
                                    text-green-600 animate-pulse
                                "
                            />

                        </div>

                        <h2 className="
                            mt-6 text-3xl font-extrabold text-gray-800
                        ">
                            Processing Images
                        </h2>

                        <p className="
                            mt-2 text-gray-500
                        ">
                            Optimizing student photos and preparing records.
                        </p>

                        <div className="
                            mt-8 w-full bg-gray-200
                            h-4 rounded-full overflow-hidden
                        ">

                            <div
                                className="
                                    bg-gradient-to-r
                                    from-green-500 to-emerald-500
                                    h-4 rounded-full transition-all
                                "
                                style={{
                                    width: `${(imageProgress / totalImages) * 100}%`,
                                }}
                            />

                        </div>

                        <p className="
                            mt-4 text-lg font-bold text-green-600
                        ">
                            {imageProgress}/{totalImages}
                        </p>

                        <div className="
                            mt-6 flex items-center justify-center gap-2
                            text-green-600 font-semibold
                        ">

                            <CheckCircle2 size={22} />

                            Processing student data...

                        </div>

                    </div>
                )}

            </div>

            {/* IMAGE MODAL */}
            {showImage && (

                <div
                    onClick={() => setShowImage(false)}
                    className="
                        fixed inset-0 bg-black/80
                        flex items-center justify-center
                        z-50 p-4
                    "
                >

                    <img
                        src="/excel format.jpeg"
                        alt="Excel Preview"
                        className="
                            max-w-full max-h-full
                            rounded-3xl shadow-2xl
                        "
                    />

                </div>
            )}

        </div>
    );
}