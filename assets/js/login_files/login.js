let savedUsername = localStorage.getItem("username");
let savedPassword = localStorage.getItem("password");

if (savedUsername !== null) {
    document.getElementById("input-username").value = savedUsername;
    document.getElementById("input-password").value = savedPassword;
}

let btnChange = document.getElementById("change");

let eye = document.getElementById("eye");

eye.addEventListener("click", function () {

    let inptPassword = document.getElementById("input-password");
    if (eye.getAttribute("class") == "fa fa-eye") {
        eye.setAttribute("class", "fa fa-eye-slash");
        inptPassword.type = "text";
    }
    else {
        eye.setAttribute("class", "fa fa-eye");
        inptPassword.type = "password";
    }

})

let btnLogin = document.getElementById("btn-login");

btnLogin.addEventListener("click", function (event) {

    function login() {

        let bodyParameter = {
            "username": username,
            "password": password
        }

        axios({
            method: "POST",
            url: "http://localhost/simple_social_media_backend_CODE/api/login",
            data: bodyParameter
        })
        .then((response) => {

            console.log(response.data);

            if (response.data.hasOwnProperty("Failure_Message") === true) {
                alert("Username ou mot de passe invalide");
            }
            else if (response.data.hasOwnProperty("Errors") === true) {
                alert("Probleme sur le serveur");
            }
            else {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("currentUser", JSON.stringify(response.data.user));
                window.location = "home.php";
            }

        })
        .catch((error) => {
            console.log(error);
            alert("Problème de connexion, réessayez plus tard");
        })

    }

    let username = document.getElementById("input-username").value;
    let password = document.getElementById("input-password").value;

    if (username === "" || password === "") {
        alert("Veuillez renseigner tous les champs svp");
    }
    else {
        let chkRetainPassword = document.getElementById("chk-retain-password");
        if (chkRetainPassword.checked) {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
        }
        else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        }
        login();
    }
    event.preventDefault();

})

