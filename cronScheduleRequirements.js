require('dotenv').config();

const karan_ph_no = process.env.KARAN_PH_NO
const requirementData = [
    {
        'name': 'Karan Asthana',
        'district_id': 664,
        'phone': karan_ph_no
    }, {
        'name': 'Karan 2',
        'district_id': 663,
        'phone': karan_ph_no
    }
];

module.exports = ({ requirementData });