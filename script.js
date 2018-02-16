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
                        // for(var i = 0 ; i < json.data.length ; i++)
                        // {
                        // }
                        // $('#sResults').html(result);


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
    var getGif = function (e) {
        var result = "";
        e.preventDefault();
        var value = $('#searchText').val();
        var myurl = "http://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=G6b28WhJndDhJ5p2Ey4LNR0eGGRkQFHg&limit=5";
        $.ajax({
            url: myurl,
            dataType: "json",
            success: function (json) {
                console.log(json);
                // for(var i = 0 ; i < json.data.length ; i++)
                // {
                // result += '<img src="' + json.data[i].images.fixed_height.url + '">'
                // }
                // $('#sResults').html(result);
                return json;
            }
        });
    }
    $('#searchSubmit').click(getSearchResults);
    $('#rand').click(getRandJoke);
    $('#try').click(getGif);
});