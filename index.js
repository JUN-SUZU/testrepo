function getDeviceType() {
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
        return 'smartphone';
    }
    else if (ua.indexOf('iPad') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1)) {
        return 'tablet';
    }
    else {
        return 'pc';
    }
}
let deviceType = getDeviceType();


window.addEventListener('load', function() {
    // device typeによって表示サイズとレイアウトを変更
    if (deviceType == 'smartphone') {
        document.getElementById('headerpt').style.display = 'none';
        document.getElementsByTagName('main')[0].style.width = '100%';
        Array.from(document.getElementsByTagName('article')).forEach(element => {
            element.style.width = '80%';
        });
    }
});