const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { getAllData } = require("../common/Dynamo");

const tableName2 = process.env.tableName2;

exports.handler = async (event) => {
	const venue = await getAllData(tableName2).catch((err) => {
		console.log("error in Dynamo Get", err);
		return null;
	});

	if (!venue) {
		return sendResponse400({ message: "Failed to get venue data" });
	}

	return sendResponse200({ venue });
};
