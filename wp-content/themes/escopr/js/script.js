jQuery(function() {                   
    jQuery(window).scroll(function() {
        scrollvar();
    });
    scrollvar();
    function scrollvar(){
        var s = jQuery("#wrapper-1");
        var pos = s.position(); 
         var windowpos = jQuery(window).scrollTop();

        if (windowpos >= pos.top) {
            s.addClass("fix-search");
            // jQuery("#shiftnav-toggle-main").addClass('menostopmenu');
            // jQuery("body").addClass('menostopmenu2');
        } else {
            s.removeClass("fix-search"); 
            // jQuery("#shiftnav-toggle-main").removeClass('menostopmenu');
            // jQuery("body").removeClass('menostopmenu2');
        }
    }
  

});