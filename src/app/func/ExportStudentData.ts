import { AccountKind, createSessionHandle, loginCredentials, SessionHandle } from "pawnote";
import { refreshSession } from "../utils/authentication";

export async function exportStudentData(): Promise<void> {
    try {
        await refreshSession();
    } catch (error) {
        console.error("Failed to refresh session", error);
        return;
    }

    const session = createSessionHandle();

    try {
        await loginCredentials(session, {
            url: "https://your-pronote-instance.com",
            kind: AccountKind.STUDENT,
            username: "your-username",
            password: "your-password",
            deviceUUID: "your-device-uuid"
        });

        const userInfo = {
            name: session.user.name,
            class: session.userResource.className,
            school: session.userResource.establishmentName,
            profilePicture: session.userResource.profilePicture?.url || "No profile picture",
        };

        // Récupérer le nombre total de semaines de l'année scolaire
        const totalWeeks = 52; // À adapter selon l'année scolaire
        const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

        // Récupération des emplois du temps pour **toutes** les semaines
        const timetables = await Promise.all(
            weeks.map(weekNumber => session.timetableFromWeek(weekNumber))
        );

        // Récupération des notes et moyennes
        const gradesTab = session.userResource.tabs.get("Grades");
        if (!gradesTab) throw new Error("Cannot retrieve grades tab");
        const selectedPeriod = gradesTab.defaultPeriod!;
        const gradesOverview = await session.gradesOverview(selectedPeriod);

        const grades = gradesOverview.grades.map(grade => ({
            subject: grade.subject.name,
            grade: grade.value.points,
            outOf: grade.outOf.points,
            coefficient: grade.coefficient,
            comment: grade.comment
        }));

        const averages = {
            student: gradesOverview.overallAverage,
            class: gradesOverview.classAverage
        };

        // Récupération des absences et retards
        const attendance = await session.absences();

        // Récupération des évaluations
        const evaluationsTab = session.userResource.tabs.get("Evaluations");
        const evaluations = evaluationsTab ? await session.evaluations(evaluationsTab.defaultPeriod) : [];

        const formattedEvaluations = evaluations.map(evaluation => ({
            name: evaluation.name,
            description: evaluation.description,
            date: evaluation.date.toLocaleString(),
            skills: evaluation.skills.map(skill => ({
                name: skill.itemName,
                level: skill.level,
                domain: skill.domainName
            }))
        }));

        // Récupération des devoirs pour **toutes** les semaines
        const assignments = await Promise.all(
            weeks.map(week => session.assignmentsFromWeek(week, week))
        );

        const formattedAssignments = assignments.flat().map(assignment => ({
            subject: assignment.subject.name,
            deadline: assignment.deadline.toLocaleString(),
            description: assignment.description,
            attachments: assignment.attachments.map(a => ({
                name: a.name,
                url: a.url
            }))
        }));

        // Récupération des vacances scolaires
        const holidays = session.instance.holidays.map(holiday => ({
            name: holiday.name,
            start: holiday.startDate.toLocaleDateString(),
            end: holiday.endDate.toLocaleDateString()
        }));

        // Récupération des menus de la cantine pour **toutes** les semaines
        const menus = await Promise.all(
            weeks.map(week => session.menus(new Date(new Date().setDate(new Date().getDate() + (week * 7)))))
        );

        // Récupération du cahier de textes pour **toutes** les semaines
        const notebookTab = session.userResource.tabs.get("Notebook");
        const notebook = notebookTab ? await Promise.all(
            weeks.map(week => session.notebook(notebookTab.defaultPeriod))
        ) : [];

        // Récupération des périodes enregistrées
        const periods = session.instance.periods.map(period => ({
            name: period.name,
            start: period.startDate.toLocaleDateString(),
            end: period.endDate.toLocaleDateString()
        }));

        // Gestion de la présence en cours
        await session.presence();
        session.startPresenceInterval();
        setTimeout(() => session.clearPresenceInterval(), 5 * 60 * 1000);

        // Récupération des ressources pédagogiques pour **toutes** les semaines
        const resources = await Promise.all(
            weeks.map(week => session.resourcesFromWeek(week, week))
        );

        const formattedResources = resources.flat().map(resource => ({
            id: resource.id,
            assignments: resource.haveAssignment ? await session.resourceAssignments(resource.id) : []
        }));

        // Création du JSON
        const studentData = {
            userInfo,
            timetables,
            grades,
            averages,
            attendance,
            evaluations: formattedEvaluations,
            assignments: formattedAssignments,
            holidays,
            menus,
            notebook,
            periods,
            resources: formattedResources
        };

        // Sauvegarde en fichier JSON
        const json = JSON.stringify(studentData, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "student_data.json";
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error exporting student data:", error);
    }
}
