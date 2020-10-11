import * as RiskAnalysisMgr from './RiskAnalysisMgr';
import { Database } from '../model/Database';
import { UploadTableModel, IUploadTableDocument } from '../model/UploadTable';
import { IQueryTableDocument, QueryTableModel } from '../model/QueryTable';
import { UserModel } from '../model/User';
import * as Conf from '../Conf';

let db = new Database();
beforeAll(() => {
	db.connect("mongodb://localhost:27017/test_slowvid");
});

test('RiskAnalysisMgr.searchUploadEncounters(empty):', async () => {
	const res = await RiskAnalysisMgr.searchUploadEncounters([]);
	expect(res).toBe(false);
});

test('RiskAnalysisMgr.searchUploadEncounters(single): no match ', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "bravo", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();

	const res = await RiskAnalysisMgr.searchUploadEncounters([
		new QueryTableModel({ encounterToken: "nomatch" })]);
	expect(res).toBe(false);
	for (let u of await UserModel.find({}).exec()) {
		expect(u.closeContactFlag).toBe(false);
	}
});

test('RiskAnalysisMgr.searchUploadEncounters(single): match', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "bravo", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();

	const res = await RiskAnalysisMgr.searchUploadEncounters([
		new QueryTableModel({ encounterToken: "alpha" })]);
	expect(res).toBe(true);
	const updated_user = await UserModel.findOne({ deviceId: "deviceA" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
});

test('RiskAnalysisMgr.searchUploadEncounters(multiple): no match ', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "bravo", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();

	const res = await RiskAnalysisMgr.searchUploadEncounters([
		new QueryTableModel({ encounterToken: "nomatch1" }),
		new QueryTableModel({ encounterToken: "nomatch2" })]);
	expect(res).toBe(false);
	for (let u of await UserModel.find({}).exec()) {
		expect(u.closeContactFlag).toBe(false);
	}
});

test('RiskAnalysisMgr.searchUploadEncounters(multiple): 1 match', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "bravo", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();

	const res = await RiskAnalysisMgr.searchUploadEncounters([
		new QueryTableModel({ encounterToken: "nomatch" }),
		new QueryTableModel({ encounterToken: "alpha" })]);
	expect(res).toBe(true);
	const updated_user = await UserModel.findOne({ deviceId: "deviceA" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
});

test('RiskAnalysisMgr.searchUploadEncounters(multiple): 2 match', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "bravo", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();

	const res = await RiskAnalysisMgr.searchUploadEncounters([
		new QueryTableModel({ encounterToken: "charlie" }),
		new QueryTableModel({ encounterToken: "alpha" })]);
	expect(res).toBe(true);
	let updated_user = await UserModel.findOne({ deviceId: "deviceA" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
	updated_user = await UserModel.findOne({ deviceId: "deviceC" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
});

test('RiskAnalysisMgr.searchUploadEncounters(multiple): no match (multiple tokens per user) ', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "alphaA", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "alphaB", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "alphaC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "bravoA", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "bravoB", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "bravoC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "charlieA", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "charlieB", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "charlieC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();

	const res = await RiskAnalysisMgr.searchUploadEncounters([
		new QueryTableModel({ encounterToken: "nomatch1" }),
		new QueryTableModel({ encounterToken: "nomatch2" })]);
	expect(res).toBe(false);
	for (let u of await UserModel.find({}).exec()) {
		expect(u.closeContactFlag).toBe(false);
	}
});

test('RiskAnalysisMgr.searchUploadEncounters(multiple): 1 match (multiple tokens per user)', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "alphaA", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "alphaB", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "alphaC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "bravoA", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "bravoB", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "bravoC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "charlieA", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "charlieB", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "charlieC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();

	const res = await RiskAnalysisMgr.searchUploadEncounters([
		new QueryTableModel({ encounterToken: "nomatch" }),
		new QueryTableModel({ encounterToken: "bravoC" })]);
	expect(res).toBe(true);
	const updated_user = await UserModel.findOne({ deviceId: "deviceB" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
});

test('RiskAnalysisMgr.searchUploadEncounters(multiple): 2 match (multiple tokens per user)', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "alphaA", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "alphaB", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "alphaC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "bravoA", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "bravoB", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "bravoC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "charlieA", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "charlieB", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	await (new UploadTableModel({ encounterToken: "charlieC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();

	const res = await RiskAnalysisMgr.searchUploadEncounters([
		new QueryTableModel({ encounterToken: "charlieA" }),
		new QueryTableModel({ encounterToken: "charlieB" })]);
	expect(res).toBe(true);
	let updated_user = await UserModel.findOne({ deviceId: "deviceC" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
});

test('RiskAnalysisMgr.searchUploadEncounters(single): outside threshold', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs - 1, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "bravo", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold, user: user })).save();

	const res = await RiskAnalysisMgr.searchUploadEncounters([
		new QueryTableModel({ encounterToken: "alpha" })]);
	expect(res).toBe(false);
	const updated_user = await UserModel.findOne({ deviceId: "deviceA" }).exec();
	expect(updated_user?.closeContactFlag).toBe(false);
});

test('RiskAnalysisMgr.searchUploadEncounters(multiple): outside threshold', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs - 1, signalStrength: Conf.signalStrengthThreshold, user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "bravo", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold - 0.1, user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs - 1, signalStrength: Conf.signalStrengthThreshold - 0.1, user: user })).save();

	const res = await RiskAnalysisMgr.searchUploadEncounters([
		new QueryTableModel({ encounterToken: "alpha" }),
		new QueryTableModel({ encounterToken: "bravo" }),
		new QueryTableModel({ encounterToken: "charlie" }),
	]);
	expect(res).toBe(false);
	for (let u of await UserModel.find({}).exec()) {
		expect(u.closeContactFlag).toBe(false);
	}
});

