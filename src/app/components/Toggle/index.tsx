interface ToggleProps {
    toggled: boolean;
    onChange: (checked: boolean) => void;
}

export default function Toggle({ toggled, onChange }: ToggleProps) {
    return (
        <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                toggled ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => onChange(!toggled)}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition 
          ${toggled ? "translate-x-6" : "translate-x-1"}
        }`}
            />
        </button>
    );
}
