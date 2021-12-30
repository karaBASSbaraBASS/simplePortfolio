$(document).ready(function() {
    
  $('.navbar-toggler').click(function(e) {
    e.preventDefault();     
    $(this).toggleClass('convert');
  });

  $(document).ready(function(){
    $('.slider1').bxSlider({
      slideWidth: 400,
      minSlides: 1,
      maxSlides: 3,
      moveSlides: 1,
      slideMargin: 10
    });
  });


  var obj;
    
  fetch('./assets/js/staticValues/XHR.json')
    .then(response => response.json())
    .then(data => obj = data)
    .then((obj) => fillDataInProperPlace(obj))
    .catch(error => console.log(error));
      
  function fillDataInProperPlace(data){
    fillTextData(data.title, '.navbar-brand');
    fillTextData(data.title, '.name');
    fillTextData(data.position, '.position');
    fillTextData(data.profile.about, '.introduction');

    data.sideBarSections.forEach(element => {
      if (data[element].visible) {
        let div = document.createElement('div');
        div.classList.add('textBlock');
        let sidebar = document.querySelector('.sidebarDetails');
        div.appendChild(makeH3(element));
        div.appendChild(makeUL(data[element].items));

        sidebar.appendChild(div);

        
      }
    });
    
  }

  function fillTextData(textValue, selector){
    const cvName = document.querySelector(selector);
    const p = document.createElement('p');
    p.innerHTML = textValue;
    cvName.appendChild(p);
  }

  function makeUL(array) {
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        
        
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i].name));
        if(array[i].link){
          item.innerHTML = array[i].name + array[i].link;
        }
        if(array[i].level){
          item.appendChild(document.createTextNode(array[i].level));
        }

        list.appendChild(item);
        
    }
    
    return list;
  }
  function makeH3(textValue) {
    var item = document.createElement('h3');
    item.appendChild(document.createTextNode(textValue));
    return item;
  }

 
  
});

$('.arrowDown__link').on('click', function(event) {
  event.preventDefault();
  var advantages = $('.aboutBlocks').offset().top - 50;
  $('body, html').animate({scrollTop: advantages}, 500);
});

document.addEventListener("DOMContentLoaded", function() {

  var circleProgress = (function(selector) {
    var wrapper = document.querySelectorAll(selector);
    Array.prototype.forEach.call(wrapper, function(wrapper, i) {
      var wrapperWidth,
        wrapperHeight,
        percent,
        innerHTML,
        context,
        lineWidth,
        centerX,
        centerY,
        radius,
        newPercent,
        speed,
        from,
        to,
        duration,
        start,
        strokeStyle,
        text;

      var getValues = function() {
        wrapperWidth = parseInt(window.getComputedStyle(wrapper).width);
        wrapperHeight = wrapperWidth;
        percent = wrapper.getAttribute('data-cp-percentage');
        innerHTML = '<span class="percentage"><strong>' + percent + '</strong> %</span><canvas class="circleProgressCanvas" width="' + (wrapperWidth * 2) + '" height="' + wrapperHeight * 2 + '"></canvas>';
        wrapper.innerHTML = innerHTML;
        text = wrapper.querySelector(".percentage");
        canvas = wrapper.querySelector(".circleProgressCanvas");
        wrapper.style.height = canvas.style.width = canvas.style.height = wrapperWidth + "px";
        context = canvas.getContext('2d');
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        newPercent = 0;
        speed = 1;
        from = 0;
        to = percent;
        duration = 1000;
        lineWidth = 25;
        radius = canvas.width / 2 - lineWidth;
        strokeStyle = wrapper.getAttribute('data-cp-color');
        start = new Date().getTime();
      };

      function animate() {
        requestAnimationFrame(animate);
        var time = new Date().getTime() - start;
        if (time <= duration) {
          var x = easeInOutQuart(time, from, to - from, duration);
          newPercent = x;
          text.innerHTML = Math.round(newPercent) + " %";
          drawArc();
        }
      }

      function drawArc() {
        var circleStart = 1.5 * Math.PI;
        var circleEnd = circleStart + (newPercent / 50) * Math.PI;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(centerX, centerY, radius, circleStart, 4 * Math.PI, false);
        context.lineWidth = lineWidth;
        context.strokeStyle = "#ddd";
        context.stroke();
        context.beginPath();
        context.arc(centerX, centerY, radius, circleStart, circleEnd, false);
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.stroke();

      }
      var update = function() {
        getValues();
        animate();
      }
      update();

      var btnUpdate = document.querySelectorAll(".btn-update")[0];
      btnUpdate.addEventListener("click", function() {
        wrapper.setAttribute("data-cp-percentage", Math.round(getRandom(5, 95)));
        update();
      });
      wrapper.addEventListener("click", function() {
        update();
      });

      var resizeTimer;
      window.addEventListener("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          clearTimeout(resizeTimer);
          start = new Date().getTime();
          update();
        }, 250);
      });
    });

    //
    // http://easings.net/#easeInOutQuart
    //  t: current time
    //  b: beginning value
    //  c: change in value
    //  d: duration
    //
    function easeInOutQuart(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }

  });

  circleProgress('.counter');

  // Возвращает случайное число в диапазоне от мин (в комплекте) до макс (эксклюзивное)
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
});

$(document).ready(function() {
  $('h1.count').each(function() {
    var $this = $(this),
      $container = $this.closest('.counter-container'), // set this to element other than the actual element that is updating the number as counter increments
      $value = $this.data('number');

    $container.velocity({
      tween: $value // tween value doesn't matter
    }, {
      queue: false,
      easing: 'ease',
      delay: 500,
      duration: 6000, // this determines the number of "progres" steps
      progress: function(elements, complete, remaining, start, tweenValue) {
        return $this.text((Math.round(tweenValue)).toLocaleString());
      }
    });
  });

});

$(document).ready(function() {

  $(window).scroll(function(event) {
    var scrl = $(this).scrollTop();
/*    $(".mainAbout").css({
      "transform" : "translate(0%, "+ scrl/4 +"%"
    });*/

   $("#headerWrap").css({
      "transform" : "translate(0%, -"+ scrl/17 +"%"

    });


  });

});


