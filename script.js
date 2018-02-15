$(document).ready(function () {

    var getRandJoke = function(e)
    {
        e.preventDefault();
        var result = ""
        var myurl = "https://icanhazdadjoke.com/"
        $.ajax({
            url : myurl,
            dataType : "json",
            success : function(json)
            {
                console.log(json.joke);
                result +=`<div class="joke">` + json.joke + `</div>`;
                $('#rResults').html(result);
            }
        });
        
        
    };
    var getSearchResults = function(e)
    {
        e.preventDefault();
        var result = '';
        var value = $('#searchText').val();
        console.log(value);
        var myurl = "https://icanhazdadjoke.com/search?term=" + value;
        $.ajax({
            url : myurl,
            dataType : "json",
            success : function(json)
            {
                for(var i = 0 ; i < json.results.length ; i++)
                {
                    console.log(json.results[i].joke);
                    result +=`<div class="joke">` + json.results[i].joke + `</div>`;
                    result += "<hr>"
                }
                $('#sResults').html(result);
            }
        });
    }
    $('#searchSubmit').click(getSearchResults);
    $('#rand').click(getRandJoke);
 });