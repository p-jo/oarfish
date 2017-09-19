var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    events: {
      'onReady': onPlayerReady
    }
  });
}
function onPlayerReady() {
  player.playVideo();
  // Mute!
  player.mute();
}

$( document ).ready(function() {
  (function() {
    var wikipedia = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Oarfish&callback=?";
    $.getJSON( wikipedia )
    .done(function( data ) {
      $.each( data.query.pages, function( i, item ) {
        var words = item.extract.match( /[^\.!\?]+[\.!\?]+/g );
        var extract = words.slice(0,3).join(" ");
        var fullText =  words.slice(3).join(" ");
        $( "<p></p>" ).html(extract).appendTo( ".content" );
        $( "<p class='more'></p>" ).html(fullText).appendTo( ".content" ).hide();
      });

      $('.read-more').click(function(e){
        e.preventDefault();
        var link = $(this);
        $('.more').slideToggle('slow', function() {
          if ($(this).is(':visible')) {
            link.html('<i class="fa fa-angle-up fa-2x" aria-hidden="true"></i>');
          } else {
            link.html('<i class="fa fa-angle-down fa-2x" aria-hidden="true"></i>');
          }
        });
      });
    });
  })();
});
