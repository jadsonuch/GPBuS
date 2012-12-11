/*
 * 	superEasy Paginate 0.1 - jQuery plugin
 *	written by Jadson	
 *
 *	Copyright (c) 2012 Jadson 
 *  
 *	Built for jQuery library to work with BootStrap pagination
 *	http://jquery.com
 *
 */
(function($) {
	
	$.fn.paginate = function(options){
		var defaults = {
			step: 10			
		};
		
		var options = $.extend(defaults, options); 
		var lower;
		var upper;		
		var children = $(this).children();
		var count = children.length;
		var step = options.step;
		var obj;
		var pages = Math.floor(count/step);
		var page = 1;
		var oldPage = 1;
		var clicked = false;
		
		function init(){
			$(children).each(function(i){
				var child = $(this);
				child.hide();											
			});
		};
		
		function show(){			
			console.log("page novo valor: "+page+" oldPage: " + oldPage);
			lower = ((oldPage-1) * step);
			upper = lower+step;
			//console.log("limpando de "+lower+" ate " + upper);
			for(var i=lower;i<=upper;i++){
				var pos = $(children.get(i));
				pos.hide();
			}
			
			lower = ((page-1) * step);
			upper = lower+step;
			//console.log("criando de "+lower+" ate " + upper);
			for(var i=lower;i<=upper;i++){
				var pos = $(children.get(i));
				pos.fadeIn('fast');
			}
			
			$('li[data-index="'+oldPage+'"]').removeClass('disabled');						
			$('li[data-index="'+page+'"]').addClass('disabled');
			
			console.log("clicked"+clicked);
			console.log("pages"+pages);
			if(clicked && pages>5){
				rebuildPaginator(page);
			}
			oldPage = page;
		};
		
		function rebuildPaginator(x){
			var elements = $('#anterior').nextUntil('#proximo');
			var auxPageMin = 0;
			var auxPageMax = 0;
			if( (x - 2) < 1){
				auxPageMin = 1;
				auxPageMax = 5;
			}else if( (parseInt(x) + 2) > pages){
				auxPageMax = pages;
				auxPageMin = pages - 5;
			}else{
				auxPageMin = parseInt(x) - 2;
				auxPageMax = parseInt(x) + 2;
			}			
			//console.log("auxPageMin/auxPageMax -> "+ auxPageMin + "/" + auxPageMax);
			elements.hide();
			for(var i=auxPageMin;i<=auxPageMax;i++){
				$('li[data-index="'+i+'"]').fadeIn('fast');							
			}		
			
		}
		
		
		this.each(function(){ 
			
			init();
			
			obj = this;
			if(count>step){							
				if((count/step) > pages) pages++;
				var divPagination = $("<div class='pagination pagination-mini'></div>").insertAfter(obj);				
				var ol = $('<ul id="'+ options.controls +'"></ol>');
				ol.appendTo($("div.pagination"));
				
				$('<li id="primeiro"><a>a</a></li>').appendTo(ol).
						click(function(){
							if(page != 1){								
								clicked = true;
								page = 1;
								show();
							}
						});
				
				$('<li id="anterior"><a>b</a></li>')
						.appendTo(ol)
						.click(function(){
							if(page != 1){
								clicked = true;
								page--;
								show();
							}
						});
			
				for(var i=1;i<=pages;i++){
					$('<li data-index="'+ i +'"><a>'+ i +'</a></li>')
						.appendTo(ol)
						.click(function(){	
							clicked = true;
							page = $(this).attr('data-index');
							show();
						});										
				}						
				$('<li id="proximo"><a>c</a></li>')
						.appendTo(ol)
						.click(function(){
							if(page != pages){
								clicked = true;			
								page++;
								show();
							}
						});
				$('<li id="ultimo"><a>d</a></li>')
						.appendTo(ol)
						.click(function(){
							if(page != pages){
								clicked = true;
								page = pages;
								show();
							}
						});
				
				if(pages>5){
					var elements = $('#anterior').nextUntil('#proximo');
					elements.hide();					
					rebuildPaginator(1);									
				}
				show();
			}
		});
	};	
})(jQuery);