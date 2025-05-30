<?php
    include '../MOCK_medias.php';

    include '../MOCK_news.php';

    $currentNews = $news[$_GET['news']];
?>

<!DOCTYPE html>
<html>
    <head>
        <title>News | Aleréia</title>
        <link rel="stylesheet" href="../dist/style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body class="news-page dark">
        <?php include '../components/nav.php'; ?>

        <main class="container">
            <h1 class="news-page__title">News</h1>
            <aside>
                <h2>Articles</h2>
                <ul>
                    <?php foreach($news as $new): ?>
                        <li>
                            <a href="?news=<?= $new['url'] ?>">
                                <h3><?php echo $new["title"] . " - " . $new["date"]; ?></h3>
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