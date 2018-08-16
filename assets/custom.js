$(document).ready(function() {
  
  setTimeout(function() {
    var dd = $('.single-option-selector#product-select-option-0');
    switchImages();
    
    dd.on('change', function() {
      switchImages();
    });
    
    function switchImages() {
      $('img', '.secondary-image-wrap').parent().parent().hide();
      $('img', '.secondary-image-wrap').each(function() {
        if($(this).attr('alt').indexOf(dd.val()) !== -1) {
          $(this).parent().parent().show();
        }
      });
    }
    
  }, 1);
  
});
