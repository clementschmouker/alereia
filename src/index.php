<?php 
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Aleréia</title>
        <link rel="stylesheet" href="dist/style.css">
    </head>
    <body>
        <?php include './components/nav.php'; ?>

        <header class="header">
            <div class="container">
                <h1>Aleréia</h1>

                <div class="header__news">
                    <ul class="header__news__list">
                        <li class="header__news__card card">
                            <a href="./news">
                                <div class="card__header">
                                    <h2 class="card__title">Inauguration du site</h2>
                                    <p class="card__date">14/03/2025</p>
                                </div>
                                <p class="card__content">Le site fait peau neuve ! Explorez les recoins d'Aleréia et de ses personnages et découvrez les différents aspects de cet univers transmédia haut en couleurs.</p>
                            </a>
                        </li>
                        <li class="header__news__card card">
                            <a href="./news">
                                <div class="card__header">
                                    <h2 class="card__title">Nos réseaux sociaux</h2>
                                    <p class="card__date">14/03/2025</p>
                                </div>
                                <p class="card__content">Suivez-nous sur les réseaux sociaux ! Vous pourrez retrouver Aleréia sur les réseaux Bluesky et Mastodon, ainsi que toutes les musiques produites pour l'univers sur sa propre chaîne Youtube dédiée.</p>
                            </a>
                        </li>
                        <li class="header__news__card card">
                            <a href="./news">
                                <div class="card__header">
                                    <h2 class="card__title">Explorez le monde</h2>
                                    <p class="card__date">14/03/2025</p>
                                </div>
                                <p class="card__content">Découvrez le worldbuilding de l'univers à travers une expérience interactive inédite directement sur son site web ! Ouvrez les différentes portes et laissez-vous emporter par une étrange voix numérique...</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>

        <main>
            <?php
                foreach ($mediaContent as $content) {
                    $content = (object) $content;
                    include './components/indexmedia.php';
                }
            ?> 
        </main>

        <?php include './components/footer.php'; ?>
    </body>
</html> 