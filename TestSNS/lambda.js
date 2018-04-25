let AWS = require('aws-sdk');
const sns = new AWS.SNS();
exports.handler = function (event, context, callback) {
	console.log("Message sent");
	sns.publish({
		Message: 'Test SNS as a resource',
		Subject: 'Test SNS as a resource',
		MessageAttributes: {},
		MessageStructure: 'String',
		TopicArn: 'arn:aws:sns:us-east-1:318300609668:SMS_SNS'
	}).promise()
		.then(data => {
			// your code goes here
			console.log("Pass SNS");
		})
		.catch(err => {
			// error handling goes here
			console.log("Fail SNS");
		});
	sns.publish({
		Message: 'Test SNS Direct SMS',
		MessageAttributes: {
			'AWS.SNS.SMS.SMSType': {
				DataType: 'String',
				StringValue: 'Promotional'
			},
			'AWS.SNS.SMS.SenderID': {
				DataType: 'String',
				StringValue: 'Kumudika'
			},
		},
		PhoneNumber: '+940772445224'
	}).promise()
		.then(data => {
			// your code goes here
			console.log("SMS Sent Successfully");
		})
		.catch(err => {
			// error handling goes here
			console.log("SMS delivery failed");
		});

	callback(null, 'Successfully executed');
}