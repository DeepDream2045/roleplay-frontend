interface CategoryProps {
    children: React.ReactNode;
    color?: string;
    active?: boolean;
}

export default function Category({ children, active = false }: CategoryProps) {
    return (
        <div
            className={`px-4 py-2 flex flex-shrink-0 font-semibold text-sm ${
                active
                    ? "bg-red-500 text-slate-100"
                    : "bg-slate-200 text-neutral-800"
            } rounded-md`}
        >
            {children}
        </div>
    );
}
