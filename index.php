<!doctype html>
<html lang="fr">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Login" />

    <!-- Bootstrap CSS -->

    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">


    <link rel="stylesheet" href="assets/css/login_styles/loginStyle.css">
    <link rel="stylesheet" href="assets/css/login_styles/formStyle.css">

    <link rel="stylesheet" type="text/css"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <title>Login</title>
</head>

<body>

    <section class="container my-container">

        <div class="row align-items-center" style="height: 80vh;">

            <div class="col-12">

                <form class="form">

                    <div style="text-align: center; color: rgb(123, 123, 123);">
                        <i class="fa fa-user-circle-o fa-5x my-icon" aria-hidden="true"></i>
                    </div>

                    <div class="inputForm">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <!-- <i class="fa fa-envelope-o" aria-hidden="true" id="envelope"></i> -->
                        <input type="text" class="input" id="input-username" placeholder="Username" value="AyKHE">
                    </div>

                    <div class="inputForm">
                        <i class="fa fa-lock" aria-hidden="true"></i>

                        <input type="password" class="input" id="input-password" placeholder="Mot de passe"
                            value="123456">

                        <i class="fa fa-eye" id="eye" aria-hidden="true"></i>
                    </div>

                    <div class="flex-row">
                        <div>
                            <input type="checkbox" id="chk-retain-password">
                            <label>Retenir le Mot de passe </label>
                        </div>

                        <!-- <span class="span">Mot de passe oublié ?</span> -->
                    </div>

                    <button class="button-submit" id="btn-login">Se Connecter</button>

                    <p class="p">Vous n'avez pas de compte ?
                        <span class="span" data-bs-toggle="modal" data-bs-target="#registerModal">S'inscrire</span>
                    </p>

                </form>

            </div>

        </div>


    </section>


    <!-- Register Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">ESPACE INSCRIPTION</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">

                    <img src="images/geek.png" alt="" width="100" style="margin-left: 40%;">

                    <form action="">

                        <div class="row">

                            <div class="col-12">

                                <label for="profileImage" class="form-label my-form-label">Image de profile :</label>

                                <div class="row">
                                    <div class="col-11" style="padding-right: 10px;">
                                        <div class="mb-3">
                                            <input class="form-control form-control-sm" type="file" id="profile-image">
                                        </div>
                                    </div>

                                    <div class="col-1" style="padding-top: 5px; padding-left: 0px; margin-left: 0px;">
                                        <div class="my-tooltip" id="ep-profile-image">
                                            <div class="icon">!</div>
                                            <div class="my-tooltiptext" id="ep-profile-image-text"></div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div class="row">

                            <div class="col-12">
                                <!-- <label for="name" class="form-label my-form-label">name :</label> -->

                                <div class="row">
                                    <div class="col-11" style="padding-right: 10px;">
                                        <input type="text" class="form-control form-control-sm my-form-control"
                                            name="name" id="name" placeholder="Nom complet">
                                    </div>

                                    <div class="col-1" style="padding-top: 5px; padding-left: 0px; margin-left: 0px;">
                                        <div class="my-tooltip" id="ep-name">
                                            <div class="icon">!</div>
                                            <div class="my-tooltiptext" id="ep-name-text"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12">
                                <!-- <label for="username" class="form-label my-form-label">Username :</label> -->

                                <div class="row">
                                    <div class="col-11" style="padding-right: 10px;">
                                        <input type="text" class="form-control form-control-sm my-form-control"
                                            name="username" id="username" placeholder="Username">
                                    </div>

                                    <div class="col-1" style="padding-top: 5px; padding-left: 0px; margin-left: 0px;"
                                        id="spinner-tooltip">
                                        <div class="my-tooltip" id="ep-username">
                                            <div class="icon">!</div>
                                            <div class="my-tooltiptext" id="ep-username-text"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12">
                                <!-- <label for="mot-de-passe" class="form-label my-form-label">Mot de passe :</label> -->

                                <div class="row">
                                    <div class="col-11" style="padding-right: 10px;">
                                        <input type="password" class="form-control form-control-sm my-form-control"
                                            name="mot-de-passe" id="mot-de-passe" placeholder="Mot de passe">
                                    </div>

                                    <div class="col-1" style="padding-top: 5px; padding-left: 0px; margin-left: 0px;">
                                        <div class="my-tooltip" id="ep-mot-de-passe">
                                            <div class="icon">!</div>
                                            <div class="my-tooltiptext" id="ep-mot-de-passe-text"></div>
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















    <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="node_modules/axios/dist/axios.min.js"></script>
    <script src="assets/js/login_files/login.js"></script>
    <script src="assets/js/login_files/inscriptionValidation.js"></script>

</body>

</html>