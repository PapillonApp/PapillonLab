import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className={styles.sidebar}>{children}</div>;
};

export { Sidebar };
