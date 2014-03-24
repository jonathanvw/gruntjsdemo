var keyframes = findKeyframesRule("spin-vertical");
var count=0;
var rotDeg = 60;
var cheating = false;
var sabotage = false;
var cheatingCode=0;
var failingCode=0;
var $shoots=$(".coin-shoot").add(".coin-shoot:before");
var $coin = $(".coin");
var $outerWrapper = $(".outer-wrapper");

// search the CSSOM for a specific -webkit-keyframe rule
function findKeyframesRule(rule){
  var ss = document.styleSheets;
  for (var i = 0; i < ss.length; ++i) {
    for (var j = 0; j < ss[i].cssRules.length; ++j) {
      // find the -webkit-keyframe rule whose name matches our passed over parameter and return that rule
      if (ss[i].cssRules[j].type === window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name === rule){
        return ss[i].cssRules[j];
      }
    }
  }
  return null;
}


function renderSlots(){
  var unit = $(".cube-wrap").width();
  var rate = 0.075;
  $(".cube-wrap").css({"-webkit-perspective" : unit*6 + "px"});
  $(".cube div").css("height",unit + "px");
  $(".cube-wrap.vertical .cube").each(function(){
    $(this).css({"-webkit-transform-origin": "0 " + unit*0.5 + "px", "-webkit-animation-name":"spin-vertical","-webkit-animation-duration": rate + "s","-webkit-animation-iteration-count": "1", "-webkit-animation-direction":"normal", "-webkit-transform-style":"preserve-3d","-webkit-animation-fill-mode":"both","-webkit-animation-timing-function":"linear" });
  });
  unit *= 0.865;
  $(".depth div.first-pane").css({"-webkit-transform":  "translateZ(" + unit + "px) rotateX(0deg)"});
  $(".depth div.second-pane").css({"-webkit-transform": "rotateX(60deg) translateZ(" + unit + "px)"});
  $(".depth div.third-pane").css({"-webkit-transform": "rotateX(120deg) translateZ(" + unit + "px)"});
  $(".depth div.fourth-pane").css({"-webkit-transform":  "translateZ("+ -unit + "px) rotateX(180deg)"});
  $(".depth div.fifth-pane").css({"-webkit-transform": "rotateX(240deg) translateZ(" + unit + "px)"});
  $(".depth div.sixth-pane").css({"-webkit-transform": "rotateX(300deg) translateZ(" + unit + "px)"});
}

function roll(){
  $(".cube").each(function(i){
    rotateFace($(this)); 
    $(this).delay(300*i).queue(function(){$(this).addClass("running");});
  });
  if(cheating===true){
    $shoots.animate({
      height: "100%"
    }, 600,function(){
    setTimeout(function(){
      $(".overlay").animate({
        bottom: "0%"
        }, 4000,"easeInOutQuart",function(){
          $(".grunt").fadeIn('slow'); 
        });
    },800); 
    });
  }
}

// Bind a callback function when the wheel animation ends (looping it with an iteration counter)
function rotateFace(wheel){
  wheel.bind("webkitAnimationEnd", function(){startChange(wheel);});
}

// begin the new animation loop 
function startChange(wheel){
  var random = Math.floor((Math.random()*10)+1);
  // remove the old animation from our object
  wheel.css("-webkit-animation-name","none");
  // call the change method, which will update the keyframe animation
  setTimeout(function(){change("spin-vertical",wheel, random);}, 0);
}

// add new keyframes for animation loop 
function change(anim,that,random){
  // create new 0% and 100% rules with random numbers
  keyframes.insertRule("0% { -webkit-transform: rotateX("+(rotDeg)+"deg); }");
  keyframes.insertRule("100% { -webkit-transform: rotateX("+(rotDeg+60)+"deg); }");
  // assign the animation to our element (which will cause the animation to run)
  that.css("webkit-animation-name",anim);
  rotDeg -=60;
  if(sabotage===true){
    rotDeg = 60;
    that.removeClass("running");
    stopRotate(that);
  }else if(cheating===true){
    //End on the bitcoin face jackpot
    rotDeg = 60;
    that.removeClass("running");
    stopRotate(that);
  }else{
    if(rotDeg<=-360-random*60){
      rotDeg+=780;
      that.removeClass("running");
      stopRotate(that);
    }
  }
}

function stopRotate(wheel){
  wheel.unbind("webkitAnimationEnd");
}
function animateBall(limit, iterator, delay){
    if(count===limit) {
        return;
    }
    $(".lever-ball").removeClass().addClass("lever-ball").addClass("ball-"+ count);
    count+=iterator;
    setTimeout(function(){
        animateBall(limit, iterator, delay);
    },delay);
}
function fixer(){
  // TODO : Deliberate typo below.  Should be sabotage===true 
  try{
    if(sabotage===true || $outerWrapper.hasClass("troll")){ 
      sabotage=false;
      $outerWrapper.removeClass("troll");
    }
  }
  catch(err){
    console.log(err);
  }
}


$(document).ready(function(){
  fixer();
  renderSlots();
  roll();
  $(window).resize(function(){renderSlots();});

  $(".lever-ball").click(function(){
      if($(".coin").hasClass("inserted")){
          fixer();
          if(cheatingCode===3){cheating=true;}else if(failingCode===3 || sabotage ===true || $outerWrapper.hasClass("troll")){sabotage=true; $outerWrapper.addClass("troll");}
          $(".coin").hide().removeClass("inserted").delay(2000).fadeIn("fast").addClass("sway");
          animateBall(9,1,120);
          $('.lever-ball').animate({textIndent: 0}, {
              step: function() {
                $(this).css('-moz-transform','rotateX(70deg)');
                $(this).css('-webkit-transform','rotateX(70deg)');
                $(this).css('-o-transform','rotateX(70deg)');
                $(this).css('transform','rotateX(70deg)');
              },
              duration: 1500,
              complete: function(){
                $(".led-box").removeClass("readyState").addClass("pulse");
                roll();
              }
          });
          $('.lever-wrapper').animate({textIndent: 0}, {
              step: function() {
                $(this).css('-moz-transform','rotateX(-70deg)');
                $(this).css('-webkit-transform','rotateX(-70deg)');
                $(this).css('-o-transform','rotateX(-70deg)');
                $(this).css('transform','rotateX(-70deg)');
              },
              duration: 1500,
              complete: function(){
                $(".cube").addClass("running");
                animateBall(0,-1,90);
              }
          });
          $('.lever-ball').add('.lever-wrapper').animate({textIndent: 0}, {
              step: function() {
                $(this).css('-moz-transform','rotateX(0deg)');
                $(this).css('-webkit-transform','rotateX(0deg)');
                $(this).css('-o-transform','rotateX(0deg)');
                $(this).css('transform','rotateX(0deg)');
              },
              duration: 1500,
              complete: function(){cheating=false;sabotage=false;cheatingCode=0;failingCode=0; }
          });
      }else{
        $(".led-box").removeClass("pulse").addClass("errorState");
        setTimeout(function(){$(".led-box").removeClass("errorState").addClass("pulse");},1500);
        failingCode++;
        return;
      }
  });

  $coin.hover(
    function(){
      if(!$(this).hasClass("inserted")){
        $(this).removeClass("sway");
      }
    },
    function(){
      if(!$(this).hasClass("inserted")){
        $(this).addClass("sway"); 
      }
    }
  ).click(function(){
      $(this).addClass("inserted");
      $(".led-box").removeClass("pulse").addClass("readyState");
      cheatingCode++;
  });
});
