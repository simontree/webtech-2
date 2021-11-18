//Prüfen ob Array bereits mit Daten gefüllt
let dataArray = localStorage.getItem("trips") 
? JSON.parse(localStorage.getItem("trips")) 
: [];
const addButton = document.querySelector(".addTrip");
let table = document.querySelector(".triptable");
const btnWrapper = document.querySelector("#btnWrapper");
const saveEditBtn = document.querySelector("#saveEdit");
const cancelEditBtn = document.querySelector("#cancelEdit");
var tableLength = document.querySelectorAll('.triptable tr').length;

//falls bereits Daten in localstorage vorhanden - wichtig nach reload der Seite
if(dataArray.length > 0){

    for(var i=0; i< 1;i++){          //header
        var row = table.insertRow(0);  
        var headerCell1 = row.appendChild(document.createElement("TH"));
        var headerCell2 = row.appendChild(document.createElement("TH"));
        var headerCell3 = row.appendChild(document.createElement("TH"));
        var headerCell4 = row.appendChild(document.createElement("TH"));
        headerCell1.innerText = dataArray[0].trips.tripname;
        headerCell2.innerText = dataArray[0].trips.startDate;
        headerCell3.innerText = dataArray[0].trips.endDate;
        headerCell4.innerText = dataArray[0].trips.country;
    };

    for(var i=1; i<(dataArray.length); i++){
    
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
    
        cell1.appendChild(document.createTextNode(dataArray[i].trips.tripname));
        cell2.appendChild(document.createTextNode(dataArray[i].trips.startDate));
        cell3.appendChild(document.createTextNode(dataArray[i].trips.endDate));
        cell4.appendChild(document.createTextNode(dataArray[i].trips.country));
    }
};

//Reise-Dummys hinzufügen falls noch keine Daten in dataArray
if(dataArray.length===0){
    var header = { 'header': {'tripname': "Reisename", 'startDate': "Anfang", 'endDate': "Ende", 'country':"Reiseland"}};
    var trips = [
        {'tripname': "Surfen & Entspannung", 'startDate': "07.09.2021", 'endDate': "14.09.2021", 'country': "Kuba"},
        {'tripname': "Spa-Woche", 'startDate': "02.10.2021", 'endDate': "08.10.2021", 'country': "Spanien"},
        {'tripname': "Erholung unter Palmen ", 'startDate': "05.01.2022", 'endDate': "12.01.2022", 'country': "Ungarn"}
    ]
    
    dataArray.push(header);
    dataArray.push(trips);

    for(var i=0; i< 1;i++){          //header
        var row = table.createTHead();
        var headerCell1 = row.appendChild(document.createElement("TH"));
        var headerCell2 = row.appendChild(document.createElement("TH"));
        var headerCell3 = row.appendChild(document.createElement("TH"));
        var headerCell4 = row.appendChild(document.createElement("TH"));
        headerCell1.innerText = dataArray[0].header.tripname;
        headerCell2.innerText = dataArray[0].header.startDate;
        headerCell3.innerText = dataArray[0].header.endDate;
        headerCell4.innerText = dataArray[0].header.country;
    }

    trips.reverse().forEach(trip => {
        var row = table.insertRow('${index}');
        const cell1 = row.insertCell(0).appendChild(document.createElement('td'));
        const cell2 = row.insertCell(1).appendChild(document.createElement('td'));
        const cell3 = row.insertCell(2).appendChild(document.createElement('td'));
        const cell4 = row.insertCell(3).appendChild(document.createElement('td'));
        
        cell1.innerText = trip.tripname;
        cell2.innerText = trip.startDate;
        cell3.innerText = trip.endDate;
        cell4.innerText = trip.country;
        
        if(window.location.pathname==="/reise_bearbeiten.html"){
            const editBtn = row.insertCell(4).appendChild(document.createElement('button'));
            const delBtn = row.insertCell(5).appendChild(document.createElement('button'));
            editBtn.innerText = 'Bearbeiten';
            editBtn.value = trip.tripname;
            delBtn.innerText = 'Löschen';
            delBtn.value = trip.tripname;

            editBtn.addEventListener('click', (event) => {
                console.log('Edit', trip.tripname);
            })

            delBtn.addEventListener('click', (event) => {
                console.log('Delete', trip.tripname);
            })
        }
    })

}

if(window.location.pathname==="/reise_bearbeiten.html"){

function openForm(){
    document.querySelector(".form-popup").style.display ="block";
    document.querySelector("body").style.background ="grey";
    document.querySelectorAll(".editBtn").forEach((item) =>{
        item.style.color ="grey";
        item.style.background="grey";
        item.style.border="white";
    })
}

function closeForm(){
    document.querySelector(".form-popup").style.display ="none";
    document.querySelector("body").style.background = "white";
    document.querySelectorAll(".editBtn").forEach((item) =>{
        item.removeAttribute('style');
    })
}

saveEditBtn.addEventListener('click', (event) => {
    event.preventDefault();
    closeForm();
})

cancelEditBtn.addEventListener('click', (event) => {
    event.preventDefault();
    closeForm();
})

}

if(window.location.pathname==="/reise_hinzufugen.html"){
//um Reisen hinzuzufügen
addButton.addEventListener('click', function(){
    
    if(dataArray.length === 4){
        var row = table.insertRow(4);
    }else{
        var row = table.insertRow(dataArray.length);
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
}