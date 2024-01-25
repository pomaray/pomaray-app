import Sidebar from "@/components/ui/sidebar"

export const metadata = {
    title: "Admin"
}

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Sidebar />
            {children}
        </div>
    )
}