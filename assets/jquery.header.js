jQuery(document).ready(function ($) {
  "use strict";     
  
    function sticky_menu_run(){
        if($(window).width() > 1024) {
            if ($(window).scrollTop() > 650) {
                $('.header .box-sticky').addClass('is-sticky');
                $('.header .header-sticky').addClass('box-sticky');
            } 
            else {
                $('.header .box-sticky').removeClass('is-sticky');
                $('.header .header-sticky').removeClass('box-sticky');
            }
        }
    }
    function cms_get_scrollbar_width() {
      var $inner = $('<div style="width: 100%; height:200px;">test</div>'),
          $outer = $('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
          inner = $inner[0],
          outer = $outer[0];
      $('body').append(outer);
      var width1 = parseFloat(inner.offsetWidth);
      $outer.css('overflow', 'scroll');
      var width2 = parseFloat(outer.clientWidth);
      $outer.remove();
      return (width1 - width2);
    }    
    function better_equal_elems() {
        if($(window).width() + cms_get_scrollbar_width() > 0){
            $('.equal-container').each(function () {
                var $this = $(this);
                if ($this.find('.equal-elem').length) {
                    $this.find('.equal-elem').css({
                        'height': 'auto'
                    });
                    var elem_height = 0;
                    $this.find('.equal-elem').each(function () {
                        var this_elem_h = 0;
                        this_elem_h = parseFloat($(this).height());
                        if (elem_height < this_elem_h) {
                            elem_height = this_elem_h;
                        }
                    });
                    $this.find('.equal-elem').height(elem_height);
                }
            });
            if($(window).width() > 991 ) {
                $('.equal-container2').each(function () {
                    var $this = $(this);
                    if ($this.find('.equal-elem2').length) {
                        $this.find('.equal-elem2').css({
                            'height': 'auto'
                        });
                        var elem_height = 0;
                        $this.find('.equal-elem2').each(function () {
                            var this_elem_h = 0;
                            this_elem_h = parseFloat($(this).height());
                            if (elem_height < this_elem_h) {
                                elem_height = this_elem_h;
                            }
                        });
                        $this.find('.equal-elem2').height(elem_height);
                    }
                });
            }
        }
    }  
    better_equal_elems();  
  
    $(document).on('click',' .toggle-submenu',function(){
       $(this).closest('.menu-item-has-children').toggleClass('show-submenu');
       return false;
    });
    
    $(window).scroll(function() {
      sticky_menu_run();
    });     
    $(window).resize(function() {      
      better_equal_elems();      
    });
    $(window).load(function(){      
      better_equal_elems();
    }); 
   
    $('body').on('lazyincluded', '.type_mega .lazy_menu', function (e) {  
      var p_id = $(this).attr("id");
      var slideToShow = $("#"+p_id+ " .product-slider-nav").attr("data-slideToShow");
      $("#"+p_id +" .product-slider-nav").slick({   
        dots: false,
        arrows: true,
        infinite: true,        
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
        	  dots: false,
        	  arrows: true,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 992,
            settings: {
              dots: false,
        	  arrows: true,  
              infinite: true,
              slidesToShow: 5,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 767,
            settings: {
              arrows: true,  
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: true,  
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      })      
      $("#"+p_id +" .product-slider-nav").css("opacity",1);
     
      $('.product-slider-nav .slick-prev').hide();
      $('.product-slider-nav .slick-next').hide();
      
      $(".product-slider-nav").on('mouseover',function(){
        	$('.product-slider-nav .slick-prev').show();
      		$('.product-slider-nav .slick-next').show();
      })
      
      $(".product-slider-nav").on('mouseout',function(){
        	$('.product-slider-nav .slick-prev').hide();
      		$('.product-slider-nav .slick-next').hide();
      })
      
      
      if($('.spr-badge-starrating').length > 0){
        SPR.registerCallbacks();
        SPR.initRatingHandler();
        SPR.initDomEls();
        SPR.loadProducts();
        SPR.loadBadges();
      }
    });

  /*Load content of login form when hover login button*/  
  $('a[data-id="#login_pupop"]').on('mouseover',function(){
    $('#login_pupop').addClass('lazyload').one('lazyincluded', function(e) {      
      
    });
  })
  /*Load content of search form when hover search button*/  
  $('a[data-id="#nt_search_canvass"]').on('mouseover',function(){
    $('#nt_search_canvass').addClass('lazyload').one('lazyincluded', function(e) {      
      
    });
  });
});
