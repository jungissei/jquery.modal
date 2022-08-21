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

  let HamburgerMenu = {};
  HamburgerMenu = (function() {

    let instance_uid = 0;

    function HamburgerMenu($hm_canvas){

      let _ = this;

      _.$hm_canvas = $($hm_canvas);

      _.instance_uid = instance_uid++;


      _.hamburger_menu();
    }

    return HamburgerMenu;
  }());



  /** ----------------------------------------------------------------------------
   * hamburger menu
   *----------------------------------------------------------------------------*/
  HamburgerMenu.prototype.hamburger_menu = function() {
    let _ = this;

    _.$hm_canvas.addClass('is_preloaded');

    _.management_hamburger_menu();

  };

  HamburgerMenu.prototype.management_hamburger_menu = function() {
    let _ = this,
        flag = true;

    $('a[href="#' + _.$hm_canvas.attr('id') +'"]')
      .add(_.$hm_canvas.find('.canvas_off'))
        .on('click', function(e){

          e.preventDefault();

          if(flag == false) return;
          flag = false;
          setTimeout(function(){ flag = true; }, 500);

          _.hamburger_menu_job[
            _.$hm_canvas.hasClass('is_opened') ? 'close' : 'open'
          ].bind(_)(this);

    });

  };

  HamburgerMenu.prototype.hamburger_menu_job = {
    open : function(event_obj) {
      let _ = this;

      $(event_obj).trigger('hamburger_menu_before_open');

      $('a[href="#' + _.$hm_canvas.attr('id') +'"]')
        .add(_.$hm_canvas)
        .addClass('is_opened');

      $(event_obj).trigger('hamburger_menu_after_open');

    },
    close : function(event_obj) {
      let _ = this;

      $(event_obj).trigger('hamburger_menu_before_close');

      $('a[href="#' + _.$hm_canvas.attr('id') +'"]')
        .add(_.$hm_canvas)
        .removeClass('is_opened');

      $(event_obj).trigger('hamburger_menu_after_close');
    },
  }

  HamburgerMenu.prototype.close = function(event_obj){
    let _ = this;

    _.hamburger_menu_job['close'].bind(_)(event_obj);
  }


  /** ----------------------------------------------------------------------------
   * plugin
   *----------------------------------------------------------------------------*/
  $.fn.hamburger_menu = function(){

    let _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;

    for (i = 0; i < l; i++) {

      if (typeof opt == 'object' || typeof opt == 'undefined'){

        // Initialize the plugin
        _[i].hamburger_menu = new HamburgerMenu(_[i]);

      }else{

        // Call method on the plugin instance
        ret = _[i].hamburger_menu[opt].apply(_[i].hamburger_menu, args);

        // When method has return job, return it
        if (typeof ret != 'undefined') return ret;
      }
    };

    // options object
    return _;
  };
}));
