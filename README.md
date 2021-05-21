# SlotScheduler

The repository uses NodeJS to check for open vaccine slots in the districts by repeatedly pinging the Cowin website every minute per user object.

To get this working, do the following steps - 
- Sign up on Twilio with your phone number for a free account
- Register your number and others', if required. (OTP Verification is needed for Twilio's free accounts)
- Take out the Twilio Auth_Token and Twilio Account_SID

- Create a new file `.env` whose contents should be -->

```
TWILIO_ACCOUNT_SID = My_Account_Sid
TWILIO_AUTH_TOKEN = My_Auth_Token
USERNAME_PH_NO = +91<10_Digit_Number>
```

- In the file, cronScheduleRequirements.js, import phone numbers you want to send the sms to, in the following way -
```
const username_ph_no = process.env.USERNAME_PH_NO
```
- Also, add your district's id in the object (refer District-DistrictID-Map file for your district's id)
- Add their objects to the `requirementData` list.

Finally, locally run your script by the following command.
```node index```
