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
      _.$close_btn = _.$canvas.find('[data-modal-close]');
      _.$modal = _.$canvas.find('[role="dialog"]');
      _.instance_uid = instance_uid++;

      _.init();
    }

    return Modal;
  }());

  // ============================================================================
  // Table Of Content
  //
  // 初期化関連
  // イベント関連
  //   ページ読み込み時
  //   [data-modal-open]属性を持つ要素をクリック時
  //   [data-modal-close]属性を持つ要素をクリック時
  //   [data-modal-close-bg]属性を持つ要素をクリック時
  //   「Escape」キー押下時
  // 機能関連
  //  モーダル開閉
  //  スクロール関連
  //    スクロール有効無効
  //    スクロール有効無効の判定
  //  CSSアニメーション防止
  // ============================================================================


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
    _.esc_close();
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

      _.modal_job['open'].bind(_)();
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
   * [data-modal-close-bg]属性を持つ要素をクリック時
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
  Modal.prototype.esc_close = function () {
    let _ = this;

    $(window).keyup(function (e) {

      if (e.key === 'Escape' &&
        _.$canvas.attr('aria-hidden') === 'false') {

        _.modal_job['close'].bind(_)();
      }
    });
  }







  // ============================================================================
  // 機能関連
  // ============================================================================
  /**
   * モーダル開閉
   */
  Modal.prototype.modal_job = {
    open: function (click_event) {

      let _ = this;

      _.$canvas.trigger('modal.before_open', click_event);

      _.scroll_job['enable'].bind(_)();
      _.$canvas.attr('aria-hidden', false);

      _.$canvas.trigger('modal.after_open', click_event);
    },
    close: function (click_event) {

      let _ = this;

      _.$canvas.trigger('modal.before_close', click_event);

      _.$canvas.attr('aria-hidden', true);
      _.scroll_job['disable'].bind(_)();

      _.$canvas.trigger('modal.after_close', click_event);
    }
  }


  Modal.prototype.close = function () {

    let _ = this;

    _.modal_job['close'].bind(_)();
  }


  // ----------------------------------------------------------------------------
  // スクロール関連
  // ----------------------------------------------------------------------------
  /**
   * スクロール有効無効
   */
  Modal.prototype.scroll_job = {
    enable: function () {

      let _ = this,
        modal_height = parseInt(_.$modal.height()),
        window_height = (parseInt($(window).height()) - 60);

      if (modal_height > window_height) {

        _.$modal
          .css({
            'overflow-y': 'scroll',
            'max-height': navigator.userAgent.match(/iPhone/i) && navigator.userAgent.match(/Safari/i) ?
              'calc(100svh - 60px)' : 'calc(100vh - 60px)'
          })
          .addClass('is_scrollable');
      }
    },
    disable: function () {

      let _ = this;

      if (_.$modal.hasClass('is_scrollable')) {

        _.$modal
          .css({
            'overflow-y': '',
            'max-height': ''
          })
          .removeClass('is_scrollable');
      }
    }
  }


  // ----------------------------------------------------------------------------
  // CSSアニメーション防止
  // ----------------------------------------------------------------------------
  Modal.prototype.prevent_css_animation = function () {
    let _ = this;

    _.$canvas.addClass('is_preloaded');
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
