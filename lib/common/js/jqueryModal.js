// ============================================================================
// Table Of Content
//
// 機能関連
//  モーダル関連
//    モーダル開閉関連
//    モーダル閉じる
//  開くボタンにクラス付与、削除
//  フォーカス関連
//    フォーカスループさせる
//    Tabbableな最初の要素にフォーカス
//    開くボタンにフォーカス
//  CSSアニメーション防止
// 初期化関連
// イベント関連
//   ページ読み込み時
//   [data-modal-open]属性を持つ要素をクリック時
//   [data-modal-close]属性を持つ要素をクリック時
//   _.$canvas背景要素をターゲットとしてクリックした時
//   「Escape」キー押下時
//   「Tab」キー押下時
//   先頭のフォーカストラップ要素[data-modal-focus-trap-first]にフォーカスされた時
//   最後のフォーカストラップ要素[data-modal-focus-trap-last]にフォーカスされた時
//   モーダルが開いた直後
//   モーダルが閉じた直後
// ============================================================================


; (function (factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }

}(function ($) {
  'use strict';

  let Modal = {};
  Modal = (function () {

    let instance_uid = 0;

    function Modal(btn_html) {

      let _ = this;

      _.$open_btn = $(btn_html);
      _.$canvas = $('#' + _.$open_btn.data('modal-open'));
      _.$canvas_tabbable = _.$canvas
        .find('[tabindex], a, button, :input, [contenteditable=true]')
        .not('[tabindex=-1], :disabled, [data-modal-focus-trap-first], [data-modal-focus-trap-last]');
      _.$canvas_focus_trap_first = _.$canvas.find('[data-modal-focus-trap-first]');
      _.$canvas_focus_trap_last = _.$canvas.find('[data-modal-focus-trap-last]');
      _.$close_btn = _.$canvas.find('[data-modal-close]');
      _.$modal = _.$canvas.find('[role="dialog"]');
      _.instance_uid = instance_uid++;

      _.init();
    }

    return Modal;
  }());


  // ============================================================================
  // 機能関連
  // ============================================================================

  // ----------------------------------------------------------------------------
  // モーダル関連
  // ----------------------------------------------------------------------------
  /**
   * モーダル開閉関連
   */
  Modal.prototype.modal_job = {
    open: function ($clicked_opened_btn) {

      let _ = this;

      _.$canvas.trigger('modal.before_open', $clicked_opened_btn);

      _.$canvas.attr('aria-hidden', false);

      _.$canvas.trigger('modal.after_open', $clicked_opened_btn);
    },
    close: function () {

      let _ = this;

      _.$canvas.trigger('modal.before_close');

      _.$canvas.attr('aria-hidden', true);

      _.$canvas.trigger('modal.after_close');
    }
  }

  /**
   * モーダル閉じる
   */
  Modal.prototype.close = function () {

    let _ = this;

    _.modal_job['close'].bind(_)();
  }

  // ----------------------------------------------------------------------------
  // 開くボタンにクラス付与、削除
  // ----------------------------------------------------------------------------
  Modal.prototype.toggle_open_btn = {
    open: function ($clicked_opened_btn) {

      $clicked_opened_btn.addClass('is_open');
    },
    close: function () {

      let _ = this;

      _.$open_btn.each(function () {

        if ($(this).hasClass('is_open')) {

          $(this).removeClass('is_open');
        }
      });
    }
  }


  // ----------------------------------------------------------------------------
  // フォーカス関連
  // ----------------------------------------------------------------------------
  /**
   * フォーカスループさせる
   */
  Modal.prototype.focus_loop = {
    first: function () {

      let _ = this;

      _.$canvas_tabbable.eq(0).trigger('focus');
    },
    last: function () {

      let _ = this;

      _.$canvas_tabbable.eq(-1).trigger('focus');
    }
  }

  /**
   * Tabbableな最初の要素にフォーカス
   */
  Modal.prototype.focus_first = function () {

    let _ = this;

    _.focus_loop['first'].bind(_)();
  }

  /**
   * 開くボタンにフォーカス
   */
  Modal.prototype.focus_open_btn = function () {

    let _ = this;

    _.$open_btn.each(function () {

      if ($(this).hasClass('is_open')) {

        $(this).trigger('focus');
      }
    });
  }


  // ----------------------------------------------------------------------------
  // CSSアニメーション防止
  // ----------------------------------------------------------------------------
  Modal.prototype.prevent_css_animation = function () {
    let _ = this;

    _.$canvas.addClass('is_preloaded');
  }



  // ============================================================================
  // 初期化関連
  // ============================================================================
  Modal.prototype.init = function () {

    let _ = this;

    // 機能関連
    _.prevent_css_animation();

    // イベント関連
    _.add_page_load_event();
    _.add_modal_open_event();
    _.add_modal_close_event();
    _.add_modal_close_bg_event();
    _.press_down_esc();
    _.press_down_tab();
    _.focus_trap_first();
    _.focus_trap_last();
    _.after_open();
    _.after_close();
  }


  // ============================================================================
  // イベント関連
  // ============================================================================
  /**
   * ページ読み込み時
   */
  Modal.prototype.add_page_load_event = function () {
    let _ = this;

    $(window).on('load.Modal', function () {

      _.prevent_css_animation();
    });
  }

  /**
   * [data-modal-open]属性を持つ要素をクリック時
   */
  Modal.prototype.add_modal_open_event = function () {

    let _ = this,
      flag = true;

    _.$open_btn.on('click', function (e) {

      e.preventDefault();

      if (flag === false) return;
      flag = false;
      setTimeout(function () { flag = true; }, 500);

      _.modal_job['open'].bind(_)($(e.target));
    });
  };

  /**
   * [data-modal-close]属性を持つ要素をクリック時
   */
  Modal.prototype.add_modal_close_event = function () {
    let _ = this,
      flag = true;

    _.$close_btn.on('click', function (e) {

      e.preventDefault();

      if (flag === false) return;
      flag = false;
      setTimeout(function () { flag = true; }, 500);

      _.modal_job['close'].bind(_)();
    });
  }

  /**
   * _.$canvas背景要素をターゲットとしてクリックした時
   */
  Modal.prototype.add_modal_close_bg_event = function () {
    let _ = this,
      flag = true;

    _.$canvas.on('click', function (e) {

      e.preventDefault();

      if (flag === false) return;
      flag = false;
      setTimeout(function () { flag = true; }, 500);

      if ($(e.target).closest('[role="dialog"]').length === 0) {

        _.modal_job['close'].bind(_)();
      }
    });
  }

  /**
   * 「Escape」キー押下時
   */
  Modal.prototype.press_down_esc = function () {
    let _ = this;

    $(window).keyup(function (e) {

      if (e.key === 'Escape' &&
        _.$canvas.attr('aria-hidden') === 'false') {

        _.modal_job['close'].bind(_)();
      }
    });
  }

  /**
   * 「Tab」キー押下時
   */
  Modal.prototype.press_down_tab = function () {
    let _ = this;

    $(window).keyup(function (e) {

      if (e.key === 'Tab' &&
        _.$canvas.attr('aria-hidden') === 'false' &&
        $(e.target).closest('[role="dialog"]').length === 0) {

        _.focus_first.bind(_)();
      }
    });
  }

  /**
   * 先頭のフォーカストラップ要素[data-modal-focus-trap-first]にフォーカスされた時
   */
  Modal.prototype.focus_trap_first = function () {
    let _ = this;

    _.$canvas_focus_trap_first.on('focus', function () {

      _.focus_loop['last'].bind(_)();
    });
  }

  /**
   * 最後のフォーカストラップ要素[data-modal-focus-trap-last]にフォーカスされた時
   */
  Modal.prototype.focus_trap_last = function () {
    let _ = this;

    _.$canvas_focus_trap_last.on('focus', function () {

      _.focus_loop['first'].bind(_)();
    });
  }


  /**
   * モーダルが開いた直後
   */
  Modal.prototype.after_open = function () {
    let _ = this;

    _.$canvas.on('modal.after_open', function (e, $clicked_opened_btn) {

      _.toggle_open_btn['open'].bind(_)($($clicked_opened_btn));
    });
  }



  /**
   * モーダルが閉じた直後
   */
  Modal.prototype.after_close = function () {
    let _ = this;

    _.$canvas.on('modal.after_close', function () {

      _.focus_open_btn.bind(_)();
      _.toggle_open_btn['close'].bind(_)();

      _.$opened_btn = {};
    });
  }




  $.fn.modal = function () {

    let _ = this,
      opt = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      l = _.length,
      i,
      ret;

    for (i = 0; i < l; i++) {

      if (typeof opt == 'object' || typeof opt == 'undefined') {

        _[i].modal = new Modal(_[i]);

      } else {

        ret = _[i].modal[opt].apply(_[i].modal, args);

        if (typeof ret != 'undefined') return ret;
      }
    };

    return _;
  };
}));
