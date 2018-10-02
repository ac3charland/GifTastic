var key = "uoRDvxXuQcBJD859qYRawyPH26j2wynX";
var topics = ["Archer", "Bojack Horseman", "Game of Thrones", "Big Mouth", "Star Trek: The Next Generation", "Arrested Development"];

function displayTopics() {
    $("#buttons").empty();
    
    topics.forEach(function (topic) {
        var button = $("<button>");
        button.attr("value", topic);
        button.addClass("btn");
        button.addClass("btn-success");
        button.addClass("topic");
        button.text(topic);
        $("#buttons").append(button);
    })
}

$(document).ready(function() {
    displayTopics();

    $(document).on("click", "#submit", function() {
        event.preventDefault();
        var topic = $("#newTopic").val().trim();
        topics.push(topic);
        displayTopics();
    })

    $(document).on("click", ".topic", function() {
        $("#gif-container .col-md-4").empty();
        
        var topic = $(this).attr("value");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + topic;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var columnCount = 1;

            response.data.forEach(element => {
                var gifURL = element.images.original.url;
                var stillURL = element.images.original_still.url;
                var title = element.title;

                var gifTile = $("<div>");
                gifTile.addClass("gif-tile");
                gifTile.addClass("text-center");

                var titleBar = $("<h6>");
                titleBar.text(title);
                titleBar.addClass("title");
                gifTile.append(titleBar);

                var gif = $("<img>");
                gif.addClass("gif");
                gif.addClass("img-fluid");
                gif.attr("src", stillURL);
                gif.attr("alt", title);
                gif.attr("state", "still");
                gif.attr("gifURL", gifURL);
                gif.attr("stillURL", stillURL);

                gifTile.append(gif);

                var rating = $("<h5>");
                rating.text("Rating: " + element.rating.toUpperCase());
                rating.addClass("rating");
                gifTile.append(rating);

                $("#col" + columnCount).append(gifTile);

                if (columnCount == 3) {
                    columnCount = 1;
                } else {
                    columnCount++;
                }
            });
        });
    });

    $(document).on("click", ".gif", function() {
        var state = $(this).attr("state");

        if (state == "still") {
            var gifURL = $(this).attr("gifURL")
            $(this).attr("state", "gif");
            $(this).attr("src", gifURL);
        } else if (state == "gif") {
            var stillURL = $(this).attr("stillURL");
            $(this).attr("state", "still");
            $(this).attr("src", stillURL);
        }
    });
});