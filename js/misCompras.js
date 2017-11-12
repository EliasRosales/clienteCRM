$(function () {

    $(".rateyo").rateYo({

        rating: 0,
        numStars: 5,
        precision: 0,
        minValue: 1,
        maxValue: 5
    }).on("rateyo.change", function (e, data) {

        $("#calificacion").text(data.rating);
    });
    $(".rateyo1").rateYo({

        rating: 0,
        numStars: 5,
        precision: 0,
        minValue: 1,
        maxValue: 5
    }).on("rateyo.change", function (e, data) {

        $("#calificacion1").text(data.rating);
    });
    $(".rateyo2").rateYo({

        rating: 0,
        numStars: 5,
        precision: 0,
        minValue: 1,
        maxValue: 5
    }).on("rateyo.change", function (e, data) {

        $("#calificacion2").text(data.rating);
    });
    $(".rateyo3").rateYo({

        rating: 0,
        numStars: 5,
        precision: 0,
        minValue: 1,
        maxValue: 5
    }).on("rateyo.change", function (e, data) {

        $("#calificacion3").text(data.rating);
    });
    $(".rateyo4").rateYo({

        rating: 0,
        numStars: 5,
        precision: 0,
        minValue: 1,
        maxValue: 5
    }).on("rateyo.change", function (e, data) {

        $("#calificacion4").text(data.rating);
    });
    $(".rateyo5").rateYo({

        rating: 0,
        numStars: 5,
        precision: 0,
        minValue: 1,
        maxValue: 5
    }).on("rateyo.change", function (e, data) {

        $("#calificacion5").text(data.rating);
    });
    $(".rateyo6").rateYo({

        rating: 0,
        numStars: 5,
        precision: 0,
        minValue: 1,
        maxValue: 5
    }).on("rateyo.change", function (e, data) {

        $("#calificacion6").text(data.rating);
    });

});
