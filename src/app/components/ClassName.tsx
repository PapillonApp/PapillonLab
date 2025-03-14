import React from "react";
import styles from "./ClassName.module.css";

const ClassName: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div
          className={styles.container}
        >
          <span
            className={styles.text}
          >{text}</span>
        </div>
    );
};

export { ClassName };
