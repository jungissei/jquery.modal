// ----------------------------------------------------------------------------
// HamburgerMenu
// ----------------------------------------------------------------------------

$('#hamburger_menu_canvas').hamburger_menu();

/**
 * Job when menu opened
 */
$('#hamburger_menu_canvas').on('hamburger_menu_after_open', function () {

  bodyScrollLock.disableBodyScroll(
    document.querySelector('#hamburger_menu_canvas .canvas_body')
  );
});

/**
 * Job when menu closed
 */
$('#hamburger_menu_canvas').on('hamburger_menu_after_close', function () {
    bodyScrollLock.enableBodyScroll(
      document.querySelector('#hamburger_menu_canvas .canvas_body')
    );
  }
);

/**
 * Job when smooth scrolling is working
 */
$('a:not([data-smooth-scroll="false"])').on('before_smooth_scroll', function(){

  $('#hamburger_menu_canvas').hamburger_menu('close');
});



// ----------------------------------------------------------------------------
// smoothScroll
// ----------------------------------------------------------------------------
$('a:not([data-smooth-scroll="false"])').smoothScroll({
  beforeScroll: function () {

    $('a:not([data-smooth-scroll="false"])').trigger('before_smooth_scroll');
  },
});


