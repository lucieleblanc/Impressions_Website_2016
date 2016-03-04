(function($) {

	$.galleryscroller = function(element, options) {

		var defaults = {
			fps: 1000,
			vertical: false,
			speed: 6,
			auto: true,
			debug: false
		};

		var plugin = this;
		plugin.settings = {};
		plugin.inited = false;

		var $element = $(element),
		delta = 0,
		total_dim = 0,
		drag_start_position = null,
		drag_current_position = null,
		animation_frame = null;

		function get_total_dim() {
			var t;
			if (plugin.settings.vertical) {
				t = $('.gallery.list', $element).outerHeight(true);
			} else {
				t = 0;
				$('.gallery.list > li', $element).each(function () {
					t += $(this).outerWidth(true);
				});
			}
			return t;
		}
		function get_absolute_delta(ev) {
			var ad;
			if (plugin.settings.vertical) {
				ad = drag_start_position - ev.pageY;
			} else {
				ad = drag_start_position - ev.pageX;
			}

			return ad;
		}
		function get_relative_delta(ev, el) {
			var c, t;
			if (plugin.settings.vertical) {
				c = ev.pageY - el.offset().top;
				t = el.outerHeight() / 2;
			} else {
				c = ev.pageX - el.offset().left;
				t = el.outerWidth() / 2;
			}
			return (c - t) / t;
		}
		function get_current() {
			if (plugin.settings.vertical) {
				return $element.scrollTop();
			} else {
				return $element.scrollLeft();
			}
		}
		function get_next(d) {
			return get_current() + d  * plugin.settings.speed;
		}
		function is_touch_device() {
		  return !!('ontouchstart' in window) // works on most browsers
		      || !!('onmsgesturechange' in window); // works on ie10
		};
		function duplicate() {
			var e = $('.gallery.list > li', $element).clone();
			$('.gallery.list', $element).append(e);
		}
		plugin.log = function () {
			if (plugin.settings.debug !== false) {
				for (var i = 0; i < arguments.length; i++) {
					plugin.log(arguments[i]);
				}
			}
		};
		plugin.init = function () {
			if (!plugin.inited) {
				plugin.settings = $.extend({}, defaults, options);

				var da = navigator.userAgent.toLowerCase();
				plugin.isTouch = is_touch_device();
				console.log(plugin.isTouch);

				$element.one('scroller.loaded', function () {
					plugin.register();
					if (plugin.settings.auto) {
						plugin.auto();
					}
				});

				plugin.preload();
				plugin.inited = true;
			}
		};

		plugin.preload = function () {

			var images_total = $('.gallery.list img', $element).size(),
				images_loaded = 0;

			$('.gallery.list', $element).hide();

			$('.gallery.list img', $element).one('load', function () {
				images_loaded++;
				if (images_loaded === images_total) {
					$element.trigger('scroller.loaded');
				}
				plugin.log(images_loaded, images_total);
			}).each(function () {
				if (this.complete || ($.browser.msie)) {
					var s = $(this).attr('src');
					$(this).attr('src', s);
				}
			});
		};

		plugin.register = function () {

			// for infinite scrolling
			duplicate();


			$('.gallery.list', $element).fadeIn();
			total_dim = get_total_dim();

			$('.gallery.list').css({'width': total_dim});

			$element.on('scroller.start', function () {
				plugin.start();
			}).on('scroller.stop', function () {
				plugin.stop();
			}).on('scroller.delta', function (e, d) {
				delta = parseFloat(d, 10);
			}).on('scroller.dragstart', function (e, d) {
				plugin.dragstart(d);
			}).on('scroller.dragstop', function (e, d) {
				plugin.dragstop(d);
			}).on('scroller.drag', function (e, d) {
				// update current and start
				if (plugin.settings.vertical) {
					drag_current_position = d.pageY;
				} else {
					drag_current_position = d.pageY;
				}
			});


			if (plugin.isTouch) {
				plugin.settings.speed *= 2;
				$element.bind('touchstart', function (e) {

					$element.trigger('scroller.start');

					$(this).bind('touchmove', function (e) {
						e.preventDefault();
						var t, d;
						t = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
						d = get_relative_delta(t, $(this));

						$element.trigger('scroller.delta', d);
					});
				}).bind('touchend', function () {
					$element.trigger('scroller.stop');
					$(this).unbind('touchmove');
				});

			} else {
				$element.bind('mouseenter', function () {
					$element.trigger('scroller.start');
					$(this).mousemove(function (e) {
						var d = get_relative_delta(e, $(this));
						$element.trigger('scroller.delta', d);
					});
				}).bind('mouseleave', function () {
					$element.trigger('scroller.stop');
					$(this).unbind('mousemove');
				});
			}
		};
		/* SCROLL for mouse devices */
		plugin.start = function () {
			window.cancelAnimationFrame(animation_frame);
			animation_frame = window.requestAnimationFrame(plugin.move);
		};
		plugin.move = function () {
			var n = get_next(delta),
				fix = plugin.settings.vertical ? 0 : 0,
				rw =  total_dim / 2 + fix,
				dn = n;

			if (n < 0) {
				dn = rw;
			}
			if (n > rw) {
				dn = 0;
			}
			n = dn;

			if (parseFloat(delta) !== 0) {
				if (plugin.settings.vertical) {
					$element.scrollTop(n);
				} else {
					$element.scrollLeft(n);
				}
			}
			animation_frame = window.requestAnimationFrame(plugin.move);
		};
		plugin.stop = function () {
			window.cancelAnimationFrame(animation_frame);
		};

		plugin.auto = function () {
			delta = .25;
			plugin.start();
		};

		plugin.init();
	};
	$.fn.galleryscroller = function (options) {
		return this.each(function () {
			if (undefined == $(this).data('galleryscroller')) {
				var plugin = new $.galleryscroller(this, options);
				$(this).data('galleryscroller', plugin);
			} else {
				$(this).data('galleryscroller').init();
			}
		});
	};
})(jQuery);
