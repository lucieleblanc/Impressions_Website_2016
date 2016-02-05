
$(document).ready(function(){

    $('.arrow-next').click(function() {
        var currentSlide = $('.active-slide');
        var nextSlide = currentSlide.next();
        
        if (nextSlide.length == 0) {
            nextSlide = $('.slide').first();
        }
        
        currentSlide.fadeOut(600).removeClass('active-slide');
        nextSlide.fadeIn(600).addClass('active-slide');
        
    });
    
    $('.arrow-prev').click(function() {
        var currentSlide = $('.active-slide');
        var prevSlide = currentSlide.prev();
        
        if (prevSlide.length == 0) {
            prevSlide = $('.slide').last();
        }
        
        currentSlide.fadeOut(600).removeClass('active-slide');
        prevSlide.fadeIn(600).addClass('active-slide')

    });
});
