export type TInputBaseProps = TInputLabel & {
    name: string;
    placeholder?: string;
    helperText?: string;
    helperTextClassName?: string;
    footerFieldText?: string;
    footerFieldTextClassName?: string;
    inputClassName?: string;
    id?: string;
    value?: string;
    onChange?: () => void;
    onChangeText?: () => void;
    footerFieldText?: string;
    onFooterFieldClick?: () => void;
};

export type TInputLabel = {
    label?: string;
    labelClassName?: string;
    requiredClassName?: string;
    required?: boolean;
};

export type TInputOption = {
    value: string;
    label: string;
};
