const STYLES: Record<string, string> = {
    Delivered: "bg-green-100 text-green-700",
    Preparing: "bg-yellow-100 text-yellow-700",
    "On the way": "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
    "In Stock": "bg-green-100 text-green-700",
    "Low Stock": "bg-yellow-100 text-yellow-700",
    "Out of Stock": "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }: { status: string }) {
    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STYLES[status] ?? "bg-gray-100 text-gray-700"}`}>
            {status}
        </span>
    );
}