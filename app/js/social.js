'use strict';

var socialShare = (function() {

    var
        host = "http://omletdog.ru/",

        shareWindowWidth = 650, // Ширина окна
        shareWindowHeight = 500, // Высота окна
        marginLeft = screen.availWidth / 2 - shareWindowWidth / 2,
        marginTop = screen.availHeight / 2 - shareWindowHeight / 2,
        serviceUrl = host,
        title = document.title,
        text = document.getElementsByName('description')[0].getAttribute('content');


    function addEventListener() {
        $('#vk').on('click', vk);
        $('#fb').on('click', fb);
        $('#twitter').on('click', twitter);
    }

    function vk(e) {
            var url = '';
            e.preventDefault();
            url = 'http://vk.com/share.php?';
            url += 'url=' + encodeURIComponent(serviceUrl);
            url += '&title=' + encodeURIComponent(title);
            url += '&description=' + encodeURIComponent(text);
            url += '&noparse=true';
            popup(url);
        }
    function fb(e) {
        var url = '';
        e.preventDefault();
        url = 'http://www.facebook.com/sharer.php?s=100';
        url += '&p[title]=' + encodeURIComponent(title);
        url += '&p[summary]=' + encodeURIComponent(text);
        url += '&p[url]=' + encodeURIComponent(serviceUrl);
        popup(url);
    }

    function twitter(e) {
            var url = '';
            e.preventDefault();
            url = 'http://twitter.com/share?';
            url += 'text=' + encodeURIComponent(title);
            url += '&url=' + encodeURIComponent(serviceUrl);
            url += '&counturl=' + encodeURIComponent(url);
            popup(url);
        }
    function popup(linkUrl) {
        window.open(linkUrl, '_blank', 'toolbar=0,status=0,width=' + shareWindowWidth + ',height=' + shareWindowHeight + ',left=' + marginLeft + ', top=' + marginTop);
    }

    return {
        init: function() {
            addEventListener();
        }
    };
}());