//Prüfen ob Array bereits mit Daten gefüllt
// let dataArray = localStorage.getItem("trips")
//   ? JSON.parse(localStorage.getItem("trips"))
//   : [];
const addButton = document.querySelector(".addTrip");
let table = document.querySelector(".triptable tbody");

const saveEditBtn = document.querySelector("#saveEdit");
const cancelEditBtn = document.querySelector("#cancelEdit");
var buttonIds = [];
const form = document.querySelector(".form-popup");

//connect Frontend to Backend
const BASE_URL = "http://localhost:5000";

let dataArray = [];

const getTrips = async () => {
  fetch(`${BASE_URL}/trips`)
    .then((response) => response.json())
    .then((trip) => {
      let array = trip;
      //   console.log(trip);
      dataArray.push(array);
    });
};

getTrips();

// const dataArray = getTrips() ? getTrips() : [];

if (dataArray.length > 0) {
  dataArray.forEach((trip) => {
    var row = table.insertRow("${index}");
    const cell1 = row.insertCell(0).appendChild(document.createElement("td"));
    const cell2 = row.insertCell(1).appendChild(document.createElement("td"));
    const cell3 = row.insertCell(2).appendChild(document.createElement("td"));
    const cell4 = row.insertCell(3).appendChild(document.createElement("td"));

    cell1.innerText = trip.tripname;
    cell2.innerText = trip.startDate;
    cell3.innerText = trip.endDate;
    cell4.innerText = trip.country;
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
        document.querySelector('input[name="tripname"]').value =
          cell1.innerText;
        document.querySelector('input[name="startDate"]').value =
          cell2.innerText;
        document.querySelector('input[name="endDate"]').value = cell3.innerText;
        document.querySelector('input[name="country"]').value = cell4.innerText;

        form.addEventListener("change", (event) => {
          cell1.innerText = document.querySelector(
            'input[name="tripname"]'
          ).value;
          cell2.innerText = document.querySelector(
            'input[name="startDate"]'
          ).value;
          cell3.innerText = document.querySelector(
            'input[name="endDate"]'
          ).value;
          cell4.innerText = document.querySelector(
            'input[name="country"]'
          ).value;

          trip.tripname = document.querySelector(
            'input[name="tripname"]'
          ).value;
          trip.startDate = document.querySelector(
            'input[name="startDate"]'
          ).value;
          trip.endDate = document.querySelector('input[name="endDate"]').value;
          trip.country = document.querySelector('input[name="country"]').value;
        });
        console.log("Edit", trip.tripname);
      });

      delBtn.addEventListener("click", (event) => {
        if (dataArray.length === 1) {
          localStorage.clear();
          table.deleteRow(0);
          dataArray = [];
          console.log("Delete", trip.tripname);
          location.reload();
        } else if (dataArray.length > 1) {
          console.log("trip.id deleted: " + trip.id);
          event.preventDefault();
          table.deleteRow("${index}");
          var idToDelete = trip.id;
          dataArray = dataArray.filter((trip) => trip.id !== idToDelete);
          console.log("trip.id deleted: " + trip.id);
          localStorage.setItem("trips", JSON.stringify(dataArray));
          location.reload();
          console.log("Delete", trip.tripname);
        }
      });
    }
  });
}

if (window.location.pathname === "/reise_bearbeiten.html") {
  if (dataArray.length === 0) {
    const btnWrapper = document.querySelector("#btnWrapper");
    const loadDummysBtn = btnWrapper.appendChild(
      document.createElement("button")
    );
    loadDummysBtn.innerText = "Dummys erzeugen";

    loadDummysBtn.addEventListener("click", (event) => {
      createDummys();
      location.reload();
    });
  }

  function createDummys() {
    var trips = [
      {
        tripname: "Surfen & Entspannung",
        startDate: "2021-09-07",
        endDate: "2021-09-14",
        country: "Cuba",
        id: 0,
      },
      {
        tripname: "Spa-Woche",
        startDate: "2021-10-02",
        endDate: "2021-10-08",
        country: "Spain",
        id: 1,
      },
      {
        tripname: "Erholung unter Palmen ",
        startDate: "2022-01-05",
        endDate: "2022-01-12",
        country: "Hungary",
        id: 2,
      },
    ];
    dataArray.push(...trips);
    localStorage.setItem("trips", JSON.stringify(dataArray));
  }

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
    document.querySelector('input[name="tripname"]').value = "";
    document.querySelector('input[name="startDate"]').value = "";
    document.querySelector('input[name="endDate"]').value = "";
    document.querySelector('input[name="country"]').value = "";
  }

  saveEditBtn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.setItem("trips", JSON.stringify(dataArray));
    closeForm();
  });
  cancelEditBtn.addEventListener("click", (event) => {
    closeForm();
    event.stopPropagation();
  });
}

if (window.location.pathname === "/reise_hinzufugen.html") {
  addButton.addEventListener("click", function () {
    if (dataArray === 0) {
      var row = table.insertRow(0);
    } else {
      var row = table.insertRow(dataArray.length);
    }

    let tripname = document.querySelector("#tripname").value;
    let startDate = document.querySelector("#startDate").value; // Date Formatierung fehlt noch
    let endDate = document.querySelector("#endDate").value; //
    let country = document.querySelector("#country").value;

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.appendChild(document.createTextNode(tripname));
    cell2.appendChild(document.createTextNode(startDate));
    cell3.appendChild(document.createTextNode(endDate));
    cell4.appendChild(document.createTextNode(country));

    var id = buttonIds.length; //nächste freie ID

    var tableData = {
      tripname: tripname,
      startDate: startDate,
      endDate: endDate,
      country: country,
      id: id,
    };
    dataArray.push(tableData);

    localStorage.setItem("trips", JSON.stringify(dataArray));

    clearForm();
  });

  function clearForm() {
    document.querySelector("#tripname").value = "";
    document.querySelector("#startDate").value = "";
    document.querySelector("#endDate").value = "";
    document.querySelector("#country").value = "";
  }
}
