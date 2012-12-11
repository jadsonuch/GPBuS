/*
 * 	Easy Paginate 1.0 - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/
 *
 *	Copyright (c) 2011 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
var toprevx;
(function($) {
		  
	$.fn.easyPaginate = function(options){
		var defaults = {	
			limit: 6,
			step: 4,
			delay: 100,
			numeric: true,
			nextprev: true,
			auto:false,
			loop:false,
			pause:4000,
			clickstop:true,
			controls: 'pagination',
			current: 'disabled',
			randomstart: false
		}; 
		
		var options = $.extend(defaults, options); 
		var step = options.step;
		var lower, upper;
		var children = $(this).children();
		var count = children.length;
		var obj, next, prev, tonext, toprev;		
		var pages = Math.floor(count/step);
		var page = (options.randomstart) ? Math.floor(Math.random()*pages)+1 : 1;
		var timeout;
		var clicked = false;
		
		function show(){
			clearTimeout(timeout);
			lower = ((page-1) * step);
			upper = lower+step;
			
			if(page == 1){
				toprev.addClass("disabled");
				prev.addClass("disabled");
			} else {
				toprev.removeClass("disabled");
				prev.removeClass("disabled");
				
			}
			
			$(children).each(function(i){
				var child = $(this);
				child.hide();								
				if(i>=lower && i<upper){setTimeout(function(){child.fadeIn('fast')},(i-( Math.floor(i/step) * step) )*options.delay );}				
			});
			
		
			
			$('li','#'+ options.controls).removeClass(options.current);
			$('li[data-index="'+page+'"]','#'+ options.controls).addClass(options.current);
			
		};
		
		this.each(function(){ 
			
			obj = this;
			
			if(count>step){
								
				if((count/step) > pages) pages++;
				var divPagination = $("<div class='pagination pagination-mini'></div>").insertAfter(obj);
				
				var ol = $('<ul id="'+ options.controls +'"></ol>');
				ol.appendTo($("div.pagination"));
				
				if(options.nextprev){
					toprev = $('<li id="primeiro"><a>a</a></li>')
						//.hide()
						.appendTo(ol)
						.click(function(){
							clicked = true;
							page = 1;
							show();
						});
				};
				
				if(options.nextprev){
					prev = $('<li id="anterior"><a>b</a></li>')
						//.hide()
						.appendTo(ol)
						.click(function(){
							clicked = true;
							page--;
							show();
						});
					
				};
				

				
				if(options.numeric){
					for(var i=1;i<=pages;i++){
					$('<li data-index="'+ i +'"><a>'+ i +'</a></li>')
						.appendTo(ol)
						.click(function(){	
							clicked = true;
							page = $(this).attr('data-index');
							show();
						});					
					};				
				};
				
				if(options.nextprev){
					next = $('<li id="proximo"><a>c</a></li>')
						//.hide()
						.appendTo(ol)
						.click(function(){
							clicked = true;			
							page++;
							show();
						});
				};
				
				if(options.nextprev){
					tonext = $('<li id="ultimo"><a>d</a></li>')
						//.hide()
						.appendTo(ol)
						.click(function(){
							clicked = true;
							page = pages;
							show();
						});
				};
			
				show();
			};
		});	
		
	};	

})(jQuery);