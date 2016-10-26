$(document).ready(function(){
  $(".roam").on("click", function(){
    event.preventDefault();
    window.open($(this).attr("href"));//open a new tab when clicked
  });

  $(".searchbutton").on("click", function(event){
    var fields = $(".tosearch").serializeArray();
    var title = fields[0].value;
    // Using jQuery

    $.ajax({
      url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=" + title +"&format=json&exintro=1",
      type: "GET",
      dataType: "json",
      jsonp: "jsonpCallback",
      success: function(r) {
        console.log(r);
      },
      error: function(e) {
        console.log(e);
      }
    });

  });
});