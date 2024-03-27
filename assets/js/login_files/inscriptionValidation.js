
//! Profile Image_______________________________________________________________________________________________________________________________________________ 


let inputProfileImage = document.getElementById("profile-image");

inputProfileImage.addEventListener("blur", function () {

    let epProfileImage = document.getElementById("ep-profile-image");

    let epProfileImageText = document.getElementById("ep-profile-image-text");


    if (inputProfileImage.files.length > 0) {
        let fileType = inputProfileImage.files[0].type.split("/")[0];
        if (fileType === "image") {
            if (inputProfileImage.files[0].size > 5000000) {
                epProfileImage.style.display = "inline";
                epProfileImageText.textContent = "La taille de l'image doit pas dépasser 5 Mo";
                epProfileImageText.style.width = "200px";
            }
            else {
                epProfileImage.style.display = "none";
                epProfileImageText.textContent = "";
            }

        }
        else {

            epProfileImage.style.display = "inline";
            epProfileImageText.textContent = "Choisissez une image";
            epProfileImageText.style.width = "160px";
        }
    }
    else {
        epProfileImage.style.display = "none";
        epProfileImageText.textContent = "";
    }
})


//! Nom_______________________________________________________________________________________________________________________________________________ 
function isStringContainsOnlyLetters(input) {
    let regex = /^[a-zA-Zé\s]+$/;
    return regex.test(input);
}

let inputName = document.getElementById("name");

inputName.addEventListener("blur", function () {

    let epName = document.getElementById("ep-name");

    let epNameText = document.getElementById("ep-name-text");

    if (inputName.value == "") {
        epName.style.display = "inline";
        epNameText.textContent = "Champ obligatoire !";
        epNameText.style.width = "160px";
    }
    else if (!isStringContainsOnlyLetters(inputName.value)) {
        epName.style.display = "inline";
        epNameText.textContent = "Saisissez un Nom Complet valide : seules les lettres latines sont autorisées";
        epNameText.style.width = "230px";
    }
    else {
        epName.style.display = "none";
        epNameText.textContent = "";

        let nomCompletArr = inputName.value.split(" ");
        inputName.value = "";
        for (let i = 0; i < nomCompletArr.length; i++) {
            inputName.value += nomCompletArr[i][0].toUpperCase() + nomCompletArr[i].substring(1).toLowerCase() + " ";
        }
        inputName.value = inputName.value.trimRight();
    }
})

inputName.addEventListener("input", function () {
    if (!isStringContainsOnlyLetters(inputName.value)) {
        inputName.style.borderBottomColor = "red";
    }
    else {
        inputName.style.borderBottomColor = "#01ff01";
    }

})


//! Username_____________________________________________________________________________________________________________________________________________ 
let inputUsername = document.getElementById("username");

inputUsername.addEventListener("blur", function () {


    let epUsername = document.getElementById("ep-username");

    let epUsernameText = document.getElementById("ep-username-text");

    epUsername.style.display = "none";
    epUsernameText.textContent = "";

    if (inputUsername.value === "") {
        epUsername.style.display = "inline";
        epUsernameText.textContent = "Champ obligatoire !";
        epUsernameText.style.width = "160px";
        inputUsername.style.borderBottomColor = "red";
    }
    else {

        document.getElementById("spinner-tooltip").innerHTML = `
            <div class="spinner-border" role="status" id="spinner">
                <span class="visually-hidden">Loading...</span>
            </div>
        `

        axios({
            method: "GET",
            url: `http://localhost/simple_social_media_backend_CODE/api/users?username=${inputUsername.value}`,
            headers: {
                "req_for_dev": "123456"
            }
        })
            .then((response) => {

                console.log(response);

                document.getElementById("spinner-tooltip").innerHTML = `
                        <div class="my-tooltip" id="ep-username">
                        <div class="icon">!</div>
                        <div class="my-tooltiptext" id="ep-username-text"></div>
                    </div>
                `
                epUsername = document.getElementById("ep-username");
                epUsernameText = document.getElementById("ep-username-text");

                if (response.data.hasOwnProperty("Failure_Message") === true || response.data.hasOwnProperty("Errors") === true) {
                    epUsername.style.display = "inline";
                    epUsernameText.textContent = "Problème dans le serveur, réessayez plus tard";
                    epUsernameText.style.width = "250px";
                    inputUsername.style.borderBottomColor = "red";
                }
                else {
                    if (response.data.Count === 0) {

                        epUsername.style.display = "none";
                        epUsername.title = "";
                        inputUsername.style.borderBottomColor = "#01ff01";
                    }
                    else {

                        epUsername.style.display = "inline";
                        epUsernameText.textContent = "Username déja utilisé";
                        epUsernameText.style.width = "200px";
                        inputUsername.style.borderBottomColor = "red";
                    }
                }


            })
            .catch((error) => {

                console.log(error, "162");
                document.getElementById("spinner-tooltip").innerHTML = `
                        <div class="my-tooltip" id="ep-username">
                        <div class="icon">!</div>
                        <div class="my-tooltiptext" id="ep-username-text"></div>
                    </div>
                `
                epUsername = document.getElementById("ep-username");
                epUsernameText = document.getElementById("ep-username-text");

                epUsername.style.display = "inline";
                epUsernameText.textContent = "Problème de connexion, réessayez plus tard";
                epUsernameText.style.width = "250px";
                inputUsername.style.borderBottomColor = "red";

            })




    }
})

