import React from "react";
import styles from "./Sidebar.module.css";
import PapillonLabsLogo from "./PapillonLabLogo";
import Button from "./Button";
import Image from "next/image";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <PapillonLabsLogo width={200} />
            </div>
            <div className={styles.pages}>{children}</div>
            <Button
                variant="secondary"
                onPress={() => console.log("Logout")}
                leading={
                    <Image
                        src={ localStorage.getItem("profilePicture") || "/defaultProfilePic.jpg" }
                        alt="Profile Picture"
                        width={35}
                        height={35}
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                        
                    />
                }
            >
                <p style={{ marginTop: 2 }}>{typeof window !== "undefined" ? localStorage.getItem("name") : ""}</p>
            </Button>
        </div>
    );
};

export { Sidebar };
