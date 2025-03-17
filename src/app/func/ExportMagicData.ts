import { Assignment, assignmentsFromWeek, SessionHandle, translateToWeekNumber } from "pawnote";
import { refreshSession } from "../utils/Authentication";
import JSZip from "jszip";
import detectCategory from "../utils/regex";

export async function exportMagicDataset(setExportingStep: (step: number) => void): Promise<void> {
    setExportingStep(1); // Connexion au service scolaire
    const session: SessionHandle = await refreshSession();
    console.log("Session Refreshed");

    setExportingStep(2); // Récupération des données
    const studentData = {
        name: session.user.name,
        className: session.userResource.className ?? "Aucune classe",
    };
    
    const AssignmentsData: Assignment[] = await assignmentsFromWeek(session, 1, translateToWeekNumber(session.instance.lastDate, session.instance.firstDate));


    setExportingStep(3); // Formatage des données

    const cleanedAssignments = AssignmentsData.map(assignment => 
        assignment.description.replace(/<\/?[^>]+(>|$)/g, "")
    );

    setExportingStep(4); // Verification des données
    const categorizedAssignments = cleanedAssignments.map(text => {
        const category = detectCategory(text);
        return {
            "description": text,
            "type": category
        };
    });


    const zip = new JSZip();
    zip.file("assignmentsData.json", JSON.stringify(categorizedAssignments, null, 2));
    
    zip.generateAsync({ type: "blob" }).then((content: Blob) => {
        setExportingStep(5); // Téléchargement
        const zipUrl: string = URL.createObjectURL(content);
        const zipA: HTMLAnchorElement = document.createElement("a");
        zipA.href = zipUrl;
        zipA.download = `MagicDatasets-${studentData.name}.zip`;
        zipA.click();
        URL.revokeObjectURL(zipUrl);
    });

}
