$( document ).ready(function() {
  var el;
  // Fall back for if the API is down.
  	$.ajax({
    url: "http://product-pull.herokuapp.com/collections?collection=strollers&Vendor=&Type=&Feature=&sort=high&range=",
      error: function(error){
        $('#filterPieces').hide();
      },
      success:function(){
      	$('#filterPieces').show();
        $.each($('.filterClick'),function(i,val){
        $(val).prop('checked',false);
        })
    	}
  })
  // ----------

// 10/31/16 - fed event into function arguement
$(".mulitWrapper").click(function(event){
    if($('.activeDropdown-dropdown').length >= 1){
      if( $(event.target).hasClass('activeDropdown-title') || $(event.target).parent().hasClass('activeDropdown-title') ){
        //this is if dropdown is open and we click on the title to close it
      closeDropdowns();
      }else{
        //this is if dropdown is open and we click on another dropdown
         if($(event.target).closest('.filter-parent-wrapper').attr('id') != "MobileFilter"){
           closeDropdowns();
          }
         el = $(event.target)[0].closest('.mulitWrapper')
         el = $(el).children()
         $(el[0]).toggleClass("upsideDown").toggleClass("activeDropdown-title");
         $(el[1]).toggleClass("fadeDown").toggleClass("activeDropdown-dropdown");
         event.stopPropagation();
      }
    }
    else{
      el = $(this).children()
      $(el[0]).toggleClass("upsideDown").toggleClass("activeDropdown-title");
      $(el[1]).toggleClass("fadeDown").toggleClass("activeDropdown-dropdown");
      event.stopPropagation();
    }
})



$(document).on('click', function(event) {
  if($('.activeDropdown-dropdown').length >= 1){ //a dropdown has been opened
    if( ($(event.target)!= $('.activeDropdown-dropdown'))) {
      closeDropdowns();
    }
  }
  if($('.activeSort').length >= 1){ //a sort dropdown has been opened
    if( ($(event.target)!= $('#sortByList')) || $(event.target)!= $('#sortBySpecial')){
      closeSortDropdown();
    }
  }
});

var filterwrapper = $('.filterlist-wrapper')
for(var x=0;x<filterwrapper.length;x++){
  if(filterwrapper[x].children.length <= 1){
    $(filterwrapper[x]).closest('.filter-parent-wrapper').css('display','none')
  }
}

function closeDropdowns(){
    $('.activeDropdown-dropdown').toggleClass("fadeDown").removeClass('activeDropdown-dropdown')
    $('.activeDropdown-title').toggleClass("upsideDown").removeClass('activeDropdown-title')
}

function closeSortDropdown(){
  $('#sortBySpecial').toggleClass("activeSort")
  $('.activeSortDropdown-dropdown').toggleClass("fadeDown").removeClass('activeSortDropdown-dropdown')
  $('.activeSortDropdown-title').toggleClass("upsideDown").removeClass('activeSortDropdown-title')
}


// 10/31/16 - fed event into function arguement
  var sortContainer = document.getElementById('sortBySpecial')
  sortContainer.addEventListener('click',function(event){
	 	       el = $('#sortBySpecial').children()
          $('#sortBySpecial').toggleClass("activeSort")
          $(el[1]).toggleClass("fadeDown").toggleClass("activeSortDropdown-dropdown")
          $(el[0]).toggleClass("upsideDown").toggleClass("activeSortDropdown-title");
          event.stopPropagation();
  });

 $('.sortSpecial').on('click',function(){
    $('.sortSpecial').css('font-weight','normal');
    $(this).css('color','black');

  });

})
