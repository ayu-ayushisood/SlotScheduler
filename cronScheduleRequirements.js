require('dotenv').config();

const ayushi_ph_no = process.env.AYUSHI_PH_NO
const karan_ph_no = process.env.KARAN_PH_NO
const requirementData = [
    {
        'name': 'Karan Asthana',
        'district_id': 664,
        'phone': karan_ph_no
    }, {
        'name': 'Ayushi Sood',
        'district_id': 193,
        'phone': ayushi_ph_no
    }
];

module.exports = ({ requirementData });