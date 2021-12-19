//Prüfen ob Array bereits mit Daten gefüllt
// let dataArray = localStorage.getItem("trips")
//   ? JSON.parse(localStorage.getItem("trips"))
//   : [];

//var moment = require("moment"); -> Date formatting library

const addButton = document.querySelector(".addTrip");
let table = document.querySelector(".triptable tbody");

const saveEditBtn = document.querySelector("#saveEdit");
const cancelEditBtn = document.querySelector("#cancelEdit");
var buttonIds = [];
var buttonID = 0;
const form = document.querySelector(".form-popup");

//connect Frontend to Backend
const BASE_URL = "http://localhost:5000";

let dataArray = [];
var arrayLength = 0;

//get existing trips from database
fetch(`${BASE_URL}/trips`)
  .then((response) => response.json())
  .then((trip) => {
    let array = trip;
    dataArray.push(array);
    arrayLength = dataArray[0].length;

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
            document.querySelector('input[name="country"]').value =
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
                'input[name="country"]'
              ).value;
              trip.name = document.querySelector('input[name="name"]').value;
              trip.start = document.querySelector('input[name="start"]').value;
              trip.end = document.querySelector('input[name="end"]').value;
              trip.country = document.querySelector(
                'input[name="country"]'
              ).value;
            });
            console.log("Edit", trip.name);
            console.log("tripID after editBtnclick: " + trip.trip_id);
            console.log("tripname : " + trip.name);
          });

          delBtn.addEventListener("click", (event) => {
            if (dataArray[0].length === 1) {
              table.deleteRow(0);
              dataArray = [];
              console.log("Delete", trip.name);
              location.reload();
            } else if (dataArray[0].length > 1) {
              console.log("trip.trip_id deleted: " + trip.trip_id);
              event.preventDefault();
              table.deleteRow("${index}");
              var idToDelete = trip.trip_id;
              dataArray = dataArray.filter(
                (trip) => trip.trip_id !== idToDelete
              );
              console.log("trip.trip_id deleted: " + trip.trip_id);

              fetch(`${BASE_URL}/trips/` + trip.trip_id, {
                method: "DELETE",
                mode: "cors",
                headers: {
                  "Content-type": "application/json; charset=UTF-8", // Indicates the content
                },
              });
              console.log("Delete", trip.name);
            }
          });
        }

        if (window.location.pathname === "/reise_bearbeiten.html") {
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
            document.querySelector('input[name="country"]').value = "";
          }

          saveEditBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const postData = {
              name: document.querySelector('input[name="name"]').value,
              start: document.querySelector('input[name="start"]').value,
              end: document.querySelector('input[name="end"]').value,
              country: document.querySelector('input[name="country"]').value,
            };

            const updateTrip = async () => {
              const response = fetch(`${BASE_URL}/trips/` + trip.trip_id, {
                method: "PUT",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
              });
              return response.status === 200;
            };
            updateTrip();

            // localStorage.setItem("trips", JSON.stringify(dataArray));
            closeForm();
          });
          cancelEditBtn.addEventListener("click", (event) => {
            closeForm();
            event.stopPropagation();
          });
        }

        if (window.location.pathname === "/reise_hinzufugen.html") {
          addButton.addEventListener("click", function () {
            if (dataArray[0].lenght === 0) {
              var row = table.insertRow(0);
            } else {
              var row = table.insertRow(dataArray[0].length);
            }

            let name = document.querySelector("#name").value;
            let start = document.querySelector("#start").value;
            let end = document.querySelector("#end").value;
            let country = document.querySelector("#country").value;

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
            };
            dataArray.push(tableData);

            const addTripToDb = async () => {
              const response = fetch(`${BASE_URL}/trips`, {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(tableData),
              });
              return response.status === 200;
            };
            addTripToDb(tableData);

            // localStorage.setItem("trips", JSON.stringify(dataArray));

            clearForm();
          });

          function clearForm() {
            document.querySelector("#name").value = "";
            document.querySelector("#start").value = "";
            document.querySelector("#end").value = "";
            document.querySelector("#country").value = "";
          }
        }
      });
    }

    //deprecated with database integration
    // if (dataArray.length === 0) {
    //   const btnWrapper = document.querySelector("#btnWrapper");
    //   const loadDummysBtn = btnWrapper.appendChild(
    //     document.createElement("button")
    //   );
    //   loadDummysBtn.innerText = "Dummys erzeugen";

    //   loadDummysBtn.addEventListener("click", () => {
    //     createDummys();
    //     location.reload();
    //   });
    // }

    // function createDummys() {
    //   var trips = [
    //     {
    //       name: "Surfen & Entspannung",
    //       start: "2021-09-07",
    //       end: "2021-09-14",
    //       country: "Cuba",
    //       trip_id: 0,
    //     },
    //     {
    //       name: "Spa-Woche",
    //       start: "2021-10-02",
    //       end: "2021-10-08",
    //       country: "Spain",
    //       trip_id: 1,
    //     },
    //     {
    //       name: "Erholung unter Palmen ",
    //       start: "2022-01-05",
    //       end: "2022-01-12",
    //       country: "Hungary",
    //       trip_id: 2,
    //     },
    //   ];
    //   dataArray.push(...trips);
    //   localStorage.setItem("trips", JSON.stringify(dataArray));
    // }
  });
