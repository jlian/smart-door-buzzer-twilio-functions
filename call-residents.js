exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  
  // If no valid answer after timeout, dial all residents until someone picks up
  let dial = twiml.dial({action: '/text-me?Method=call'});
  // dial.number(context.SKYLER_PHONE); // Skyler
  // dial.number(context.CHAYA_PHONE); // Chaya
  dial.number(context.JOHN_PHONE); // John  
  
  callback(null, twiml)  
}