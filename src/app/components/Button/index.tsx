interface ButtonProps {
    children: string;
    className: HTMLButtonElement["className"];
}

export default function Button({ children, className = "" }: ButtonProps) {
    const baseClassName: HTMLButtonElement["className"] =
        "w-full h-10 rounded-lg bg-blue-500 text-white font-semibold";

    return (
        <button className={`${baseClassName} ${className}`}>{children}</button>
    );
}
