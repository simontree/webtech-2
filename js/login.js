//connect Frontend to Backend
const BASE_URL = "https://travelsitebackend.herokuapp.com";

const loginButton = document.querySelector(".loginBtn");

loginButton.addEventListener("click", function () {
  var mail = document.querySelector("#email").value;
  var password = document.querySelector("#pw").value;
  var tableData = {
    email: mail,
    password: password,
  };
  const tryLogin = async () => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tableData),
    })
      .then((response) => response.json())
      .then((res) => {
        return res.status == 200;
      });
    console.log(response);
    if (response) {
        const d = new Date();
        d.setTime(d.getTime() + (24*60*60*1000));
        let expires = "expires=" + d.toUTCString();
        let email = tableData.email;
        //sconsole.log(email);
        document.cookie = "session=" + email + ";" + expires + ";path=/";
        window.location.replace("map.html");
    } else {
      alert("Falsche Login Daten");
    }
  };
  tryLogin();
});
