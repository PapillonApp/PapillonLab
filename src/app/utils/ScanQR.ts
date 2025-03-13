import jsQR from "jsqr";

export const scanQRCodeFromFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;
            
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) return reject("Failed to get 2D context");

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                const qrCode = jsQR(imageData.data, img.width, img.height);

                if (qrCode) {
                    resolve(qrCode.data);
                } else {
                    reject("No QRCode");
                }
            };

            img.onerror = () => reject("Error loading image");
        };

        reader.onerror = () => reject("Error reading file");
        reader.readAsDataURL(file);
    });
};

export const validateQRCode = (data: string): boolean => {
    try {
        const parsedData = JSON.parse(data);
        if (
            typeof parsedData.avecPageConnexion === "boolean" &&
            typeof parsedData.jeton === "string" && parsedData.jeton.length > 0 &&
            typeof parsedData.login === "string" && parsedData.login.length > 0 &&
            typeof parsedData.url === "string"
        ) {
            return true;
        }
    } catch (error) {
        console.error(error)
        return false;
    }
    
    return false;
};