import { Calendar, ChartPie, Image, MoreHorizontal, QrCode, School, User } from "lucide-react";
import Button from "./components/Button";
import styles from "./page.module.css";
import InformativeBox from "./components/InformativeBox";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ width: 400, display: "flex", flexDirection: "column", gap: 10}}>
          <Button centered disabled>
            <p>Se connecter via mes identifiants</p>
          </Button>
          <Button leading={<QrCode absoluteStrokeWidth={true} size={20}/>} variant="secondary" centered disabled>
            <p>Utiliser un QR-Code</p>
          </Button>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          maxWidth: 600,
          flexWrap: "wrap"
        }}>
          <InformativeBox icon={User}>Ton nom, prénom et classe</InformativeBox>
          <InformativeBox icon={Image}>Ta photo de classe</InformativeBox>
          <InformativeBox icon={Calendar}>Ton emploi du temps</InformativeBox>
          <InformativeBox icon={ChartPie}>Tes notes et moyennes</InformativeBox>
          <InformativeBox icon={School}>Tes absences et retard</InformativeBox>
          <InformativeBox icon={MoreHorizontal}>Données diverses</InformativeBox>
        </div>
      </main>
    </div>
  );
}
