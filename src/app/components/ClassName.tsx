import React from "react";


const ClassName: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div
                style={{
                  backgroundColor: "#006DB929",
                  borderRadius: 8,
                  padding: "4px 6px",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    color: "#006DB9",
                    fontSize: 16,
                    letterSpacing: 0.5,
                    margin: 0,
                    marginBottom: 2,
                  }}
                >{text}</span>
              </div>
    );
};

export { ClassName };
