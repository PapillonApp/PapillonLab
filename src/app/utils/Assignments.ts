import { Assignment, assignmentsFromWeek, SessionHandle } from "pawnote";
import { refreshSession } from "./authentication";

export async function exportAllAssignments(): Promise<Array<Assignment>> {
    const session = await refreshSession();
    const assignments = await assignmentsFromWeek(session, 1, 35);
    
    return assignments
}
