const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { queryData } = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
	if (!event.pathParameters.genre) {
		// failed without an venue id
		return sendResponse400({ message: "missing genre from the path" });
	}

	const genre = event.pathParameters.genre;

	const queryTheGenre = await queryData({
		tableName,
		index: "genre-index",
		queryKey: "genre",
		queryValue: genre,
	});

	return sendResponse200(queryTheGenre);
};
