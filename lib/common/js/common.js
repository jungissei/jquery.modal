/**
 * ハンバーガーメニュー開く時
 */
$('a[href="#hm_canvas"]')
  .on('hamburger_menu_after_open', function(){

  bodyScrollLock.disableBodyScroll(
    document.querySelector(
      '#hm_canvas .canvas_body'
    )
  );
});

/**
 * ハンバーガーメニュー閉じる時
 */
$('a[href="#hm_canvas"], #hm_canvas .canvas_off, #hm_canvas .canvas_body a')
  .on('hamburger_menu_after_close', function(){

  bodyScrollLock.enableBodyScroll(
    document.querySelector(
      '#hm_canvas .canvas_body'
    )
  );
});


/**
 * スムーススクロール
 */
$('a:not(.exc_smooth_scroll)').smoothScroll({beforeScroll: function(){

  $('#hm_canvas').hamburger_menu('close', '#hm_canvas .canvas_body a');
}});
