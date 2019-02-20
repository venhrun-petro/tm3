// make console.log safe to use
window.console||(console={log:function(){}});




//Function for circle found in homepage
$.fn.circleanimation = function(){
  var canvasSize = 280,
      centre = canvasSize/2,
      radius = canvasSize*0.8/2,
      s = Snap('#svg'),
      path = "",
      arc = s.path(path),
      startY = centre-radius,
      percDiv = document.getElementById('percent'),
      //inputvalue = 80;
      inputValue = $(".circle").data("percentage");
      //console.log(inputValue);


   run(inputValue/100);


  function run(percent) {
      var endpoint = percent*360;
      Snap.animate(0, endpoint,   function (val) {
          arc.remove();

          var d = val,
              dr = d-90;
              radians = Math.PI*(dr)/180,
              endx = centre + radius*Math.cos(radians),
              endy = centre + radius * Math.sin(radians),
              largeArc = d>180 ? 1 : 0;
              path = "M"+centre+","+startY+" A"+radius+","+radius+" 0 "+largeArc+",1 "+endx+","+endy;

          arc = s.path(path);
          arc.attr({
            stroke: '#16B9FF',
            fill: 'none',
            strokeWidth: 30
          });
          percDiv.innerHTML =    Math.round(val/360*100) +'%';

      }, 2000, mina.easeinout);
  }

  run(inputValue/100);
}


//Homepage Slider
$('.slider').flexslider({
    animation: "slide",
    controlsContainer: $(".custom-controls-container"),
    customDirectionNav: $(".custom-navigation a"),
    manualControls: ".flex-control-nav li",
  useCSS: false /* Chrome fix*/
});


//Accordions
$(document).on('click', '.accordion__blue .accordion__wrap, .accordion__white .accordion__wrap', function() {
    if( $(this).hasClass('accordion__wrap--opened') ){
      $(this).removeClass("accordion__wrap--opened");
      $(this).addClass("accordion__wrap--closed");
      return false;
    }else{
      $(this).removeClass("accordion__wrap--closed");
      $(this).addClass("accordion__wrap--opened");
      return false;
    }
});



//Menu Pop Up for mobile and tablet
$(document).on('click', '.responsive__menu', function(e) {
  e.preventDefault();
  $(".menu-popup").addClass("menu-popup--active");
  return false;
});

$(document).on('click', '.menu-popup__close', function(e) {
  e.preventDefault();
  $(".menu-popup").removeClass("menu-popup--active");
  return false;
});



//Waypoint triggers
$(function() {
  var $container = $('#header');
  var $b = $('body');
  $.waypoints.settings.scrollThrottle = 0;
  $container.waypoint({
    handler: function(e, d) {
      $b.toggleClass('sticky', d === 'down');
      e.preventDefault();
    }
  });

  var $container = $('.wrapper__sub-navigation');
  var $b = $('body');
  $.waypoints.settings.scrollThrottle = 0;
  $container.waypoint({
    handler: function(e, d) {

      $b.toggleClass('sticky-dual', d === 'down');
      e.preventDefault();
    },
    offset: 75
  });

  var $container = $('.graph-rise');
  var $b = $('body');
  $.waypoints.settings.scrollThrottle = 0;
  $container.waypoint({
    handler: function(e, d) {
      $b.toggleClass('graph-rise-animation', d === 'down');
      $.fn.circleanimation();
      e.preventDefault();
    },
    offset: 250,
    triggerOnce: true
  });
});



//Reckoner Calc Code
$(document).on('click', '.check__button-text', function() {
    if( $(this).hasClass('check__button-text--active') ){
        $(this).removeClass('check__button-text--active');
    }else{
        $(this).addClass("check__button-text--active");
    }
    return false;
});


