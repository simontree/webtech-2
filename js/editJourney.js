const addButton = document.querySelector(".addTrip");
let table = document.querySelector(".triptable tbody");

const saveEditBtn = document.querySelector("#saveEdit");
const cancelEditBtn = document.querySelector("#cancelEdit");
var buttonIds = [];
var buttonID = 0;
const form = document.querySelector(".form-popup");

//connect Frontend to Backend
const BASE_URL = "https://travelsitebackend.herokuapp.com";


let dataArray = [];
var arrayLength = 0;

function userEmail(){
  cookieParsing = document.cookie.split('=')[1];
  console.log(cookieParsing);
  return cookieParsing;
};

//get existing trips from database
fetch(`${BASE_URL}/trips/` + userEmail(), {method: 'POST', body: {user_id: userEmail(),},})
  .then((response) => response.json())
  .then((trip) => {
    console.log("connected to db");
    console.log(userEmail());
    let array = trip;
    dataArray.push(array);
    arrayLength = dataArray[0].length;

    //Reise Dropdown Menu ausfüllen.
    getNames();
    //Get Email from session
    const userEmail = userEmail();

    if (dataArray.length > 0) {
      dataArray[0].forEach((trip) => {
        var row = table.insertRow("${index}");
        const cell1 = row
          .insertCell(0)
          .appendChild(document.createElement("td"));
        const cell2 = row
          .insertCell(1)
          .appendChild(document.createElement("td"));
        const cell3 = row
          .insertCell(2)
          .appendChild(document.createElement("td"));
        const cell4 = row
          .insertCell(3)
          .appendChild(document.createElement("td"));
        console.log("tripid begin: " + trip.trip_id);
        cell1.innerText = trip.name;
        cell2.innerText = trip.start;
        cell3.innerText = trip.end;
        cell4.innerText = trip.country;
        trip.id = buttonID++;
        buttonIds.push(trip.id);

        if (window.location.pathname === "/reise_bearbeiten.html") {
          const editBtn = row
            .insertCell(4)
            .appendChild(document.createElement("button"));
          const delBtn = row
            .insertCell(5)
            .appendChild(document.createElement("button"));
          editBtn.innerText = "Bearbeiten";
          editBtn.id = "editBtn" + trip.id;
          delBtn.innerText = "Löschen";
          delBtn.id = "delBtn" + trip.id;
          //zum Iterieren für Style s.u.

          editBtn.addEventListener("click", (event) => {
            event.preventDefault();

            openForm();

            document.querySelector('input[name="name"]').value =
              cell1.innerText;
            document.querySelector('input[name="start"]').value =
              cell2.innerText;
            document.querySelector('input[name="end"]').value = cell3.innerText;
            document.querySelector('select[class="dropdown"]').value =
              cell4.innerText;

            form.addEventListener("change", (event) => {
              cell1.innerText =
                document.querySelector('input[name="name"]').value;
              cell2.innerText = document.querySelector(
                'input[name="start"]'
              ).value;
              cell3.innerText =
                document.querySelector('input[name="end"]').value;
              cell4.innerText = document.querySelector(
                'select[class="dropdown"]'
              ).value;
            });
            console.log("Edit", trip.name);
            console.log("tripID after editBtnclick: " + trip.trip_id);
            console.log("tripname : " + trip.name);
          });

          delBtn.addEventListener("click", (event) => {
            event.preventDefault();
            if (dataArray[0].length === 1) {
              table.deleteRow(0);
              dataArray = [];
              console.log("Delete", trip.name);
            } else if (dataArray[0].length > 1) {
              console.log("trip.trip_id deleted: " + trip.trip_id);

              table.deleteRow("${index}");
              var idToDelete = trip.trip_id;
              dataArray = dataArray.filter(
                (trip) => trip.trip_id !== idToDelete
              );
              console.log("trip.trip_id deleted: " + trip.trip_id);
            }

            const deleteTrip = async () => {
              const response = await fetch(
                `${BASE_URL}/trips/` + trip.trip_id,
                {
                  method: "DELETE",
                  mode: "cors",
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  }
                }
              );
              const reload = await window.location.reload();
            };
            deleteTrip();
            console.log("Delete", trip.name);
          });

          function openForm() {
            document.querySelector(".form-popup").style.display = "block";
            document.querySelector("body").style.background = "grey";

            for (var i = 0; i < buttonIds.length; i++) {
              document.getElementById("editBtn" + i).style.color = "grey";
              document.getElementById("editBtn" + i).style.background = "grey";
              document.getElementById("editBtn" + i).style.border = "white";
              document.getElementById("delBtn" + i).style.color = "grey";
              document.getElementById("delBtn" + i).style.background = "grey";
              document.getElementById("delBtn" + i).style.border = "white";
            }

            saveEditBtn.addEventListener("click", (event) => {
              event.preventDefault();
              const postData = {
                name: document.querySelector('input[name="name"]').value,
                start: document.querySelector('input[name="start"]').value,
                end: document.querySelector('input[name="end"]').value,
                country: document.querySelector('select[class="dropdown"]')
                  .value,
                  user_id: userEmail(),
              };
              
              const updateTrip = async () => {
                const response = await fetch(
                  `${BASE_URL}/trips/` + trip.trip_id,
                  {
                    method: "PATCH",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                  }
                );
                const reload = await location.reload();
                return response.status === 200;
              };
              updateTrip();
              closeForm();

              event.stopPropagation();
            });

            cancelEditBtn.addEventListener("click", (event) => {
              closeForm();
              event.stopPropagation();
            });
          }

          function closeForm() {
            document.querySelector(".form-popup").style.display = "none";
            document.querySelector("body").style.background = "white";
            for (var i = 0; i < buttonIds.length; i++) {
              document.getElementById("editBtn" + i).removeAttribute("style");
              document.getElementById("delBtn" + i).removeAttribute("style");
            }
            document.querySelector('input[name="name"]').value = "";
            document.querySelector('input[name="start"]').value = "";
            document.querySelector('input[name="end"]').value = "";
            document.querySelector('select[class="dropdown"]').value = "";
          }
          saveEditBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const postData = {
              name: document.querySelector('input[name="name"]').value,
              start: document.querySelector('input[name="start"]').value,
              end: document.querySelector('input[name="end"]').value,
              country: document.querySelector('input[name="country"]').value,
              user_id: userEmail(),
            };

            const updateTrip = async () => {
              const response = fetch(`${BASE_URL}/trips/` + trip.trip_id, {
                method: "PATCH",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
              });
              return response.status === 200;
            };
            updateTrip();
            closeForm();
            // location.reload();
          });
          cancelEditBtn.addEventListener("click", (event) => {
            closeForm();
            event.stopPropagation();
          });
        }

        if (window.location.pathname === "/reise_hinzufugen.html") {
          addButton.addEventListener("click", function () {
            if (dataArray[0].length === 0) {
              var row = table.insertRow(0);
            } else {
              var row = table.insertRow(dataArray[0].length);
            }

            let name = document.querySelector("#name").value;
            let start = document.querySelector("#start").value;
            let end = document.querySelector("#end").value;
            let country = document.querySelector(".dropdown").value;

            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);

            cell1.appendChild(document.createTextNode(name));
            cell2.appendChild(document.createTextNode(start));
            cell3.appendChild(document.createTextNode(end));
            cell4.appendChild(document.createTextNode(country));

            var id = buttonIds.length; //nächste freie ID

            var tableData = {
              name: name,
              start: start,
              end: end,
              country: country,
              user_id: userEmail(),
            };
            dataArray.push(tableData);

            const addTripToDb = async () => {
              const response = await fetch(`${BASE_URL}/trips`, {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(tableData),
              });
              const reload = await location.reload();
              return response.status === 200;
            };
            addTripToDb(tableData);
            clearForm();
          });

          function clearForm() {
            document.querySelector("#name").value = "";
            document.querySelector("#start").value = "";
            document.querySelector("#end").value = "";
            document.querySelector(".dropdown").value = "";
          }
        }
      });
    }
  });
//Geojson sind die Polygone (Schatten auf den Map)
const loadData = async () => {
  const data = await fetch(
    "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson"
  );
  return data.json();
};

const getNames = async () => {
  const geoJson = await loadData();
  geoJson.features.forEach(loadNames);
};
function loadNames(item) {
  //console.log(item.properties.name);
  let dropDownMenu = document.querySelector(".dropdown");
  let option = document.createElement("option");
  option.appendChild(document.createTextNode(item.properties.name));
  dropDownMenu.append(option);
}
