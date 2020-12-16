
jQuery(function () {

    $(document).scroll(function () {

    })
  



})
$(document).ready(function () {
    setTimeout(function () {
        $("#preloader").hide();
    }, 900);
    var wow = new WOW({
        //disabled for mobile
        //mobile: false
    });

    wow.init();
    var travelswiper = new Swiper('.travel .swiper-container', {
        slidesPerView: 'auto',
        //spaceBetween: 0,
        navigation: {
            nextEl: '.travel .swiper-button-next',
            prevEl: '.travel .swiper-button-prev',
        },
        //breakpoints: {
        //    750: {
        //        slidesPerView: 'auto',
        //        spaceBetween: 0
        //    }
        //},
    });
    /* Back Top Link active
    ========================================================*/
    var offset = 200;
    var duration = 500;
    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(400);
        } else {
            $('.back-to-top').fadeOut(400);
        }
    });

    $('.back-to-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    function subMenu() {
        var selectedNav = $('.trip_day li a.active');
        var selectedActive = selectedNav.text();
        var selectedHref = selectedNav.attr("href");
        $(".mobile_day").html("");
        $("<select class='form-control custom-select' />").appendTo(".mobile_day");

        $("<option />", {
            "selected": "selected",
            "data-id": selectedHref,
            "text": "目前選擇：" + selectedActive
        }).appendTo(".mobile_day select");

        $(".trip_day li a").each(function () {
            var el = $(this);
            $("<option />", {
                "data-id": el.attr("href"),
                "text": el.text()
            }).appendTo(".mobile_day select");
        });
    }
    subMenu();
    $(document).on('change', '.mobile_day select', function () {
        var hrefid = $(this).find("option:selected").attr("data-id");
        $('#day-tab a[href="' + hrefid + '"]').tab('show');
    });
    $(document).on('change', 'select.route', function () {
        var hrefid = $(this).val();
        window.location.replace(hrefid);
    });
    $(document).on('click', '.trip_day li a', function () {
        subMenu();
    });

    $(document).on('click', '.page-box .item-next', function () {
        var index = $('.trip_day .nav-link.active').closest('.nav-item').index();
        index = index + 1;
        $('#day-tab li:nth-child(' + (index + 1) + ') a').tab('show');
    });
    $(document).on('click', '.page-box .item-prev', function () {
        var index = $('.trip_day .nav-link.active').closest('.nav-item').index();
        index = index + 1;
        console.log(index);
        $('#day-tab li:nth-child(' + (index - 1) + ') a').tab('show');
    });
    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        var index = $('.trip_day .nav-link.active').closest('.nav-item').index();
        var pagelength = $("#day-tab li").length;
        if ((index + 1) == pagelength) {
            $(".page-box .nav-link").html("上一頁");
            $(".page-box .item-list").removeClass("item-next").addClass("item-prev");
        } else if (index == 0) {
            $(".page-box .nav-link").html("下一頁");
            $(".page-box .item-list").removeClass("item-prev").addClass("item-next");
        }
        $("html, body").animate({ scrollTop: ($("#day-tab").offset().top) - 135 }, 'slow');
    })
    var point = getUrlParam('point');
    if ($('#point' + point).length) {
        if (point) {
            if (point == "4") {
                $("html, body").animate({ scrollTop: ($("#point4").offset().top) }, 'slow');
            } else {
                $("html, body").animate({ scrollTop: ($("#point" + point).offset().top) - 135 }, 'slow');
            }
        }
    }
   
    $(window).on('resize', function () {
       
    });
})



var LockMore = false;//锁定
$(window).scroll(function (event) {
    var wScrollY = $(window).scrollTop(); // 当前滚动条位置  
    var header = $("header").height(); 
    var nav = $("nav").height(); 
    if ($(document).width() >= 768) {
        if (wScrollY >= (header + nav)) {
            if (LockMore) {
                return false;
            }
            $("body").css("padding-top",(header+nav)+"px");
            $("nav.navbar").addClass("fixed-top");
        } else {
            $("nav.navbar").removeClass("fixed-top");
            $("body").removeAttr("style"); 
        }
    }
});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]); return null; 
}
