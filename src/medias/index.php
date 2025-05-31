<?php
    include '../MOCK_medias.php';
    include '../MOCK_news.php';
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