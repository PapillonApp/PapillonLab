"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Stars from "../../public/assets/stars.svg";
import Image from "next/image";
import Button from "./components/Button";
import { QrCode, X } from "lucide-react";
import PapillonLabsLogo from "./components/PapillonLabLogo";
import PapillonInput from "./components/PapillonInput";
import PapillonDropzone from "./components/PapillonDropzone";

export default function Home() {
  const [selectedMethod, setSelectedMethod] = useState<"credentials" | "qrcode" | null>(null);
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [error, setError] = useState<string>("")
  const [fileSubmitted, setFileSubmitted] = useState<File | null>(null)

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  };

  const handleLoginWithCredentials = () => {
    console.log(username, password)
  };
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <>
          <Image src={Stars} alt={""} className={styles.stars} />

          <div className={styles.container}>
            <PapillonLabsLogo />
            <span className={styles.introText}>
              Bienvenue sur Papillon Labs ! Exportez vos données scolaires et
              contribuez à l’amélioration de Papillon Magic+. Connectez-vous avec
              votre compte scolaire pour continuer.
            </span>

            {selectedMethod === null && (
              <div className={styles.buttons}>
                <Button centered onPress={() => setSelectedMethod("credentials")}>
                  <p>Se connecter via mes identifiants</p>
                </Button>
                <Button
                  leading={<QrCode absoluteStrokeWidth={true} size={20} />}
                  variant="secondary"
                  centered
                  onPress={() => {
                    setSelectedMethod("qrcode");
                  }}
                >
                  <p>Utiliser un QR-Code</p>
                </Button>
              </div>
            )}

            {selectedMethod === "credentials" && (
              <>
                <div className={styles.inputContainer}>
                  <PapillonInput placeholder="Identifiant" onChange={handleUsernameChange} value={username}/>
                  <PapillonInput placeholder="Mot de passe" type="password" onChange={handlePasswordChange} value={password} onSubmit={handleLoginWithCredentials}/>
                </div>
                <div className={styles.buttons}>
                  <Button centered onPress={handleLoginWithCredentials}>
                    <p>Se connecter via mes identifiants</p>
                  </Button>
                  <Button
                    variant="secondary"
                    centered
                    onPress={() => {
                      setSelectedMethod(null);
                    }}
                  >
                    <p>Changer de méthode de connexion</p>
                  </Button>
                </div>
              </>
            )}

            {selectedMethod === "qrcode" && (
              <>
              {error && (
                <div className={styles.warnBox}>
                    <X />
                    <span>{error}</span>
                  </div>
                )}
                <PapillonDropzone
                  onError={(err) => { setError(err) }}
                  onFileSubmitted={(file) => { setFileSubmitted(file) }}
                />
                <div className={styles.buttons}>
                  <Button centered onPress={handleLoginWithCredentials} disabled={fileSubmitted ? false : true}>
                    <p>Se connecter via mon QRCode</p>
                  </Button>
                  <Button
                    variant="secondary"
                    centered
                    onPress={() => {
                      setSelectedMethod(null);
                      setError("")
                      setFileSubmitted(null);
                    }}
                  >
                    <p>Changer de méthode de connexion</p>
                  </Button>
                </div>
              </>
            )}
            <span className={styles.subText}>
              Pour l’instant, seuls les comptes PRONOTE sont pris en charge.
            </span>
          </div>
        </>
      </main>
    </div>
  );
}
