"use client";

import styles from "./dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dashboard</h1>
      <span className={styles.subText}>Salam</span>
    </div>
  );
}
