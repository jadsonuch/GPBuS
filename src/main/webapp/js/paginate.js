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
		var timeout;
		var clicked = false;
		
		function init(){
			$(children).each(function(i){
				var child = $(this);
				child.hide();								
				//if(i>=lower && i<upper){setTimeout(function(){child.fadeIn('fast')},(i-( Math.floor(i/step) * step) )*options.delay );}				
			});
		};

		
		function show(){			
			//clearTimeout(timeout);
			//var childs = $(this).children();
			console.log("page novo valor: "+page+" oldPage: " + oldPage);
			lower = ((oldPage-1) * step);
			upper = lower+step;
			console.log("limpando de "+lower+" ate " + upper);
			for(var i=lower;i<=upper;i++){
				var pos = $(children.get(i));
				pos.hide();
			}
			
			lower = ((page-1) * step);
			upper = lower+step;
			console.log("criando de "+lower+" ate " + upper);
			for(var i=lower;i<=upper;i++){
				var pos = $(children.get(i));
				pos.fadeIn('fast');
			}
			
			$('li[data-index="'+oldPage+'"]').removeClass('disabled');						
			$('li[data-index="'+page+'"]').addClass('disabled');
			oldPage = page;
		};
		
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
			
				show();
			}
		});

	};
	
})(jQuery);