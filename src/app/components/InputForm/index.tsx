interface InputOption {
    value: string;
    label: string;
}

interface InputFormProps {
    label?: string;
    helperText?: string;
    id: string;
    type: "text" | "textarea" | "radio";
    rows?: number;
    placeholder?: string;
    required?: boolean;
    value?: string;
    footerFieldText?: string;
    onFooterFieldClick?: () => void;
    options?: InputOption[];
}

export default function InputForm({
    label,
    helperText,
    id,
    type,
    placeholder,
    required = false,
    value,
    footerFieldText,
    onFooterFieldClick,
    rows = 3,
    options = [],
}: InputFormProps) {
    return (
        <div className="w-full">
            {type !== "radio" && (
                <label htmlFor={id} className="font-semibold text-sm">
                    {label}
                    {required && <span className="text-red-500"> *</span>}{" "}
                </label>
            )}

            {type === "radio" && (
                <div className="font-semibold text-sm">
                    {label}
                    {required && <span className="text-red-500"> *</span>}{" "}
                </div>
            )}

            {helperText && (
                <div className="text-neutral-500 text-sm mt-2">
                    {helperText}
                </div>
            )}

            {type === "text" && (
                <input
                    id={id}
                    className="w-full mt-2 p-2 border h-10 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            )}

            {type === "textarea" && (
                <textarea
                    id={id}
                    className="w-full resize-none border mt-4 p-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 min-h-[6rem]"
                    placeholder={placeholder}
                    value={value}
                    rows={rows}
                />
            )}

            {type === "radio" && (
                <div className="flex flex-col gap-2 mt-2">
                    {options?.map((option) => (
                        <div className="flex items-center" key={option.value}>
                            <input
                                id={`radio-${option.value}`}
                                type="radio"
                                name="access"
                                value={option.value}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                required
                            />

                            <label
                                htmlFor={`radio-${option.value}`}
                                className="ml-2 text-gray-700"
                            >
                                <span className="text-base font-normal">
                                    {option.label}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {footerFieldText && (
                <div
                    onClick={onFooterFieldClick}
                    className="text-xs text-blue-500 font-medium mt-2 cursor-pointer "
                >
                    {footerFieldText}
                </div>
            )}
        </div>
    );
}