// -----------------------------------------------------------------------------

test('RiskAnalysisMgr.searchQueryEncounters(single): no match ', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "alpha", user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "bravo", user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "charlie", user: user })).save();

	const res = await RiskAnalysisMgr.searchQueryEncounters([
		new UploadTableModel({ encounterToken: "nomatch" })]);
	expect(res).toStrictEqual([]);
	for (let u of await UserModel.find({}).exec()) {
		expect(u.closeContactFlag).toBe(false);
	}
});

test('RiskAnalysisMgr.searchQueryEncounters(single): match', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "alpha", user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "bravo", user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "charlie", user: user })).save();

	let lis = new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold });
	const res = await RiskAnalysisMgr.searchQueryEncounters([
		new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold })]);
	expect(res.length).toBe(1);
	expect(res[0].user.deviceId).toBe("deviceA");
	const updated_user = await UserModel.findOne({ deviceId: "deviceA" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
});

test('RiskAnalysisMgr.searchQueryEncounters(multiple): no match ', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "alpha", user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "bravo", user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "charlie", user: user })).save();

	const res = await RiskAnalysisMgr.searchQueryEncounters([
		new UploadTableModel({ encounterToken: "nomatch1", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
		new UploadTableModel({ encounterToken: "nomatch2", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
	]);
	expect(res).toStrictEqual([]);
	for (let u of await UserModel.find({}).exec()) {
		expect(u.closeContactFlag).toBe(false);
	}
});

test('RiskAnalysisMgr.searchQueryEncounters(multiple): 1 match', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "alpha", user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "bravo", user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "charlie", user: user })).save();

	const res = await RiskAnalysisMgr.searchQueryEncounters([
		new UploadTableModel({ encounterToken: "nomatch1", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
		new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
	]);
	expect(res.length).toBe(1);
	expect(res[0].user.deviceId).toBe("deviceC");
	expect(res[0].user.closeContactFlag).toBe(true);
	const updated_user = await UserModel.findOne({ deviceId: "deviceC" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
});

test('RiskAnalysisMgr.searchQueryEncounters(multiple): 2 match', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "alpha", user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "bravo", user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "charlie", user: user })).save();

	const res = await RiskAnalysisMgr.searchQueryEncounters([
		new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
		new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
	]);
	expect(res.length).toBe(2);
	const sortedRes = res.sort((a, b) => {
		if (a.user.deviceId < b.user.deviceId) return -1;
		if (a.user.deviceId < b.user.deviceId) return 1;
		return 0;
	});
	expect(sortedRes[0].user.deviceId).toBe("deviceA");
	expect(sortedRes[0].user.closeContactFlag).toBe(true);
	expect(sortedRes[1].user.deviceId).toBe("deviceC");
	expect(sortedRes[1].user.closeContactFlag).toBe(true);

	let updated_user = await UserModel.findOne({ deviceId: "deviceA" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
	updated_user = await UserModel.findOne({ deviceId: "deviceC" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
});

test('RiskAnalysisMgr.searchQueryEncounters(multiple): no match (multiple tokens per user) ', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "alphaA", user: user })).save();
	await (new QueryTableModel({ encounterToken: "alphaB", user: user })).save();
	await (new QueryTableModel({ encounterToken: "alphaC", user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "bravoA", user: user })).save();
	await (new QueryTableModel({ encounterToken: "bravoB", user: user })).save();
	await (new QueryTableModel({ encounterToken: "bravoC", user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "charlieA", user: user })).save();
	await (new QueryTableModel({ encounterToken: "charlieB", user: user })).save();
	await (new QueryTableModel({ encounterToken: "charlieC", user: user })).save();

	const res = await RiskAnalysisMgr.searchQueryEncounters([
		new UploadTableModel({ encounterToken: "nomatch1", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
		new UploadTableModel({ encounterToken: "nomatch2", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
	]);
	expect(res).toStrictEqual([]);
	for (let u of await UserModel.find({}).exec()) {
		expect(u.closeContactFlag).toBe(false);
	}
});

test('RiskAnalysisMgr.searchQueryEncounters(multiple): 1 match (multiple tokens per user)', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "alphaA", user: user })).save();
	await (new QueryTableModel({ encounterToken: "alphaB", user: user })).save();
	await (new QueryTableModel({ encounterToken: "alphaC", user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "bravoA", user: user })).save();
	await (new QueryTableModel({ encounterToken: "bravoB", user: user })).save();
	await (new QueryTableModel({ encounterToken: "bravoC", user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "charlieA", user: user })).save();
	await (new QueryTableModel({ encounterToken: "charlieB", user: user })).save();
	await (new QueryTableModel({ encounterToken: "charlieC", user: user })).save();

	const res = await RiskAnalysisMgr.searchQueryEncounters([
		new UploadTableModel({ encounterToken: "nomatch1", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
		new UploadTableModel({ encounterToken: "charlieC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
	]);
	expect(res.length).toBe(1);
	expect(res[0].user.deviceId).toBe("deviceC");
	expect(res[0].user.closeContactFlag).toBe(true);
	const updated_user = await UserModel.findOne({ deviceId: "deviceC" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
});

test('RiskAnalysisMgr.searchQueryEncounters(multiple): 2 match (multiple tokens per user)', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "alphaA", user: user })).save();
	await (new QueryTableModel({ encounterToken: "alphaB", user: user })).save();
	await (new QueryTableModel({ encounterToken: "alphaC", user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "bravoA", user: user })).save();
	await (new QueryTableModel({ encounterToken: "bravoB", user: user })).save();
	await (new QueryTableModel({ encounterToken: "bravoC", user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "charlieA", user: user })).save();
	await (new QueryTableModel({ encounterToken: "charlieB", user: user })).save();
	await (new QueryTableModel({ encounterToken: "charlieC", user: user })).save();

	const res = await RiskAnalysisMgr.searchQueryEncounters([
		new UploadTableModel({ encounterToken: "charlieA", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
		new UploadTableModel({ encounterToken: "charlieC", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold }),
	]);
	expect(res.length).toBe(2);
	expect(res[0].user.deviceId).toBe("deviceC");
	expect(res[0].user.closeContactFlag).toBe(true);
	expect(res[1].user.deviceId).toBe("deviceC");
	expect(res[1].user.closeContactFlag).toBe(true);
	const updated_user = await UserModel.findOne({ deviceId: "deviceC" }).exec();
	expect(updated_user?.closeContactFlag).toBe(true);
});

test('RiskAnalysisMgr.searchQueryEncounters(single): outside threshold', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "alpha", user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "bravo", user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "charlie", user: user })).save();

	const res = await RiskAnalysisMgr.searchQueryEncounters([
		new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold - 0.1 }),
	]);
	expect(res).toStrictEqual([]);
	const updated_user = await UserModel.findOne({ deviceId: "deviceC" }).exec();
	expect(updated_user?.closeContactFlag).toBe(false);
});

