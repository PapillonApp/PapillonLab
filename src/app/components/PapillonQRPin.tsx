import { useRef } from "react";
import styles from "./PapillonQRPin.module.css";

interface PapillonQRPinProps {
    onSubmit?: (pin: string) => void;
    onChange?: (pin: string) => void;
    numberOfCase?: number;
    disabled?: boolean;
}

const PapillonQRPin: React.FC<PapillonQRPinProps> = ({
    onSubmit = () => {},
    onChange = () => {},
    numberOfCase = 4,
    disabled = false
}) => {
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        e.target.value = value.slice(0, 1);

        if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        let pin = "";
        for (let i = 0; i < numberOfCase; i++) {
            pin += inputsRef.current[i]?.value || "";
        }
        
        onChange(pin);
        
        if (pin.length === numberOfCase) {
            onSubmit(pin);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className={styles.inputContainer}>
            {[...Array(numberOfCase)].map((_, index) => (
                <input
                    key={index}
                    type="number"
                    min={1}
                    max={9}
                    className={styles.pinInput}
                    ref={(el) => {
                        if (el) inputsRef.current[index] = el;
                    }}
                    onInput={(e) => handleInput(e as React.ChangeEvent<HTMLInputElement>, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={disabled}
                />
            ))}
        </div>
    );
};

export default PapillonQRPin;
