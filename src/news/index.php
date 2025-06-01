<?php
    include '../MOCK_medias.php';

    include '../MOCK_news.php';

    $currentNews = $news[$_GET['news']];
?>

<!DOCTYPE html>
<html lang='fr'>
    <head>
        <title>Actualités | Aleréia</title>
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
        <meta property="og:url" content="https://www.alereia.com/news">
    </head>
    <body class="news-page dark">
        <?php include '../components/nav.php'; ?>

        <main class="container">
            <h1 class="news-page__title">Actualités</h1>
            <aside>
                <h2>Articles</h2>
                <ul>
                    <?php foreach($news as $new): ?>
                        <li>
                            <a href="?news=<?= $new['url'] ?>">
                                <h3><?php echo $new["title"]?></h3>
                                <span class="date"><?php echo $new["date"]?></span>
                                <span><?php echo $new["author"]; ?></span>        
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </aside>
            <section class="news-page__content">
                <h2 class="news-page__content__title"><?php echo $currentNews['title']; ?></h2>
                <span><?php echo $currentNews['author']. ' - '. $currentNews['date']; ?></span>
                <div class="news-page__content__container">
                    <?php echo $currentNews['long_text']; ?>
                </div>
            </section>
        </main>
        <?php include '../components/footer.php'; ?>

        <script src="../dist/bundle.js"></script>
    </body>
</html>