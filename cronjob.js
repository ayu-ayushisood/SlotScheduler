const https = require('https');
const moment = require('moment');
const _ = require('underscore');

var twilio = require('twilio');
require('dotenv').config();

const requirementData = require('./cronScheduleRequirements.js');

const calendarByDistrictUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?';

const cronjobFunc = () => {
    apiCalls();
};

const apiCalls = () => {
    const requirementObject = requirementData.requirementData;

    requirementObject.forEach(reqObj => {
      let dataForUrl = `district_id=${reqObj.district_id}&date=${moment().format('DD-MM-YYYY')}`;
      const finalUrl = `${calendarByDistrictUrl}${dataForUrl}`;

      https.get(finalUrl, (resp) => {
        let data = '';
        
        resp.on('data', (chunk) => {
          data += chunk;
        });
    
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          // console.log(data);
          let availableData = parseData(JSON.parse(data), reqObj.name, reqObj.phone);
          // console.log('available Data - ' + JSON.stringify(availableData));
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    });
};

const sendSms = async (smsText, phoneNum) => {

  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN; 
  var fromPhone = process.env.FROM_PHONE_NUMBER;

  var client = new twilio(accountSid, authToken);

  client.messages.create({
    body: smsText,
    to: phoneNum,  // Text this number
    from: fromPhone // From a valid Twilio number
  })
  .then((message) => console.log(message.sid))
  .catch( error => console.log("Error in sending message", error))
};

const parseData = (data, name, phoneNum) => {
  let centers = data.centers;

  let availableCenterCapabilities = centers.map(center => {
    const centerName = center.name;
    const address = center.address;

    const sessions = center.sessions;

    let availableCapacities = sessions.map(session => {
      const date = session.date;
      const availableCapacity = session.available_capacity;
      const minAgeLimit = session.min_age_limit;

      if (availableCapacity > 0 && minAgeLimit !== 45) {
        const sms_message = `${availableCapacity} slots available at ${centerName} - ${address}. Min Age - ${minAgeLimit}. Dt: ${date}`;
        sendSms(sms_message, phoneNum);
        return {
          name: centerName,
          address: address,
          available: availableCapacity,
          date: date,
        };
      }
    });

    return _.compact(availableCapacities);
  });

  console.log('parsed Data for ' +  name + ' - ' + '\n' + JSON.stringify(_.compact(availableCenterCapabilities)));
};

module.exports = ({ cronjobFunc });