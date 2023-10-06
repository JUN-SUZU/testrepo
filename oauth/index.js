function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

function loadBigResource() {
    // backgroundimage=./cyber.png
    let bg = document.getElementById('bg');
    bg.style.backgroundImage = 'url(./cyber.png)';
}

window.onload = function () {
    const connectionInfo = navigator.connection;
    if (connectionInfo !== undefined) {
        const init = function () {
            if (((connectionInfo.type == 'wifi' || connectionInfo.type == undefined) && connectionInfo.downlink > 5) || (connectionInfo.type == 'cellular' && connectionInfo.downlink > 5 && !connectionInfo.saveData)) {
                loadBigResource();
            }
            else {
                console.log('Not enough bandwidth to load big resource');
            }
        };
        init();
        if ('onchange' in connectionInfo) {
            connectionInfo.addEventListener('change', init);
        } else if ('ontypechange' in connectionInfo) {
            connectionInfo.addEventListener('typechange', init);
        }
    }

};