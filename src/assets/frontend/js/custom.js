/*-------------------------------------
	Template: Tunein
	Author : Webstrot
	Copyright © 2019-20
---------------------------------------*/
//----- custom js  code --------//
! function($) {
  "use strict";
  var tpj = jQuery,
    revapi24;
  var count = 0;


    // Year Slider Js

    $("#previous").on("click",function(){
      setTimeout(function (){
        $("#firstYears").toggleClass("visible");
        $("#secondYears").toggleClass("invisible");},300);
    }),

    $("#next").on("click",function(){
      setTimeout(function (){
        $("#secondYears").toggleClass("invisible");
        $("#firstYears").toggleClass("visible");
      },300);
    }),

    // Button Animation
    $(".flac-format").on("mouseover",function(){

      setTimeout(function(){
        $(".flac-format").html('<i class="fas fa-lock"></i> Only Available For Premium Users');
      },300);

    }),

    $(".flac-format").on("mouseout",function(){

      setTimeout(function(){
        $(".flac-format").html("<i class=\"fas fa-download\"></i> Flac Format Available (<1000Kbps)");
      },300)
    }),

    // Notification Button Pop

    $(".user-noti-button").on("click",function (){
      count++;
      let notiShow = count % 2;
      let viewPort = $(document).width();
      if(viewPort <= 1200){
        if(notiShow !== 0){
          setTimeout(function (){
            $(".user-noti-simulate-icon").trigger("click");
          }, 300);
        }
      }else{
        if(notiShow !== 0){
          setTimeout(function (){
            $(".user-notification-simulate-icon").trigger("click");
          }, 300);
        }
      }
    }),


    // Main Slider Animation //
    jQuery(document).ready(function($) {
      ! function(e) {
        function t(t) {
          t.each(function() {
            var t = e(this),
              a = t.data("animation");
            t.addClass(a).one("webkitAnimationEnd animationend", function() {
              t.removeClass(a)
            })
          })
        }
        var a = e("#carousel-example-generic"),
          o = a.find(".carousel-item:first").find("[data-animation ^= 'animated']");
        a.carousel(), t(o), a.carousel("pause"), a.on("click slide.bs.carousel", function(a) {
          t(e(a.relatedTarget).find("[data-animation ^= 'animated']"))
        })
      }(jQuery), $("#search_button").on("click", function(e) {
        $("#search_open").slideToggle(), e.stopPropagation()
      }), $(document).on("click", function(e) {
        e.target.closest("#search_open") || $("#search_open").slideUp()
      }),

//----- Magnific popup-video -------//

        $(".test-popup-link").magnificPopup({
          type: "iframe",
          iframe: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe><div class="mfp-title">Some caption</div></div>',
            patterns: {
              youtube: {
                index: "youtube.com/",
                id: "v=",
                src: "https://www.youtube.com/embed/ryzOXAO0Ss0"
              }
            }
          }
        }),

//----------- treanding wrapper slider js -------------//
        $(document).ready(function() {
          $(".index4_treanding_new_slider .owl-carousel").owlCarousel({
            loop: !0,
            margin: 15,
            autoplay: !1,
            smartSpeed: 1200,
            responsiveClass: !0,
            navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
            responsive: {
              0: {
                items: 1,
                nav: !0
              },
              600: {
                items: 3,
                nav: !0
              },
              1000: {
                items: 4,
                nav: !0,
                loop: !0,
                margin: 20
              }
            }
          })
        }),

//----------- event wrapper slider js -------------//
        $(document).ready(function() {
          $(".event_slider_wrappeer .owl-carousel").owlCarousel({
            loop: !0,
            margin: 15,
            autoplay: !0,
            smartSpeed: 1200,
            responsiveClass: !0,
            navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
            responsive: {
              0: {
                items: 1,
                nav: !0
              },
              600: {
                items: 2,
                nav: !0
              },
              1000: {
                items: 3,
                nav: !0,
                loop: !0,
                margin: 20
              }
            }
          })
        }),

//----------- featured wrapper slider js -------------//
        $(document).ready(function() {
          $(".featured_song_slider .owl-carousel").owlCarousel({
            loop: !0,
            margin: 15,
            autoplay: !0,
            smartSpeed: 1200,
            responsiveClass: !0,
            navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
            responsive: {
              0: {
                items: 1,
                nav: !0
              },
              600: {
                items: 1,
                nav: !0
              },
              1000: {
                items: 1,
                nav: !0,
                loop: !0,
                margin: 20
              }
            }
          })
        }),

        /*--- partner js code Start ----*/
        $(document).ready(function() {
          $(".partner_slider_wraper .owl-carousel").owlCarousel({
            loop: !0,
            margin: 10,
            autoplay: !0,
            responsiveClass: !0,
            smartSpeed: 1200,
            navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
            responsive: {
              0: {
                items: 1,
                nav: !0
              },
              500: {
                items: 3,
                nav: !0
              },
              700: {
                items: 4,
                nav: !0
              },
              1000: {
                items: 5,
                nav: !0,
                loop: !0,
                margin: 20
              }
            }
          })
        }),

        /*--- event slider js  ----*/
        $(document).ready(function() {
          $(".event_single_slider .owl-carousel").owlCarousel({
            loop: !0,
            margin: 10,
            autoplay: !0,
            responsiveClass: !0,
            smartSpeed: 1200,
            navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
            responsive: {
              0: {
                items: 1,
                nav: !0
              },
              600: {
                items: 1,
                nav: !0
              },
              1000: {
                items: 1,
                nav: !0,
                loop: !0,
                margin: 20
              }
            }
          })
        }), $(document).ready(function() {
        $(".m24_tranding_more_icon").on("click", function(e) {
          if (e.preventDefault(), e.stopImmediatePropagation(), void 0 !== $(this).attr("data-other")) var t = $(this).parent().parent();
          else t = $(this).parent();
          t.find("ul.tranding_more_option").hasClass("tranding_open_option") ? t.find("ul.tranding_more_option").removeClass("tranding_open_option") : ($("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option"), t.find("ul.tranding_more_option").addClass("tranding_open_option"))
        }), $(document).on("click", function(e) {
          $("ul.tranding_more_option.tranding_open_option").removeClass("tranding_open_option")
        })
      });
      var swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });

      /*--- magnific popup Start ----*/
      $(".test-popup-link").magnificPopup({
        type: "iframe",
        iframe: {
          markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe><div class="mfp-title">Some caption</div></div>',
          patterns: {
            youtube: {
              index: "youtube.com/",
              id: "v=",
              src: "https://www.youtube.com/embed/ryzOXAO0Ss0"
            }
          }
        }
      });

      function checkRequire(formId, targetResp) {
        targetResp.html("");
        var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
          url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
          image = /\.(jpe?g|gif|png|PNG|JPE?G)$/,
          mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/,
          facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/,
          twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/,
          google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/,
          check = 0;
        $("#er_msg").remove();
        var target = $("object" == typeof formId ? formId : "#" + formId);
        return target.find("input , textarea , select").each(function() {
          if ($(this).hasClass("require")) {
            if ("" == $(this).val().trim()) return check = 1, $(this).focus(), targetResp.html("You missed out some fields."), $(this).addClass("error"), !1;
            $(this).removeClass("error")
          }
          if ("" != $(this).val().trim()) {
            var valid = $(this).attr("data-valid");
            if (void 0 !== valid) {
              if (!eval(valid).test($(this).val().trim())) return $(this).addClass("error"), $(this).focus(), check = 1, targetResp.html($(this).attr("data-error")), !1;
              $(this).removeClass("error")
            }
          }
        }), check
      }


        /*--- contact form Start ----*/
        $(".submitForm").on("click", function() {
          var e = $(this),
            t = e.closest("form"),
            a = t.find(".response");
          if (0 == checkRequire(t, a)) {
            var o = new FormData(t[0]);
            o.append("form_type", e.attr("form-type")), $.ajax({
              method: "post",
              url: "ajax.php",
              data: o,
              cache: !1,
              contentType: !1,
              processData: !1
            }).done(function(e) {
              1 == e ? (t.find("input").val(""), t.find("textarea").val(""), a.html('<p style="color:green;">Mail has been sent successfully.</p>')) : a.html('<p style="color:red;">Something went wrong please try again latter.</p>')
            })
          }
        }), $("select").niceSelect();
      var adonisObj = {};
      jQuery(document).ready(function(t) {
        adonisObj.toggleOffCanvas = function(e) {
          var a = t(e).hasClass("show") ? "hide" : "show";
          return "show" == a ? (t(e).addClass("show"), t("body").addClass("off-canvas-overlay-on")) : (t(e).removeClass("show"), t("body").removeClass("off-canvas-overlay-on")), "" == t(".off-canvas-overlay").attr("data-target") || void 0 === t(".off-canvas-overlay").attr("data-target") ? t(".off-canvas-overlay").attr("data-target", e) : t(".off-canvas-overlay").removeAttr("data-target"), a
        }, adonisObj.ajaxify = function() {
          if (!0 === filterlinks(_url)) {
            if (t(this).parents(".off-canvas").length > 0) {
              var a = t(this).parents(".off-canvas"),
                o = void 0 !== a.attr("data-close-offcanvas-below") ? a.attr("data-close-offcanvas-below") : "";
              t(window).outerWidth() < parseInt(o) && adonisObj.toggleOffCanvas(a)
            }
            e.preventDefault(), adonisObj.hideOffCanvas()
          }
        }, t(document).on("click", ".toggle-off-canvas,.off-canvas-overlay,.close-offcanvas", function(e) {
          e.preventDefault(), adonisObj.toggleOffCanvas(t(this).attr("data-target"))
        })
      });
      const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]'),
        currentTheme = localStorage.getItem("theme");

    })
}(jQuery);
