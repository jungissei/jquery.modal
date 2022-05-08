(function($) {
  'use strict';

  let HamburgerMenu = {};
  HamburgerMenu = (function(hm_canvas, settings) {

    this.settings = $.extend(true, {
      hm_canvas : hm_canvas
      , hm_btn : 'hm_btn'
      , is_opened : 'is_opened'
      , is_preloaded : 'is_preloaded'

    }, settings);

    this.init_on_load();
  });


  /** ----------------------------------------------------------------------------
   * init on load
   *----------------------------------------------------------------------------*/
  HamburgerMenu.prototype.init_on_load = function() {
    let _ = this;
    _.prevent_animation();

  };

  /** --------------------------------------
   * init methods
   *--------------------------------------*/
  HamburgerMenu.prototype.prevent_animation = function() {
    let _s = this.settings;

    _s.elem.addClass(_s.is_preloaded);
  };

  /** ----------------------------------------------------------------------------
   * hamburger menu
   *----------------------------------------------------------------------------*/
  HamburgerMenu.prototype.hamburger_menu = function() {

  };



  /** ----------------------------------------------------------------------------
   * other
   *----------------------------------------------------------------------------*/



  /** ----------------------------------------------------------------------------
   * plugin
   *----------------------------------------------------------------------------*/
  $.fn.hamburger_menu = function(options){
    let _ = new HamburgerMenu(this, options);
    _.hamburger_menu();

    return(this);
  };
})(jQuery);