test('RiskAnalysisMgr.searchQueryEncounters(multiple): outside threshold', async () => {
	let user = await new UserModel({ deviceId: "deviceA", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "alpha", user: user })).save();
	user = await new UserModel({ deviceId: "deviceB", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "bravo", user: user })).save();
	user = await new UserModel({ deviceId: "deviceC", closeContactFlag: false }).save();
	await (new QueryTableModel({ encounterToken: "charlie", user: user })).save();

	const res = await RiskAnalysisMgr.searchQueryEncounters([
		new UploadTableModel({ encounterToken: "alpha", timeOfEncounter: 1, duration: Conf.durationThresholdinMs - 1, signalStrength: Conf.signalStrengthThreshold }),
		new UploadTableModel({ encounterToken: "bravo", timeOfEncounter: 1, duration: Conf.durationThresholdinMs, signalStrength: Conf.signalStrengthThreshold - 0.1 }),
		new UploadTableModel({ encounterToken: "charlie", timeOfEncounter: 1, duration: Conf.durationThresholdinMs - 1, signalStrength: Conf.signalStrengthThreshold - 0.1 }),
	]);
	expect(res).toStrictEqual([]);
	for (let u of await UserModel.find({}).exec()) {
		expect(u.closeContactFlag).toBe(false);
	}
});

afterEach(async () => {
	await UploadTableModel.deleteMany({});
	await QueryTableModel.deleteMany({});
	await UserModel.deleteMany({});
});

afterAll(async () => {
	await db.drop();
	db.disconnect();
});
