$(document).ready(function(){
  $(".roam").on("click", function(){
    event.preventDefault();
    window.open($(this).attr("href"));//open a new tab when clicked
  });

  $(".discover").on("click", function(event){
    $("#displayzone").empty();
    var fields = $(".searcharea").serializeArray();
    var title = fields[0].value;
    // Use JSONP to get data
    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + title,
      type: "GET",
      dataType: "jsonp",
      headers: { 'Api-User-Agent': 'Example/1.0' },
      jsonp: "callback",
      jsonpCallback:"callbackFunciton",
      success: function(r) {
        console.log("request succeeded");
        console.log(r.query);
        displayResults(r.query.pages);//should pass r.query.pages instead of r or r.query
        scrollDown(event);
      },
      error: function(e) {
        $("<p class='errmsg'>Sorry, an error occurs.</p>").appendTo("#displayzone");
      }
    });
  });
});

function displayResults(data) {
  var list = $("<ul class='results'></ul>");
  $.each(data, function(key, element){
    var linkElem = $("<a name='" + key +"' href='http://en.wikipedia.org/?curid=" + key + "'></a>");
    $("<li><h1>" + element.title + "</h1><p>" + element.extract + "</p></li>").appendTo(linkElem);
    $(linkElem).appendTo(list);
  });
  $(list).appendTo("#displayzone");
}

function scrollDown(event){
  event.preventDefault();
  $("html body").animate({scrollTop: $("#displayzone").offset().top}, 1000);
  return false;
}