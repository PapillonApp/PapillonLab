import { Assignment, assignmentsFromWeek, SessionHandle, translateToWeekNumber } from "pawnote";
import { refreshSession } from "../utils/Authentication";
import JSZip from "jszip";
import { detectCategory } from "../utils/regex";

export async function exportMagicDataset(setExportingStep: (step: number) => void): Promise<void> {
    setExportingStep(1); // Connexion au service scolaire
    const session: SessionHandle = await refreshSession();
    console.log("Session Refreshed");

    setExportingStep(2); // Récupération des données
    const name = session.user.name;
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
        zipA.download = `MagicDatasets-${name}.zip`;
        zipA.click();
        URL.revokeObjectURL(zipUrl);
    });

}

export interface MagicAssignment {
    description: string
    type: string | null
}

export async function exportAssignements(): Promise<Array<MagicAssignment>> {
    const session: SessionHandle = await refreshSession();
    console.log("Session Refreshed");

    const AssignmentsData: Assignment[] = await assignmentsFromWeek(session, 1, translateToWeekNumber(session.instance.lastDate, session.instance.firstDate));

    const cleanedAssignments = AssignmentsData.map(assignment => 
        assignment.description.replace(/<\/?[^>]+(>|$)/g, "")
    );

    const categorizedAssignments = cleanedAssignments.map(text => {
        const category = detectCategory(text);
        return {
            "description": text,
            "type": category === "none" ? null : category
        };
    });

    return categorizedAssignments
}

export async function exportCategorizedAssignments(assignments: Array<MagicAssignment>): Promise<void> {
    const categorizedAssignments = assignments.map(assignment => {
        if (assignment.type === "none") {
            assignment.type = null;
        }
        return assignment;
    });

    const zip = new JSZip();
    zip.file("assignmentsData.json", JSON.stringify(categorizedAssignments, null, 2));
    zip.generateAsync({ type: "blob" }).then((content: Blob) => {
        const zipUrl: string = URL.createObjectURL(content);
        const zipA: HTMLAnchorElement = document.createElement("a");
        zipA.href = zipUrl;
        zipA.download = `MagicAssignments-${name}.zip`;
        zipA.click();
        URL.revokeObjectURL(zipUrl);
    });

    return;
}

export function readFile(file: File): Promise<Array<MagicAssignment>> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                resolve(JSON.parse(content) as Array<MagicAssignment>);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);

        reader.readAsText(file);
    });
}