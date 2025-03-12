import { LucideIcon } from "lucide-react";
import styles from "./InformativeBox.module.css";
import React from "react"

interface InformativeBoxProps {
    icon?: LucideIcon;
    children: React.ReactNode
}

const InformativeBox: React.FC<InformativeBoxProps> = ({
    icon: Icon,
    children
}) => {
    return (
        <div className={styles.informativeBox}>
            {Icon && <div className={styles.iconContainer}>
                <Icon color={"#737373"}/>
            </div>}
            {children}
        </div>
    )
}

export default InformativeBox;