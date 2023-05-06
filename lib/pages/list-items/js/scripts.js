// ============================================================================
// Table Of Content
//
// Jsonから一覧HTML追加
// Modal
// ============================================================================

// ============================================================================
// Jsonから一覧HTML追加
// ============================================================================
$(function () {
  let $items = $('#dog_items'),
    json_path = '/jquery.common/js/template/content_list_block.json';

  $.ajax({
    url: json_path,
    type: 'GET',
    dataType: 'json'
  }).done(function (data_items) {
    append_dog_card.bind($items)(data_items);
  });
});

function append_dog_card(data_items) {

  let $items = $(this),
    arr_items = [],
    while_num = 0;

  $.each(data_items, function (i, data_item) {
    let name = data_item.name,
      thumb = data_item.thumb;

    arr_items.push(`
      <div class="content_item">
        <div class="item_card">
          <div class="card_thumb">
            <img
              src="/jquery.common/img/${thumb}"
              alt=""
              width="640"
              height="426"
              decoding="async"
              loading="lazy"
            />
          </div>
          <button class="card_ttl" data-modal-open="modal_dog" data-modal-index="${i}">${name}</button>
        </div>
      </div>
    `);
  });

  $items.hide()
    .append($(arr_items.join('')));

  while (true) {
    if ($items.find('content_item')) {

      $items.trigger('appended')
        .show();
      break;
    }

    while_num++;
  }
}

// ============================================================================
// Modal
// ============================================================================

$('#dog_items').on('appended', modal_dog);

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
          >
        </div>
        <h2 id="modal_ttl_dog1" class="block_ttl">${name}</h2>
        <p id="modal_desc_dog1" class="block_txt">${txt}</p>
      `);

    });
  });

  $canvas.on('modal.after_open', function () {

    $('body').css('padding-right', window.innerWidth - $(window).width());

    bodyScrollLock.disableBodyScroll(
      document.querySelector('#modal_block_dog1')
    );

  });


  $canvas.on('modal.after_close', function () {
    bodyScrollLock.enableBodyScroll(
      document.querySelector('#modal_block_dog1')
    );

    $('#modal_block_dog1 .modal_content').empty();

    $('body').css('padding-right', '');
  });
}
