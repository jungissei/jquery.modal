// ----------------------------------------------------------------------------
// Table Of Content
//
// Modal
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Modal
// ----------------------------------------------------------------------------
$('#content_dog').on('appended', function () {

  let $canvas = $('#modal_canvas');
  $canvas.modal();

  // --------------------------------------
  // When Modal opened & closed
  // --------------------------------------
  $canvas.on('modal.before_open', function (event, click_event) {

    let $list_item = $(click_event),
      modal_content_id = $list_item.data('modal-content-id');

    $.ajax({
      url: '/jquery.common/js/template/content_list_block.json',
      type: 'GET',
      dataType: 'json',
    }).done(function (data) {

      let content = data[modal_content_id],
        name = content['name'],
        thumb = content['thumb'],
        txt = content['txt'];

      $('#dog_content').append(
        '<div class="content_thumb"><img src="/jquery.common/img/' + thumb + '" alt="' + name + '"></div>' +
        '<p class="content_name">' + name + '</p>' +
        '<p class="content_txt">' + txt + '</p>'
      );
    });
  });

  $canvas.on('modal.after_open', function () {

    $('body').css('padding-right', window.innerWidth - $(window).width());

    bodyScrollLock.disableBodyScroll(
      document.querySelector('#' + $(this).attr('id') + ' .layout_inner .layout_container')
    );

  });


  $canvas.on('modal.after_close', function () {
    bodyScrollLock.enableBodyScroll(
      document.querySelector('#' + $(this).attr('id') + ' .layout_inner .layout_container')
    );

    $('body').css('padding-right', '');

    $('#dog_content').empty();
  }
  );

  // --------------------------------------
  // When SmoothScroll is working
  // --------------------------------------
  $('a:not([data-smooth-scroll="false"])').on('smooth_scroll.before', function () {

    $canvas.modal('close');
  });

});
