const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { postData } = require("../common/Dynamo");
const { gigData } = require("../../gigsDataSeed");
const { venueData } = require("../../venueDataSeed");

exports.handler = async (event) => {
	const tableAndType = event.pathParameters.tableNametype.split("-");
	const tableName = tableAndType[0];
	const type = tableAndType[1];
	let dataToSeed;

	if (!event.pathParameters.tableNametype.includes("-")) {
		return sendResponse400({
			message:
				"param should include tablename and data type eg) tablename-gig, tablename-venue \n  note that table should exist",
		});
	}

	if (!tableName || !tableName.length || !type || type.length < 3) {
		return sendResponse400({
			message: "something is wrong with your param",
		});
	}

	if (type == "gig") {
		dataToSeed = gigData;

		dataToSeed = dataToSeed.map((gig) => {
			const test = { ...gig };
			test["venue_id"] = gig["venue_id"].toString();
			return test;
		});
	}
	if (type == "venue") {
		dataToSeed = venueData;
	}

	await dataToSeed.forEach(async (gig) => {
		const newGig = await postData(gig, tableName).catch((err) => {
			console.log("error in dynamo write", err);
			return null;
		});
	});

	return sendResponse200({ message: `seeded ${type}Data`, tableName });
};
