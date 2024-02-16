export type TabContent = {
    label: string;
    onClick: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        label: string
    ) => void;
};

export type DynamicTabComponentProps = {
    activeTab: string;
    contents: TabContent[];
};

const DynamicTabComponent: React.FC<DynamicTabComponentProps> = ({
    activeTab,
    contents,
}) => {
    return (
        <div className="flex flex-row gap-8">
            {contents.map((content) => (
                <button
                    key={content.label}
                    type="button"
                    onClick={(e) => {
                        content.onClick(e, content.label);
                    }}
                    className={`p-2 ${
                        activeTab === content.label
                            ? "bg-blue-500"
                            : "bg-gray-500"
                    } focus:outline-none text-white rounded-xl px-12`}
                >
                    {content.label}
                </button>
            ))}
        </div>
    );
};

export default DynamicTabComponent;
