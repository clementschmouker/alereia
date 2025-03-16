<?php
// Make sure the 'content' is passed as an object
$mediaContent = isset($content) && is_object($content) ? $content : null; // You can set a default object if needed
?>

<section class="section-media">
    <div class="container">
        <div class="media">
            <?php 
            // Make sure $mediaContent is an object and has the property 'title'
            if ($mediaContent && isset($mediaContent->title)) {
                echo htmlspecialchars($mediaContent->title);
            } else {
                echo 'Default content'; // Or handle the case when 'title' is not set
            }
            ?>
        </div>
    </div>
</section>
