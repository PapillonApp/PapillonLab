import React from "react"
import styles from "./Button.module.css";
import { Loader } from "lucide-react";

interface ButtonProps {
    onPress?: () => void;
    children?: React.ReactNode;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    variant?: "primary" | "secondary" | "border";
    disabled?: boolean;
    centered?: boolean;
    withShadow?: boolean;
    withPadding?: boolean;
    loading?: boolean;
    collapsed?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    onPress,
    children,
    leading,
    trailing,
    variant = "primary",
    disabled = false,
    centered = false,
    withShadow = false,
    loading = false,
    collapsed = false,
    withPadding = true
}) => {
    return (
        <button className={`${styles.button} ${styles[variant]} ${centered ? styles.centered : ""} ${disabled ? styles.disabled : loading ? styles.disabled : ""} ${withShadow ? styles.shadow : ""} ${collapsed ? styles.collapsed : ""} ${withPadding ? "" : styles.noPadding}`} onClick={onPress} disabled={disabled || loading}>
            {leading && !loading && <span style={{display: "flex"}}>{leading}</span>}
            {loading && <span className={styles.loadingSpinner}><Loader size={24} /></span>}
            {!collapsed && children}
            {trailing && <span style={{display: "flex"}}>{trailing}</span>}
        </button>
    )
}

export default Button;