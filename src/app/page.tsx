import { QrCode, TagIcon } from "lucide-react";
import Button from "./components/Button";
import styles from "./page.module.css";
import InformativeBox from "./components/InformativeBox";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ width: 400, display: "flex", flexDirection: "column", gap: 10}}>
          <Button centered>
            <p>Se connecter via mes identifiants</p>
          </Button>
          <Button leading={<QrCode absoluteStrokeWidth={true} size={20}/>} variant="secondary" centered>
            <p>Utiliser un QR-Code</p>
          </Button>

          <InformativeBox icon={TagIcon}>Ton nom, prénom et classe</InformativeBox>
        </div>
      </main>
    </div>
  );
}
