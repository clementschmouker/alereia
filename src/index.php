<?php 
    $mediaContent = array(
        array(
            "title" => "ÉPISODE PILOTE",
            "category" => "Jeux vidéo",
            "description" => "L'épisode pilote (remplacer par son nom définitif plus tard) est un jeu vidéo narratif très court qui vous plonge directement dans le quotidien de personnages centraux d'Aleréia, le jour d'une mission particulière. Découvrez comment Vangva, Ilyem et Syel évoluent dans ce monde qui leur semble hostile, avec un premier aperçu des pouvoirs spéciaux dont ils ont hérité.<br><br>Vous pouvez y jouer directement sur le site, sans besoin de téléchargement.",
            "image" => "images/image.png"
        ),
        array(
            "title" => "CARNET DE PRISME",
            "category" => "Littérature",
            "description" => "Aleréia propose aussi tout un panel de textes qui pourront être retrouvés prochainement en ligne sur la plateforme Wattpad. Une première nouvelle a déjà vu le jour, Carnet de Prisme, qui plonge son lecteur dans une histoire centrée autour du personnages de Vangva et ses dilemmes moraux en tant que soldat de Prisme.",
            "image" => "images/couv.png"
        )
    );
?>

<!DOCTYPE html>
<html>
    <head>
        <title>PHP Test</title>
        <link rel="stylesheet" href="dist/style.css">
    </head>
    <body>
        <nav class="nav">
            <ul class="container">
                <li><a href="#">Home</a></li>
                <li><a href="#">Monde</a></li>
                <li><a href="#">Magasin</a></li>
                <li><a href="#">News</a></li>
                <li><span>Médias</span></li>
            </ul>
        </nav>

        <header class="header">
            <div class="container">
                <h1>Aleréia</h1>

                <div class="header__news">
                    <ul class="header__news__list">
                        <li class="header__news__card card">
                            <div class="card__header">
                                <h2 class="card__title">Inauguration du site</h2>
                                <p class="card__date">14/03/2025</p>
                            </div>
                            <p class="card__content">Le site fait peau neuve ! Explorez les recoins d'Aleréia et de ses personnages et découvrez les différents aspects de cet univers transmédia haut en couleurs.</p>
                        </li>
                        <li class="header__news__card card">
                            <div class="card__header">
                                <h2 class="card__title">Nos réseaux sociaux</h2>
                                <p class="card__date">14/03/2025</p>
                            </div>
                            <p class="card__content">Suivez-nous sur les réseaux sociaux ! Vous pourrez retrouver Aleréia sur les réseaux Bluesky et Mastodon, ainsi que toutes les musiques produites pour l'univers sur sa propre chaîne Youtube dédiée.</p>
                        </li>
                        <li class="header__news__card card">
                            <div class="card__header">
                                <h2 class="card__title">Explorez le monde</h2>
                                <p class="card__date">14/03/2025</p>
                            </div>
                            <p class="card__content">Découvrez le worldbuilding de l'univers à travers une expérience interactive inédite directement sur son site web ! Ouvrez les différentes portes et laissez-vous emporter par une étrange voix numérique...</p>
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
    </body>
</html> 