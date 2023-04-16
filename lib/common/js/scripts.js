// ----------------------------------------------------------------------------
// Table Of Content
//
// Modal
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Modal
// ----------------------------------------------------------------------------
$(function () {

  let modal_open = $('[data-modal-open="modal_dog"]'),
    $canvas = $('#modal_dog');

  modal_open.modal();

  // --------------------------------------
  // When Modal opened & closed
  // --------------------------------------
  $canvas.on('modal.after_open', function () {

    $('body').css('padding-right', window.innerWidth - $(window).width());

    bodyScrollLock.disableBodyScroll(
      document.querySelector('#modal_block_dog1')
    );

  });


  $canvas.on('modal.after_close', function () {
    bodyScrollLock.enableBodyScroll(
      document.querySelector('#' + $(this).attr('id') + ' .layout_inner .layout_container')
    );

    $('body').css('padding-right', '');
  }
  );

});
