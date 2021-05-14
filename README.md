# SlotScheduler

The repository uses NodeJS to check for open vaccine slots in the districts by repeatedly pinging the Cowin website every minute per user object.

To get this working, do the following steps - 
- Sign up on Twilio with your phone number for a free account
- Register your number and others', if required. (OTP Verification needs to happen)
- Take out the Twilio Auth_Token and Twilio Account SID

- Create a new file `.env` whose contents should be -->

```
TWILIO_ACCOUNT_SID=My_Account_Sid
TWILIO_AUTH_TOKEN=My_Auth_Token
KARAN_PH_NO=+91<10_Digit_Number>
```

- in the file, cronScheduleRequirements.js, import phone numbers in the following way -
```
const karan_ph_no = process.env.KARAN_PH_NO
```
- also, add your district's id in the object (refer District-DistrictID-Map file for your district's id)
- add their objects to the `requirementData` list.

Finally, locally run your script by the following command.
```node index```
