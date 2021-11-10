//Prüfen ob Array bereits mit Daten gefüllt
let dataArray = localStorage.getItem('trips') 
? JSON.parse(localStorage.getItem('trips')) 
: [];
const button = document.querySelector('.addTrip');
let table = document.querySelector(".triptable");

//falls bereits Daten in localstorage vorhanden - wichtig nach reload der Seite
if(dataArray.length>0){
    
    for(let i=0;i<dataArray.length;i++){
        let row = table.insertRow(4+i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
    
        cell1.appendChild(document.createTextNode(dataArray[i].trips.tripname));
        cell2.appendChild(document.createTextNode(dataArray[i].trips.startDate));
        cell3.appendChild(document.createTextNode(dataArray[i].trips.endDate));
        cell4.appendChild(document.createTextNode(dataArray[i].trips.country));
    }
}

//um Reisen hinzuzufügen
button.addEventListener('click', function(e){
    e.preventDefault();

    if(dataArray.length == 0){
        var row = table.insertRow(4);
    }else{
        var row = table.insertRow(4+dataArray.length);
    }
    
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
    
})

function clearForm(){    
    document.querySelector("#tripname").value = '';
    document.querySelector("#startDate").value = '';
    document.querySelector("#endDate").value = '';
    document.querySelector("#country").value = '';
}