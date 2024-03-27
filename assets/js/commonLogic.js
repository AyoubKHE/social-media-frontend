
function elapsedTime(date) {

    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffSeconds = Math.ceil(diffTime / 1000);

    const timeMap = {
        an: 31536000,
        mois: 2592000,
        jour: 86400,
        heure: 3600,
        minute: 60,
        seconde: 1
    };

    for (let unit in timeMap) {
        const elapsed = diffSeconds / timeMap[unit];
        if (elapsed >= 1) {
            const rounded = Math.floor(elapsed);
            return `il y a ${rounded} ${unit}${rounded > 1 && unit !== "mois" ? 's' : ''}`;
        }
    }
}


function getAllTweetsAndFillMainTag(currentPage) {


    axios({
        method: "GET",
        url: `http://localhost/simple_social_media_backend_CODE/api/tweets?page=${currentPage}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then((response) => {

            function getCommentsFromServer(divTweet, i) {

                let ulComments = divTweet.querySelector(".comments");

                ulComments.innerHTML = `
                    <div style="text-align: center;">
                        <div class="spinner-border" role="status" id="spinner">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                `

                axios({
                    method: "GET",
                    url: `http://localhost/simple_social_media_backend_CODE/api/comments?tweet_id=${Tweets[i].tweet_id}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                    .then((response) => {

                        console.log(response.data.Data);
                        let comments = response.data.Data;
                        ulComments.innerHTML = "";
                        for (let j = 0; j < comments.length; j++) {
                            let liComment = document.createElement("li");
                            liComment.innerHTML = `
                        <li>
                            <img src="http://localhost/simple_social_media_backend_CODE${comments[j].author.profile_image_path}" alt="" class="user-img">
                            <span class="comment-username">${comments[j].author.username}</span>
                            <p class="tweet-username">${comments[j].body}</p>
                        </li>
                    `
                            ulComments.appendChild(liComment);
                        }

                        let currentTweetComments = divTweet.querySelector(`#tweet-${Tweets[i].tweet_id}-comments`);
                        currentTweetComments.innerHTML = `${comments.length} Commentaires`;


                    })
                    .catch((error) => {
                        console.log("line 43");
                        console.log(error);
                        alert("Problème de connexion, réessayez plus tard");
                    })

            }

            function addEventToShowTweetComments(divTweet, i) {

                let currentTweetComments = divTweet.querySelector(`#tweet-${Tweets[i].tweet_id}-comments`);
                currentTweetComments.addEventListener("click", function () {

                    let ulComments = divTweet.querySelector(".comments");
                    if (ulComments.innerText === "") {
                        if (Tweets[i].tweet_comments_count === 0) {
                            ulComments.innerHTML = "Ajouter un commentaire";
                        }
                        else {

                            if (currentTweetComments.getAttribute("class") !== "collapsed") {

                                getCommentsFromServer(divTweet, i);
                            }

                        }
                    }

                })
            }

            function addEventToButtonAddComment(divTweet, i) {
                let btnAddComment = divTweet.querySelector(`#btn-add-${Tweets[i].tweet_id}`);
                btnAddComment.addEventListener("click", function () {
                    let inputComment = divTweet.querySelector(`#input-comment-${Tweets[i].tweet_id}`);
                    if (inputComment.value === "") {
                        alert("Saisissez un commentaire valide !");
                    }
                    else {

                        axios({
                            method: "POST",
                            url: `http://localhost/simple_social_media_backend_CODE/api/comments`,
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                'Content-Type' : 'application/json'
                            },
                            data: {
                                "body": inputComment.value,
                                "tweet_id": Tweets[i].tweet_id
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

                                    alert("Commentaire bien ajouté");
    
                                    getCommentsFromServer(divTweet, i);
    
                                    inputComment.value = "";
                                }

                            })
                            .catch((error) => {
                                console.log("line 118");
                                if (error.hasOwnProperty("response") === true) {
                                    alert("Il faut se connecter avec un compte pour ajouter un commentaire");
                                }
                                else {
                                    alert("Problème de connexion, réessayez plus tard");
                                }

                            })
                    }

                })
            }

            function addEventToProfileImage(divTweet, i) {

                let profileImage = divTweet.querySelector(`#tweet-${Tweets[i].tweet_id}-profile-img`);

                profileImage.addEventListener("click", function () {

                    let userId = Tweets[i].author.author_id;

                    axios({
                        method: "GET",
                        url: `http://localhost/simple_social_media_backend_CODE/api/users?user_id=${userId}`,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                        .then((response) => {
                            console.log(response);
                            localStorage.setItem("userProfile", JSON.stringify(response.data.Data[0]));
                            window.location = "profile.php";
                        })
                        .catch((error) => {
                            console.log("line 138");
                        })

                })
            }

            console.log("tweets", response);
            totalPages = response.data.last_page;

            let divMain = document.querySelector("main");
            divMain.style.height = "auto";

            if (divMain.firstElementChild.getAttribute("class") !== "tweet") {
                divMain.innerHTML = "";
            }



            let Tweets = response.data.Data;

            for (let i = 0; i < Tweets.length; i++) {

                let divTweet = document.createElement("div");
                divTweet.setAttribute("class", "tweet");

                let elapsed_time = elapsedTime(Tweets[i].tweet_created_at);

                divTweet.innerHTML = `
                    <div class="user">
                        <img src="http://localhost/simple_social_media_backend_CODE${Tweets[i].author.profile_image_path}" alt="" class="user-img" id="tweet-${Tweets[i].tweet_id}-profile-img">
                        <span class="tweet-username">${Tweets[i].author.username}</span>
                    </div>

                    <div class="tweet-image">
                        <img src="http://localhost/simple_social_media_backend_CODE${Tweets[i].tweet_image_path}" alt="">
                    </div>

                    <div class="tweet-informations">
                        <span class="tweet-age">${elapsed_time}</span>

                        <div class="tweet-title">
                            ${Tweets[i].title === null ? "" : Tweets[i].title}
                        </div>

                        <div class="tweet-body">
                            ${Tweets[i].body === null ? "" : Tweets[i].body}  
                        </div>

                        <hr>

                    </div>


                    <div class="div-comments">
                        <div>
                            <i class="fa fa-commenting-o" aria-hidden="true"></i>

                            <a data-bs-toggle="collapse" href="#comment-${Tweets[i].tweet_id}" role="button" aria-expanded="false"
                                aria-controls="comments" id="tweet-${Tweets[i].tweet_id}-comments">
                                ${Tweets[i].tweet_comments_count} Commentaires
                            </a>

                        </div>
                        <div class="collapse" id="comment-${Tweets[i].tweet_id}">
                            <div class="card card-body">
                                <ul class="comments">

                                </ul>

                                <div class="input-comment">
                                    <input type="text" id="input-comment-${Tweets[i].tweet_id}" placeholder="Ajoutez votre commentaire...">
                                    <button class="btn btn-success" id="btn-add-${Tweets[i].tweet_id}">Ajouter</button>
                                </div>
                            </div>
                        </div>
                    </div>


                `

                addEventToProfileImage(divTweet, i);

                addEventToShowTweetComments(divTweet, i);

                addEventToButtonAddComment(divTweet, i);

                divMain.appendChild(divTweet);
            }

            itLoading = false;
            page++;
            console.log("loading finished");
        })
        .catch((error) => {
            console.log("line 231");
            console.log(error);
            alert("Problème de connexion, réessayez plus tard");
        })

}


function addSpinnerToMain() {
    let divMain = document.querySelector("main");
    divMain.style.height = "50vh";
    divMain.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100%">
            <div class="spinner-border" role="status" id="spinner">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    `
}


let liHome = document.getElementById("li-home");
liHome.addEventListener("click", function () {
    window.location = "home.php";
})

let liProfile = document.getElementById("li-profile");
liProfile.addEventListener("click", function () {

    localStorage.removeItem("userProfile");
    window.location = "profile.php";
})

let liLogout = document.getElementById("li-logout");
liLogout.addEventListener("click", function () {

    window.location = "index.php";
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
})