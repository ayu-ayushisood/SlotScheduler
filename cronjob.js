const https = require('https');
const moment = require('moment');
const _ = require('underscore');

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
              let availableData = parseData(JSON.parse(data), reqObj.name);
              // console.log('available Data - ' + JSON.stringify(availableData));
            });
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
    });
}

const parseData = (data, name) => {
  let centers = data.centers;

  let availableCenterCapabilities = centers.map(center => {
    const centerName = center.name;
    const address = center.address;
    const pincode = center.pincode;

    const sessions = center.sessions;

    let availableCapacities = sessions.map(session => {
      const date = session.date;
      const availableCapacity = session.available_capacity;
      const minAgeLimit = session.min_age_limit;

      if (availableCapacity > 0) {
        return {
          name: centerName,
          // address: address,
          // pincode: pincode,
          available: availableCapacity,
          date: date,
          // min_age_limit: minAgeLimit,
        };
      }
    });

    return _.compact(availableCapacities);
  });

  console.log('parsed Data for ' +  name + ' - ' + '\n' + JSON.stringify(_.compact(availableCenterCapabilities)));
}

module.exports = ({cronjobFunc});