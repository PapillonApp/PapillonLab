import { LucideIcon, Share } from "lucide-react";
import styles from "./ExportData.module.css";
import InformativeBox from "./InformativeBox";
import Button from "./Button";

interface DataType {
    label?: string;
    icon?: LucideIcon
}

interface ExportDataProps {
    collectedDatas: Array<DataType>
}

const ExportData: React.FC<ExportDataProps> = ({ collectedDatas }) => {
    return (
        <div style={{display: "flex", flexDirection: "column", gap: 10, maxWidth: "40%"}}>
            <div className={styles.title}>
                <Share />
                Exporter mes données
            </div>
            <div className={styles.subtitle}>
                Télécharge un fichier contenant toutes tes données de scolarité enregistrées sur ton service scolaire. Ces données sont directement récupérées depuis ton service scolaire et ne transitent jamais par un serveur tiers.
            </div>
            <span className={styles.subtitle} style={{ marginTop: 10 }}>Tes données exportées incluront :</span>
            <div className={styles.datasContainer}>
                {collectedDatas.map((data, index) => (
                    <InformativeBox key={index} icon={data.icon}>{data.label}</InformativeBox>
                ))}
            </div>
            <div style={{paddingTop: 10}}>
                <Button centered withShadow><span style={{height: 40, alignItems: "center", display: "flex"}}>Exporter mes données</span></Button>
            </div>
        </div>
    )
}

export default ExportData;