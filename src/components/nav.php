<?php
    $baseUrl = '/alereia/public/';
    
    $mediaContent = array(
        array(
            "title" => "ÉPISODE PILOTE",
            "category" => "Jeux vidéo",
            "description" => "L'épisode pilote (remplacer par son nom définitif plus tard) est un jeu vidéo narratif très court qui vous plonge directement dans le quotidien de personnages centraux d'Aleréia, le jour d'une mission particulière. Découvrez comment Vangva, Ilyem et Syel évoluent dans ce monde qui leur semble hostile, avec un premier aperçu des pouvoirs spéciaux dont ils ont hérité.<br><br>Vous pouvez y jouer directement sur le site, sans besoin de téléchargement.",
            "image" => "images/image.png"
        ),
        array(
            "title" => "SI J'OUVRE LES YEUX",
            "category" => "MUSIQUES",
            "description" => "La chaîne Youtube d'Aleréia présente des chansons originales produites par plusieurs artistes de talents. Ces musiques, introspectives, proposent d'explorer les pensées profondes de certains personnages et d'apporter des éléments de narration supplémentaires à l'univers, le tout accompagné de visuels animés.",
            "image" => "images/SyelGlitch.png"
        ),
        array(
            "title" => "CARNET DE PRISME",
            "category" => "Littérature",
            "description" => "Aleréia propose aussi tout un panel de textes qui pourront être retrouvés prochainement en ligne sur la plateforme Wattpad. Une première nouvelle a déjà vu le jour, Carnet de Prisme, qui plonge son lecteur dans une histoire centrée autour du personnages de Vangva et ses dilemmes moraux en tant que soldat de Prisme.",
            "image" => "images/couv.png"
        ),
        array(
            "title" => "LES COULISSES DE L'UNIVERS",
            "category" => "RÉSEAUX & PATREON",
            "description" => "Suivez l'autrice d'Aleréia sur ses réseaux sociaux Bluesky (avec des liens cliquables) et Mastodon pour découvrir régulièrement des illustrations, croquis et informations inédits sur l'univers et le travail de sa créatrice. Attention, vous risquez aussi d'y trouver des photos de mignons petits chats. Pour les contributeurs Patreon, vous pourrez accéder à certaines informations inédites et/ou en avant-première.",
            "image" => "images/glitchfond.png"
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
<nav class="nav">
    <ul class="container">
        <li class="link"><a href="<?= $baseUrl ?>">Home</a></li>
        <li class="link"><a href="<?= $baseUrl ?>monde">Monde</a></li>
        <li class="link"><a href="<?= $baseUrl ?>magasin">Magasin</a></li>
        <li class="link"><a href="<?= $baseUrl ?>news">News</a></li>
        <li class="nav__medias">
            <span class="nav__medias__title">Médias</span>
            <div class="nav__medias__box">
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
        </li>
    </ul>
</nav>