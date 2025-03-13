import React from "react"
import styles from "./Button.module.css";
import { Loader } from "lucide-react";

interface ButtonProps {
    onPress?: () => void;
    children?: React.ReactNode;
    leading?: React.ReactNode;
    variant?: "primary" | "secondary" | "border";
    disabled?: boolean;
    centered?: boolean;
    withShadow?: boolean;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    onPress,
    children,
    leading,
    variant = "primary",
    disabled = false,
    centered = false,
    withShadow = false,
    loading = false
}) => {
    return (
        <button className={`${styles.button} ${styles[variant]} ${centered ? styles.centered : ""} ${disabled ? styles.disabled : loading ? styles.disabled : ""} ${withShadow ? styles.shadow : ""}`} onClick={onPress} disabled={disabled || loading}>
            {leading && !loading && <span style={{display: "flex"}}>{leading}</span>}
            {loading && <span className={styles.loadingSpinner}><Loader size={24} /></span>}
            {children}
        </button>
    )
}

export default Button;