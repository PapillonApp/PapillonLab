import { Calendar, Share, WandSparkles } from "lucide-react";
import Button from "./components/Button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button icon={Share}>
          <p>Exporter mes données</p>
        </Button>
        <Button icon={WandSparkles} variant="secondary">
          <p>Papillon Magic+</p>
        </Button>
        <Button icon={Calendar} variant="informative">
          <p>Ton emploi du temps</p>
        </Button>
      </main>
    </div>
  );
}
