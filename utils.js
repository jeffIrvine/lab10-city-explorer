function mungedLocation(location) {
  return {
    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  };
}

function mungedWeather(location) {
  return location.data.map(item => {
    return {
      forecast: item.weather.description,
      time: item.datetime,
    };
  }).slice(0, 8);
}
function mungedTrails(location) {
  return location.trails.map(item => {
    return {
      'name': item.name,
      'location': item.location,
      'length': item.length,
      'stars': item.stars,
      'star_votes': item.star_votes,
      'summary': item.summary,
      'trail_url': item.trail_url,
      'conditions': item.conditionsStatus,
      'condition_date': item.conditionDate.split(' ')[0],
      'condition_time': item.conditionDate.split(' ')[1]
    };
  }).slice(0, 10);
}


module.exports = {
  mungedLocation, mungedWeather, mungedTrails
};
