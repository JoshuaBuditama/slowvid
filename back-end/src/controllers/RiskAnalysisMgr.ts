import { UploadTableModel, IUploadTableDocument } from '../model/UploadTable';
import { IQueryTableDocument, QueryTableModel } from '../model/QueryTable';
import { UserModel } from '../model/User';
import * as Conf from '../Conf'

/**
 * Checks if an encounter meets the threshold required to be identified as a
 * close contact.
 * @param  {IUploadTableDocument} upload the encounter document
 * @returns {boolean} true if threshold met and a close contact, false otherwise
 */
function thresholdMet(upload: IUploadTableDocument): boolean {
	if (upload.signalStrength >= Conf.signalStrengthThreshold &&
		upload.duration >= Conf.durationThresholdinMs) {
		return true;
	}
	else {
		return false;
	}
}

/**
 * Search all the upload table tokens against a list of query encounter tokens.
 * Use when a user wants to check if they have come in contact with confirmed
 * positive. Set's user's `closeContactFlag` if they have come in contact with
 * confirmed positive AND meets the threshold set in `thresholdMet`. Assumes
 * that confirmed positives have upload tables, empty otherwise.
 * @param  {IQueryTableDocument[]} queryTable list of query encounter tokens
 * @returns {Promise<boolean>} true if match was found (i.e. one or more of the
 *     query encounter tokens have come in contact with confirmed case AND meets
 *     threshold set in `thresholdMet`).
 */
export async function searchUploadEncounters(queryTable: IQueryTableDocument[]): Promise<boolean> {
	if (queryTable === null || queryTable === undefined || queryTable.length < 1) {
		return false;
	}
	let res = await UploadTableModel.find(
		{
			$or: queryTable.map(
				x => ({ encounterToken: x.encounterToken }))
		}).populate(UserModel.modelName).exec();
	let found = false;
	for (let i of res) {
		if (thresholdMet(i)) {
			found = true;
			if (!i.user.closeContactFlag) {
				i.user.closeContactFlag = true;
				await i.user.save();
			}
		}
	}
	return found;
}

/**
 * Search all the query table tokens against a list of upload encounter tokens.
 * Use when adding a new confirmed positive and wish to flag all the query users
 * who have come in contact with the confirmed positive. Set's all user's
 * `closeContactFlag` if they have come in contact with confirmed positive AND
 * meets the threshold set in `thresholdMet`.
 * @param  {IUploadTableDocument[]} uploadTable list of upload encounter tokens 
 * @returns {Promise<IQueryTableDocument[]>} list of matching query encounter
 *     tokens AND meets the threshold set in `thresholdMet`, with populated
 *     associated user documents.
 */
export async function searchQueryEncounters(uploadTable: IUploadTableDocument[]): Promise<IQueryTableDocument[]> {
	if (uploadTable === null || uploadTable === undefined || uploadTable.length < 1) {
		return [];
	}
	const filteredTable = uploadTable.filter(x => thresholdMet(x));
	if (filteredTable.length < 1) {
		return [];
	}
	let res = await QueryTableModel.find(
		{
			$or: filteredTable.map(y => ({ encounterToken: y.encounterToken }))
		}).populate(UserModel.modelName).exec();
	for (let i of res) {
		if (!i.user.closeContactFlag) {
			i.user.closeContactFlag = true;
			await i.user.save();
		}
	}
	return res;
}