inputUsername.addEventListener("input", function () {
    inputUsername.style.borderBottomColor = "#212529";

})


//! Mot de passe______________________________________________________________________________________________________________________________________ 
let inputMotDePasse = document.getElementById("mot-de-passe");

inputMotDePasse.addEventListener("blur", function () {

    let epMotDePasse = document.getElementById("ep-mot-de-passe");

    let epMotDePasseText = document.getElementById("ep-mot-de-passe-text");

    if (inputMotDePasse.value == "") {
        epMotDePasse.style.display = "inline";
        epMotDePasseText.textContent = "Champ obligatoire !";
        epMotDePasseText.style.width = "160px";
    }
    else if (inputMotDePasse.value.length < 4) {
        epMotDePasse.style.display = "inline";
        epMotDePasseText.textContent = "Votre mot de passe est très faible !!";
        epMotDePasseText.style.width = "200px";
    }
    else if (inputMotDePasse.value.length >= 4 && inputMotDePasse.value.length < 9) {
        epMotDePasse.style.display = "inline";
        epMotDePasseText.textContent = "votre mot de passe peut être facile à deviner";
        epMotDePasseText.style.width = "200px";
    }
    else {
        epMotDePasse.style.display = "none";
        epMotDePasseText.textContent = "";
    }
})

inputMotDePasse.addEventListener("input", function () {
    if (inputMotDePasse.value.length < 4) {
        inputMotDePasse.style.borderBottomColor = "red";
    }
    else if (inputMotDePasse.value.length >= 4 && inputMotDePasse.value.length < 9) {
        inputMotDePasse.style.borderBottomColor = "orange";
    }
    else {
        inputMotDePasse.style.borderBottomColor = "#01ff01";
    }
})


//! button Valider______________________________________________________________________________________________________________________________________ 

let btnValider = document.getElementById("btn-valider");

btnValider.addEventListener("click", function () {

    function isDataAreIntegrale() {

        if (document.getElementById("spinner-tooltip").firstElementChild.getAttribute("class") === "spinner-border") {
            alert("Vérification si le username n'existait pas déja");
            return false;
        }

        let allInputs = document.querySelectorAll(".modal-body input");
        for (let i = 1; i < allInputs.length; i++) {
            if (allInputs[i].value === "") {
                alert("Il faut renseigner les champs suivants:\n-Username\n-Nom Complet\n-Mot de passe");
                return false;
            }
        }

        let allErrorProvidersText = document.querySelectorAll(".my-tooltiptext");
        for (let i = 0; i < allErrorProvidersText.length; i++) {
            if (allErrorProvidersText[i].textContent !== "") {
                alert("Y'a une erreur ou plus quelque part");
                return false;
            }
        }

        return true;
    }

    function registerUser() {

        let allInputs = document.querySelectorAll(".modal-body input");

        let formData = new FormData();
        formData.append("full_name", allInputs[1].value);
        formData.append("username", allInputs[2].value);
        formData.append("password", allInputs[3].value);

        let image = allInputs[0].files.length > 0 ? allInputs[0].files[0] : "";

        if (image !== "") {
            formData.append("profile_image", image);
        }

        axios({
            method: "POST",
            url: `http://localhost/simple_social_media_backend_CODE/api/users`,
            data: formData
        })
            .then((response) => {
                console.log(response);

                if (response.data.hasOwnProperty("Errors")) {
                    console.log(response.data);
                    alert("Enregistrement d'utilisateur a echoué, réessayez plus tard");
                }
                else {
                    let modal = document.getElementById("registerModal");
                    let modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide();
                    alert("Utilisateur bien enregistrer");
                }

            })
            .catch((error) => {
                console.log("line 273");
                console.log(error);
                alert("Problème de connexion, réessayez plus tard");
            })
    }

    if (isDataAreIntegrale()) {
        registerUser();
    }
})


