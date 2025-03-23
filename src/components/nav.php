<?php
    $baseUrl = '/alereia/public/';
    // $baseUrl = '/B5T1/projets/alereia_staging/';
    
    $mediaContent = array(
        array(
            "title" => "ÉPISODE PILOTE",
            "category" => "Jeux vidéo",
            "description" => "L'épisode pilote (remplacer par son nom définitif plus tard) est un jeu vidéo narratif très court qui vous plonge directement dans le quotidien de personnages centraux d'Aleréia, le jour d'une mission particulière. Découvrez comment Vangva, Ilyem et Syel évoluent dans ce monde qui leur semble hostile, avec un premier aperçu des pouvoirs spéciaux dont ils ont hérité.<br><br>Vous pouvez y jouer directement sur le site, sans besoin de téléchargement.",
            "image" => "images/image.png",
            "isLeft" => false
        ),
        array(
            "title" => "SI J'OUVRE LES YEUX",
            "category" => "MUSIQUES",
            "description" => "La chaîne Youtube d'Aleréia présente des chansons originales produites par plusieurs artistes de talents. Ces musiques, introspectives, proposent d'explorer les pensées profondes de certains personnages et d'apporter des éléments de narration supplémentaires à l'univers, le tout accompagné de visuels animés.",
            "image" => "images/Musban.webp",
            "isLeft" => false
        ),
        array(
            "title" => "CARNET DE PRISME",
            "category" => "Littérature",
            "description" => "Aleréia propose aussi tout un panel de textes qui pourront être retrouvés prochainement en ligne sur la plateforme Wattpad. Une première nouvelle a déjà vu le jour, Carnet de Prisme, qui plonge son lecteur dans une histoire centrée autour du personnages de Vangva et ses dilemmes moraux en tant que soldat de Prisme.",
            "image" => "images/Litban.webp",
            "isLeft" => false
        ),
        array(
            "title" => "LES COULISSES DE L'UNIVERS",
            "category" => "RÉSEAUX & PATREON",
            "description" => "Suivez l'autrice d'Aleréia sur ses réseaux sociaux Bluesky (avec des liens cliquables) et Mastodon pour découvrir régulièrement des illustrations, croquis et informations inédits sur l'univers et le travail de sa créatrice. Attention, vous risquez aussi d'y trouver des photos de mignons petits chats. Pour les contributeurs Patreon, vous pourrez accéder à certaines informations inédites et/ou en avant-première.",
            "image" => "images/ReseauxBanniere.png",
            "isLeft" => true
        ),
    );

    $groupedContent = array();

    foreach ($mediaContent as $media) {
        $category = $media['category'];
        
        if (!isset($groupedContent[$category])) {
            $groupedContent[$category] = array(
                'category' => $category,
                'medias' => array()
            );
        }
        
        $groupedContent[$category]['medias'][] = $media;
    }

    $groupedContent = array_values($groupedContent);
?>
<nav class="nav nav-large">
    <ul class="container">
        <li class="link home">
            <a href="<?= $baseUrl ?>">
                <?php include './components/alereiaLogoComponent.php' ?>
            </a>
        </li>
        <li class="link"><a href="<?= $baseUrl ?>univers">Univers</a></li>
        <li class="link nav__medias">
            <span class="nav__medias__title">Médias</span>
            <div class="nav__medias__box">
                <div class="nav__medias__box__overflow">
                    <?php foreach ($groupedContent as $category): ?>
                        <div class="nav__medias__box__category">
                            <h2><?= $category['category'] ?></h2>
                            <ul>
                                <?php foreach ($category['medias'] as $media): ?>
                                    <li><a href="<?= $baseUrl ?>medias"><?= $media['title'] ?></a></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </li>
        <li class="link"><a href="<?= $baseUrl ?>news">Actualités</a></li>
        <li class="link"><a href="<?= $baseUrl ?>magasin">Boutique</a></li>
    </ul>
</nav>

<nav class="nav nav-small">
    <button class="nav-small__button">
        <span></span>
        <span></span>
        <span></span>
    </button>

    <div class="nav-small__content">
        <ul class="nav-small__content__list">
            <li><a href="<?= $baseUrl ?>">Home</a></li>
            <li><a href="<?= $baseUrl ?>monde">Monde</a></li>
            <li><a href="<?= $baseUrl ?>magasin">Magasin</a></li>
            <li><a href="<?= $baseUrl ?>news">News</a></li>
            <li class="nav__medias">
                <span>Médias <div class="nav-small__medias__icon"></div></span>
                <div class="nav__medias__box">
                    <?php foreach ($groupedContent as $category): ?>
                        <div class="nav__medias__box__category">
                            <h2><?= $category['category'] ?></h2>
                            <ul>
                                <?php foreach ($category['medias'] as $media): ?>
                                    <li class=<?php echo("nav__medias__box__el") ?>><a href="<?= $baseUrl ?>medias"><?= $media['title'] ?></a></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endforeach; ?>
                </div>
            </li>
        </ul>
    </div>
</nav>