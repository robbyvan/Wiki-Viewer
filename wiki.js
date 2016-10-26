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
      url: "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='" + title + '&callback=JSON_CALLBACK',
      dataType: 'json',
      type: 'GET',
      headers: { 'Api-User-Agent': 'Example/1.0' },
      success: function(data) {
         console.log(data);
      },
      error: function(err){
        console.log(err);
      }
    });

  });
});