//connect Frontend to Backend
const BASE_URL = "https://travelsitebackend.herokuapp.com";
//const BASE_URL = "http://localhost:5000";

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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tableData),
    })
      .then((response) => response.json())
      .then((res) => {
        return res;
      });
    // console.log(response);
    if (response.status == 200) {
      window.location.replace("map.html");
    } else {
      alert("Fehler beim Login: " + response.status);
    }
  };
  tryLogin();
});

async function logout() {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (response.status == 200) {
    window.location.href = "index.html";
  }
}