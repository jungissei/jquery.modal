;(function(factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }

}(function($) {
  'use strict';

  let Modal = {};
  Modal = (function() {

    let instance_uid = 0;

    function Modal($canvas){

      let _ = this;

      _.$canvas = $($canvas);
      _.$layout_inner = _.$canvas.find('.layout_inner');
      _.$layout_content = _.$canvas.find('.layout_content');
      _.$layout_width = _.$canvas.find('.layout_width');

      _.$btn = $('[data-modal-canvas="#' + _.$canvas.attr('id') +'"]');

      _.instance_uid = instance_uid++;

      _.add_page_loaded();
      _.add_click_event_btn();
      _.add_click_event_layout_inner();
    }

    return Modal;
  }());


  Modal.prototype.add_page_loaded = function() {
    let _ = this;

    $(window).on('load.Modal',  function(){

      _.$canvas.addClass('is_preloaded');

    });
  }

  Modal.prototype.add_click_event_btn = function() {
    let _ = this,
        flag = true;

    _.$btn.on('click', function(e){

      e.preventDefault();

      if(flag == false) return;
      flag = false;
      setTimeout(function(){ flag = true; }, 500);

      _.modal_job[
        _.$canvas.hasClass('is_opened') ?
          'close' : 'open'
      ].bind(_)(this);

    });
  };


  Modal.prototype.add_click_event_layout_inner = function() {
    let _ = this,
        flag = true;

    _.$layout_inner.on('click', function(e){

      if(e.target !== e.currentTarget ||
        flag == false) return;

      flag = false;
      setTimeout(function(){ flag = true; }, 500);

      _.modal_job['close'].bind(_)();

    });
  }

  Modal.prototype.modal_job = {
    open : function() {

      let _ = this;

      _.$canvas.trigger('modal.before_open');

      _.handle_scroll();

      _.$btn.not('[data-modal-open-state-class="false"]')
        .add(_.$canvas)
        .addClass('is_opened');

      _.$canvas.trigger('modal.after_open');

    },
    close : function() {

      let _ = this;

      _.$canvas.trigger('modal.before_close');

      _.$btn.not('[data-modal-open-state-class="false"]')
        .add(_.$canvas)
        .removeClass('is_opened');

      _.handle_scroll();

      _.$canvas.trigger('modal.after_close');
    }
  }

  Modal.prototype.close = function(){

    let _ = this;

    _.modal_job['close'].bind(_)();
  }


  Modal.prototype.scroll_job = {
    enable : function() {

      let _ = this;

      _.$canvas
        .addClass('is_scrollable');

      let canvas_padding_right = parseInt(_.$layout_content.css('padding-right')),
          layout_content_inner_width = parseInt(_.$layout_content.innerWidth()),
          layout_content_client_width = parseInt(_.$layout_content.get(0).clientWidth),
          scroll_bar_width = layout_content_inner_width - layout_content_client_width;

      _.$layout_content.css('padding-right', canvas_padding_right + scroll_bar_width)
    },
    disable : function() {

      let _ = this;

      _.$canvas
        .removeClass('is_scrollable')
        .css('padding-right', '');
    }
  }



  Modal.prototype.handle_scroll = function(){

    let _ = this,
        layout_content_height = parseInt(_.$layout_content.height()),
        layout_width_height = parseInt(_.$layout_width.height()),
        this_scroll_job = layout_content_height <= layout_width_height?
          'enable' : 'disable' ;

    _.scroll_job[this_scroll_job].bind(_)();
  }


  $.fn.modal = function(){

    let _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;

    for (i = 0; i < l; i++) {

      if (typeof opt == 'object' || typeof opt == 'undefined'){

        _[i].modal = new Modal(_[i]);

      }else{

        ret = _[i].modal[opt].apply(_[i].modal, args);

        if (typeof ret != 'undefined') return ret;
      }
    };

    return _;
  };
}));
