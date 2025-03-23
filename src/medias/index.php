<?php
    $title = "SI J'OUVRE LES YEUX";
    $description = "Si j'ouvre les yeux est le fruit de la collaboration de plusieurs artistes et musiciens. Très introspective, la chanson évoque la peur d'affronter le monde extérieur. Dans l'univers d'Aleréia, elle peut être comprise de multiples façons et correspondre à beaucoup de ses personnages ; c'est pour cette raison qu'elle a été choisie comme étant la première production musicale de l'univers transmédia.
        <br>
        <br>
        La vidéo qui l'accompagne représente Syel et sa difficulté à ouvrir les yeux. Syel étant un personnage particulier qui subit beaucoup d'oppression de la part d'autres acteurs du récit, cette thématique est particulièrement pertinente pour lui.
        <br>
        <br>
        Composition : Gaëlle Louvet, Yves Baar, KylerVLK<br>
        Arrangement : Yves Baar<br>
        Interprétation : Gaëlle Louvet, KylerVLK<br>
        Paroles : Gaëlle Louvet, KylerVLK, Charlie Breidt<br>";
    $backgroundUrl = "../images/MediaMusique.webp";
    
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Media | Aleréia</title>
        <link rel="stylesheet" href="../dist/style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body class="media-page">
        <?php include '../components/nav.php'; ?>

        <main style="background-image: url('<?= $backgroundUrl ?>');">
            <div class="container">
                <div class="media-page__block">
                    <h1><?= $title ?></h1>
                    <p><?= $description ?></p>
                    <div class="glitch-wrapper">
                        <a href="#" class="glitch-target link-button">
                            Accéder
                            <span class="link-button__icon"></span>
                        </a>
                        <div class="glitch-layer-container"></div>
                    </div>
                </div>
            </div>
        </main>

        <?php include '../components/footer.php'; ?>
        <script src="../dist/bundle.js"></script>
    </body>
</html>