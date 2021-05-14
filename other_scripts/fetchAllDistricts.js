allDistricts = [];
$.ajax({
  url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states',
  type: 'GET',
  contentType: 'application/json',
})
.then(function(data) {
  var allStatesList = data.states;
  debugger;
  var allStateDistricts = allStatesList.map(function(state) {
    var stateID = state.state_id;
    $.ajax({
        url: 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + stateID,
        type: 'GET',
        contentType: 'application/json',
    }).then(function(districtsData) {
      allDistricts = allDistricts.concat(districtsData.districts);
      console.log(districtsData.districts);
    });
  });
});

districtsIdNameMap = {};
allDistricts.forEach(distObj => {
  districtsIdNameMap[distObj.district_id] = distObj.district_name;
});