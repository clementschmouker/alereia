<?php
    $title = "SI J'OUVRE LES YEUX";
    $description = "La chaîne Youtube d'Aleréia présente des chansons originales produites par plusieurs artistes de talents. Ces musiques, introspectives, proposent d'explorer les pensées profondes de certains personnages et d'apporter des éléments de narration supplémentaires à l'univers, le tout accompagné de visuels animés.";
    $backgroundUrl = "../images/SyelGlitch.png";
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Media | Aleréia</title>
        <link rel="stylesheet" href="../dist/style.css">
    </head>
    <body class="media-page">
        <?php include '../components/nav.php'; ?>

        <main style="background-image: url('<?= $backgroundUrl ?>');">
            <div class="container">
                <div class="media-page__block">
                    <h1><?= $title ?></h1>
                    <p><?= $description ?></p>
                    <a href="#" class="link-button">
                        Accéder
                        <span class="link-button__icon"></span>
                    </a>
                </div>
            </div>
        </main>

        <?php include '../components/footer.php'; ?>
    </body>
</html>