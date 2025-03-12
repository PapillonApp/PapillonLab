import React from "react"
import styles from "./Button.module.css";

interface ButtonProps {
    onPress?: () => void;
    children?: React.ReactNode;
    leading?: React.ReactNode;
    variant?: "primary" | "secondary";
    disabled?: boolean;
    centered?: boolean;
    withShadow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    onPress,
    children,
    leading,
    variant = "primary",
    disabled = false,
    centered = false,
    withShadow = false
}) => {
    return (
        <button className={`${styles.button} ${styles[variant]} ${centered ? styles.centered : ""} ${disabled ? styles.disabled : ""} ${withShadow ? styles.shadow : ""}`} onClick={onPress} disabled={disabled}>
            {leading && <span style={{display: "flex"}}>{leading}</span>}
            {children}
        </button>
    )
}

export default Button;