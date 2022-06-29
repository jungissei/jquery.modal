(function($) {
  'use strict';

  let HamburgerMenu = {};
  HamburgerMenu = (function($hm_canvas, settings) {
    this.$hm_canvas = $hm_canvas;

    this.settings = $.extend(true, {

    }, settings);

  });



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
          ](_, this);

    });

  };

  HamburgerMenu.prototype.hamburger_menu_job = {
    open : function(self) {
      let _ = self;

      $('a[href="#' + _.$hm_canvas.attr('id') +'"]')
        .add(_.$hm_canvas)
        .addClass('is_opened');

      bodyScrollLock.disableBodyScroll(
        _.$hm_canvas
      );
    },
    close : function(self) {
      let _ = self;

      $('a[href="#' + _.$hm_canvas.attr('id') +'"]')
        .add(_.$hm_canvas)
        .removeClass('is_opened');

      bodyScrollLock.enableBodyScroll(
        _.$hm_canvas
      );
    },
  }


  /** ----------------------------------------------------------------------------
   * plugin
   *----------------------------------------------------------------------------*/
  $.fn.hamburger_menu = function(options){
    let _ = new HamburgerMenu(this, options);
    _.hamburger_menu();

    return(this);
  };
})(jQuery);
