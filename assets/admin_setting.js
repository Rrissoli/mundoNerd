
var sps = '#shopify-section-';


$(document).on('shopify:section:load', function(e){
	var id = e.detail.sectionId,
          $parentSection = $(sps + id);
  	//console.log($parentSection);
});

$(document).on('shopify:section:unload', function(e){
	var id = e.detail.sectionId,
          $parentSection = $(sps + id);
  	//console.log($parentSection);
});


$(document).on('shopify:section:select', function(e) {
	var id = e.detail.sectionId,
          $parentSection = $(sps + id);
  	//console.log($parentSection);
  
  if ($parentSection.hasClass('sc-menu-mobile')) {
  		$('body').addClass('open_show open_menu');
        $('.box-menu-moible .ml_categories').removeClass('active');
        $('.box-menu-moible #mobile_categories').removeClass('active');
        $('.box-menu-moible .ml_menu').addClass('active');
        $('.box-menu-moible #mobile_menu').addClass('active');

    
  }else if($parentSection.hasClass('sc-categories-mobile')){
    	$('body').addClass('open_show open_menu');
  		$('.box-menu-moible .ml_menu').removeClass('active');
    	$('.box-menu-moible #mobile_menu').removeClass('active');
    	$('.box-menu-moible .ml_categories').addClass('active');
    	$('.box-menu-moible #mobile_categories').addClass('active');
    	
  }else if ( $parentSection.hasClass('type_promotion_popup') ) {
      cmsheroShopify.PromotionPopup(true);
    }
});

$(document).on('shopify:section:deselect', function(e) {
		var id = e.detail.sectionId,
          $parentSection = $(sps + id);
  	//console.log($parentSection);
  
  if ($parentSection.hasClass('sc-menu-mobile') || $parentSection.hasClass('sc-categories-mobile')  ) {
  		$('body').removeClass('open_show open_menu');
  }
});


$(document).on('shopify:block:select', function(e){
  
  var id = e.detail.sectionId, blockId = e.detail.blockId,
      $parentSection = $(sps + id);
  
  		//console.log($parentSection)
  
  if (id == "vertical_menu" ) {
    $('.lazy_vertical_menu').html($('#html_vertical_menu').html());
    $('.vertical_menu').addClass('open_sub');
    
    if ($parentSection.hasClass('sp_header_mid')) {
          
          //console.log(blockId);
    
          if ($('#bkjs_'+blockId).length > 0 ) {
            //console.log('11');
            var li = $('.verticalmenu-item-has-children#item_'+$('#bkjs_'+blockId).attr("data-id"));
          } else {
            var li = $('.verticalmenu-item-has-children#item_'+blockId);
            //console.log('22');
          }
          //console.log(li);
           $('.sp_header_mid .verticalmenu-item').removeClass('menu_item_hover');
           li.addClass('menu_item_hover');
          $('.lazy_menu_mega').one('lazyincluded', function(e) {
            
          });
        }
    
  }else if ($parentSection.hasClass('header_megamenu')) {
          
          //console.log(blockId);
          if ($('#bkjs_'+blockId).length > 0 ) {
            //console.log('11');
            var li = $('.has-children#item_'+$('#bkjs_'+blockId).attr("data-id"));
          } else {
            var li = $('.has-children#item_'+blockId);
            //console.log('22');
          }
          console.log(blockId);
           $('.header_megamenu .menu-item').removeClass('menu_item_hover');
           li.addClass('menu_item_hover');
           

  
          $('.lazy_menu_mega').one('lazyincluded', function(e) {
            
            
          });
        }  
  
});

$(document).on('shopify:block:deselect', function(e){
  var id = e.detail.sectionId, blockId = e.detail.blockId,
      
      $parentSection = $(sps + id);
  
  if (id == "vertical_menu" ) {
    
    $('.lazy_vertical_menu').html($('#html_vertical_menu').html());
    $('.vertical_menu').removeClass('open_sub');
    
    if ($parentSection.hasClass('sp_header_mid')) {
    	$('.sp_header_mid .verticalmenu-item').removeClass('menu_item_hover');
    }
    
  }else if ($parentSection.hasClass('header_megamenu')) {
    $('.header_megamenu .menu-item').removeClass('menu_item_hover');
  }
  
});