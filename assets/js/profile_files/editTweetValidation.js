
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
    }

    if (isDataAreIntegrale()) {
        editTweet();
    }
})


