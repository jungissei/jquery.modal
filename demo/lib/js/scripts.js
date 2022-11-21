// ----------------------------------------------------------------------------
// Table Of Content
//
// HamburgerMenu
// SmoothScroll
// Navi Menu Array
// ----------------------------------------------------------------------------



// ----------------------------------------------------------------------------
// HamburgerMenu
// ----------------------------------------------------------------------------
$(function(){

  // --------------------------------------
  // jQuery.Modal
  // --------------------------------------
  let $canvas = $('#hamburger_menu_canvas');

  $canvas.modal();


  // --------------------------------------
  // When Modal opened & closed
  // --------------------------------------
  $canvas.on('modal.after_open', function () {

    $('body').css('padding-right', window.innerWidth - $(window).width());

    bodyScrollLock.disableBodyScroll(
      document.querySelector('#' + $(this).attr('id') + ' .layout_inner .layout_content')
    );

  });


  $canvas.on('modal.after_close', function () {
      bodyScrollLock.enableBodyScroll(
        document.querySelector('#' + $(this).attr('id') + ' .layout_inner .layout_content')
      );

      $('body').css('padding-right', '');
    }
  );



  // --------------------------------------
  // When SmoothScroll is working
  // --------------------------------------
  $('a:not([data-smooth-scroll="false"])').on('smooth_scroll.before', function(){

    $canvas.modal('close');
  });


  // --------------------------------------
  // When Accordion Menu is working
  // --------------------------------------
  $canvas.find('.accordion_menu > .menu_item')
    .on('accordion.after_open accordion.after_close', function(){

      $canvas.modal('handle_scroll');
  });
});




// ----------------------------------------------------------------------------
// SmoothScroll
// ----------------------------------------------------------------------------
$('a:not([data-smooth-scroll="false"])').smoothScroll({
  beforeScroll: function () {

    $('a:not([data-smooth-scroll="false"])').trigger('smooth_scroll.before');
  },
});





// ----------------------------------------------------------------------------
// Navi Menu Array
// ----------------------------------------------------------------------------
