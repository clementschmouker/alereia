<?php
    $baseUrl = '/alereia/public/';
    $groupedContent = array();

    foreach ($mediaContent as $media) {
        $category = $media['category'];
        
        // If this category hasn't been added yet, initialize it
        if (!isset($groupedContent[$category])) {
            $groupedContent[$category] = array(
                'category' => $category,
                'medias' => array()
            );
        }
        
        // Add this media item to the appropriate category
        $groupedContent[$category]['medias'][] = $media;
    }

    // If you want to reset the keys to be 0,1,2 instead of category names:
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
                                <li><a href="#"><?= $media['title'] ?></a></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endforeach; ?>
            </div>
        </li>
    </ul>
</nav>