"use client";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import styles from "./dashboard.module.css";
import Button from "../components/Button";
import { Share, WandSparkles } from "lucide-react";

export default function Dashboard() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`${styles.page} ${expanded ? styles.expanded : styles.collapsed}`}>
      <Sidebar onToggle={setExpanded}>
        <Button variant="primary" leading={<Share absoluteStrokeWidth={true} size={20} />}>Exporter mes données</Button>
        <Button variant="secondary" leading={<WandSparkles absoluteStrokeWidth={true} size={20} />}>Papillon Magic+</Button>
      </Sidebar>
      <div className={styles.content}>
        <span>Dashboard</span>
      </div>
    </div>
  );
}
