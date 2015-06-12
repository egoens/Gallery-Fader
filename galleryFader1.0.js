/*
 * 	Gallery Fader 1.0 - jQuery plugin
 *	written by Erik Goens	
 *	http://corvusconceptions.com/jquery-gallery-fader
 * 
 *  Greatly inspired by 
 * 	Easy Slider 1.5 - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/4004/easy-slider-15-the-easiest-jquery-plugin-for-sliding
 *  Big up to Alen
 * 
 *	Copyright (c) 2009 Erik Goens (http://corvusconceptions.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
/*
 *	markup example for $("#eyepiece").galleryFader();
 *	
 * 	<div id="eyepiece">
 *		<ul>
 *			<li><img src="images/01.jpg" alt="" /></li>
 *			<li><img src="images/02.jpg" alt="" /></li>
 *			<li><img src="images/03.jpg" alt="" /></li>
 *			<li><img src="images/04.jpg" alt="" /></li>
 *			<li><img src="images/05.jpg" alt="" /></li>
 *		</ul>
 *	</div>
 *
 */

(function($) {
	
	$.fn.galleryFader = function(options){
		var defaults = {
			showControls: true,
			controlsBefore: '<div class="gallery_fader_controls">',
			controlsAfter: '</div>',
			prevClass: 'previous',
			prevText: 'Previous',
			nextClass: 'next',
			nextText: 'Next',
			showCount: false,
			speed: 400,
			auto: false
		};
	
		var options = $.extend(defaults, options);
	
		this.each(function() {
			var obj = $(this);
			var the_lis = $("li", obj);
			var s = the_lis.length;
			var w = the_lis.width(); 
			var h = the_lis.height();
			obj.width(w);
			obj.height(h);
			obj.css({overflow:"hidden",position:"relative"});
			var ts = s-1;
			var t = 0;
			the_lis.each(function() {
				$(this).css({position:"absolute",display:"none"});
			});
			var first_li = $("li:first", obj);
			var last_li = $("li:last",obj);
			$(first_li).show();
			$(first_li).addClass('current');
		
			$("ul", obj).css('width',w);
			
			if(options.showControls && s > 1){
				var html = options.controlsBefore;
				html += '<span class="'+ options.prevClass +'"><a href=\"javascript:void(0);\">'+ options.prevText +'</a></span>';
				if(options.showCount){
					the_lis.each(function(i,elem) {
						var item = i +1;
						html += '<a class="control_num num' + item + '" href=\"javascript:void(0);\">' + item + '</a>';
					});
				};
				html += '<span class="'+ options.nextClass +'"><a href=\"javascript:void(0);\">'+ options.nextText +'</a></span>';
				html += options.controlsAfter;
				$("ul",obj).after(html);
				$("ul",obj).next().css({position:'absolute',zIndex:s+1});
				// next
				$("span.next",obj).click(function() {
					var curr_li_index = $("li",obj).index($('li.current'));
					var curr_li = $('li',obj)[curr_li_index];
					var next_li_index = curr_li_index+1;

					$(curr_li).fadeItOut();
					var curr_a = $('a.current');
					$(curr_a).removeClass('current');
					
					if (next_li_index == s) {
						next_li_index = 0;
						$(first_li).addClass('current');
						var first_a = 'a.num' + (next_li_index + 1);
						$(first_a).addClass('current');
					} else {
						$(curr_a).next('a').addClass('current');
					}
					var show_num = $('li',obj)[next_li_index];
					setTimeout(function() {$(show_num).fadeItIn()}, options.speed);
				});
				// previous
				$("span.previous",obj).click(function() {
					var curr_li_index = $("li",obj).index($('li.current'));
					var curr_li = $('li',obj)[curr_li_index];
					var prev_li_index = curr_li_index-1;
					
					$(curr_li).fadeItOut();
					var curr_a = $('a.current');
					$(curr_a).removeClass('current');
					
					if (prev_li_index<0) { 
						prev_li_index = s-1;
						$(last_li).addClass('current');
						var last_a = 'a.num' + (prev_li_index + 1);
						$(last_a).addClass('current');
					} else {
						$(curr_a).prev('a').addClass('current');
					}
					
					var show_num = $('li',obj)[prev_li_index];
					setTimeout(function() {$(show_num).fadeItIn()}, options.speed);
				});
			};
			
			if(options.showCount) {
				$('a.control_num:first').addClass('current');
				$('.control_num', obj).click(function() {
					$('li.current',obj).fadeItOut();
					$('a.current',obj).removeClass('current');
					var show_num = Math.floor($(this).text()-1);
					var show_li = $("li", obj)[show_num];
					setTimeout(function() {$(show_li).fadeItIn()}, options.speed);
					var curr_a = $('.control_num',obj)[show_num];
					$(curr_a).addClass('current');
				});
			};
			
			jQuery.fn.fadeItOut = function() {
				$(this).removeClass('current');
				$(this).fadeOut(options.speed);
			};
			
			jQuery.fn.fadeItIn = function() {
				$(this).addClass('current');
				$(this).fadeIn(options.speed);
			};
			
		});
	};
	
})(jQuery);
