import { LucideIcon, MicVocal, Share, Sparkles, TrafficCone } from "lucide-react";
import styles from "./ExportData.module.css";
import InformativeBox from "./InformativeBox";
import Button from "./Button";
import React from "react";
import { exportMagicDataset } from "../func/ExportMagicData";
import PapillonSteps from "./PapillonSteps";
import MagicButton from "./MagicButton";

interface DataType {
    label?: string;
    icon?: LucideIcon
}

interface ExportMagicDataProps {
    collectedDatas: Array<DataType>
}

const ExportMagicData: React.FC<ExportMagicDataProps> = ({ collectedDatas }) => {
    const [exporting, setExporting] = React.useState<boolean>(false);
    const [exportingStep, setExportingStep] = React.useState<number>(0);

    const handleBtnPress = async () => {
        console.log("Exporting data...");
        setExporting(true);
        await exportMagicDataset(setExportingStep);
    }

    return (
        <div className={styles.container }>
            <div style={{display: "flex", flexDirection: "column", gap: 10, position: "absolute"}} className={`${exporting ? styles.slideout : ""}`}>
                <div className={styles.title}>
                    <Share />
                    Papillon Magic+
                </div>
                <div className={styles.subtitle}>
                    Exporte un fichier pour entraîner PapillonMagic+, notre modèle IA avancé. Tes données contribueront directement à son amélioration et ne transiteront jamais par un serveur tiers.
                </div>
                <span className={`${styles.subtitle} ${styles.exportedDataText}`} style={{ marginTop: 10 }}>Tes données exportées incluront :</span>
                <div className={styles.datasContainer}>
                    <MagicButton icon={Sparkles} label="Évaluation" color="FF9514"/>
                    <MagicButton icon={MicVocal} label="Devoir Maison" color="BD14FF" keybind="D"/>
                    <MagicButton icon={MicVocal} label="Compte Rendu" color="CE5347" keybind="F"/>
                    <MagicButton icon={MicVocal} label="Présentations Orales" color="145FFF" keybind="G"/>
                    <MagicButton icon={MicVocal} label="Lecture" color="13c35d" keybind="H"/>
                    <MagicButton icon={MicVocal} label="Aucun" color="AFAFAF" keybind="Suppr"/>
                    {collectedDatas.map((data, index) => (
                        <InformativeBox key={index} icon={data.icon}>{data.label}</InformativeBox>
                    ))}
                </div>
                <div style={{paddingTop: 10}}>
                    <Button centered withShadow onPress={handleBtnPress}><span style={{height: 40, alignItems: "center", display: "flex"}}>Exporter mes données</span></Button>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 10, transform: "translateX(1000%)"}} className={`${exporting ? styles.slidein : ""}`}>
                <div className={styles.title}>
                    <TrafficCone />
                    Exportation des données en cours
                </div>
                <div className={styles.subtitle}>
                    Exporte un fichier pour entraîner PapillonMagic+, notre modèle IA avancé. Tes données contribueront directement à son amélioration et ne transiteront jamais par un serveur tiers.
                </div>
                <div style={{ marginTop: 10 }}>
                    <PapillonSteps steps={[
                        { title: "Connexion au service scolaire"},
                        { title: "Récupération des données"},
                        { title: "Formatage des données"},
                        { title: "Verification des données"},
                        { title: "Téléchargement"}
                    ]} currentStep={exportingStep}/>
                </div>
            </div>
        </div>
    )
}

export default ExportMagicData;