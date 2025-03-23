<?php
    $mediaContent = isset($content) && is_object($content) ? $content : null;
?>

<section class="section-media" style="background-image: url('<?php echo $mediaContent->image ?>');">
    <!-- <div class="separator glitch-problem-element"></div> -->
     <div class="separator">
        <?php include './components/indexMediaSeparatorComponent.php' ?>
    </div>
    <div class="container">
        <div class="media">
            <div class="media__content">
                <div class="media__content__head">
                    <h2 class="media__title"><span><?php echo $mediaContent->category ?></span> - <?php echo $mediaContent->title ?></h2>
                </div>
                
                <p class="media__description"><?php echo $mediaContent->description ?></p>
                <div class="glitch-wrapper media__link">
                    <a class="glitch-target link-button" href="<?= $baseUrl ?>medias?id=1">
                        Consulter
                    </a>
                    <div class="glitch-layer-container"></div>
                </div>
            </div>
        </div>
    </div>
</section>
