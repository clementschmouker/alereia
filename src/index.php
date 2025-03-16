<?php 

    $news = array(
        array(
            "title" => "Inauguration du site",
            "date" => "14/03/2025",
            "content" => "Le site fait peau neuve ! Explorez les recoins d'Aleréia et de ses personnages et découvrez les différents aspects de cet univers transmédia haut en couleurs."
        ),
        array(
            "title" => "Nos réseaux sociaux",
            "date" => "14/03/2025",
            "content" => "Suivez-nous sur les réseaux sociaux ! Vous pourrez retrouver Aleréia sur les réseaux Bluesky et Mastodon, ainsi que toutes les musiques produites pour l'univers sur sa propre chaîne Youtube dédiée."
        ),
        array(
            "title" => "Explorez le monde",
            "date" => "14/03/2025",
            "content" => "Découvrez le worldbuilding de l'univers à travers une expérience interactive inédite directement sur son site web ! Ouvrez les différentes portes et laissez-vous emporter par une étrange voix numérique..."
        )
    )
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
                <h1>Aleréia</h1>

                <div class="header__news">
                    <ul class="header__news__list">
                        <?php foreach ($news as $new) { ?>
                            <li class="header__news__card card">
                                <a href="./news">
                                    <div class="card__header">
                                        <h2 class="card__title"><?php echo $new["title"]; ?></h2>
                                        <p class="card__date"><?php echo $new["date"]; ?></p>
                                    </div>
                                    <p class="card__content"><?php echo $new["content"]; ?></p>
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