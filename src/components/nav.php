<?php
    // $baseUrl = '/alereia/public/';
    $baseUrl = '/B5T1/projets/alereia_staging/';
    $groupedContent = array();

    $urlMedia = $_GET['media'] ?? 'episode_pilote';

    $currentMedia = $mediaContent[$urlMedia];

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
            <div class="glitch-wrapper">
                <a href="<?= $baseUrl ?>" class="glitch-target">Aleréia</a>
                <div class="glitch-layer-container"></div>
            </div>
        </li>
        <!-- <li class="link">
            <div class="glitch-wrapper">
                <a href="<?= $baseUrl ?>univers" class="glitch-target">Monde</a>
                <div class="glitch-layer-container"></div>
            </div>
        </li> -->
        <li class="link nav__medias">
            <span class="nav__medias__title">Médias</span>
            <div class="nav__medias__box">
                <div class="nav__medias__box__overflow">
                    <?php foreach ($groupedContent as $category): ?>
                        <div class="nav__medias__box__category <?= in_array($currentMedia['url'], array_column($category['medias'], 'url')) ? '' : 'collapsed' ?>">
                            <h2>
                                <?= $category['category'] ?>
                                <span class="category-toggle"></span>
                            </h2>
                            <ul>
                                <?php foreach ($category['medias'] as $media): ?>
                                    <li class="glitch-wrapper">
                                        <a href="<?= $baseUrl ?>medias?media=<?= $media['url'] ?>" class="glitch-target"><?= $media['title'] ?></a>
                                        <div class="glitch-layer-container"></div>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </li>
        <li class="link">
            <div class="glitch-wrapper">
                <a href="<?= $baseUrl ?>news?news=<?= $news['l_episode_pilote_enfin_disponible']['url'] ?>" class="glitch-target">Actualités</a>
                <div class="glitch-layer-container"></div>
            </div>
        </li>
        <li class="link">
            <a href="<?= $baseUrl ?>magasin" class="disabled">Boutique</a>
        </li>
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
            <li><a href="<?= $baseUrl ?>">Accueil</a></li>
            <li><a href="<?= $baseUrl ?>univers">Univers</a></li>
            <li><a href="<?= $baseUrl ?>magasin" class="disabled">Boutique</a></li>
            <li><a href="<?= $baseUrl ?>news">Actualité</a></li>
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