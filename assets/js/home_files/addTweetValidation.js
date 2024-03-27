
//! Tweet Image_______________________________________________________________________________________________________________________________________________ 

let inputTweetImage = document.getElementById("tweet-image");

let epTweetImage = document.getElementById("ep-tweet-image");

let epTweetImageText = document.getElementById("ep-tweet-image-text");

inputTweetImage.addEventListener("blur", function () {

    if (inputTweetImage.files.length > 0) {
        let fileType = inputTweetImage.files[0].type.split("/")[0];
        if (fileType === "image") {

            if (inputTweetImage.files[0].size > 5000000) {
                epTweetImage.style.display = "inline";
                epTweetImageText.textContent = "La taille de l'image doit pas dépasser 5 Mo";
                epTweetImageText.style.width = "200px";
            }
            else {
                epTweetImage.style.display = "none";
                epTweetImageText.textContent = "";
            }

        }
        else {

            epTweetImage.style.display = "inline";
            epTweetImageText.textContent = "Choisissez une image";
            epTweetImageText.style.width = "160px";
        }
    }
    else {
        epTweetImage.style.display = "none";
        epTweetImageText.textContent = "";
    }
})


//! Tweet Title_______________________________________________________________________________________________________________________________________________ 

let inputTweetTitle = document.getElementById("tweet-title");

// Has no validation

//! Tweet Body_____________________________________________________________________________________________________________________________________________ 
let textareaTweetBody = document.getElementById("tweet-body");

let epTweetBody = document.getElementById("ep-tweet-body");

let epTweetBodyText = document.getElementById("ep-tweet-body-text");

// textareaTweetBody.addEventListener("blur", function () {

//     if (textareaTweetBody.value === "") {

//         epTweetBody.style.display = "inline";
//         epTweetBodyText.textContent = "Champ obligatoire !";
//         epTweetBodyText.style.width = "160px";
//     }
//     else {
//         epTweetBody.style.display = "none";
//         epTweetBodyText.textContent = "";
//     }
// })

//! button Valider______________________________________________________________________________________________________________________________________ 

let btnValider = document.getElementById("btn-valider");

btnValider.addEventListener("click", function () {

    function isDataAreIntegrale() {

        if (textareaTweetBody.value === "" && inputTweetTitle.value === "" && inputTweetImage.files.length === 0) {
            alert("Vous pourriez pas créer une tweet vide");
            return false;
        }

        if (epTweetImageText.textContent !== "") {
            alert("Y'a une erreur quelque part");
            return false;
        }

        return true;
    }

    function addNewTweet() {

        let formData = new FormData();

        if(inputTweetTitle.value !== "") {
            formData.append("title", inputTweetTitle.value);
        }

        if(textareaTweetBody.value !== "") {
            formData.append("body", textareaTweetBody.value);
        }

        let image = inputTweetImage.files.length > 0 ? inputTweetImage.files[0] : "";

        if (image !== "") {
            formData.append("tweet_image", image);
        }

        axios({
            method: "POST",
            url: "http://localhost/simple_social_media_backend_CODE/api/tweets",
            data: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                console.log(response);

                if (response.data.hasOwnProperty("Failure_Message") === true || response.data.hasOwnProperty("Errors")) {
                    alert("Probleme sur le serveur");
                }
                else if (response.data.hasOwnProperty("Token_Error") === true) {
                    window.location = "index.php";
                    localStorage.removeItem("token");
                    localStorage.removeItem("currentUser");
                }
                else {
                    let modal = document.getElementById("addTweetModal");
                    let modalInstance = bootstrap.Modal.getInstance(modal);
                    modalInstance.hide();

                    alert("Tweet bien ajouter");

                    addSpinnerToMain();

                    getAllTweetsAndFillMainTag(1);
                }


            })
            .catch((error) => {
                console.log(error);
                alert("Problème de connexion, réessayez plus tard");
            })

        // axios.post("http://localhost/simple_social_media_backend_CODE/api/tweets", formData, configs)
        // .then((response) => {
        //     console.log(response);
        //     let modal = document.getElementById("addTweetModal");
        //     let modalInstance = bootstrap.Modal.getInstance(modal);
        //     modalInstance.hide();
        //     alert("Tweete bien ajouter");

        //     addSpinnerToMain();

        //     getAllTweetsAndFillMainTag(1);
        // })
        // .catch((error) => {
        //     console.log(error);
        //     if (error.hasOwnProperty("response") === false) {
        //         alert("Problème de connexion, réessayez plus tard");
        //     }
        //     else {
        //         alert("Il faut se connecter avec un compte pour ajouter un commentaire");
        //     }
        // })

        // axios.post("https://tarmeezacademy.com/api/v1/Tweets", formData, configs)
        //     .then((response) => {
        //         console.log(response);
        //         let modal = document.getElementById("addTweetModal");
        //         let modalInstance = bootstrap.Modal.getInstance(modal);
        //         modalInstance.hide();
        //         alert("Tweete bien ajouter");

        //         addSpinnerToMain();

        //         getAllTweetsAndFillMainTag(1);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         if (error.hasOwnProperty("response") === false) {
        //             alert("Problème de connexion, réessayez plus tard");
        //         }
        //         else {
        //             alert("Il faut se connecter avec un compte pour ajouter un commentaire");
        //         }
        //     })
    }

    if (isDataAreIntegrale()) {
        addNewTweet();
    }
})


