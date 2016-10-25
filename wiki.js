$(document).ready(function(){
  $(".roam").on("click", function(){
    event.preventDefault();
    window.open($(this).attr("href"));
  });//open a new tab when clicked

  $(".searchbutton").on("click", function(event){
    var fields = $(".tosearch").serializeArray();

    console.log(fields);
    //returns an object array
    var jsonstr = JSON.stringify(fields);
    console.log(jsonstr);
    //object2string
    console.log(JSON.parse(jsonstr));
    //string2object

    var o = {};

    $(fields).each(function(index, element){
      if (o[element.name] !== undefined) {
        if (!o[element.name].push) {
          o[element.name] = [o[element.name]];
        }
      }else{
        o[element.name] = element.value || "";
      }
    });

    console.log(o);//json2 JS object

  });
});