$.fn.reckoner = function(){
  //console.log("-----------------------------");
  //Do not change these variables as they are the resets
  var multilocation = '0';
  var onlinebooking = '0';
  var roommanager = '0';
  var discount = '0';
  var users = '1';

  //You can change these variables to suit your price plan, these are prices before VAT
  var vat = '20';
  var baseuserprice = '61.67';
  var addtionaluserprice = '31.67';
  //EURO RATE TAKEN FROM XE 25th March 2016
  var eurorate = 1.26632;

  
  if( $("#config-online-bookings").hasClass("check__button-text--active") ){
    var onlinebooking = '5.83';
    //var onlinebooking = '7';
  }

  if( $("#config-room-manager").hasClass("check__button-text--active") ){
    var roommanager = '2.5';
    //var roommanager = '3';
  }

  if( $("#config-multi-location").hasClass("check__button-text--active") ){
    var multilocation = '10';
    //var multilocation = '12';
  }

  if( $("#config-rcc").hasClass("check__button-text--active") || $("#config-physiofirst").hasClass("check__button-text--active") ){
    var discount = '10';
  }
  //console.log("Discount = " + discount);
  //console.log("More than one user");



  //Don't edit the below functions

  var users = $('select.reckoner').find('option:selected').val();
  //console.log("Number of users = " + users);

  //console.log(multilocation + " + " + onlinebooking + " + " + roommanager);
  var modulesprice = parseFloat(multilocation) + parseFloat(onlinebooking)  + parseFloat(roommanager);
  //console.log("Module Price = " + modulesprice);

  var additonalusertotal = parseFloat(users) - 1;
  //console.log("Number of additonal users = " + additonalusertotal);

  //console.log("Base users charge sum = " + baseuserprice + " + "  + modulesprice);
  var baseusercharge = parseFloat(baseuserprice) + parseFloat(modulesprice);
  //console.log("Base users charge = " + baseusercharge);

  //console.log("Additional users single charge sum = " + addtionaluserprice  + " + " + modulesprice);
  var additionalusercharge = parseFloat(addtionaluserprice)  + parseFloat(modulesprice);
  //console.log("Additional users single charge = " + additionalusercharge);

  //console.log("Total Additional users charge sum = " + additionalusercharge  + " x " + additonalusertotal);
  var additionalusertotal = parseFloat(additionalusercharge) * parseFloat(additonalusertotal);
  //console.log("Total Additional users charge = " + additionalusertotal);

  //console.log("Total charge sum = " + baseusercharge + " + " + additionalusertotal);
  var allusersprice = parseFloat(baseusercharge) + parseFloat(additionalusertotal);
  //console.log("Total charge = " + allusersprice);

  //console.log("Total discount sum = " + allusersprice + " / 100 x " + discount);
  var discounttotal = parseFloat(allusersprice) / 100 * parseFloat(discount);
  //console.log("Total discount = " + discounttotal);

  //console.log("Applied discount total sum = " + allusersprice + " - " + discounttotal);
  var applydiscount =  parseFloat(allusersprice) - parseFloat(discounttotal);
  //console.log("Applied discount total = " + applydiscount);

  //console.log("VAT charge sum  = " + applydiscount + " / 100 x " + vat);
  var vatcharge =  parseFloat(applydiscount) / 100 * parseFloat(vat);
  //console.log("VAT charge = " + vatcharge);

  //console.log("Final Price sum  = " + applydiscount + " + " + vatcharge);
  var finalcharge = parseFloat(applydiscount) + parseFloat(vatcharge);
  //console.log("Final Price = " +  finalcharge);

  //console.log("Euro conversion sum  = " + applydiscount + " x " + eurorate);
  var euroconv = parseFloat(applydiscount)  * parseFloat(eurorate);
  //console.log("Euro conversion = " + euroconv);

  // var applydiscountoutput = Math.ceil(applydiscount.toFixed(2));
  // var finalchargeoutput = Math.ceil(finalcharge.toFixed(2));
  // var euroconvoutput = Math.ceil(euroconv.toFixed(2));
  var applydiscountoutput = Math.max( Math.round(applydiscount * 10) / 10, 2.8 ).toFixed(2);
  var finalchargeoutput = Math.max( Math.round(finalcharge * 10) / 10, 2.8 ).toFixed(2);
  var euroconvoutput = Math.max( Math.round(euroconv * 10) / 10, 2.8 ).toFixed(2);

  //console.log("Readable price before vat = " + applydiscountoutput);
  //console.log("Readable price before vat (euro) = " + euroconvoutput);
  //console.log("Readable price after vat = " + finalchargeoutput);

  var applydiscountoutput = applydiscountoutput.replace(/\.00$/,'');
  var euroconvoutput = euroconvoutput.replace(/\.00$/,'');
  var finalchargeoutput = finalchargeoutput.replace(/\.00$/,'');
  $('.applydiscountoutput').text(applydiscountoutput);
  $('.finalchargeoutput').text(finalchargeoutput);
  $('.euroconvoutput').text(euroconvoutput);

}


//On Click is to run for buttons, on change is to run on select dropdown change

$(document).on('click', '.reckoner', function() {
   $.fn.reckoner();
});
$(document).on('change', '#calc-form select', function() {
    $.fn.reckoner();
});




//Video Popup
$(document).on('click', '.play-video', function(e) {
    var embedcode = $(this).attr("href");
    //var embedadditional = embedcode+"?hd=1&rel=0&showinfo=0&autoplay=1";
    var embedadditional = embedcode+"?color=ffffff&title=0&byline=0&portrait=0&badge=0&autoplay=true";
    $(".video-wrapper iframe").attr("src", embedadditional);
    $(".video-wrapper").addClass("video-wrapper__active");
    e.preventDefault();
    return false;
});

$(document).on('click', '.video-wrapper__close', function(e) {
    $(".video-wrapper").removeClass("video-wrapper__active");
    $(".video-wrapper iframe").attr("src", "");
    e.preventDefault();
    return false;
});



//Vertical Align Floated Elements
if( $(".float__right__desktop img").length ){
  //console.log("true");
  setTimeout(function(){
    $(".float").each(function() {
      //console.log("float");
      var lefty = $(this).find(".float__left__desktop").height();
      var righty = $(this).find(".float__right__desktop").height();
      //console.log("lefty " + lefty);
      //console.log("righty " + righty);
      if( lefty < righty){
          var halfrighty = righty / 2;
          var halflefty = lefty / 2;
          var margintop = halfrighty - halflefty;
          var margintoppercentage = margintop / righty * 100;
          $(this).find(".float__left__desktop").css({"margin-top":margintop+"px"});
      }
    });
   }, 100);
}


//smooth scroll
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top-230
        }, 1000);
        return false;
      }
    }
  });
});


