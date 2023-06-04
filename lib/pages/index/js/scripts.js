// ============================================================================
// Modal
// ============================================================================

$(window).on('load', modal_dog);

function modal_dog() {
  let $open_btn = $('[data-modal-open="modal_dog"]'),
    $canvas = $('#modal_dog');

  $open_btn.modal();

  $open_btn.on('click', function () {

    if ($canvas.find('#modal_ttl_dog1').length > 0) return;

    let json_path = '/jquery.common/js/template/content_list_block.json',
      modal_index = $(this).data('modal-index');

    $.ajax({
      url: json_path,
      type: 'GET',
      dataType: 'json'
    }).done(function (data_items) {

      let data_item = data_items[modal_index],
        name = data_item.name,
        thumb = data_item.thumb,
        txt = data_item.txt;

      $('#modal_block_dog1 .modal_content').append(`
        <div class="block_thumb">
          <img
            src="/jquery.common/img/${thumb}"
            alt=""
            width="640"
            height="426"
            decoding="async"
            loading="lazy"
          />
        </div>
        <h2 id="modal_ttl_dog1" class="block_ttl">${name}</h2>
        <p class="block_txt">${txt}</p>
      `);

    });
  });

  $canvas.on('modal.after_open', function () {

    $('body').css('padding-right', window.innerWidth - $(window).width());

    bodyScrollLock.disableBodyScroll(
      document.querySelector('#modal_block_dog1 .simplebar-content-wrapper')
    );

  });


  $canvas.on('modal.after_close', function () {
    bodyScrollLock.enableBodyScroll(
      document.querySelector('#modal_block_dog1 .simplebar-content-wrapper')
    );

    $('body').css('padding-right', '');
  });
}
