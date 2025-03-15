import Button from "./Button";
import PapillonLabsLogo from "./PapillonLabLogo";
import styles from "./PapillonSidebar.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ClassName } from "./ClassName";

interface PapillonSidebarTabs {
    label: string;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    disabled?: boolean;
}

interface PapillonSidebarProps {
    onChange?: (newTab: number) => void;
    tabs: Array<PapillonSidebarTabs>;
    profilePic: string;
    name: string;
    classname: string;
}

const PapillonSidebar: React.FC<PapillonSidebarProps> = ({ onChange, tabs, profilePic, name, classname }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [cursor, setCursor] = useState<string>('default');

    useEffect(() => {
        const checkScreenWidth = () => {
            if (window.innerWidth < 500) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        checkScreenWidth();
        window.addEventListener("resize", checkScreenWidth);

        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, []);

    const handleTabPress = (index: number) => {
        if (activeTab !== index) {
            setActiveTab(index);
            if (onChange) {
                onChange(index);
            }
        }
    };

    const handleSidebarClick = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const sidebarElement = e.currentTarget as HTMLElement;
        const sidebarRect = sidebarElement.getBoundingClientRect();
        const borderPadding = 10;
        const borderRightX = sidebarRect.left + sidebarRect.width;

        if (
            clientX >= borderRightX - borderPadding &&
            clientX <= borderRightX &&
            clientY >= sidebarRect.top &&
            clientY <= sidebarRect.bottom
        ) {
            setIsCollapsed(!isCollapsed);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const sidebarElement = e.currentTarget as HTMLElement;
        const sidebarRect = sidebarElement.getBoundingClientRect();
        const borderPadding = 10;
        const borderRightX = sidebarRect.left + sidebarRect.width;

        if (
            e.clientX >= borderRightX - borderPadding &&
            e.clientX <= borderRightX &&
            e.clientY >= sidebarRect.top &&
            e.clientY <= sidebarRect.bottom
        ) {
            setCursor(isCollapsed ? "e-resize" : "w-resize");
        } else {
            setCursor('default');
        }
    };

    return (
        <div 
            className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
            onClick={handleSidebarClick}
            onMouseMove={handleMouseMove}
            style={{ cursor }}
        >
            <PapillonLabsLogo collapsed={isCollapsed}/>
            <div
                className={styles.tabsContainer}
            >
                {tabs.map((tab, index) => (
                    <Button key={index} leading={tab.leading} trailing={tab.trailing} variant={activeTab === index ? "primary" : "secondary"} onPress={() => handleTabPress(index)} collapsed={isCollapsed} disabled={tab.disabled}>
                        {tab.label}
                    </Button>
                ))}
            </div>
            <Button 
                variant="secondary" 
                onPress={() => console.log("Logout")}
                collapsed={isCollapsed}
                withPadding={false}
                leading={
                    <Image
                        src={profilePic}
                        alt="Profile Picture"
                        width={35}
                        height={35}
                        style={{ objectFit: "cover", borderRadius: "50%", marginRight: isCollapsed ?  0 : 8 }}
                    />
                }
                trailing={
                    !isCollapsed && classname ? <ClassName text={classname} /> : null
                }>
                <p style={{ marginTop: 2 }}>{name}</p>
            </Button>
        </div>
    );
};

export default PapillonSidebar;
