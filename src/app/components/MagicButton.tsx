import { LucideIcon } from "lucide-react";
import styles from "./MagicButton.module.css";
import { useEffect } from "react";
interface MagicButtonProps {
    label: string;
    color: string;
    icon: LucideIcon;
    keybind?: string;
    onPress?: () => void;
}

const MagicButton: React.FC<MagicButtonProps> = ({ label, color, icon: Icon, keybind, onPress }) => {
    useEffect(() => {    
        const handleKeyPress = (event: KeyboardEvent) => {
            if (keybind && event.key === keybind.toLowerCase()) {
                if (onPress) {
                    onPress();
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [keybind, onPress]);

    return (
        <div className={styles.magicButton} style={{ background: `linear-gradient(180deg, #${color}90 0%, #${color} 100%)` }}>
            {!keybind && <Icon fill="white" size={20} absoluteStrokeWidth={true} stroke="white"/>}
            <span className={styles.magicText}>{label}</span>
            {keybind && <span className={styles.keybind}>{keybind}</span>}
        </div>
    )
}

export default MagicButton;