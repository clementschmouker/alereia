<?php
    // Mocked datas
    $title = "Good news everyone !";
    $author = 'Gaëlle Gaban';
    $date = '01/01/2021';
    $content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.s.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.s.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.s.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.s.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.s.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.s.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.s.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.
    . Nullam ac ante mollis, fermentum felis nec, fermentum felis.";

    $articles = array(
        array(
            "title" => "Article 2",
            "date" => "01/01/2021",
            "author" => "John Doe",
        ),
        array(
            "title" => "Article 3",
            "date" => "01/01/2021",
            "author" => "Clément",
        ),
        array(
            "title" => "Article 4",
            "date" => "01/01/2021",
            "author" => "Gaëlle",
        )
    )
?>

<!DOCTYPE html>
<html>
    <head>
        <title>News | Aleréia</title>
        <link rel="stylesheet" href="../dist/style.css">
    </head>
    <body class="news-page">
        <?php include '../components/nav.php'; ?>

        <main class="container">
            <h1 class="news-page__title">News</h1>
            <aside>
                <h2>Articles</h2>
                <ul>
                    <?php foreach($articles as $article): ?>
                        <li>
                            <a href="#">
                                <h3><?php echo $article["title"] . " - " . $article["date"]; ?></h3>
                                <span><?php echo $article["author"]; ?></span>        
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </aside>
            <section class="news-page__content">
                <h2 class="news-page__content__title"><?php echo $title; ?></h2>
                <span><?php echo $author. ' - '. $date; ?></span>
                <div class="news-page__content__container">
                    <?php echo $content; ?>
                </div>
            </section>
        </main>
        <?php include '../components/footer.php'; ?>
    </body>
</html>