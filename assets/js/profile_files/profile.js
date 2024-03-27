

let token = localStorage.getItem("token");
if(token === null) {
    window.location = "index.php";
}

console.log(JSON.parse(localStorage.getItem("currentUser")));

let currentUserProfile = JSON.parse(localStorage.getItem("currentUser"));
if (currentUserProfile !== null) {
    if (typeof currentUserProfile.profile_image_path === "string") {
        // document.getElementById("current-user-img").src = currentUserProfile.profile_image;
        document.getElementById("current-user-img").src = `http://localhost/simple_social_media_backend_CODE${currentUserProfile.profile_image_path}`;
    }
}

function fillUserInformationsClass(user) {
    

    
    if(typeof user.profile_image_path === "string") {
        document.getElementById("user-img-big-format").src = `http://localhost/simple_social_media_backend_CODE${currentUserProfile.profile_image_path}`;
    }

    document.querySelector(".user-coordinates .user-email").innerHTML = "Email non fourni";

    document.querySelector(".user-coordinates .user-full-name").innerHTML = user.full_name;
    document.querySelector(".user-coordinates .username").innerHTML = user.username;
    document.getElementById("Tweets-number").innerHTML = user.user_tweets_count;
    document.getElementById("comments-number").innerHTML = user.user_comments_count;

    document.getElementById("id-username").innerHTML = user.username;
}

let userProfile = JSON.parse(localStorage.getItem("userProfile"));

if (userProfile === null) {

    fillUserInformationsClass(currentUserProfile)

    addSpinnerToMain();
    
    getUserTweetsAndFillMainTag(currentUserProfile.user_id, true);
}
else {


    fillUserInformationsClass(userProfile)

    addSpinnerToMain();

    getUserTweetsAndFillMainTag(userProfile.user_id, false);
}

