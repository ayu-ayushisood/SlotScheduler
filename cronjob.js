const https = require('https');

const calendarByDistrictUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=664&date=04-05-2021';

const cronjobFunc = () => {
    console.log('running a task every minute');
    apiCall();
};

const apiCall = () => {
    https.get(calendarByDistrictUrl, (resp) => {
        let data = '';
        
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          console.log('normal');
          data += chunk;
        });
    
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log('End');
          console.log(data);
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
}

module.exports = ({cronjobFunc, apiCall});