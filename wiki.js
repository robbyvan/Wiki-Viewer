$(document).ready(function(){
  $(".roam").on("click", function(){
    event.preventDefault();
    window.open($(this).attr("href"));
  });//open a new tab when clicked

  $(".searchbutton").on("click", function(event){
    console.log($(".tosearch").serializeArray());
  });
});