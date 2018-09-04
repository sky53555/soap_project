$(document).ready(function(){


/***********화면  ************/

  //변수 ht에 브라우저의 높이값을 저장
  var ht = $(window).height();  
  //브라우저의 높이값을 section의 높이값으로 지정
  $("section").height(ht);
  
  //브라우저가 리사이즈 될 때마다 브라우저와 section의 높이값을 갱신
  $(window).on("resize",function(){
    var ht = $(window).height();  
    $("section").height(ht);
  }); 
  
  
  //메뉴 버튼 클릭시
  $("#menu li").on("click",function(e){
    e.preventDefault();
    
    //변수 ht에 브라우저의 높이값 저장
    var ht = $(window).height();
    
    //변수 i에 현재 클릭한 li의 순서값을 저장
    var i = $(this).index();
    
    //브라우저의 높이값*박스의 순서값은 현재 박스의 스크롤 위치값과 동일
    var nowTop = i*ht;      
  
    //해당 스크롤 위치값으로 문서를 이동
    $("html,body").stop().animate({"scrollTop":nowTop},1400);
  });
  
  
  $(window).on("scroll",function(){ 
  
    //변수 ht에 현재 브라우저의 넓이값 저장
    var ht = $(window).height();
    
    //변수 scroll에 현재 문서가 스크롤된 거리 저장
    var scroll = $(window).scrollTop();
    
    
    for(var i=0; i<5;i++){
      if(scroll>=ht*i && scroll< ht*(i+1)){
        $("#menu li").removeClass();
        $("#menu li").eq(i).addClass("on");
      };
    }
    
    
    //section위에서 마우스 휠을 움직이면
    $("section").on("mousewheel",function(event,delta){    
    
    //마우스 휠을 올렸을때 
          if (delta > 0) {  
      //변수 prev에 현재 휠을 움직인 section에서 이전 section의 offset().top위치 저장
             var prev = $(this).prev().offset().top;
       //문서 전체를 prev에 저장된 위치로 이동
       $("html,body").stop().animate({"scrollTop":prev},1400,"easeOutQuart");
       
    //마우스 휠을 내렸을때  
          }else if (delta < 0) {  
      //변수 next에 현재 휠을 움직인 section에서 다음 section의 offset().top위치 저장
       var next = $(this).next().offset().top;
       //문서 전체를 next에 저장된 위치로 이동
       $("html,body").stop().animate({"scrollTop":next},1400,"easeOutQuart");                                         
          }
          
     });
      
  });



  /***********네비게이션 토글 애니메이션 ************/

  $('.menu').on('click', function(e){
   $(this).toggleClass('active');
});


/***********사이드 네비게이션  ************/

  var nav_open = true;

  $("#nav_btn").click(function(){
    if(nav_open == true){  //nav_open가 true 이면  네비게이션이 나온다
            $(".backdrop").fadeIn(500);
      $("#nav_out").animate({
        // 숫자로 표현할수 있는 것들 만 적용 가능~
        left:"0px"
      }, 600);
      nav_open = false;
    }else if(nav_open == false){ 
      $(".backdrop").fadeOut(500);
      $("#nav_out").animate({
        // 숫자로 표현할수 있는 것들 만 적용 가능~
        left:"-220px"
      }, 600);
      nav_open = true;
      console.log("들어가는것"+nav_open);

    }
    

  });

  

/***********슬라이드  ************/


  
  var $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length-1,
      animating = false,
      animTime = 1000,
      autoSlideTimeout,
      autoSlideDelay = 7000,
      $pagination = $(".slider-pagi");
  
  function createBullets() {
    for (var i = 0; i < numOfSlides+1; i++) {
      var $li = $("<li class='slider-pagi__elem'></li>");
      $li.addClass("slider-pagi__elem-"+i).data("page", i);
      if (!i) $li.addClass("active");
      $pagination.append($li);
    }
  };
  
  createBullets();
  
  function manageControls() {
    $(".slider-control").removeClass("inactive");
    if (!curSlide) $(".slider-control.left").addClass("inactive");
    if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
  };
  
  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };
  
  autoSlide();
  
  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      manageControls();
      $slider.addClass("animating");
      $slider.css("top");
      $(".slide").removeClass("active");
      $(".slide-"+curSlide).addClass("active");
      setTimeout(function() {
        $slider.removeClass("animating");
        animating = false;
      }, animTime);
    }
    window.clearTimeout(autoSlideTimeout);
    $(".slider-pagi__elem").removeClass("active");
    $(".slider-pagi__elem-"+curSlide).addClass("active");
    $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
    $slideBGs.css("transform", "translate3d("+ curSlide*50 +"%,0,0)");
    diff = 0;
    autoSlide();
  }

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

  $(document).on("mousedown touchstart", ".slider", function(e) {
    if (animating) return;
    window.clearTimeout(autoSlideTimeout);
    var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
    diff = 0;
    
    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = (startX - x) / winW * 70;
      if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
      $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
      $slideBGs.css("transform", "translate3d("+ (curSlide*50 + diff/2) +"%,0,0)");
    });
  });
  
  $(document).on("mouseup touchend", function(e) {
    $(document).off("mousemove touchmove");
    if (animating) return;
    if (!diff) {
      changeSlides(true);
      return;
    }
    if (diff > -8 && diff < 8) {
      changeSlides();
      return;
    }
    if (diff <= -8) {
      navigateLeft();
    }
    if (diff >= 8) {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-control", function() {
    if ($(this).hasClass("left")) {
      navigateLeft();
    } else {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-pagi__elem", function() {
    curSlide = $(this).data("page");
    changeSlides();
  });
  

  
            


  
});


