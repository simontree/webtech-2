//zum Zählen der Tabellenreihe
let count = 0;    

let dataArray = localStorage.getItem('trips') 
? JSON.parse(localStorage.getItem('trips')) 
: [];
localStorage.setItem('trips', JSON.stringify(dataArray));

//zum Speichern der Daten nach Reload
//const data = JSON.parse(localStorage.getItem('trips'));

//um Reisen hinzuzufügen, zu bearbeiten oder zu löschen
function addJourney(){
count +=1;

let table = document.querySelector(".triptable");
let row = table.insertRow(3+count);

let tripname = document.querySelector("#tripname").value;
let startDate = document.querySelector("#startDate").value;
let endDate = document.querySelector("#endDate").value;
let country = document.querySelector("#country").value;

let cell1 = row.insertCell(0);
let cell2 = row.insertCell(1);
let cell3 = row.insertCell(2);
let cell4 = row.insertCell(3);

cell1.appendChild(document.createTextNode(tripname));
cell2.appendChild(document.createTextNode(startDate));
cell3.appendChild(document.createTextNode(endDate));
cell4.appendChild(document.createTextNode(country));

let tableData = { 'trips' : {'tripname': tripname, 'startDate': startDate, 'endDate': endDate, 'country': country}};

dataArray.push(tableData);
localStorage.setItem('trips', JSON.stringify(dataArray));


clearForm();
}

function clearForm(){    
    document.querySelector("#tripname").value = '';
    document.querySelector("#startDate").value = '';
    document.querySelector("#endDate").value = '';
    document.querySelector("#country").value = '';
}