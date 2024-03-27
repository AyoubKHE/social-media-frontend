<?php
    header("Cache-Control: no-cache, no-store");
?>

<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
    <meta HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">

    <!-- Bootstrap CSS -->

    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="assets/css/profile_styles/editTweetFormStyle.css">
    <link rel="stylesheet" href="assets/css/profile_styles/profileStyle.css">

    <title>Profile</title>
</head>

<body>

    <section class="container my-container">
        <!--! page header -->
        <?php
        include_once(__DIR__ . "/./commonHTML/navbar.php");
        ?>

        <!--! user informations -->
        <section class="user-informations shadow">
            <div class="user-img-big-format">
                <img src="users_profile_image/anonymous.png" alt="" id="user-img-big-format">
            </div>

            <div class="user-coordinates">

                <div class="user-email">
                    Nan
                </div>

                <div class="user-full-name">
                    Nan
                </div>

                <div class="username">
                    Nan
                </div>

            </div>

            <div class="user-Tweets-comments">
                <div>
                    <span class="Tweets-number" id="Tweets-number">Nan</span> Tweets
                </div>

                <div>
                    <span class="comments-number" id="comments-number">Nan</span> Commentaires
                </div>

            </div>

        </section>

        <div style="font-size: 30px; margin-bottom: 50px; color: #464545;">
            Les Tweets de <span style="font-size: 40px; color: black;" id="id-username">Nan</span>
        </div>

        <!--! page main -->
        <main>

            <!-- <div class="Tweet">
                <div class="user">
                    <img src="users_profile_image/Photo_Identite.jpg" alt="" class="user-img">
                    <span class="Tweet-username">AyoubKHE</span>
                </div>

                <div class="Tweet-image">
                    <img src="images/landscape-nature-grass-outdoor-horizon-wilderness-1073966-pxhere.com.jpg" alt="">
                </div>

                <div class="Tweet-informations">
                    <span class="Tweet-age">Il y a 2 semaines</span>

                    <div class="Tweet-title">
                        Lorem, ipsum dolor.
                    </div>

                    <div class="Tweet-body">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed earum aut, quis a, quo porro
                        deleniti quibusdam quia obcaecati rem soluta, similique fugit consectetur minus minima dolore
                        odio ullam quaerat.
                    </div>

                    <hr>

                </div>

                <div class="tags">
                    <span>economy</span>
                    <span>nature</span>
                </div>

                <div class="div-comments">
                    <div>
                        <i class="fa fa-commenting-o" aria-hidden="true"></i>
                        <a data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
                            aria-controls="collapseExample">
                            (3) commentaires
                        </a>

                    </div>
                    <div class="collapse" id="collapseExample">
                        <div class="card card-body">
                            <ul class="comments">
                                <li>
                                    <img src="users_profile_image/Photo_Identite.jpg" alt="" class="user-img">
                                    <span class="comment-username">AyoubKHE</span>
                                    <p class="Tweet-username">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Voluptatum id ut labore error illo magni, fugiat ea reprehenderit veritatis
                                        ratione asperiores porro tempore in quaerat beatae quia adipisci explicabo
                                        officia!
                                    </p>
                                </li>

                                <li>
                                    <img src="users_profile_image/Photo_Identite.jpg" alt="" class="user-img">
                                    <span class="comment-username">AyoubKHE</span>
                                    <p class="Tweet-username">Lorem ipsum dolor sit amet</p>
                                </li>

                                <li>
                                    <img src="users_profile_image/Photo_Identite.jpg" alt="" class="user-img">
                                    <span class="comment-username">AyoubKHE</span>
                                    <p class="Tweet-username">Lorem ipsum dolor sit amet</p>
                                </li>
                            </ul>

                            <div class="input-comment">
                                <input type="text" placeholder="Ajoutez votre commentaire...">
                                <button class="btn btn-success">Ajouter</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div> -->

        </main>

    </section>



    <!-- Edit Tweet Modal -->
    <div class="modal fade" id="editTweetModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modifier la tweet</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <form action="">

                        <div class="row">

                            <div class="col-12">

                                <label for="tweet-image" class="form-label my-form-label">Image de la tweet :</label>

                                <div class="row">
                                    <div class="col-11" style="padding-right: 10px;">
                                        <div class="mb-3">
                                            <input class="form-control form-control-sm" type="file" id="tweet-image">
                                        </div>
                                    </div>

                                    <div class="col-1" style="padding-top: 5px; padding-left: 0px; margin-left: 0px;">
                                        <div class="my-tooltip" id="ep-tweet-image">
                                            <div class="icon">!</div>
                                            <div class="my-tooltiptext" id="ep-tweet-image-text"></div>
                                        </div>
                                    </div>



                                </div>

                            </div>

                        </div>

                        <div class="row">

                            <div class="col-12">

                                <div class="row">
                                    <div class="col-11" style="padding-right: 10px;">
                                        <input type="text" class="form-control form-control-sm my-form-control" name="title" id="tweet-title" placeholder="titre de Tweete...">
                                    </div>

                                    <div class="col-1" style="padding-top: 5px; padding-left: 0px; margin-left: 0px;">
                                        <div class="my-tooltip" id="ep-tweet-title">
                                            <div class="icon">!</div>
                                            <div class="my-tooltiptext" id="ep-tweet-title-text"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="col-12">

                                <div class="row" style="align-items: center;">
                                    <div class="col-11" style="padding-right: 10px;">
                                        <textarea name="tweet-body" id="tweet-body" cols="30" rows="10" class="form-control form-control-sm my-textarea" placeholder="le corp de Tweete..."></textarea>
                                        <!-- <input type="text" class="form-control form-control-sm my-form-control"
                                                name="username" id="username" placeholder="Username"> -->
                                    </div>

                                    <div class="col-1" style="padding-top: 5px; padding-left: 0px; margin-left: 0px;">
                                        <div class="my-tooltip" id="ep-tweet-body">
                                            <div class="icon">!</div>
                                            <div class="my-tooltiptext" id="ep-tweet-body-text"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </form>


                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-outline-success" id="btn-valider">Valider</button>
                </div>

            </div>
        </div>
    </div>













    <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="node_modules/axios/dist/axios.min.js"></script>

    <script src="assets/js/commonLogic.js"></script>
    <!-- <script src="assets/js/login_files/inscriptionValidation.js"></script> -->
    <script src="assets/js/profile_files/editTweetValidation.js"></script>
    <script src="assets/js/home_files/commonLogic.js"></script>
    <script src="assets/js/profile_files/profileCommonLogic.js"></script>
    <script src="assets/js/profile_files/profile.js"></script>

</body>

</html>