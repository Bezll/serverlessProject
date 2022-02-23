const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getAllGigData = async (TableName) => {
	let ScanningParams = {
		TableName,
		Limit: 100,
	};

	const data = await documentClient.scan(ScanningParams).promise();

	if (!data) {
		throw Error(`There was an error fetching the data from ${TableName}`);
	}
	console.log(data);

	return data;
};

module.exports.getGigById = async (id, TableName) => {
	const params = {
		TableName,
		Key: {
			id,
		},
	};

	const data = await documentClient.get(params).promise();

	if (!data || !data.Item) {
		throw Error(
			`There was an error fetching the data for id of ${id} from ${TableName}`
		);
	}
	console.log(data);

	return data.Item;
};

module.exports.getAllVenueData = async (TableName) => {
	let ScanningParams = {
		TableName,
		Limit: 100,
	};

	const data = await documentClient.scan(ScanningParams).promise();

	if (!data) {
		throw Error(`There was an error fetching the data from ${TableName}`);
	}
	console.log(data);

	return data;
};

module.exports.getVenueById = async (id, TableName) => {
	const params = {
		TableName,
		Key: {
			id,
		},
	};

	const data = await documentClient.get(params).promise();

	if (!data || !data.Item) {
		throw Error(
			`There was an error fetching the data for id of ${id} from ${TableName}`
		);
	}
	console.log(data);

	return data.Item;
};

module.exports.createDynamo = async (data, TableName) => {
	if (!data.id) {
		throw Error(`no id on the data`);
	}

	const params = {
		TableName,
		Item: data,
	};

	const res = await documentClient.put(params).promise();

	if (!res) {
		throw Error(
			`There was an error inserting id of ${data.id} in table ${TableName}`
		);
	}

	return data;
};

module.exports.updateGigData = async ({
	tableName,
	primaryKey,
	primaryKeyValue,
	updateKey,
	updateValue,
}) => {
	const params = {
		TableName: tableName,
		Key: { [primaryKey]: primaryKeyValue },
		UpdateExpression: `set ${updateKey} = :updateValue`,
		ExpressionAttributeValues: {
			":updateValue": updateValue,
		},
		ReturnValues: "UPDATED_NEW",
	};

	const data = await documentClient.update(params).promise();

	return data;
};
