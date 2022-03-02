const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { getAllData } = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
	const gig = await getAllData(tableName).catch((err) => {
		console.log("error in Dynamo Get", err);
		return null;
	});

	if (!gig) {
		return sendResponse400({ message: "Failed to get gig data" });
	}

	return sendResponse200({ gig });
};
