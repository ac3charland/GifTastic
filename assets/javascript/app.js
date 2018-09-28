var key = "uoRDvxXuQcBJD859qYRawyPH26j2wynX";
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=cheezburger";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});