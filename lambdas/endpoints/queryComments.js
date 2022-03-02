const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { queryData } = require("../common/Dynamo");

const tableName3 = process.env.tableName3;

exports.handler = async (event) => {
	if (!event.pathParameters.venue_number) {
		// failed without an venue id
		return sendResponse400({
			message: "missing venue number from the path",
		});
	}

	const venue_number = event.pathParameters.venue_number;

	console.log("ha", tableName3);
	const queryTheComments = await queryData({
		tableName: tableName3,
		index: "venue_number-index",
		queryKey: "venue_number",
		queryValue: venue_number,
	});

	return sendResponse200(queryTheComments);
};
