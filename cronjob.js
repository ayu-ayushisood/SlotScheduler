const https = require('https');
const moment = require('moment');
const nodemailer = require("nodemailer");

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
    //create full url as per reqObj
    console.log('creating url');
    let dataForUrl = `district_id=${reqObj.district_id}&date=${moment().format('DD-MM-YYYY')}`;
    const finalUrl = `${calendarByDistrictUrl}${dataForUrl}`;

    console.log(reqObj.name);

    https.get(finalUrl, (resp) => {
      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
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
  });
}

const sendEmail = async () => {
  //   let testAccount = await nodemailer.createTestAccount();
  // console.log("test account", testAccount)
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.ethereal.email",
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: testAccount.user, // generated ethereal user
  //       pass: testAccount.pass, // generated ethereal password
  //     },
  //   });

  //   let info = await transporter.sendMail({
  //     from: '"Fred Foo 👻" <sood.ayushi30@gmail.com>', // sender address
  //     to: "karan.asthana1@gmail.com, sood.ayushi30@gmail.com", // list of receivers
  //     subject: "Hello ✔", // Subject line
  //     text: "Hello world?", // plain text body
  //     html: "<b>Hello world?</b>", // html body
  //   }, (err) => {
  //     console.log("ERROR in sending email..", err)
  //   });

  //   console.log("Message sent: %s", info.messageId);

  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error('Failed to create a testing account');
      console.error(err);
      return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
      {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        },
        logger: true,
        debug: false // include SMTP traffic in the logs
      },
      {
        // default message fields

        // sender info
        from: 'Nodemailer <example@nodemailer.com>',
        headers: {
          'X-Laziness-level': 1000 // just an example header, no need to use this
        }
      }
    );

    // Message object
    let message = {
      // Comma separated list of recipients
      to: 'sood.ayushi30@gmail.com',

      // Subject of the message
      subject: 'Nodemailer is unicode friendly ✔' + Date.now(),

      // plaintext body
      text: 'Hello to myself!',

      // HTML body
      html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>
  <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>`,

      // AMP4EMAIL
      amp: `<!doctype html>
  <html ⚡4email>
  <head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
  </head>
  <body>
  <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
  <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
  <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
  </body>
  </html>`,

      // An array of attachments
      

      list: {
        // List-Help: <mailto:admin@example.com?subject=help>
        help: 'admin@example.com?subject=help',

        // List-Unsubscribe: <http://example.com> (Comment)
        unsubscribe: [
          {
            url: 'http://example.com/unsubscribe',
            comment: 'A short note about this url'
          },
          'unsubscribe@example.com'
        ],

        // List-ID: "comment" <example.com>
        id: {
          url: 'mylist.example.com',
          comment: 'This is my awesome list'
        }
      }
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return process.exit(1);
      }

      console.log('Message sent successfully!');
      console.log(nodemailer.getTestMessageUrl(info));

      // only needed when using pooled connections
      transporter.close();
    });
  });
}
sendEmail();

module.exports = ({ cronjobFunc, apiCalls, sendEmail });