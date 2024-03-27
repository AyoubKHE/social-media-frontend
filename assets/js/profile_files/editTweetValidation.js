
let inputTweetImage = document.getElementById("tweet-image");

let epTweetImage = document.getElementById("ep-tweet-image");

let epTweetImageText = document.getElementById("ep-tweet-image-text");

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

        if (inputTweetImage.files.length === 0 && textareaTweetBody.value === "" && inputTweetTitle.value === "") {
            alert("Vous avez rien changer sur la tweet");
            return false;
        }

        return true;
    }

    function editTweet() {

        function editTweet2(updateData) {
            axios({
                method: "PUT",
                url: `http://localhost/simple_social_media_backend_CODE/api/tweets`,
                data: updateData,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
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

                        let modal = document.getElementById("editTweetModal");
                        let modalInstance = bootstrap.Modal.getInstance(modal);
                        modalInstance.hide();
                        alert("Tweete bien modifier");

                        addSpinnerToMain();

                        // let currentUserProfile = JSON.parse(localStorage.getItem("currentUser"));
                        // getUserTweetsAndFillMainTag(currentUserProfile.user_id, true);

                        //! we should reload the entire page to avoid caching
                        location.reload(true);
                    }

                })
                .catch((error) => {
                    console.log("line 121");
                    console.log(error);
                    alert("Problème de connexion, réessayez plus tard");
                })
        }

        let TweetID = JSON.parse(localStorage.getItem("TweetId"));

        let updateData = {
            "setPart": {},
            "wherePart": {
                "id": TweetID,
            }
        }
        
        if (inputTweetTitle.value !== "") {
            updateData["setPart"]["title"] = inputTweetTitle.value;
        }

        if (textareaTweetBody.value !== "") {
            updateData["setPart"]["body"] = textareaTweetBody.value;
        }

        let image = inputTweetImage.files.length > 0 ? inputTweetImage.files[0] : "";
        if (image !== "") {
            let base64Image;
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.addEventListener("load", function () {
                    resolve(reader.result);
                })
                reader.addEventListener("error", function () {
                    reject(reader.error);
                })
            })
                .then((response) => {

                    base64Image = response;

                    updateData["setPart"]["tweet_image"] = base64Image;

                    editTweet2(updateData);

                })
                .catch((error) => {
                    console.log("line 162");
                    console.log(error);
                })
        }
        else {
            editTweet2(updateData);
        }

        // let formData = new FormData();
        // formData.append("tweet_image", image);
        // ? before i will try to resolve the probleme of sending image with put method
        //! if i dont't send image i can send json data instead of formdata so remove "Content-Type": "application/json" in http header


        // let setPart = {
        //     "title": "t1",
        //     "body": "b1"
        // }

        // formData.append("SET", JSON.stringify(setPart));

        // let wherePart = {
        //     "id": 10,
        //     "title": "t1",
        //     "body": "b1"
        // }

        // formData.append("WHERE", JSON.stringify(wherePart));

        // if(inputTweetTitle.value !== "") {
        //     formData.append("title", inputTweetTitle.value);
        // }

        // if(textareaTweetBody.value !== "") {
        //     formData.append("body", textareaTweetBody.value);
        // }

        // let image = inputTweetImage.files.length > 0 ? inputTweetImage.files[0] : "";

        // if (image !== "") {
        //     formData.append("tweet_image", image);
        // }

        // axios({
        //     method: "PUT",
        //     url: `http://localhost/simple_social_media_backend_CODE/api/tweets`,
        //     data: formData,
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then((response) => {
        //         debugger
        //         console.log(response);
        //         let modal = document.getElementById("editTweetModal");
        //         let modalInstance = bootstrap.Modal.getInstance(modal);
        //         modalInstance.hide();
        //         alert("Tweete bien modifier");

        //         addSpinnerToMain();

        //         getUserTweetsAndFillMainTag(currentUserProfile.id, true);

        //         // addSpinnerToMain();

        //         // getAllTweetsAndFillMainTag(1);
        //     })
        //     .catch((error) => {
        //         console.log("line 121");
        //         console.log(error);
        //         if (error.hasOwnProperty("response") === false) {
        //             alert("Problème de connexion, réessayez plus tard");
        //         }
        //         else {
        //             alert("Il faut se connecter avec un compte pour ajouter un commentaire");
        //         }
        //     })

        // axios.put(`https://tarmeezacademy.com/api/v1/Tweets/${TweetID}`, bodyParameter, configs)
        //     .then((response) => {
        //         console.log(response);
        //         let modal = document.getElementById("editTweetModal");
        //         let modalInstance = bootstrap.Modal.getInstance(modal);
        //         modalInstance.hide();
        //         alert("Tweete bien modifier");

        //         addSpinnerToMain();

        //         getUserTweetsAndFillMainTag(currentUserProfile.id, true);

        //         // addSpinnerToMain();

        //         // getAllTweetsAndFillMainTag(1);
        //     })
        //     .catch((error) => {
        //         console.log("line 121");
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
        editTweet();
    }
})


