import React from "react"
import styles from "./Button.module.css";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
    children?: React.ReactNode;
    icon?: LucideIcon;
    variant?: "primary" | "secondary" | "informative"
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
    children,
    icon: Icon,
    variant = "primary",
    disabled = false
}) => {
    return (
        <button className={`${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ""}`}>
            {variant === "informative" && 
            <div className={`${styles.iconCircle} ${disabled ? styles.disabled : ""}`} style={{ backgroundColor: "#e3e2e2" }}>
                {Icon && <Icon size={16} absoluteStrokeWidth={true}/>}
            </div>}
            {Icon && variant !== "informative" && <Icon size={16} absoluteStrokeWidth={true}/>}
            {children}
        </button>
    )
}

export default Button;