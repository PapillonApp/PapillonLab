import { CircleHelp, Download, FileQuestion, FileSpreadsheet, LucideIcon, MicVocal, Sparkles } from "lucide-react";
import styles from "./ExportData.module.css";
import React, { useEffect } from "react";
import { exportAssignements, exportCategorizedAssignments, MagicAssignment } from "../func/ExportMagicData";
import MagicButton from "./MagicButton";
import Button from "./Button";

interface DataType {
    label?: string;
    icon?: LucideIcon
}

interface ExportMagicDataProps {
    collectedDatas?: Array<DataType>
}
const getCurrentMagicButtonForAssignment = (assignment: MagicAssignment) => {
    const buttonConfigs: Record<string, { icon: LucideIcon, label: string, color: string, keybind?: string }> = {
        "evaluation": { icon: Sparkles, label: "Évaluation", color: "FF9514", keybind: "E" },
        "homework": { icon: FileSpreadsheet, label: "Devoir Maison", color: "BD14FF", keybind: "D" },
        "finaltask": { icon: MicVocal, label: "Tâche finale", color: "CE5347", keybind: "F" },
        "oral": { icon: MicVocal, label: "Présentations Orales", color: "145FFF", keybind: "G" },
        "sheets": { icon: MicVocal, label: "Fiches", color: "13c35d", keybind: "H" },
        "none": { icon: CircleHelp, label: "Aucun", color: "AFAFAF", keybind: "Suppr" },
    };

    const config = buttonConfigs[assignment?.type as keyof typeof buttonConfigs] ?? buttonConfigs["none"];

    return <MagicButton icon={config.icon} label={config.label} color={config.color} />;
};

