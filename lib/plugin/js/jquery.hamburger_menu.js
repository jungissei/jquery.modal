(function($) {
  'use strict';

  let HamburgerMenu = {};
  HamburgerMenu = (function(elem, settings) {

    this.settings = $.extend(true, {
      elem : elem
    }, settings);

    this.init_on_load();
  });


  /** ----------------------------------------------------------------------------
   * init on load
   *----------------------------------------------------------------------------*/
  HamburgerMenu.prototype.init_on_load = function() {
    let _ = this;
    _.prevent_animation();

    if(_.settings.scroll_fix.is_active) {
      _.trigger_scroll();
    }
  };

  /** --------------------------------------
   * init methods
   *--------------------------------------*/


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
