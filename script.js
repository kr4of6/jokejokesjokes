$(document).ready(function () {

    var getRandJoke = function (e) {
        e.preventDefault();
        var result = ""
        var myurl = "https://icanhazdadjoke.com/"
        $.ajax({
            url: myurl,
            dataType: "json",
            success: function (json) {
                console.log(json.joke);
                result += `<div class="joke">` + json.joke + `</div>`;
                $('#rResults').html(result);
            }
        });


    };
    var getSearchResults = function (e) {
        e.preventDefault();



        var result = '';
        var value = $('#searchText').val();
        // console.log(value);
        var myurl = "https://icanhazdadjoke.com/search?term=" + value;
        $.ajax({
            url: myurl,
            dataType: "json",
            success: function (json) {

                var mygifurl = "http://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=G6b28WhJndDhJ5p2Ey4LNR0eGGRkQFHg&limit=5";
                $.ajax({
                    url: mygifurl,
                    dataType: "json",
                    success: function (jsonGif) {
                        if (json.results.length === 0) {
                            result += `<div class="joke">Sorry, no jokes found</div>`;
                        } else {

                            for (var i = 0; i < json.results.length && i < jsonGif.data.length; i++) {
                                // console.log(json.results[i].joke);
                                result += `<div class="joke">`
                                result += '<img src="' + jsonGif.data[i].images.fixed_height.url + '">'
                                result += `<p>` + json.results[i].joke + `<p>`;
                                result += `</div>`;
                                result += "<hr>"
                            }
                        }
                        $('#sResults').html(result);
                    }
                });

            }
        });
    }
    $('#searchSubmit').click(getSearchResults);
    $('#rand').click(getRandJoke);
    $('#try').click(getGif);
});