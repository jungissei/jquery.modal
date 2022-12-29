// ----------------------------------------------------------------------------
// Table Of Content
//
// HamburgerMenu
// Modal
// SmoothScroll
// navi.js
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
// Modal
// ----------------------------------------------------------------------------
$('#content_dog').on('appended', function() {

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
      document.querySelector('#' + $(this).attr('id') + ' .layout_inner .layout_content')
    );

  });


  $canvas.on('modal.after_close', function () {
      bodyScrollLock.enableBodyScroll(
        document.querySelector('#' + $(this).attr('id') + ' .layout_inner .layout_content')
      );

      $('body').css('padding-right', '');

      $('#dog_content').empty();
    }
  );

  // --------------------------------------
  // When SmoothScroll is working
  // --------------------------------------
  $('a:not([data-smooth-scroll="false"])').on('smooth_scroll.before', function(){

    $canvas.modal('close');
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
// navi.js
// ----------------------------------------------------------------------------
{
  'use strict';
  let nav_modal = menu_global_array['modal'](),
      nav_git = menu_global_array['git'](),
      contents_array = organize_contents_array(
        nav_modal.concat(nav_git)
      ),
      hamburger_menu_nav_html = get_hamburger_menu_nav_html(
        contents_array,
        'accordion_menu menu_plus_minus'
      );

  if(hamburger_menu_nav_html !== ''){
    $('#nav_hamburger_menu')
      .append(hamburger_menu_nav_html)
      .trigger('appended.nav');
  }

  function get_hamburger_menu_nav_html(contents_array, ul_class){
    let li_html = '';

    $.each(contents_array, function(index, item){
      li_html += get_hamburger_menu_nav_item_html(item);
    });

    return '<ul class="' + ul_class + '">' + li_html + '</ul>';
  }
  function get_hamburger_menu_nav_item_html(item){

    let li_html = '';

    li_html += hamburger_menu_nav_item_html_start_tag(item);
    li_html += item.text;
    li_html += hamburger_menu_nav_item_html_close_tag(item);

    return li_html;
  }

  function hamburger_menu_nav_item_html_start_tag(item){

    let start_html = '';

    start_html += '<li class="menu_item">';

    if(item.url === void 0){
      start_html += '<span class="item_inner">';
    }else{
      start_html += '<a href="' + item.url + '" class="item_inner"';

      if(item.target !== void 0 && item.target === true){
        start_html += ' target="' + item.target + '"';
      }

      start_html += '>';
    }

    return start_html;
  }

  function hamburger_menu_nav_item_html_close_tag(item){

    let close_html = '';

    close_html = item.url === void 0?
      '</span>' : '</a>';


    if(item.sub_menu !== void 0 && item.sub_menu !== []){

      close_html += get_hamburger_menu_nav_html(
        item.sub_menu,
        'sub_menu'
      );
    }

    close_html += '</li>';

    return close_html;
  }
};
