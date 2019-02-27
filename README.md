# Make your apartment buzzer smart with Twilio Functions

I wanted to make my apartment buzzer acessible without a physical key, so I created these Twilio Functions to make my buzzer smarter. Features include:

* Voice password (make your friends shout stupid things in public to get into your building!)
* PIN password, a classic
* No obvious weirdness or extra waiting for first-time guests or delivery people
* Notify multiple people until someone picks up the phone - as long as one of the roommates pick up, you won't miss your package

I kind of went overboard I think, given my original goal. But this was actually *really* easy to develop and set up. And also really cheap.

## How to set this up

1. You could `git clone https://github.com/jlian/smart-door-buzzer-twilio-functions.git`, but it's not critical.
2. Get a Twilio account and valid Twilio number.
3. Go to https://www.twilio.com/console/runtime/functions/manage and hit **+**.
4. Add each of the 4 `.js` files into its own function with names that you'd remember.
5. Go to https://www.twilio.com/console/runtime/functions/configure and configure the environment variables:
  * `TWILIO_PHONE` with the Twilio number you bought
  * `PASSPHRASE` for voice password
  * `PASSCODE` for PIN
  * `JOHN_PHONE` and others for your cellphone number
5. Go to https://www.twilio.com/console/phone-numbers/incoming and select the phone number you bought earlier.
6. Scroll to where it says **A call comes in**, select **Function**, and then the function that corresponds to `buzzer-activated.js`.
7. Contact your HOA to make the Twilio number your buzzer number - this might be the hardest step.

## How this works

[Twilio Functions](https://www.twilio.com/functions) is pretty sweet. It's completely serverless so you don't need a VM or computer to keep running an app. It's perfect for something small scale like your apartment buzzer. The flow of this program goes like this:

1. A call comes to the Twilio phone number, `buzzer-activated.js` runs.
1. The [Gather](https://www.twilio.com/docs/api/twiml/gather) verb is used to get either a voice password or a 4-digit PIN.
   1. If correct, `door-open.js` dials a `9` to the buzzer (my building's buzzer code, yours may be different), which opens the door.
   1. If incorrect, `call-residents.js` calls all the residents until someone picks up and manually dial `9` to open the door.
1. When everything is finished, `text-me.js` texts a specified number with info on what happened.

## How much this costs

According to Twilio docs, collecting speech is charged at $.02 per 15 seconds. A Twilio number costs $1/month. Looking at my own billing dashboard, it never exceeds $2/month - pretty reasonable. 
