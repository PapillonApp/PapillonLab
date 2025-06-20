"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Stars from "../../public/assets/stars.svg";
import Image from "next/image";
import Button from "./components/Button";
import { QrCode, X } from "lucide-react";
import PapillonLabsLogo from "./components/PapillonLabLogo";
import PapillonInput from "./components/PapillonInput";
import PapillonDropzone from "./components/PapillonDropzone";
import { scanQRCodeFromFile, validateQRCode } from "./utils/ScanQR";
import { useRouter } from 'next/navigation'
import PapillonQRPin from "./components/PapillonQRPin";
import { loginWithCredentials, loginWithQR, refreshSession } from "./utils/Authentication";

export default function Home() {
  const router = useRouter()

  const [selectedMethod, setSelectedMethod] = useState<"credentials" | "qrcode" | null>(null);
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [instance, setInstance] = useState<string>("")

  const [error, setError] = useState<string>("")
  const [fileSubmitted, setFileSubmitted] = useState<File | null>(null)

  const [pin, setPin] = useState<string | null>(null)
  const [qrcode, setQRCode] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleInstanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstance(event.target.value)
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
  
      refreshSession().catch((error) => {
        console.error("Failed to refresh session", error);
      });
    }
  }, [router]);

  const handleLoginWithCredentials = async () => {
    setLoading(true);
    try {
      await loginWithCredentials(instance, username, password)
      setLoading(false)
      router.push("/dashboard");
    } catch (error) {
      console.error(error)
      setLoading(false)
      setError("Une erreur est survenu pendant la connexion.")
    }
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
    if (qrcode) {
      try {
        await loginWithQR(pin, qrcode);
        setLoading(false);
        router.push("/dashboard");
      } catch (error) {
        console.error(error)
        setLoading(false);
        setError("Une erreur est survenu pendant la connexion.")
      }
    }
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
                {error && (
                <div className={styles.warnBox}>
                    <X />
                    <span>{error}</span>
                  </div>
                )}
                <div className={styles.inputContainer}>
                  <PapillonInput placeholder="Instance PRONOTE" onChange={handleInstanceChange} value={instance}/>
                  <PapillonInput placeholder="Identifiant" onChange={handleUsernameChange} value={username}/>
                  <PapillonInput placeholder="Mot de passe" type="password" onChange={handlePasswordChange} value={password} onSubmit={handleLoginWithCredentials}/>
                </div>
                <div className={styles.buttons}>
                  <Button centered onPress={handleLoginWithCredentials} loading={loading}>
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
                <PapillonQRPin onChange={(pin) => setPin(pin)} onSubmit={(pin) => handleLoginWithQR(pin)} disabled={loading}/>
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
