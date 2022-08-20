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
$('a[href="#hm_canvas"], #hm_canvas .canvas_off')
  .on('hamburger_menu_after_close', function(){

  bodyScrollLock.enableBodyScroll(
    document.querySelector(
      '#hm_canvas .canvas_body'
    )
  );
});
