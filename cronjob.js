const https = require('https');
const moment = require('moment');

const requirementData = require('./cronScheduleRequirements.js');

const calendarByDistrictUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?';

const cronjobFunc = () => {
    console.log('running a task every minute');
    apiCalls();
};

const apiCalls = () => {
    const requirementObject = requirementData.requirementData;
    console.log('api calls start');
    console.log(JSON.stringify(requirementObject));

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
              console.log(data);
            });
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
    });
}

module.exports = ({cronjobFunc});