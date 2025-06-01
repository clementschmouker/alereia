<?php
    include '../MOCK_medias.php';
    include '../MOCK_news.php';

    $currentMedia = $_GET['media'];

    if (!isSet($currentMedia)) {
        header("Location: ../index.php");
        exit();
    }
?>

<!DOCTYPE html>
<html lang='fr'>
    <head>
        <title>Media | Aleréia</title>
        <link rel="stylesheet" href="../dist/style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">        
        <meta charset="UTF-8">
        <meta name="description" content="Aleréia est un univers transmédia qui vous transporte dans un monde glitché. Suivez les aventure de 6 héros à travers différentes histoires. Découvrez cette univers à travers ce site !">
        <link rel="apple-touch-icon" sizes="180x180" href="../images/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../images/favicon-16x16.png">

        <meta property="og:title" content="Aleréia">
        <meta property="og:description" content="Un univers transmédia captivant qui vous emportera dans un univers complexe, politique, et écologique.">
        <meta property="og:image" content="https://www.alereia.com/images/headerbg.jpg">
        <meta property="og:url" content="https://www.alereia.com/medias">

    </head>
    <body class="media-page">
        <?php include '../components/nav.php'; ?>

        <?php
            $media = $_GET['media'];
            if (!isSet($media)) {
                header("Location: ../index.php");
                exit();
            }
            echo $mediaContent[$media]['title'];
            $title = $mediaContent[$media]['title'];
            $description = $mediaContent[$media]['description_long'];
            $backgroundUrl = $mediaContent[$media]['background_url'];
        ?>

        <main style="background-image: url('<?= $backgroundUrl ?>');">
            <div class="container">
                <div class="media-page__block">
                    <h1><?= $title ?></h1>
                    <p><?= $description ?></p>
                    <div class="glitch-wrapper">
                        <a target="_blank" href="<?= $mediaContent[$media]['external_url'] ?>" class="glitch-target link-button <?= $mediaContent[$media]['unavailable'] === true ? 'disabled' : '' ?>">
                            <?= $mediaContent[$media]['unavailable'] ? 'Non disponible' : 'Accéder' ?>
                            <?php if ($mediaContent[$media]['unavailable'] === false) { ?>
                                <span class="link-button__icon"></span>
                            <?php } ?>
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