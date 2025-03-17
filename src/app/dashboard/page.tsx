"use client";
import { Share, User, WandSparkles, Image as ImageIcon, Calendar, ChartPie, School, MoreHorizontal, Book } from "lucide-react";
import styles from "./dashboard.module.css";
import { useState, useEffect } from "react";
import PapillonSidebar from "../components/PapillonSidebar";
import ExportData from "../components/ExportData";
import defaultProfilePicture from "../../../public/assets/defaultProfilePicture.jpg"
import { useRouter } from "next/navigation";
import { refreshSession } from "../utils/Authentication";
import ExportMagicData from "../components/ExportMagicData";

export default function Dashboard() {
    const [activeTab, setActiveTab] =  useState<number>(0)
    const [profilePic, setProfilePic] = useState<string>(defaultProfilePicture.src);
    const [name, setName] = useState<string>("");
    const [classname, setClassname] = useState<string | null>(null);

    const router = useRouter()
    
    useEffect(() => {
        const fetchSession = async () => {
            if (typeof window !== "undefined") {
                setProfilePic(localStorage.getItem("profilePicture") || defaultProfilePicture.src);
                setName(localStorage.getItem("name") || "");
                setClassname(localStorage.getItem("classname"));
            }

            if (!localStorage.getItem("token")) {
                router.push("/");
            }
            
            if (localStorage.getItem("lastLogin")) {
                if (Date.now() - parseInt(localStorage.getItem("lastLogin") as string) > 120000) {
                    try {
                        const session = await refreshSession();
                        console.log(session)
                    } catch (error) {
                        console.log(error)
                        router.push("/");
                    }
                }
            }
        };
    
        fetchSession();
    }, [router]);
    
    
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <PapillonSidebar 
                    onChange={setActiveTab}
                    tabs={[{
                        label: "Exporter mes données",
                        leading: <Share absoluteStrokeWidth={true} size={20} />
                    },
                    {
                        label: "Papillon Magic+",
                        leading: <WandSparkles absoluteStrokeWidth={true} size={20} />
                    }]}
                    profilePic={profilePic}
                    name={name}
                    classname={classname || ""}
                />
                 <div className={styles.tabContainer}>
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
                    {activeTab == 1 && (
                        <ExportMagicData collectedDatas={[
                            {
                                label: "Tes devoirs",
                                icon: Book
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