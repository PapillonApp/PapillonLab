import Button from "./Button";
import styles from "./PapillonSidebar.module.css";
import { useState } from "react";

interface PapillonSidebarTabs {
    label: string;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
}

interface PapillonSidebarProps {
    header?: React.ReactNode
    tabs: Array<PapillonSidebarTabs>;
    footer?: React.ReactNode
}

const PapillonSidebar: React.FC<PapillonSidebarProps> = ({ header, tabs, footer }) => {
    const [activeTab, setActiveTab] =  useState<number>(0)

    const handleTabPress = (index: number) => {
        if (activeTab !== index) {
            setActiveTab(index)
        }
    }

    return (
        <div className={styles.sidebar}>
            {header}
            <div style={{ width: "100%", gap: "10px", display: "flex", flexDirection: "column" }}>
                {tabs.map((tab, index) => (
                    <Button key={index} leading={tab.leading} trailing={tab.trailing} variant={activeTab === index ? "primary" : "secondary"} onPress={() => handleTabPress(index)}>
                        {tab.label}
                    </Button>
                ))}
            </div>
            {footer}
        </div>
    );
};

export default PapillonSidebar;