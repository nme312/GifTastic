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
    var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=";

    var search = $("#search");
    topics.push(search);


    for (i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.text(topics[i]);

        $("#buttons").append(button);

        button.addClass("btn btn-info border");

        button.on("click", function () {
            console.log(this);
            $("#gifs").empty();
            $.ajax({
                method: "GET",
                url: requestUrl + $(this).text()
            }).then(function (response) {

                console.log(response.data.limit);
                for (var i = 0; i < response.data.length; i++) {
                    var img = $("<img>");
                    img.attr("src", response.data[i].images.downsized.url);
                    img.attr("data-animated", response.data[i].images.downsized.url);
                    img.attr("data-still", response.data[i].images.downsized_still.url);
                    img.attr("data-state", "animated");

                    img.on("click", function () {
                        var state = $(this).attr("data-state");
                        if (state === "animated") {
                            $(this).attr("data-state", "still");
                            $(this).attr("src", $(this).attr("data-still"));
                        } else {
                            $(this).attr("data-state", "animated");
                            $(this).attr("src", $(this).attr("data-animated"));
                        }
                    });
                    $("#gifs").append(img);
                }
            });


        });

    }
    // console.log(button);
    console.log("lets see if the rename worked");





});