function pwValidation(){
    var mail = document.querySelector('#email');
    var password = document.querySelector('#pw');

    if (mail === "huehne@htw-berlin.de" && password === "hunter2"){
        alert ("Login erfolgreich");
        window.location = "map.html";
        return true;
    }
}