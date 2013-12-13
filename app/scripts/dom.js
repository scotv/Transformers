$(function () {
    var sh = ($(window).height() - 425) / 2;
    var cp = 0;
    $('div.charmcontainer').css('margin-top', sh);
    $('div img').each(function (index) {
        var leftTrigger = $('#leftPicker')[0];
        var rightTrigger = $('#rightPicker')[0];
        new mlPushMenu(document.getElementById('mp-menu'), leftTrigger);
        new mlPushMenu(document.getElementById('mp-menu'), rightTrigger);
        $("div.hidden-bar").hover(
            function () {

                $('div.charmbar').stop().animate({ right: 0 }, 500);
                $('div img').each(function (index) {
                    $(this).stop().delay(50 * index).animate({ right: 0 }, 500);
                });
            });

        $("div.charmbar").on('click', function () {

            $('div.charmbar').stop().animate({ right: '-85px'}, 500);
            $('div img').each(function (index) {
                $(this).stop().delay(50 * index).animate({
                    right: '-85px' }, 500);
            });

        });

        $(window).resize(function () {
            var viewportHeight = $('.content')[0].scrollHeight;
            var bodyHeight = $('body')[0].scrollHeight;
            $('div.content').css('height', bodyHeight);
            $('div.charmbar').css('height', viewportHeight);
            $('div.hidden-bar').css('height', viewportHeight);
        });
    });
});

