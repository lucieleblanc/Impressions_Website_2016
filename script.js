
$(document).ready(function(){

    //this number MUST match the number of page sets to show
    var NUMSLIDES = 28;

    //change the image you want to start on
    var slideCount = 1;

    $('.arrow-right').click(function() {

        slideCount++;

        if (slideCount > NUMSLIDES) {
            slideCount = 1;
        }

        var currentSlide = $(".slide img");
        currentSlide.attr("src", ("current/" + slideCount + ".jpg"));
        
        
    });

    $('.arrow-left').click(function() {
        
        if (slideCount <= 1) {
            slideCount = NUMSLIDES;
        }

        slideCount--;

        var currentSlide = $(".slide img");
        currentSlide.attr("src", ("current/" + slideCount + ".jpg"));

    });
});
