import React from "react";
import styles from "./PapillonSteps.module.css";
import { Check } from "lucide-react";

interface Step {
    title: string;
}

interface PapillonStepsProps {
    currentStep: number;
    steps: Step[];
}

const PapillonSteps: React.FC<PapillonStepsProps> = ({ currentStep = 0, steps }) => {
    return (
        <div className={styles.stepsContainer}>
            {steps.map((data, index) => (
                <div key={index} className={styles.stepContainer}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div className={`${styles.stepCircle} ${currentStep >= index ? styles.activeCircle : ""}`}>
                            {currentStep >= index ? <Check absoluteStrokeWidth={true} size={20}/> : index + 1}
                        </div>
                        <span className={`${styles.stepTitle} ${currentStep >= index ? styles.activeStepTitle : ""}`}>{data.title}</span>
                    </div>
                    {steps.length - 1 !== index && (
                        <div className={`${styles.stepLine} ${currentStep >= index ? currentStep === index ? styles.inProgressStepLine : styles.activeStepLine : ""}`}></div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PapillonSteps;
