$(document).ready(function() {       
      
      	var is_customers = false ;
      
           
      function readMore(string, maxWords) {       
        var strippedString = $("<p>" + string + "</p>").text().trim();      
        var array = strippedString.split(" ");
        var string = array.splice(0, maxWords).join(" ");

        if(array.length > maxWords) {
          string += "...";
        }

        return string ;
      }
     
      function convert_currency(value,type){
          var shopCurrency = $("span[data-shop-currency]").attr("data-shop-currency");
          try{
            var newCurrency = Currency.currentCurrency;
          }catch(ex){
            var newCurrency = '';
          }
          try{
            var oldCurrency = shopCurrency;
          }catch(ex){
            var oldCurrency = '';
          }
          if(isNaN(value)){
            value =  0.0; 
          }
         
          var cents = 0.0;
          var oldFormat = Currency.moneyFormats['USD'][ Currency.format] || '';
                                                var newFormat = Currency.moneyFormats[newCurrency][Currency.format] || '';

                                                if(type == 'format'){
                                                  return  Currency.formatMoney(value, newFormat);
                                                }
          if (oldFormat.indexOf('amount_no_decimals') !== -1) {
            cents = Currency.convert(parseInt(value, 10)*100, oldCurrency, newCurrency);
          }
          else if (oldCurrency === 'JOD' || oldCurrency == 'KWD' || oldCurrency == 'BHD') {
            cents = Currency.convert(parseInt(value, 10)/10, oldCurrency, newCurrency);
          }
          else { 
            cents = Currency.convert(parseInt(value, 10), oldCurrency, newCurrency);
          }
          if(type  == 'nosymbol'){
            return cents;
          }
          var my_data =  Currency.formatMoney(cents, newFormat);
          return my_data;       
      }
      function get_symbol(value){
          var str = value.split("");
          var sym = '';
          for(var i=0;i<str.length;i++){
            if(isNaN(str[i])){
                sym+=str[i];
            }else{
              return sym; 
            }
          }
          return sym;
      }
      function get_price_only(price){
        var price_convert= price.toString();
        var get_currencies = 0;
        var $split = price_convert.split(';');
            if($split.length > 1){
              get_currencies = (isNaN(parseInt( price_convert.substring(1,0)))) ?  $split[1]:  $split[0];
              get_currencies = get_currencies.replace(/[^0-9.]/g, '');
            }else{
              get_currencies =price_convert.replace(/[^0-9.]/g, '');
            }
            
            get_currencies = $.trim(get_currencies); 
            var check = get_currencies.substring(1,0);
            if(isNaN((check))){
              get_currencies =   get_currencies.replace(check,'');
            }            
        return parseFloat(get_currencies);

      }
     
      var min_price 		= $("#min_price").val()*100;
      var max_price 		= $("#max_price").val()*100;
      var max_price_slide 	= convert_currency(max_price,'');
      var get_currencies 	= convert_currency(max_price,'');
      var min_price_slide	= convert_currency(min_price,'');
      var limit_product 	= $("#limitProductPage").val();
	  var $split 			= get_currencies.split(';');

      
      if($split.length > 1){
        get_currencies = (isNaN(parseFloat( get_currencies.substring(1,0)))) ?  $split[0]+';':  $split[1]+';';

      }else{
        get_currencies = (isNaN(parseFloat( get_currencies.substring(1,0)))) ? get_symbol( get_currencies):   get_currencies.substring(1,-1);
      }
   
  function loadMoreProduct(paramLimit, paramTotal){
    var size_pr = parseInt(paramTotal);
    var x = parseInt(paramLimit);
    var number = parseInt(paramLimit);
    var index = 0;
    jQuery(document).ajaxComplete(function( event, xhr, settings ) {      
      if(xhr.responseText.indexOf("ajax-pr")!= -1){
        index++;
      }
      console.log(index);
      console.log(paramTotal);
      if(index == paramTotal){
        if (paramTotal >paramLimit ){
        var loadMoreHTML = "";
        loadMoreHTML	=	loadMoreHTML + "<div id='loadMore' class='bn_button viewall text-center' style=''>";
        loadMoreHTML	=	loadMoreHTML + "<a href='javascript:void(0);'>Load More</a>";
        loadMoreHTML	=	loadMoreHTML + "</div>";
        $(".bot_page_collection").empty();
        $(".bot_page_collection").append(loadMoreHTML);
        $(".bot_page_collection").show();
        }
        $('.js_wrap_loadMore .product-item:lt('+x+')').show();
        $('#loadMore').click(function () {          
          x = (x + number <= size_pr) ? x + number : size_pr;
          
          $('.js_wrap_loadMore .product-item:lt('+x+')').show();      
          if(x == size_pr){
            $('#loadMore').hide();
          }
        });
      }
    })	    
  }
  function initFilterPrice(){
    $('div[data-range-price]').slider({
      range: true,
      min: get_price_only(min_price_slide),
      max: get_price_only(max_price_slide),
      values: [get_price_only(min_price_slide), get_price_only(max_price_slide)],
      slide: function(event, ui) {
        var max_price_slide = convert_currency(max_price,'');
        var get_currencies = convert_currency(max_price,'');
        var min_price_slide = convert_currency(min_price,'');              

        var $split = get_currencies.split(';');
        if($split.length > 1){
          get_currencies = (isNaN(parseInt( get_currencies.substring(1,0)))) ?  $split[0]+';':  $split[1]+';';

        }else{
          get_currencies = (isNaN(parseInt( get_currencies.substring(1,0)))) ? get_symbol( get_currencies):   get_currencies.substring(1,-1);
        }
        var max_pr = get_currencies + '' + parseFloat(ui.values[1]).toFixed(2);
        var min_pr =  get_currencies +'' + parseFloat(ui.values[0]).toFixed(2);	

        $("div[data-amount-price] [data-from]").html(min_pr);
        $("div[data-amount-price] [data-to]").html(max_pr);
      },
      change: function(event, ui) {
        jQuery("body").addClass('ajax_loading'); /* Hi???n th??? loading khi filter ajax*/
	    $("div[data-top-content-filter]").removeClass("opened");
        var vMaxPrice = ui.values[1]; /* ?????c max price t??? thanh cu???n */
        var vMinPrice = ui.values[0];  /* ?????c min price t??? thanh cu???n */

        var vIndex = 0; /* Bi???n l??u ch??? s??? duy???t s???n ph???m */
        var vSumProduct   = 0; /* Bi???n l??u t???ng s??? s???n ph???m */
        var vPage = 1; /* Bi???n l??u t???ng s??? trang khi ph??n trang */
        var vCount = 0; /* Bi???n ?????m c??c s???n ph???m tho??? m??n ??i???u ki???n */              

        var vHtml = ''; /* Kh???i t???o bi???n html = r???ng ????? chu???n b??? cho vi???c append c??c s???n ph???m v??o khu v???c k???t qu??? */
        var vView = $(".js_cat_view.active").data('col') > 0 ? 'grid' : 'list' ; /* L???y view t??? collection view c?? tr???ng th??i active v???i data-col = 0 l?? list*/
        var vcol = $("#productPerPage").val(); /* L???y s??? l?????ng column */
        var vHasProduct = false; /* Bi???n ki???m tra c?? s???n ph???m tho??? m??n ??i???u ki???n */
			
        $("#collection-product").empty(); /* Xo?? c??c item tr??n khung k???t qu??? */
        $("div[data-container-cat]").addClass("js_product_ajax"); /* Th??m class ????? ??i???u khi???n ph??n trang */
        $(".products-result-count").empty(); /* Xo?? bi???n hi???n th??? s??? k???t qu??? ph??n trang */
        $(".js_paginate_ajax").empty(); /* Xo?? d??? li???u ph???n t??? hi???n th??? k???t qu??? ph??n trang */
        
        if($('.js_cat_view.active').length <= 0){/* N???u kh??ng t???n t???i collection view th?? g??n view = grid */
          vView = 'grid';
        }

        /*Duy???t c??c s???n ph???m t??? m???ng danh s??ch collection th??ng qua json_collection_filter (bi???n n??y ???????c truy???n t??? sections/collection.liquid ) */
        $.each(json_collection_filter,function(paramIndex, paramElement) {
          var current_price =  convert_currency(paramElement.variants[0].price,'');  /* L???y gi?? hi???n th???i c???a t???ng s???n ph???m */                	
          current_price = get_price_only(current_price); /* Ch??? l???y s??? c???a gi?? */                 	
          if (current_price <= vMaxPrice && current_price >= vMinPrice) {  /* Ki???m tra gi?? s???n ph???m c?? tho??? m??n ??i???u ki???n l???c */
            vHasProduct = true; /* C?? s???n ph???m tho??? m??n ??i???u ki???n*/  
            var xhr = null;
            var handle_collection = $("#currency_collection_handle").val();
            var url_cat = "/collections/"+handle_collection;            
            var pr_hd = paramElement.handle;
            $(".bot_page_collection").hide();
            xhr = $.ajax({
                    type: 'GET',
                    url: url_cat+'/products/'+pr_hd,
                    cache: false,
                    data: {
                        view: 'ajax-product'
                    },
                    dataType: 'html',
                    success: function (data) { 
                      $("#collection-product").addClass("js_wrap_loadMore");
                      $("#collection-product").append(data);
                      
                      /* Re-init review and tooltip */                     
                        SPR.registerCallbacks();
                        SPR.initRatingHandler();
                        SPR.initDomEls();
                        SPR.loadProducts();
                        SPR.loadBadges();
                    
                      setTimeout(function(){ 
                        tippy('.product-item .js_add_to_cart_button, .product-item .js-compare, .product-item .js-wishlist, .product-item .js_quick_view,.product-item-style2.small .js_add_to_cart_button, .product-item-style2 .js-compare, .product-item-style2 .js-wishlist, .product-item-style2 .js_quick_view', {
                          placement: 'top',
                          animation: 'perspective',
                          arrow: true
                        })
                      },500)
                    }
            })
            //vHtml = vHtml + json_to_html(paramElement,vView,paramIndex,vPage, vcol);  /* G???i h??m ????? t???o giao di???n html cho s???n ph???m r???i th??m v??o bi???n vHtml */
            vSumProduct++; /* T??ng bi???n t???ng s???n ph???m khi t??m th???y s???n ph???m tho??? m??n ??i???u ki???n */                     
            vCount++; /*T??ng bi???n ?????m*/
            vIndex++; /* T??ng ch??? s??? duy???t s???n ph???m trong m???ng s???n ph???m */
          }else{
            $("div[data-top-content-filter]").removeClass("opened");
          }                           
          
        });        
       
        
        
        if(! vHasProduct){ /* N???u duy???t h???t m???ng s???n ph???m m?? kh??ng t??m ???????c s???n ph???m tho??? m??n ??i???u ki???n */
          vHtml +='<div class="shopify-info no-products"><i class="flash fa fa-exclamation-triangle" aria-hidden="true"></i>There are no products that match your price</div>';
        }          
        $("#collection-product").append(vHtml);  /* Append giao di???n k???t qu??? s???n ph???m v??o khu v???c k???t qu??? l???c */     
        
        loadMoreProduct(limit_product, vIndex);
		
        
        if($('.shopify-product-reviews-badge').length > 0){/*Reinit l???i app product review */
          SPR.registerCallbacks();
          SPR.initRatingHandler();
          SPR.initDomEls();
          SPR.loadProducts();
          SPR.loadBadges();
        }
        
        setTimeout(function(){ 
          tippy('div[data-js-tooltip], a[data-js-tooltip]', {
            placement: 'top',
            animation: 'perspective',
            arrow: true
          })
        }, 500)
       
        window.setTimeout(function() {
          jQuery("body").removeClass('ajax_loading'); /* Sau khi ???? hi???n th??? k???t qu??? l???c th?? ????ng loading */
        }, 1000);

      } 

    }); 

  }
      initFilterPrice(); /* Kh???i t???o h??m l???c v???i price */
  
      $(document).on('shopify:section:load', function(){    /* Khi section ???????c load trong admin */
        initFilterPrice(); /* G???i l???i h??m l???i v???i price*/
      })
      
      /*jQuery(document).on('pjax:end', function (xhr, textStatus, options) { 
        
        $('div[data-range-price]').slider({
          range: true,
          min: 0,
          max: get_price_only(max_price_slide),
          values: [get_price_only(min_price_slide), get_price_only(max_price_slide)],
          slide: function(event, ui) {
            var max_price_slide = convert_currency(max_price,'');
            var get_currencies = convert_currency(max_price,'');
            var min_price_slide = convert_currency(min_price,'');              

            var $split = get_currencies.split(';');
            if($split.length > 1){
              get_currencies = (isNaN(parseInt( get_currencies.substring(1,0)))) ?  $split[0]+';':  $split[1]+';';

            }else{
              get_currencies = (isNaN(parseInt( get_currencies.substring(1,0)))) ? get_symbol( get_currencies):   get_currencies.substring(1,-1);
            }
            var max_pr = get_currencies + '' + parseFloat(ui.values[1]).toFixed(2);
            var min_pr =  get_currencies +'' + parseFloat(ui.values[0]).toFixed(2);	

            $("div[data-amount-price] [data-from]").html(min_pr);
            $("div[data-amount-price] [data-to]").html(max_pr);
          }
        })
      })*/
  })

