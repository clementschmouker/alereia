<?php
    $doors = array(
        array(
            "title" => "Porte 1",
            "content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum felis nec, fermentum felis.",
            "position" => array(
                "x" => 5,
                "y" => 3,
                "z" => 3
            ),
        ),
        array(
            "title" => "Porte 2",
            "content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum felis nec, fermentum felis.",
            "position" => array(
                "x" => -2,
                "y" => 5,
                "z" => 3
            ),
        ),
        array(
            "title" => "Porte 3",
            "content" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis, fermentum felis nec, fermentum felis.",
            "position" => array(
                "x" => -10,
                "y" => 7,
                "z" => 3
            ),
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
                <div class="univers__door"
                    data-title="<?= $door['title'] ?>"
                    data-position-x="<?php echo $door['position']['x'] ?>"
                    data-position-y="<?php echo $door['position']['y'] ?>"
                    data-position-z="<?php echo $door['position']['z'] ?>"
                    data-content="<?= htmlspecialchars($door['content'], ENT_QUOTES, 'UTF-8') ?>"
                    data-door-id="<?= $door['title'] ?>"
                >
                    <div class="univers__door__content">
                        <?= $door['content'] ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div id="infoBox" style="display:none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            <h2 id="door-title">Door Title</h2>
            <p id="door-content">Information about this door</p>
            <button class="closeInfoButton">Close</button>
        </div>



        <?php include '../components/footer.php'; ?>

        <script src="../dist/bundle.js"></script>
    </body>
</html>