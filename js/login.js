//connect Frontend to Backend
const BASE_URL = "http://localhost:5000";
const loginButton = document.querySelector("#submit");

function pwValidation(){
    var mail = document.querySelector('#email').value;
    var password = document.querySelector('#pw').value;
    var tableData = {
        email: mail,
        password: password,
    }
    const response = fetch(`${BASE_URL}/user`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableData),
      });
      return response.status === 200;
    /*if (mail === "huehne@htw-berlin.de" && password === "hunter2"){
        window.location.replace("map.html"); 
    }else{
        alert ("Falsche Login Daten");
    }*/
}