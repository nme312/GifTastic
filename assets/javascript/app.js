$(document).ready(function () {

    var topics = [
        "superheros",
        "books",
        "car",
        "music",
        "movies",
        "the office"
    ];

    var API_KEY = "h70cZoZOFSjjIar9455xHj8U1Eg9nal3";
    var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&rating=&q=";

    for (i = 0; i < topics.length; i++) {

        var button = $("<button>");
        button.text(topics[i]);
        button.addClass("btn btn-info topic");
        $("#buttons").append(button);
    }

    function createImage(response, i) {
        var img = $("<img class='giphy-img'>");
        var rating = $("#rating");
        //set the src of the element
        img.attr("src", response.data[i].images.downsized_still.url);
        img.attr("data-animated", response.data[i].images.downsized.url);
        img.attr("data-still", response.data[i].images.downsized_still.url);
        img.attr("data-state", "still");

        var gifCard = $("<div class='gif-card'>");
        var pRating = $("<p>");

        gifCard.append(img);
        pRating.append("Rating: " + response.data[i].rating);
        gifCard.append(pRating);

        return gifCard;
    }

    $(document).on("click", ".topic", function () {
        // console.log(this);
        $("#gifs").empty();
        $.ajax({
            method: "GET",
            url: requestUrl + $(this).text()
        }).then(function (response) {
            // console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var img = createImage(response, i);
                // console.log(response.data[i].rating);
                $("#gifs").append(img);
            }
        });
    });

    $(document).on("click", ".giphy-img", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("data-state", "animated");
            $(this).attr("src", $(this).attr("data-animated"));
        } else {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("data-still"));
        }
    });
    var searchButton = $("#search-button");
    searchButton.addClass("btn btn-info");

    $(searchButton).on("click", function () {
        var query = $("#query").val();
        var button = $("<button>");
        button.text(query);
        button.addClass("btn btn-info topic");
        $("#buttons").append(button);
    });
});