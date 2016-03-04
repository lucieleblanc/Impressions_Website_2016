(function($) {

    $.fitme = function(element, options) {
		
		var $parent = $(element).parent();
		
        var defaults = {
  			framefit: $parent.hasClass("framefit"),
			centerx: $parent.hasClass("center-x"), 
			centery: $parent.hasClass("center-y"),
			showAfterResize: !$parent.hasClass("dont-show-after-resize"),
			animate: true
        }

        var plugin = this;
  	    plugin.settings = {}
 		
  	    
        var $element = $(element),
             element = element;
  	    plugin.loaded = false;
  	    
  	    plugin.data = {};
  	  
  	    plugin.reset = function () {
  	    	plugin.loaded = false;
  	    	$element.css({'width':'auto', 'height':'auto'}).hide();
  	    }
  	    plugin.init = function() {
    	   	
			plugin.settings = $.extend({}, defaults, options);
			
			$element.on('fitload', function () {
				plugin.loaded = true;
			});
			$(element).bind("load", function(){
				$element.trigger('fitload');
				plugin.resize();
			});
			if( element.complete || (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6)){
				$element.trigger('fitload');
				plugin.resize();
			}
		}
  	    plugin.resize = function(){
  	    	
  	    	if($element.attr('src') === undefined || plugin.loaded === false) return; 
  	    	
  	    	var pw, ph, w, h;
  	    	$element.css({'width':'auto', 'height':'auto'});
  	    	
  	    	if(!($element.is(':visible') && $element.parents(':hidden').length == 0)){

				id = plugin.hiddenDimentions($element);
				pd = plugin.hiddenDimentions($parent);
				pw = pd.width;
  				ph = pd.height;
  				w = id.outerWidth;
  				h = id.outerHeight;

  	    	}else{
  	    		pw = $parent.width();
  				ph = $parent.height();
  				w = $element.outerWidth();
  				h = $element.outerHeight();
  	    	}
  	    	

			var c = w / h;
			var pc = pw / ph;
			var dw = w;
			var dh = h;
			
			if(pw == 0 || ph == 0 || w == 0 || h == 0 ) {
				console.log("Fitme - Could not determine image proportions. " + $element.attr('src'));
				if(!plugin.settings.framefit){
					$element.css({'max-width':'100%', 'max-height':'100%', visibility:"visible"}).show();
				}else{
					$element.css({'width':'auto', 'height':'auto', visibility:"visible"}).show();
				}
				return;
			}
			
			if(plugin.settings.framefit == true){
				if(pc > c){
					dw = pw;
					dh = pw / c;
				}else{
					dh = ph;
					dw = ph * c;
				}	
				$parent.css({overflow:"hidden"});
			}else{
				if(dw > pw){
					dw = pw;
					dh = pw / c;
				}
				if(dh > ph){
					dh = ph;
					dw = ph * c;
				}
			}
			if(plugin.settings.centery){
				var mt =  (ph - dh) / 2
				plugin.data.marginTop =  mt;
				$element.css({"margin-top": mt });
			}
			if(plugin.settings.centerx){
				var ml =  (pw - dw) / 2;
				plugin.data.marginLeft = ml;
				$parent.css({"text-align":"left"});
				$element.css({"margin-left": ml});
			}
			$element.css({width: dw, height: dh, visibility:"visible"});
			plugin.data.width = dw;
			plugin.data.height = dh;	
			
			if (plugin.settings.showAfterResize) {
				if(plugin.settings.animate){
					$element.fadeIn();
				}else{
					$element.show();
				}				
			}
			
			$element.trigger('fitresize');
		}
		plugin.hiddenDimentions = function(elem, im){
			var $item = elem,
				props = { position: 'absolute', visibility: 'hidden', display: 'block' },
				dim = { width:0, height:0, innerWidth: 0, innerHeight: 0,outerWidth: 0,outerHeight: 0 },
				$hiddenParents = $item.parents().andSelf().not(':visible'),
				includeMargin = (im == null)? false : im;
		 
			var oldProps = [];
			$hiddenParents.each(function() {
				var old = {};
				for ( var name in props ) {
					old[ name ] = this.style[ name ];
					this.style[ name ] = props[ name ];
				}
				oldProps.push(old);
			});
		 
			dim.width = $item.width();
			dim.outerWidth = $item.outerWidth(includeMargin);
			dim.innerWidth = $item.innerWidth();
			dim.height = $item.height();
			dim.innerHeight = $item.innerHeight();
			dim.outerHeight = $item.outerHeight(includeMargin);
		 
			$hiddenParents.each(function(i) {
				var old = oldProps[i];
				for ( var name in props ) {
					this.style[ name ] = old[ name ];
				}
			});
		 
			return dim;
		}
		plugin.measures = function(){
		  return {
		  	width : plugin.data.width,
		  	height: plugin.data.height,
		  	marginLeft: plugin.data.marginLeft,
		  	marginTop: plugin.data.marginTop
		  }
		}
        plugin.init();
    }
    $.fn.fitme = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('fitme')) {
                var plugin = new $.fitme(this, options);
                $(this).data('fitme', plugin);
            }else{
            	$(this).data('fitme').init();
            }
        });
    }
})(jQuery);