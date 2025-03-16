<?php
    $mediaContent = isset($content) && is_object($content) ? $content : null;
?>

<section class="section-media" style="background-image: url('<?php echo $mediaContent->image ?>');">
    <div class="container">
        <div class="media">
            <div class="media__content">
                <div class="media__content__head">
                    <h2 class="media__title"><span><?php echo $mediaContent->category ?></span> - <?php echo $mediaContent->title ?></h2>
                </div>
                
                <p class="media__description"><?php echo $mediaContent->description ?></p>
                <a class="media__link link-button" href="<?= $baseUrl ?>medias?id=1">
                    Consulter
                </a>
            </div>
        </div>
    </div>
</section>
