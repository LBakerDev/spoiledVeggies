$.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?')
            .done(function (area) {
                area1 = area.city;
            });

$(".show").on('click', function (e) {

    var url
    $.ajax({
        url: "https://geoip-db.com/jsonp",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        async: false,
        data
    })
})