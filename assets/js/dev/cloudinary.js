$(document).ready(function() {

    // source from: https://stereochro.me/ideas/detecting-broken-images-js
    function isImageOk(img) {
        // During the onload event, IE correctly identifies any images that
        // weren't downloaded as not complete. Others should too. Gecko-based
        // browsers act like NS4 in that they report this incorrectly.
        if (!img.complete) {
            return false;
        }
        // However, they do have two very useful properties: naturalWidth and
        // naturalHeight. These give the true size of the image. If it failed
        // to load, either of these should be zero.
        if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
            return false;
        }
        // No other way of checking: assume it's ok.
        return true;
    };

    // Check all of the images and if they have a data-img value and the origonal src image can not be loaded it will load the image from the data-img value
    for (var i = 0; i < document.images.length; i++) {
        if (!isImageOk(document.images[i])) {
            //document.images[i].style.visibility = "hidden";
            console.log(document.images[i]);
            if (document.images[i].attributes["data-img"]) {
                document.images[i].src = document.images[i].attributes["data-img"].value;
            }
            if (document.images[i].attributes["data-width"]) {
                document.images[i].width = document.images[i].attributes["data-width"].value;
            }
            if (document.images[i].attributes["data-height"]) {
                document.images[i].height = document.images[i].attributes["data-height"].value;
            }

        }
    }

});
