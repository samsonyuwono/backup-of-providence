$(function() {
  //for youtube video that plays when user clicks on secondary image
  $('img[alt ^= "https"]').each(function(){

    //takes url, grabs id
    var url = $(this).attr('alt');
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if(videoid != null) {
     console.log("video id = ",videoid[1]);
    } else {
      console.log("The youtube url is not valid.");
    }
    $(this).parent().parent().css('display', 'inline-block');

    //on click of li secondary image on product pages
    $(this).parent().parent().click(function(){

      //crete youtube video div and overlay div
      $('<div class="fluid-width-video-wrapper youtube-product" style="padding-top: 56.2%;"><iframe width="560" height="315" src="http://www.youtube.com/embed/' + videoid[1] + '" frameborder="0" allowfullscreen></iframe></div>').appendTo('body');
      $('<div class="youtube-overlay"></div>').appendTo('body');

      //style youtube video div and overlay div
      $('.youtube-product').css({
        'position': 'absolute',
        'top': '10%',
        'z-index': '100',
        'height': '50%',
        'width': '50%',
        'left': '25%'
      });
      $('.youtube-overlay').css({
        'position': 'absolute',
        'z-index': '99',
        'background-color': 'black',
        'opacity': '.7',
        'top': '0',
        'left': '0',
        'height': '100%',
        'width': '100%'
      });
      $('.youtube-product iframe').css('height', '50%');

      //on lick of overlay, remove youtube video and overlay
      $('.youtube-overlay').click(function(){
        $('.youtube-product').remove();
        $(this).remove();
      });
    });
  });

});//end on fuction ready
