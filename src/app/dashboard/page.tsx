"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import styles from "./dashboard.module.css";
import Button from "../components/Button";
import { Share, WandSparkles } from "lucide-react";
import PapillonLabsLogo from "../components/PapillonLabLogo";
import Image from "next/image";
import { ClassName } from "../components/ClassName";

export default function Dashboard() {
    const [activeButton, setActiveButton] = useState<string | null>("export");
    const [profilePic, setProfilePic] = useState<string>("/defaultProfilePic.jpg");
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setProfilePic(localStorage.getItem("profilePicture") || "/defaultProfilePic.jpg");
            setName(localStorage.getItem("name") || "");
        }
    }, []);

    const handleExportClick = () => {
        console.log("Exporter mes données en légende");
        setActiveButton("export");
    };

    const handleMagicClick = () => {
        console.log("Papillon Magic+ waaaouuu le futur");
        setActiveButton("magic");
    };

    return (
        <div className={styles.page}>
            <div className={styles.sidebar}>
            <Sidebar>
                <div>
                    <PapillonLabsLogo width={200} />
                </div>

                <div className={styles.pages}>
                    <Button
                        variant={activeButton === "export" ? "primary" : "secondary"}
                        leading={<Share absoluteStrokeWidth={true} size={20} />}
                        onPress={handleExportClick}
                    >
                        <p style={{ marginTop: 2 }}>Exporter mes données</p>
                    </Button>
                    <Button
                        variant={activeButton === "magic" ? "primary" : "secondary"}
                        leading={<WandSparkles absoluteStrokeWidth={true} size={20} />}
                        onPress={handleMagicClick}
                    >
                        <p style={{ marginTop: 2 }}>Papillon Magic+</p>
                    </Button>
                </div>

                <div>
                    <Button variant="secondary" onPress={() => console.log("Logout")}
                      leading={
                        <Image
                            src={profilePic}
                            alt="Profile Picture"
                            width={35}
                            height={35}
                            style={{ objectFit: "cover", borderRadius: "50%", marginRight: 8 }}
                        />
                      }
                      trailing={localStorage.getItem("classname") ? <ClassName text={localStorage.getItem("classname") || ""} /> : null}
                      >
                        
                        <p style={{ marginTop: 2 }}>{name}</p>
                    </Button>
                </div>
            </Sidebar>
            </div>

            <div className={styles.content}>
                <span>Dashboard</span>
            </div>
        </div>
    );
}
