import { LucideIcon, Share, TrafficCone } from "lucide-react";
import styles from "./ExportData.module.css";
import InformativeBox from "./InformativeBox";
import Button from "./Button";
import React from "react";
import PapillonSteps from "./PapillonSteps";
import { exportStudentData } from "../func/ExportStudentData";

interface DataType {
    label?: string;
    icon?: LucideIcon
}

interface ExportDataProps {
    collectedDatas: Array<DataType>
}

const ExportData: React.FC<ExportDataProps> = ({ collectedDatas }) => {
    const [exporting, setExporting] = React.useState<boolean>(false);
    const [exportingStep, setExportingStep] = React.useState<number>(0);

    const handleBtnPress = async () => {
        console.log("Exporting data...");
        setExporting(true);
        await exportStudentData(setExportingStep);
        setExportingStep(4);
    }

    return (
        <div className={styles.container }>
            <div style={{display: "flex", flexDirection: "column", gap: 10, position: "absolute"}} className={`${exporting ? styles.slideout : ""}`}>
                <div className={styles.title}>
                    <Share />
                    Exporter mes données
                </div>
                <div className={styles.subtitle}>
                    Télécharge un fichier contenant toutes tes données de scolarité enregistrées sur ton service scolaire. Ces données sont directement récupérées depuis ton service scolaire et ne transitent jamais par un serveur tiers.
                </div>
                <span className={`${styles.subtitle} ${styles.exportedDataText}`} style={{ marginTop: 10 }}>Tes données exportées incluront :</span>
                <div className={styles.datasContainer}>
                    {collectedDatas.map((data, index) => (
                        <InformativeBox key={index} icon={data.icon}>{data.label}</InformativeBox>
                    ))}
                </div>
                <div style={{paddingTop: 10}}>
                    <Button centered onPress={handleBtnPress}><span style={{height: 40, alignItems: "center", display: "flex"}}>Exporter mes données</span></Button>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 10, transform: "translateX(1000%)"}} className={`${exporting ? styles.slidein : ""}`}>
                <div className={styles.title}>
                    <TrafficCone />
                    Exportation des données en cours
                </div>
                <div className={styles.subtitle}>
                    Télécharge un fichier contenant toutes tes données de scolarité enregistrées sur ton service scolaire. Ces données sont directement récupérées depuis ton service scolaire et ne transitent jamais par un serveur tiers.
                </div>
                <div style={{ marginTop: 10 }}>
                    <PapillonSteps steps={[
                        { title: "Connexion au service scolaire"},
                        { title: "Récupération des données"},
                        { title: "Préparation du fichier"},
                        { title: "Téléchargement"}
                    ]} currentStep={exportingStep}/>
                </div>
            </div>
        </div>
    )
}

export default ExportData;