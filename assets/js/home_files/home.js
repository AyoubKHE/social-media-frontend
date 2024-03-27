
let token = localStorage.getItem("token");
if(token === null) {
    window.location = "index.php";
}

console.log(JSON.parse(localStorage.getItem("currentUser")));

let currentUserProfile = JSON.parse(localStorage.getItem("currentUser"));
if (currentUserProfile !== null) {
    if (typeof currentUserProfile.profile_image === "string") {
        document.getElementById("current-user-img").src = currentUserProfile.profile_image;
    }
}

let totalPages = 0;

let itLoading = false;

let page = 1;


addSpinnerToMain();

getAllTweetsAndFillMainTag(page);

window.addEventListener('scroll', function () {

    if (window.scrollY >= (document.body.scrollHeight - 3000) && window.scrollY <= (document.body.scrollHeight)) {
        if (itLoading) {
            return;
        }
        else {
            if (page <= totalPages) {
                itLoading = true;
                getAllTweetsAndFillMainTag(page);
            }
        }
    }

});