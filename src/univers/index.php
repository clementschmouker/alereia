<?php
    $doors = array(
        array(
            "title" => "Porte 1",
            "content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum felis nec, fermentum felis.",
        ),
        array(
            "title" => "Porte 2",
            "content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum felis nec, fermentum felis.",
        ),
        array(
            "title" => "Porte 3",
            "content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum felis nec, fermentum felis.",
        ),
        array(
            "title" => "Porte 3",
            "content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum felis nec, fermentum felis.",
        ),
        array(
            "title" => "Porte 3",
            "content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum felis nec, fermentum felis.",
        ),
        array(
            "title" => "Porte 3",
            "content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum felis nec, fermentum felis.",
        ),
    )
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Univers | Aleréia</title>
        <link rel="stylesheet" href="../dist/style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body class="univers-page">
        <?php include '../components/nav.php'; ?>

        <main class="univers">
            <div id="univers"></div>
        </main>

        <div class="hidden">
            <?php foreach ($doors as $door): ?>
                <div class="univers__door" data-title="<?= $door['title'] ?>">
                    <div class="univers__door__content">
                        <?= $door['content'] ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <?php include '../components/footer.php'; ?>

        <script src="../dist/bundle.js"></script>
    </body>
</html>