/*jquery carousel 1.0 by kevin knoll (https://github.com/kevinknoll/jquery-carousel)*/
;(function($){
  var pluginName = 'carousel',
      defaults = {
        dir:'horizontal'
      };

  /*plugin instance*/
  function Plugin(element, options){
    this.el = element;
    this.$el = $(element);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  /*plugin methods*/
  Plugin.prototype.init = function(){
    var t = this,
        opts = t.options,
        $el = t.$el,
        vert = (opts.dir === 'vertical'),
        $ol = $el.find('ol'),
        $arrows = $el.find('.prev, .next'),
        $prev = $arrows.filter('.prev'),
        $next = $arrows.filter('.next'),
        $list = $el.find('.carousel-inner'),
        $lis = $ol.find('li'),
        len = $lis.length,
        m = $ol.data('m') || 0,
        what = (vert ? 'height' : 'width'),
        outerWhat = (vert ? 'outerHeight' : 'outerWidth'),/*which outerWidth/outerHeight to call*/
        margin = (vert ? 'marginTop' : 'marginLeft'),/*margin to animate*/
        one = $lis.filter(':first')[outerWhat](true, true),/*width/height of one LI*/
        pp = Math.floor($list[outerWhat](true, true) / one),/*number of LIs entirely visible on one page*/
        step = one * pp,/*move one entire page at a time*/
        pages = $lis.length/pp,
        full_pages = Math.floor(pages),
        min = 0,
        max = ((pages === full_pages) ? --full_pages : full_pages) * -step,/*don't advance past last partial page*/
        anim = {};/*create empty object so we can set dynamic properties later*/

    /*if enough content to scroll, show arrows and bind click events*/
    if (pages > 1) {
      $arrows.css({display:'block'});
      $prev.addClass('disabled');
      $el.on('click', '.prev, .next', function(e){
        e.preventDefault();
        $arrows.removeClass('disabled');
        m += ($(this).hasClass('next') ? -step : step);
        if (m >= min) {
          m = min;
          $prev.addClass('disabled');
        } else if (m <= max) {
          m = max;
          $next.addClass('disabled');
        }
        anim[margin] = m;
        $ol.data('m',m).animate(anim);
      });
    }
  };

  /*plugin entry point*/
  $.fn[pluginName] = function(options, args){
    /*make sure we loop thru each element to ensure they each have their own instance of the plugin*/
    return this.each(function(){
      /*grab the plugin instance from element's data*/
      var instance = $(this).data('plugin_' + pluginName);
      if (!instance) {
        /*if no instance, create one (and store it in element's data)*/
        $(this).data('plugin_' + pluginName, new Plugin(this, options));
      } else if (instance[options]){
        /*call instance's method (if it exists)*/
        instance[options].call(instance, args);
      } else {
        /*throw error if method doesn't exist*/
        $.error('Method ' +  options + ' does not exist on jQuery.' + pluginName);
      }
    });
  };
})(jQuery);