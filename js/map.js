
/**
 * Code to generate map in map.html
 * Should take the list of travels, from the list in reise_hinzufügen
 * check if the time is gone and paint the visited countries
 */

//Made an extra js (trips) as a scapegoat to save the trips 
//and import them among the htmls that need it
let importedTrips = localStorage.getItem("trips");
var map = document.querySelector('#map');
var mymap = L.map(map).setView([51.505, -0.09], 4);
const tripsJSON = importedTrips ? JSON.parse(importedTrips) : [];
let countryList = document.querySelector('#besuchte');
//console.log(tripsJSON);
//Generate Country names in html

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////Test Fill Local Storage ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////Test End ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



if(tripsJSON.length > 0){
    tripsJSON.forEach(trip => {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.appendChild(document.createTextNode(trip.country));
      li.appendChild(a);
      countryList.appendChild(li);      
    });
}


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png	', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


const visitedCountries = mapToTextArray(Array.from(document.querySelector('#besuchte').getElementsByTagName('li')));
//console.log(mapToTextArray(visitedCountries));

const loadData = async () => {
  const data = await fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson');
  return data.json();
}

const displayData = async () => {
  const geoJson = await loadData();
  //console.log(geoJson);
  const filteredData = {
    ...geoJson,
    features: geoJson.features.filter(feature => 
                                  !visitedCountries.includes(feature.properties.name))
  };

  const filteredVisited = {
...geoJson,
    features: geoJson.features.filter(feature => 
                                  visitedCountries.includes(feature.properties.name))
  };
  //Load not visited
  L.geoJSON(filteredData,{
    style: function(feature){
      return {color: '#000000'};
    }
  }).addTo(mymap);
  //Load visited, other color
  L.geoJSON(filteredVisited,{
    style: function(feature){
      return {color: '#4000b0'};
    }
  })//Add to the map
  .addTo(mymap);

  //L.geoJSON(filteredData).addTo(mymap);

  
}

displayData();

//Take elements from the list on html, and create list of visited countries
// old stuff from master-branch below
//function mapToTextArray(liArray){
//  let countries = [];
//  const length = liArray.length;
//  let x = "";

  for(let i=1; i<length; i++){

  for(i=1; i<length; i++){
    x = liArray[i].innerText
    countries.push(x);
  }
  return countries;
}




