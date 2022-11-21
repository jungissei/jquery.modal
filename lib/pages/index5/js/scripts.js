/**
 * Fixed position Hamburger Menu Button when horizontal scroll
 */
$(function(){
  let btn = $('header .hamburger_menu_btn'),
      container_min_width = parseInt($('html').css('min-width')),
      origin_btn_offset_left = btn.offset().left;

  $(window).on('scroll', function (){
    if(window.matchMedia( '(max-width: 767px)' ).matches){

      btn.css('left', '');

    }else{

      let window_width = $(window).width(),
          side_width = window_width - container_min_width,
          css_left_value = origin_btn_offset_left - $(window).scrollLeft();

          console.log($(window).scrollLeft());
          // btn.css('left', css_left_value);
    }
  });
});
