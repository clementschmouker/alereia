<?php
    include '../MOCK_medias.php';

    $doors = array(
        array(
            "title" => "Adrika",
            "content" => "<p>Adrika est l'âme jumelle de Destruction, le Manär orange. C'est pour cette raison qu'elle possède des cheveux couleur flamme, qu'elle déteste et qu'elle rase très près du crâne pour qu'on la remarque le moins possible. Taiseuse et renfermée sur elle-même, c'est un personnage qui ne supporte pas être le centre de l'attention. Le traitement particulier qu'on lui accorde pour son rapport étroit à une semi-divinité la répugne d'ailleurs au plus haut point.</p>
                          <p>Elle s'ouvre rarement aux autres, et affiche peu d'émotions. Toujours calme et imperturbable, c'est très difficile de comprendre à quoi ressemble son monde intérieur, d'autant qu'elle a aussi tendance à s'exprimer de façon un peu énigmatique. Pourtant, elle est aimante à sa façon, et capable de grands sacrifices et de beaucoup de ténacité pour protéger ses proches.</p>",
            "image" => "Adrika.png",
            "position" => array(
                "x" => 5,
                "y" => 3,
                "z" => 3
            ),
        ),
        array(
            "title" => "Ilyem",
            "content" => "<p>Ramenée à la vie en tant que Glitcher, Ilyem possède un rapport un peu particulier à son existence et à la mort. Consciente qu’il ne lui reste que quelques années à vivre, elle tient à profiter de la vie à fond, mais la guerre à Aleréia ne lui permet malheureusement pas de mener l’existence de liberté et d’aventures à laquelle elle aspire. Éternellement souriante, elle a toujours le mot pour rire et est passée maître dans l’art de détendre l’atmosphère.</p>
                          <p>Dotée des pouvoirs de Glitcher, mais également de ceux de son peuple, et accompagnée d’un Manär, elle est un personnage fort mais elle n’endosse pas pour autant le même rôle protecteur que Vangva. Beaucoup plus sociable et rassurante, elle ne se sert de ses capacités qu’en cas de réel besoin et agit plutôt au quotidien en remotivant les troupes et apportant son aide au groupe à l’aide de ses compétences sociales.</p>",
            "image" => "IlyemOffi.png",
            "position" => array(
                "x" => -2,
                "y" => 5,
                "z" => 3
            ),
        ),
        array(
            "title" => "Ylghin",
            "content" => "<p>Originaire de Nevamär, Ylghin fait partie d'une communauté de Nevari extrémistes qui militent pour leur indépendance et qui rêveraient de pouvoir chasser les colons de leur île. Puisqu'elle a grandi dans ce contexte sans aucune possibilité de remise en question, elle voue une haine certaine aux Aleréiens qu'elle juge responsables de tous ses malheurs.</p>
                          <p>C'est une très jolie fille qui ne manque pas de sortir du lot. En effet, elle semble avoir tout pour elle : elle est populaire, drôle, enthousiaste et douée dans beaucoup de domaines. C'est également une combattante redoutable, qui a suivi un entraînement strict auprès de sa communauté aux idéaux révolutionnaires. Très méfiante, elle a beaucoup de mal à parvenir à accorder sa confiance, mais quand elle le fait, elle devient alors une formidable alliée.</p>",
            "image" => "YlghinOffi.png",
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
                    data-image="<?= $door['image'] ?>"
                >
                    <div class="univers__door__content">
                        <?= $door['content'] ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div id="infoBox">
            <img id="infoBox-image" alt="" />
            <div class="infoBox__content">
                <h2 id="infoBox-title">Title</h2>
                <p id="infoBox-content">Information about this door</p>
                <button class="closeInfoButton">Close</button>
            </div>
        </div>



        <?php include '../components/footer.php'; ?>

        <script src="../dist/bundle.js"></script>
    </body>
</html>