const ExportMagicData: React.FC<ExportMagicDataProps> = () => {
    const [magicStep, setMagicStep] = React.useState<number>(0);
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const [categorizeFinish, setCategorizeFinish] = React.useState<boolean>(false);
    const [assignments, setAssignments] = React.useState<Array<MagicAssignment>>([]);
    
    const [currentAssignmentIndex, setCurrentAssignmentIndex] = React.useState<number>(0);

    const handleNextStep = async () => {
        console.log("Exporting data...");
        if (magicStep == 0) {
            setDisabled(true)
            const assignments = await exportAssignements();
            setAssignments(assignments);
            setMagicStep(magicStep+1);
        }
        if (magicStep == 1) {
            setCurrentAssignmentIndex(0);
            setMagicStep(magicStep+1);
        }
    }

    const handleSetAssignmentType = (type: string) => {
        const newAssignments = [...assignments];
        newAssignments[currentAssignmentIndex].type = type;
        setAssignments(newAssignments);
        setCurrentAssignmentIndex(currentAssignmentIndex+1);
        console.log(currentAssignmentIndex, assignments.length)
        if (currentAssignmentIndex == assignments.length-1) {
            setCategorizeFinish(true);
            handleNextStep();
            exportCategorizedAssignments(assignments);
        }
    }

    useEffect(() => {    
            const handleKeyPress = (event: KeyboardEvent) => {
                if (event.key === "Enter") {
                    if (magicStep !== 1) {
                        handleNextStep();
                    } else {
                        handleSetAssignmentType(assignments[currentAssignmentIndex].type ?? "none");
                    }
                }
            };
    
            window.addEventListener("keydown", handleKeyPress);
    
            return () => {
                window.removeEventListener("keydown", handleKeyPress);
            };
    }, [currentAssignmentIndex, magicStep]);

    const getOtherMagicButtonForAssignment = (assignment: MagicAssignment) => {
        const buttonConfigs: Record<string, { icon: LucideIcon, label: string, color: string, keybind?: string }> = {
            "evaluation": { icon: Sparkles, label: "Évaluation", color: "FF9514", keybind: "E" },
            "homework": { icon: FileSpreadsheet, label: "Devoir Maison", color: "BD14FF", keybind: "D" },
            "finaltask": { icon: MicVocal, label: "Tâche finale", color: "CE5347", keybind: "F" },
            "oral": { icon: MicVocal, label: "Présentations Orales", color: "145FFF", keybind: "G" },
            "sheets": { icon: MicVocal, label: "Fiches", color: "13c35d", keybind: "H" },
            "none": { icon: CircleHelp, label: "Aucun", color: "AFAFAF", keybind: "Suppr" },
        };
    
        return Object.entries(buttonConfigs)
            .filter(([key]) => key !== assignment?.type && (assignment?.type || key !== "none"))
            .map(([key, config]) => (
                <MagicButton
                    key={config.label}
                    icon={config.icon}
                    label={config.label}
                    color={config.color}
                    keybind={config.keybind}
                    onPress={() => handleSetAssignmentType(key)}
                />
            ));
    };

    return (
        <div className={styles.container} style={{ width: "100%", height: "100%", padding: 30, alignItems: "center", justifyContent: "center", display: "flex", position: "relative"}}>
            <div style={{position: "absolute", top: 20, left: 20, width: "100%"}}>
                <div className={styles.title}>
                    <Sparkles />
                    Papillon Magic+
                </div>
                <div className={styles.subtitle}>
                        Cet onglet sert uniquement à classifier vos données afin de nous aider dans le développement de Papillon Magic+
                </div>
            </div>
            <div style={{position: "absolute", bottom: 20, left: 20}}>
                <Button onPress={() => {
                    setDisabled(false)
                    setMagicStep(magicStep-1)
                }} disabled={magicStep == 0}>Étape précédente</Button>
            </div>
            <div style={{position: "absolute", bottom: 20, right: 20}}>
                <Button onPress={() => {
                    handleNextStep()
                }} disabled={disabled || (magicStep == 1 && !categorizeFinish)}>Étape suivante</Button>
            </div>
            <div style={{ flexDirection: "column", gap: 10, position: "absolute", visibility: magicStep == 0 ? "visible" : "hidden", opacity: magicStep === 0 ? 1 : 0, transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out", transform: "translateX(1000%)" }} className={`${magicStep !== 0 ? styles.slideout : styles.slidein}`}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 30, flexDirection: "column"}}>
                    <FileQuestion color="#FFFFFF80" absoluteStrokeWidth size={50} strokeWidth={5}/>
                    <div style={{marginTop: 20}} className={styles.title}>Aucune donnée</div>
                    <span className={styles.subtitle} style={{ width: "fit-content"}}>Appuyez sur étape suivante afin de collecter vos devoirs et pouvoir les classifier</span>
                </div>
            </div>
            {magicStep == 1 && (
                <div style={{ flexDirection: "column", gap: 10, position: "absolute", visibility: magicStep == 1 ? "visible" : "hidden", opacity: magicStep === 1 ? 1 : 0, transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out", transform: "translateX(1000%)" }} className={`${magicStep !== 1 ? styles.slideout : styles.slidein}`}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 30, flexDirection: "column", gap: 10}}>
                        <div className={styles.homework} style={{ maxWidth: "80%", textAlign: "center" }}>
                            {assignments[currentAssignmentIndex]?.description ?? "Aucune description"}
                        </div>
                        {getCurrentMagicButtonForAssignment(assignments[currentAssignmentIndex])}
                        <span className={styles.subtitle} style={{ width: "fit-content", marginTop: "10px" }}>Si le résultat est incorrect, sélectionne la catégorie appropriée.</span>
                        <div className={styles.datasContainer} style={{ justifyContent: "center" }}>
                            {getOtherMagicButtonForAssignment(assignments[currentAssignmentIndex])}
                        </div>
                    </div>
                </div>
            )}
            <div style={{ flexDirection: "column", gap: 10, position: "absolute", visibility: magicStep == 2 ? "visible" : "hidden", opacity: magicStep === 2 ? 1 : 0, transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out", transform: "translateX(1000%)" }} className={`${magicStep !== 2 ? styles.slideout : styles.slidein}`}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 30, flexDirection: "column"}}>
                    <Download color="#FFFFFF80" absoluteStrokeWidth size={50} strokeWidth={5}/>
                    <div style={{marginTop: 20}} className={styles.title}>C&apos;est tout bon !</div>
                    <span className={styles.subtitle} style={{ width: "fit-content"}}>Un téléchargement vient de commencer, il contient tes données catégoriser</span>
                </div>
            </div>
        </div>
    )
}

export default ExportMagicData;