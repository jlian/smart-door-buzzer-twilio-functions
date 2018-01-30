exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.VoiceResponse();

	var bodyText;

	if (event.Method == 'code') {bodyText = 'Someone used the password to get in the building.'} 
	else {bodyText = 'Somebody buzzed the door but didn\'t know the passcode.'}

	context.getTwilioClient().messages.create({
		to: context.JOHN_PHONE,
		from: context.TWILIO_PHONE,
		body: bodyText,
	})
		.then((message) => {
		console.log(message.sid);
		callback(null, twiml); 
	})
	.catch((err) => callback(err, null));
};