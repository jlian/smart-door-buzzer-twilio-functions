exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();

  console.log('Speech: ' + event.SpeechResult + '. Confidence: ' + event.Confidence)
  console.log('Digits: ' + event.Digits)
    
  if ( (event.SpeechResult == context.PASSPHRASE && event.Confidence > 0.5) || event.Digits == context.PASSCODE) {
    // Check if we have a password match, and open the door
    twiml.say({voice: 'man'}, 'Nice! fam!')
    twiml.play({digits: '9'}) // Pressing 9 sends DTFM tone to open the door
    twiml.pause({length:1})
    twiml.play('http://demo.twilio.com/docs/classic.mp3')

    // Also send me a text on this 
    twiml.redirect('/text-me?Method=code')
    callback(null, twiml)  
	} else {
    twiml.redirect('/call-residents')
    callback(null, twiml)
  }
}