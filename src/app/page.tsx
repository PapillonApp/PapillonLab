import styles from "./page.module.css";
import Stars from "../../public/assets/stars.svg";
import Image from "next/image";
import Button from "./components/Button";
import { QrCode } from "lucide-react";
import PapillonLabsLogo from "./components/PapillonLabLogo";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <>
          <Image
            src={Stars}
            alt={""}
            className={styles.stars}
          />

          <div className={styles.container}>
            <PapillonLabsLogo />
            <span className={styles.introText}>
              Bienvenue sur Papillon Labs ! Exportez vos données scolaires et
              contribuez à l’amélioration de Papillon Magic+. Connectez-vous avec
              votre compte scolaire pour continuer.
            </span>
            <div className={styles.buttons}>
              <Button centered>
                <p>Se connecter via mes identifiants</p>
              </Button>
              <Button
                leading={<QrCode absoluteStrokeWidth={true} size={20} />}
                variant="secondary"
                centered
              >
                <p>Utiliser un QR-Code</p>
              </Button>
            </div>
            <span className={styles.subText}>
              Pour l’instant, seuls les comptes PRONOTE sont pris en charge.
            </span>
          </div>
        </>
      </main>
    </div>
  );
}
