import styles from "./page.module.css";
import Stars from "../..//public/assets/stars.svg";
import Logo from "../..//public/assets/logo.svg";
import Image from "next/image";
import Button from "./components/Button";
import { QrCode } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <>
          <Image src={Stars} alt={""} style={{
            position: "absolute",
            top: 0,
            right: 0
          }}/>

          <div style={{
            display: "flex",
            width: 670,
            padding: "28px 46px",
            backgroundColor: "#FFFFFF",
            gap: "30px",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 22,
            border: "1px solid rgba(0, 0, 0, 0.15)"
          }}>
            <Image src={Logo} alt={"Papillon Labs Logo"}/>
            <span style={{
              alignSelf: "stretch",
              color: "#000",
              textAlign: "center",
              fontFamily: "Fixel Text",
              fontSize: "17px",
              fontStyle: "normal",
              opacity: 0.55,
              fontWeight: 600
            }}>Bienvenue sur Papillon Labs ! Exportez vos données scolaires et contribuez à l’amélioration de Papillon Magic+. Connectez-vous avec votre compte scolaire pour continuer.</span>
            <div style={{
              display: "flex",
              flexDirection: "column",
              width: "100%"
            }}>
              <Button centered>
                <p>Se connecter via mes identifiants</p>
              </Button>
              <Button leading={<QrCode absoluteStrokeWidth={true} size={20}/>} variant="secondary" centered>
                <p>Utiliser un QR-Code</p>
              </Button>
            </div>
            <span style={{
              alignSelf: "stretch",
              color: "#000",
              textAlign: "center",
              fontFamily: "Fixel Text",
              fontSize: "14px",
              fontStyle: "normal",
              opacity: 0.55,
              fontWeight: 500
            }}>Pour l’instant, seuls les comptes PRONOTE sont pris en charge.</span>
          </div>
        </>
      </main>
    </div>
  );
}
