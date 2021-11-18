//Prüfen ob Array bereits mit Daten gefüllt
let dataArray = localStorage.getItem("trips") 
? JSON.parse(localStorage.getItem("trips")) 
: [];
const addButton = document.querySelector(".addTrip");
let table = document.querySelector(".triptable tbody");
const btnWrapper = document.querySelector("#btnWrapper");
const saveEditBtn = document.querySelector("#saveEdit");
const cancelEditBtn = document.querySelector("#cancelEdit");
var buttonIds = [];

//Reise-Dummys hinzufügen falls noch keine Daten in dataArray
if(dataArray.length===0){
    var trips = [
        {tripname: "Surfen & Entspannung", startDate: "07.09.2021", endDate: "14.09.2021", country: "Kuba", id: 0},
        {tripname: "Spa-Woche", startDate: "02.10.2021", endDate: "08.10.2021", country: "Spanien", id: 1},
        {tripname: "Erholung unter Palmen ", startDate: "05.01.2022", endDate: "12.01.2022", country: "Ungarn", id: 2}
    ]
    dataArray.push(...trips);
}

if(dataArray.length > 0){

    dataArray.forEach(trip => {
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
            editBtn.id = "editBtn"+trip.id;
            delBtn.innerText = 'Löschen';
            delBtn.id = "delBtn"+trip.id;
            //zum Iterieren für Style s.u.
            buttonIds.push(trip.id);

            editBtn.addEventListener('click', (event) => {
                event.preventDefault();
                openForm();
            })

            delBtn.addEventListener('click', (event) => {
                event.preventDefault();
                console.log('Delete', trip.tripname);
            })
        }
    })

}

if(window.location.pathname==="/reise_bearbeiten.html"){

function openForm(){
    document.querySelector(".form-popup").style.display ="block";
    document.querySelector("body").style.background ="grey";
    
    for(var i = 0; i<buttonIds.length; i++){
        document.getElementById("editBtn"+i).style.color ="grey";
        document.getElementById("editBtn"+i).style.background="grey";
        document.getElementById("editBtn"+i).style.border="white";
        document.getElementById("delBtn"+i).style.color ="grey";
        document.getElementById("delBtn"+i).style.background="grey";
        document.getElementById("delBtn"+i).style.border="white";
    }
    
}

function closeForm(){
    document.querySelector(".form-popup").style.display ="none";
    document.querySelector("body").style.background = "white";

    for(var i = 0; i<buttonIds.length; i++){
        document.getElementById("editBtn"+i).removeAttribute('style');
        document.getElementById("delBtn"+i).removeAttribute('style');
    }
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
addButton.addEventListener('click', function(){
    
    var row = table.insertRow(dataArray.length);
    
    let tripname = document.querySelector("#tripname").value;
    let startDate = document.querySelector("#startDate").value; // Date format noch ändern
    let endDate = document.querySelector("#endDate").value;     //
    let country = document.querySelector("#country").value;

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    
    cell1.appendChild(document.createTextNode(tripname));
    cell2.appendChild(document.createTextNode(startDate));
    cell3.appendChild(document.createTextNode(endDate));
    cell4.appendChild(document.createTextNode(country));
    
    var tableData = {'tripname': tripname, 'startDate': startDate, 'endDate': endDate, 'country': country};
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