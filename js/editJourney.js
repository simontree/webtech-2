//Prüfen ob Array bereits mit Daten gefüllt
let dataArray = localStorage.getItem("trips") 
? JSON.parse(localStorage.getItem("trips")) 
: [];
const addButton = document.querySelector(".addTrip");
let table = document.querySelector(".triptable");
const btnWrapper = document.querySelector("#btnWrapper");
const saveEditBtn = document.querySelector("#saveEdit");
const cancelEditBtn = document.querySelector("#cancelEdit");

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

//Reisen bearbeiten
btnWrapper.addEventListener('click', (event) => {
    //checken ob Klick auf Button nicht auf div "btnWrapper"
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    for(i=1; i<4; i++){
    if(event.target.id = window['editTrip-'+i]){   //dynamische Parameter für Trip2-3?? 
        
        window['name'+i] = document.querySelector("#nameTrip"+i);
        window['start'+i] = document.querySelector("#startTrip"+i);  //string muss noch in date geparsed werden
        window['end'+i] = document.querySelector("#endTrip"+i);    //string muss noch in date geparsed werden
        window['country'+i] = document.querySelector("#countryTrip"+i);

        var name = window['name'+i];
        var start = window['start'+i];
        var end = window['end'+i];
        var country = window['country'+i];

        window['name'+i+'Input'] = document.querySelector('input[name="tripname"]');   
        window['start'+i+'Input'] = document.querySelector('input[name="startDate"]');
        window['end'+i+'Input'] = document.querySelector('input[name="endDate"]');
        window['country'+i+'Input'] = document.querySelector('input[name="country"]');

        var nameInput = window['name'+i+'Input'];
        var startInput = window['start'+i+'Input'];
        var endInput = window['end'+i+'Input'];
        var countryInput = window['country'+i+'Input'];

        nameInput.value = name.innerText;
        startInput.value = start.innerText;
        endInput.value = end.innerText;
        countryInput.value = country.innerText;
        openForm();

        nameInput.addEventListener('change', (event) =>{
            event.preventDefault();
            name.innerText = nameInput.value;
        })
        startInput.addEventListener('change', (event) =>{
            event.preventDefault();
            start.innerText = startInput.value;
        })
        endInput.addEventListener('change', (event) =>{
            event.preventDefault();
            end.innerText = endInput.value;
        })
        countryInput.addEventListener('change', (event) =>{
            event.preventDefault();
            country.innerText = countryInput.value;
        })
        break;
    }}
    
}) 


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


//um Reisen hinzuzufügen
addButton.addEventListener('click', function(){
    
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