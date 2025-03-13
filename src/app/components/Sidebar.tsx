import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import PapillonLabsLogo from "./PapillonLabLogo";

const Sidebar: React.FC<{ children: React.ReactNode; onToggle: (expanded: boolean) => void }> = ({ children, onToggle }) => {
    const [expanded, setExpanded] = useState(true);


    return (
        <div className={`${styles.sidebar} ${expanded ? styles.expanded : styles.collapsed}`}>
            <div className={styles.header}>
                <PapillonLabsLogo />
            </div>
            <div className={styles.menu}>{children}</div>
        </div>
    );
};

const SidebarItem: React.FC<{ children: React.ReactNode; active?: boolean }> = ({ children, active }) => {
    return (
        <div className={`${styles.menuItem} ${active ? styles.active : ""}`}>{children}</div>
    );
};

export { Sidebar, SidebarItem };