"use client";
import { Share, WandSparkles } from "lucide-react";
import styles from "./dashboard.module.css";
import { useState, useEffect } from "react";
import PapillonSidebar from "../components/PapillonSidebar";
import PapillonLabsLogo from "../components/PapillonLabLogo";
import Image from "next/image";
import Button from "../components/Button";
import { ClassName } from "../components/ClassName";

export default function Dashboard() {
    const [profilePic, setProfilePic] = useState<string>("/defaultProfilePic.jpg");
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setProfilePic(localStorage.getItem("profilePicture") || "/defaultProfilePic.jpg");
            setName(localStorage.getItem("name") || "");
        }
    }, []);
    
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <PapillonSidebar 
                    header={<PapillonLabsLogo />}
                    tabs={[{
                        label: "Exporter mes données",
                        leading: <Share absoluteStrokeWidth={true} size={20} />
                    },
                    {
                        label: "Papillon Magic+",
                        leading: <WandSparkles absoluteStrokeWidth={true} size={20} />
                    }]}
                    footer={
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
                            trailing={
                                localStorage.getItem("classname") ? <ClassName text={localStorage.getItem("classname") || ""} /> : null}
                            >
                            <p style={{ marginTop: 2 }}>{name}</p>
                        </Button>
                    }
                />
            </main>
        </div>
    );
}