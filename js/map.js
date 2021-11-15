
var map = document.querySelector('#map');
var mymap = L.map(map).setView([51.505, -0.09], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png	', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const visitedCountries = Array.from(document.querySelector('#besuchte').getElementsByTagName('li'));
console.log(mapToTextArray(visitedCountries));

const loadData = async () => {
  const data = await fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson');
  return data.json();
}

const displayData = async () => {
  const geoJson = await loadData();
  console.log(geoJson);
  const filteredData = {
    ...geoJson,
    features: geoJson.features.filter(feature => 
                                  !visitedCountries.includes(feature.properties.name))
  };
  L.geoJSON(filteredData).addTo(mymap);
  
}

displayData();

function mapToTextArray(liArray){
  let countries = [];
  const length = liArray.length;
  let x = "";
  for(i=1; i<length; i++){
    x = liArray[i].innerText
    countries.push(x);
  }
  return countries;
}