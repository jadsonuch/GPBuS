
(function($){
	  $.fn.definirAtivo = function(){
	    // in your code, the `this` is pointing to
	    // jQuery object, you can't access `id` attribute
	    // with dot. You need to either access first element
	    // in jQuery object (`this[ 0 ]`) or use this.attr('id')
		$(this).addClass($(this).attr('class-toggle'));
		$(this).addClass('active');
	  };
})(jQuery);

$('.btn-group > .btn, .btn[data-toggle="button"]').click(function() {	
    if ($(this).attr('class-toggle') != undefined && !$(this).hasClass('disabled')) {
        var btnGroup = $(this).parent('.btn-group');

        if (btnGroup.attr('data-toggle') == 'buttons-radio') {
            btnGroup.find('.btn').each(function() {
                $(this).removeClass($(this).attr('class-toggle'));
            });
            $(this).addClass($(this).attr('class-toggle'));
        }

        if (btnGroup.attr('data-toggle') == 'buttons-checkbox' || $(this).attr('data-toggle') == 'button') {
            if ($(this).hasClass('active')) {
                $(this).removeClass($(this).attr('class-toggle'));
            } else {
                $(this).addClass($(this).attr('class-toggle'));
            }
        }
    }
    
});