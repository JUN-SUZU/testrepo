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
    // デバイスによって並びは同じにする(Cumulative Layout Shift対策)

    // 速度が速い場合かつ従量課金制でないかつ高解像度の場合は2秒後に画像を高解像度に置き換える
});