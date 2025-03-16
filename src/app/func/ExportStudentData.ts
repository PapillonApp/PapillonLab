import { Assignment, assignmentsFromWeek, GradesOverview, gradesOverview, Notebook, notebook, SessionHandle, TabLocation, Timetable, timetableFromIntervals, translateToWeekNumber } from "pawnote";
import { refreshSession } from "../utils/Authentication";
import JSZip from "jszip";

async function getGradesData(session: SessionHandle): Promise<GradesOverview[] | undefined> {
    const tab = session.userResource.tabs.get(TabLocation.Grades);
    if (!tab?.periods) return undefined;
    return Promise.all(tab.periods.map(period => gradesOverview(session, period)));
}

async function getAttendanceData(session: SessionHandle): Promise<Notebook[] | undefined> {
    const tab = session.userResource.tabs.get(TabLocation.Notebook);
    if (!tab?.periods) return undefined;
    return Promise.all(tab.periods.map(period => notebook(session, period)));
}

export async function exportStudentData(setExportingStep: (step: number) => void): Promise<void> {
    setExportingStep(1); // Connexion au service scolaire
    const session: SessionHandle = await refreshSession();
    console.log("Session Refreshed");

    setExportingStep(2); // Récupération des données
    const studentData = {
        name: session.user.name,
        className: session.userResource.className ?? "Aucune classe",
    };
    
    const GradesData: GradesOverview[] | undefined = await getGradesData(session);
    const TimetableData: Timetable = await timetableFromIntervals(session, session.instance.firstDate, session.instance.lastDate);
    const AssignmentsData: Assignment[] = await assignmentsFromWeek(session, 1, translateToWeekNumber(session.instance.lastDate, session.instance.firstDate));
    const AttendanceData: Notebook[] | undefined = await getAttendanceData(session);

    setExportingStep(3); // Préparation du fichier
    const zip = new JSZip();
    zip.file("studentData.json", JSON.stringify(studentData, null, 2));
    zip.file("timetableData.json", JSON.stringify(TimetableData.classes, null, 2));
    zip.file("assignmentsData.json", JSON.stringify(AssignmentsData, null, 2));
    zip.file("gradesData.json", JSON.stringify(GradesData, null, 2));
    zip.file("attendanceData.json", JSON.stringify(AttendanceData, null, 2));
    
    zip.generateAsync({ type: "blob" }).then((content: Blob) => {
        setExportingStep(4); // Téléchargement
        const zipUrl: string = URL.createObjectURL(content);
        const zipA: HTMLAnchorElement = document.createElement("a");
        zipA.href = zipUrl;
        zipA.download = "studentData.zip";
        zipA.click();
        URL.revokeObjectURL(zipUrl);
    });

}
