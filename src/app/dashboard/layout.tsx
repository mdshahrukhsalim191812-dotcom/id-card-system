import Navbar from "@/components/Navbar";

export default function DashboardLayout(
    { children }: {
        children: React.ReactNode;
    }) {
    return (
        <div>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                {children}
            </div>
        </div>
    );
}