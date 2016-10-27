$(document).ready(function(){
  $(".roam").on("click", function(){
    event.preventDefault();
    window.open($(this).attr("href"));//open a new tab when clicked
  });

  $(".discover").on("click", function(event){
    var fields = $(".searcharea").serializeArray();
    var title = fields[0].value;
    if (title !== "" || $("#displayzone").children().length !== 0){
      if (title === "") {
        $("#displayzone").empty();
      }else {
        showResults(title);  
      }
    }
  });//if clicked Discover button

  $(document).keypress(function(event){
    if (event.which === 13) {
      var fields = $(".searcharea").serializeArray();
      var title = fields[0].value;
      if (title !== "" || $("#displayzone").children().length !== 0){
        if (title === "") {
          $("#displayzone").empty();
       }else {
         showResults(title);  
        }
    }
    }
  });// if pressed enter

  $("#displayzone").on("click", "a", function(event){
    event.preventDefault();
    window.open($(this).attr("href"));//open a new tab when clicked
  });// automatically scroll down to the results area
});

function showResults(title){
    $("#displayzone").empty();
    // Use JSONP to get data
    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + title,
      type: "GET",
      dataType: "jsonp",
      headers: { 'Api-User-Agent': 'Example/1.0' },
      jsonp: "callback",
      jsonpCallback: "callbackFunction",
      success: function(r) {
        console.log("request succeeded");
        // console.log(r.query);
        displayResults(r.query.pages);//should pass r.query.pages instead of r or r.query
        scrollDown(event);
      },
      error: function(e) {
        $("#displayzone").empty();
        $("<p class='errmsg'>Sorry, AJAX failed</p>").appendTo("#displayzone");
      }
    });
}

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