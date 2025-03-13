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
import { scanQRCodeFromFile, validateQRCode } from "./utils/ScanQR";
import PapillonQRPin from "./components/PapillonQRPin";

export default function Home() {
  const [selectedMethod, setSelectedMethod] = useState<"credentials" | "qrcode" | null>(null);
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [error, setError] = useState<string>("")
  const [fileSubmitted, setFileSubmitted] = useState<File | null>(null)

  const [pin, setPin] = useState<string | null>(null)
  const [qrcode, setQRCode] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  };

  const handleLoginWithCredentials = () => {
    console.log(username, password)
  };

  const verifyQRCode = async () => {
    if (fileSubmitted) {
      const data = await scanQRCodeFromFile(fileSubmitted)
      if (data && validateQRCode(data)) {
        setQRCode(data)
      } else {
        setError("Votre QRCode n'est pas valide.")
      }
    }
  }

  const handleLoginWithQR = async (pin: string) => {
    setLoading(true)
    console.log(pin, qrcode)
  }

  const changeLoginMethod = (newMethod: "credentials" | "qrcode" | null) => {
    setSelectedMethod(newMethod);
    setPin(null);
    setQRCode(null);
    setLoading(false);
    setError("");
    setUsername("");
    setPassword("");
  }

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
                <Button centered onPress={() => changeLoginMethod("credentials")}>
                  <p>Se connecter via mes identifiants</p>
                </Button>
                <Button
                  leading={<QrCode absoluteStrokeWidth={true} size={20} />}
                  variant="secondary"
                  centered
                  onPress={() => {
                    changeLoginMethod("qrcode");
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
                      changeLoginMethod(null);
                    }}
                  >
                    <p>Changer de méthode de connexion</p>
                  </Button>
                </div>
              </>
            )}

            {selectedMethod === "qrcode" && !qrcode && (
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
                  <Button centered onPress={() => verifyQRCode()} disabled={fileSubmitted ? false : true}>
                    <p>Se connecter via mon QRCode</p>
                  </Button>
                  <Button
                    variant="secondary"
                    centered
                    onPress={() => {
                      changeLoginMethod(null);
                    }}
                  >
                    <p>Changer de méthode de connexion</p>
                  </Button>
                </div>
              </>
            )}

            {selectedMethod === "qrcode" && qrcode && (
              <>
              {error && (
                <div className={styles.warnBox}>
                    <X />
                    <span>{error}</span>
                  </div>
                )}
                <PapillonQRPin onChange={(pin) => setPin(pin)} onSubmit={(pin) => handleLoginWithQR(pin)}/>
                <div className={styles.buttons}>
                  <Button centered onPress={() => pin ? handleLoginWithQR(pin) : {}} loading={loading}>
                    <p>Se connecter via mon QRCode</p>
                  </Button>
                  <Button
                    variant="secondary"
                    centered
                    onPress={() => {
                      changeLoginMethod(null);
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
