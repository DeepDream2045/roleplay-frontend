interface CategoryProps {
    children: React.ReactNode;
    color?: string;
    active?: boolean;
}

export default function Category({ children, active = false }: CategoryProps) {
    return (
        <div
            className={`relative px-2 py-2 flex flex-row items-center justify-center font-semibold cursor-pointer select-none whitespace-nowrap text-xs ${
                active
                    ? "bg-blue-500 text-white-0"
                    : "bg-white-0 dark:bg-black-400 text-black-900 dark:text-white-0"
            } rounded-md`}
        >
            {children}
        </div>
    );
}
