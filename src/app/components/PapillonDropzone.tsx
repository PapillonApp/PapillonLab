import { CloudDownload, FileSearch } from "lucide-react";
import { useRef, useState } from "react";
import styles from "./PapillonDropzone.module.css";
import Button from "./Button";

interface PapillonDropzoneProps {
  onFileSubmitted?: (file: File) => void;
  onError?: (error: string) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

const PapillonDropzone: React.FC<PapillonDropzoneProps> = ({
    onFileSubmitted = () => {},
    onError = () => {},
    acceptedTypes = ["image/jpeg", "image/png", "image/jpg"],
    maxSize = 5
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const onDragEnter = () => {
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(droppedFiles[0]);
    setIsDragging(false);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFileUpload(selectedFiles[0])
    }
  };

  const handleFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.size > maxSize * 1e6) return onError("Ce fichier est trop volumineux.")
    if (!acceptedTypes.includes(file.type)) return onError("Ce type de fichier n'est pas autorisé")
    setSelectedFile(file);
    onFileSubmitted(file);
    onError("");
  }

  const formattedText = acceptedTypes.map(word => word.split("/")[1].toUpperCase()).join(", ").replace(/,([^,]*)$/, ' et$1');
  return (
      <div className={`${styles.zone} ${isDragging ? styles.dragging : styles.notdragging}`} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
          <div className={styles.actions} style={{ gap: 15}}>
              <div>
                <CloudDownload absoluteStrokeWidth={true} size={30}/>
              </div>
              <div className={styles.actions}>
                <span>Choisissez un fichier ou faites-le glisser ici</span>
                <span className={styles.subtext}>Formats {formattedText}, jusqu&apos;à {maxSize}Mb</span>
              </div>
              <div className={styles.fileSelectorContainer} style={{ marginTop: 10 }}> 
                  <Button
                    leading={<FileSearch absoluteStrokeWidth={true} size={20} />}
                    variant="border"
                    onPress={handleFileSelection}
                  >{selectedFile ? selectedFile.name : "Choisir un fichier"}</Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptedTypes.map((ext) => `.${ext}`).join(", ")}
                    style={{ display: "none", pointerEvents: "none" }}
                    onChange={onFileSelect}
                  />
              </div>
          </div>
      </div>
  )
}

export default PapillonDropzone;