export interface UploadTableEntry {
	personalEncounterToken: string; // Personal Encounter Token
	timeOfEncounter: number;
	duration: number;
	signalStrength: number;
}

export function updateUploadTable(uploadTableRaw: string,
	ecounterToken: string, signalStrength: number): UploadTableEntry[] {
	let uploadTable: UploadTableEntry[] = [];

	if (uploadTableRaw) {
		uploadTable = JSON.parse(uploadTableRaw);
	}
	let found = false;
	for (let i of uploadTable) {
		if (i.personalEncounterToken === ecounterToken) {
			found = true;
			i.duration = Date.now() - i.timeOfEncounter;
			break;
		}
	}
	if (!found) {
		uploadTable.unshift({
			personalEncounterToken: ecounterToken,
			timeOfEncounter: Date.now(),
			duration: 1,
			signalStrength: signalStrength,
		});
	}
	return uploadTable;
}

export function updateQueryTable(queryTableRaw: string, ecounterToken: string): string[] {
	let queryTable: string[] = [];
	if (queryTableRaw) {
		queryTable = JSON.parse(queryTableRaw);
	}
	if (!queryTable.includes(ecounterToken)) {
		queryTable.unshift(ecounterToken);
	}
	return queryTable;
}
