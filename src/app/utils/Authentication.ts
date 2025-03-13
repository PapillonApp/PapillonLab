import { AccountKind, createSessionHandle, loginCredentials, loginQrCode, loginToken, RefreshInformation, SessionHandle } from "pawnote";

export async function loginWithQR(pin: string, dataFromQR: string): Promise<RefreshInformation> {
    const deviceUUID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    const qr = JSON.parse(dataFromQR);
    if (qr.url && typeof qr.url === "string") {
        if (!qr.url.startsWith("http://localhost:8080/")) {
            qr.url = "http://localhost:8080/" + qr.url;
        }
    }

    dataFromQR = JSON.stringify(qr)

    try {
        const session = await createSessionHandle();
        const refresh = await loginQrCode(session, {
            pin: pin,
            qr: JSON.parse(dataFromQR),
            deviceUUID: deviceUUID
        });
    
        localStorage.setItem("deviceuuid", deviceUUID);
        localStorage.setItem("token", refresh.token);
        localStorage.setItem("instance", refresh.url);
        localStorage.setItem("username", refresh.username);
        localStorage.setItem("name", session.user.name);
        if (session.userResource.className) {
            localStorage.setItem("classname", session.userResource.className);
        }
        if (session.userResource.profilePicture) {
            const response = await fetch(session.userResource.profilePicture.url);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
            const base64data = reader.result as string;
            localStorage.setItem("profilePicture", base64data);
            };
            reader.readAsDataURL(blob);
        }
    
        return refresh; 
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export async function loginWithCredentials(url: string, username: string, password: string): Promise<RefreshInformation> {
    const deviceUUID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    const session = await createSessionHandle();
    const refresh = await loginCredentials(session, {
        url: "http://localhost:8080/" + url,
        kind: AccountKind.STUDENT,
        username: username,
        password: password,
        deviceUUID: deviceUUID
    });

    localStorage.setItem("deviceuuid", deviceUUID);
    localStorage.setItem("token", refresh.token);
    localStorage.setItem("instance", url);
    localStorage.setItem("username", username);
    localStorage.setItem("name", session.user.name);
    if (session.userResource.className) {
        localStorage.setItem("classname", session.userResource.className);
    }
    if (session.userResource.profilePicture) {
        const response = await fetch(session.userResource.profilePicture.url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
        const base64data = reader.result as string;
        localStorage.setItem("profilePicture", base64data);
        };
        reader.readAsDataURL(blob);
    }

    return refresh;
}

export async function refreshSession(): Promise<SessionHandle> {
    const deviceUUID = localStorage.getItem("deviceuuid");
    const token = localStorage.getItem("token");
    const url = localStorage.getItem("instance");
    const username = localStorage.getItem("username");

    const newSession = await createSessionHandle();
    const newRefresh = await loginToken(newSession, {
        url: url as string, 
        kind: AccountKind.STUDENT,
        token: token as string,
        deviceUUID: deviceUUID as string,
        username: username as string
    });

    localStorage.setItem("deviceuuid", deviceUUID!);
    localStorage.setItem("token", newRefresh.token);
    localStorage.setItem("instance", newRefresh.url);
    localStorage.setItem("username", newRefresh.username);
    return newSession
}