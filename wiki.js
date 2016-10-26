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
      url: 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + title,
      type: "GET",
      dataType: "jsonp",
      headers: { 'Api-User-Agent': 'Example/1.0' },
      jsonp: "callback",
      jsonpCallback:"flightHandler",
      success: function(r) {
        console.log("request succeeded");
        console.log(r.query);
        displayResults(r.query);//should pass r.query.pages instead of r or r.query
      },
      error: function(e) {
        console.log(e);
      }
    });
  });
});

function displayResults(data) {
  var list = $("<ul name='results'></ul>");
  $(data).each(function(key, element){
    var linkElem = $("<a name='" + key +"' href='http://en.wikipedia.org/?curid=" + key + "'></a>");
    $("<h1>" + element.title + "</h1><p>" + element.extract + "</p>").appendTo(linkElem);
    $(linkElem).appendTo(list);
  });
  $(list).appendTo(".displayZone");
}
