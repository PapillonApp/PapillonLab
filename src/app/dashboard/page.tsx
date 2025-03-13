"use client";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import styles from "./dashboard.module.css";
import Button from "../components/Button";
import { Share, WandSparkles } from "lucide-react";

export default function Dashboard() {
  const [activeButton, setActiveButton] = useState<string | null>("export");

  const handleExportClick = () => {
    console.log("Exporter mes données en légende");
    setActiveButton("export");
  };

  const handleMagicClick = () => {
    console.log("Papillon Magic+ waaaouuu le futur");
    setActiveButton("magic");
  };

  return (
    <div className={`${styles.page}`}>
      <Sidebar>
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
      </Sidebar>
      <div className={styles.content}>
        <span>Dashboard</span>
      </div>
    </div>
  );
}
