<?php 
    include './MOCK_medias.php';
    include './MOCK_news.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Aleréia</title>
        <link rel="stylesheet" href="dist/style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://use.typekit.net/vbr6avk.css">
    </head>
    <body>
        <?php include './components/nav.php'; ?>

        <header class="header">
            <div class="container">
                <div class="glitch-wrapper">
                    <h1 class="glitch-target">Aleréia</h1>
                    <div class="glitch-layer-container"></div>
                </div>
                <div class="header__news">
                    <ul class="header__news__list">
                        <?php foreach (array_slice($news, -3) as $new) { ?>
                            <li class="header__news__card card">
                                <a href="./news?news=<?= $new['url'] ?>">
                                    <div class="card__header">
                                        <h2 class="card__title"><?php echo $new["title"]; ?></h2>
                                        <p class="card__date"><?php echo $new["date"]; ?></p>
                                    </div>
                                    <p class="card__content"><?php echo $new["short_description"]; ?></p>
                                </a>
                            </li>
                        <?php } ?>
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
        <script src="dist/bundle.js"></script>
    </body>
</html> 