
function generate_quote (){
var colors = ["#589e9b","#6de871","#adaa00","#e8ab3f","#ff7051"];
var rand = Math.floor(Math.random() * colors.length);
var color_chose = colors[rand];
var currentQuote = '';
var currentAuthor = '';
 // go to to https://market.mashape.com/ 
 // log in using "X-Mashape-Key"
 // chose widget "random-famous-quotes"
  $.ajax({
    
    headers: {
      "X-Mashape-Key": "i4enGpB10Dmsh5hwBBxeUIqa8M8Mp1i9hLejsneKK8ZmUubqrB",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }, // header close
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/",  
// if login sucsess - parse quote and autor name
    success: function(response){
     
      var resp = "";
      $.removeData( [resp] );
    resp = JSON.parse(response);
    currentQuote = resp.quote;
    currentAuthor = resp.author; 
  
  //$('#new-quote').on('click', generate_quote ());
// in this case gonna be link creating script    
    var qurl = resp.quote.replace(/[ /]/g,'%20');
    var aurl = resp.author.replace(/[ /]/g,'%20'); 
  $('#tweet-quote').on('click', function() {
    window.open('https://twitter.com/intent/tweet?hashtags=quotes&text="'+ qurl +'" -' + aurl); 
  });
      
 //--------don't figure out how to create "tumblr post"     
  $('#tumblr-quote').on('click', function() {
    window.open("https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&title=Quote%20Machine&content=" + qurl + "&caption=" + aurl);
  });
//---------don't figure out how to create "tumblr post" 
      
// fade qote block in 500ms   
    $("#aphorism").animate({
          opacity: 0
        }, 500,
// past response to the qote block and appear it in 500ms
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#text').text(currentQuote);
        });
// fade qote block in 500ms 
      $("#aphorism-autor").animate({
          opacity: 0
        }, 500,
 // past response to the qote block and appear it in 500ms
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#author').html("- " + currentAuthor);
        });
      
 // smoothly color change     
      $("html body").animate({
        backgroundColor: color_chose
      }, 1000);
      $("#aphorism_block").animate({
        color: color_chose
      }, 1000);
      $(".button").animate({
        backgroundColor: color_chose
      }, 1000);
 
      } //success close
  }); // ajax close
}; //generate quote close


