import { HTMLInputTypeAttribute } from "react";
import styles from "./PapillonInput.module.css";

interface PapillonInputProps {
    onSubmit?: () => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    value?: string;
}

const PapillonInput: React.FC<PapillonInputProps> = ({
    onSubmit,
    onChange,
    placeholder,
    type,
    value
}) => {
    return (
        <input
        placeholder={placeholder}
        type={type}
        className={styles.input}
        onChange={onChange}
        value={value}
        onKeyDown={(event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                if (onSubmit) {
                    onSubmit();
                }
            }
        }}
        />
    )
}

export default PapillonInput;