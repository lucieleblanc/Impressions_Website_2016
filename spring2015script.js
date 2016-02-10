//SPRING 2015
$(document).ready(function(){
    
    var NUMSLIDES = 28;
    var slideCount = 1;

    $('.arrow-right').click(function() {
        slideCount++;
        if (slideCount > NUMSLIDES) {
            slideCount = 1;
        }
        var currentSlide = $(".slide img");
        currentSlide.attr("src", ("images/current/" + slideCount + ".jpg"));
    });

    $('.arrow-left').click(function() {
        if (slideCount <= 1) {
            slideCount = NUMSLIDES;
        }
        slideCount--;
        var currentSlide = $(".slide img");
        currentSlide.attr("src", ("images/current/" + slideCount + ".jpg"));

    });

    $('.menu-button').click(function() {
        console.log("function called");
        if ($('.menu-navbar').css("display") == "none") {
            console.log("display is hidden, changing to inline-block");
            $('.menu-navbar').css({"display": "inline-block"});
        } else {
            console.log("display is inline-block, changing to hidden");
            $('.menu-navbar').css({"display": "none"});
        }
        console.log("function finished");
    });
});
