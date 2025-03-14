"use client";
import { Share, User, WandSparkles, Image as ImageIcon, Calendar, ChartPie, School, MoreHorizontal } from "lucide-react";
import styles from "./dashboard.module.css";
import { useState, useEffect } from "react";
import PapillonSidebar from "../components/PapillonSidebar";
import PapillonLabsLogo from "../components/PapillonLabLogo";
import Image from "next/image";
import Button from "../components/Button";
import { ClassName } from "../components/ClassName";
import ExportData from "../components/ExportData";

export default function Dashboard() {
    const [activeTab, setActiveTab] =  useState<number>(0)
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
                    onChange={setActiveTab}
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
                 <div style={{width: "100%", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    {activeTab == 0 && (
                        <ExportData collectedDatas={[
                            {
                                label: "Ton nom, prénom et classe",
                                icon: User
                            },
                            {
                                label: "Ta photo de classe",
                                icon: ImageIcon
                            },
                            {
                                label: "Ton emploi du temps",
                                icon: Calendar
                            },
                            {
                                label: "Tes notes et moyennes",
                                icon: ChartPie
                            },
                            {
                                label: "Tes absences et retards",
                                icon: School
                            },
                            {
                                label: "Données diverses",
                                icon: MoreHorizontal
                            },
                        ]} />
                    )}
                </div>
            </main>
        </div>
    );
}