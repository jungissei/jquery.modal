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

    function HamburgerMenu($canvas){

      let _ = this;

      _.$canvas = $($canvas);
      _.$btn = $('[data-hamburger-menu-canvas="#' + _.$canvas.attr('id') +'"]');

      _.instance_uid = instance_uid++;

      _.add_page_loaded();
      _.add_click_event();
    }

    return HamburgerMenu;
  }());


  HamburgerMenu.prototype.add_page_loaded = function() {
    let _ = this;

    $(window).on('load.HamburgerMenu',  function(){
      _.$canvas.addClass('is_preloaded');
    });
  }

  HamburgerMenu.prototype.add_click_event = function() {
    let _ = this,
        flag = true;

    _.$btn.add(_.$canvas.find('.canvas_off'))
        .on('click', function(e){

          e.preventDefault();

          if(flag == false) return;
          flag = false;
          setTimeout(function(){ flag = true; }, 500);

          _.hamburger_menu_job[
            _.$canvas.hasClass('is_opened') ? 'close' : 'open'
          ].bind(_)(this);

    });
  };

  HamburgerMenu.prototype.hamburger_menu_job = {
    open : function() {
      let _ = this;

      _.$canvas.trigger('hamburger_menu_before_open');

      _.$btn.add(_.$canvas)
        .addClass('is_opened');

      _.$canvas.trigger('hamburger_menu_after_open');

    },
    close : function() {
      let _ = this;

      _.$canvas.trigger('hamburger_menu_before_close');

      _.$btn.add(_.$canvas)
        .removeClass('is_opened');

      _.$canvas.trigger('hamburger_menu_after_close');
    },
  }

  HamburgerMenu.prototype.close = function(event_obj){
    let _ = this;

    _.hamburger_menu_job['close'].bind(_)();
  }



  $.fn.hamburger_menu = function(){

    let _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;

    for (i = 0; i < l; i++) {

      if (typeof opt == 'object' || typeof opt == 'undefined'){

        _[i].hamburger_menu = new HamburgerMenu(_[i]);

      }else{

        ret = _[i].hamburger_menu[opt].apply(_[i].hamburger_menu, args);

        if (typeof ret != 'undefined') return ret;
      }
    };

    return _;
  };
}));
