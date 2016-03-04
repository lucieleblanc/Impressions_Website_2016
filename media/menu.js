
$(document).ready(function(){
    $('.menu-button').click(function() {
        if ($('.menu-bar').css("display") == "none") {
            $('.menu-bar').css({"display": "inline-block"});
        } else {
            $('.menu-bar').css({"display": "none"});
        }
    });
});
