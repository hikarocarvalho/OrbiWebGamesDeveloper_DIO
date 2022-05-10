const body = document.getElementById('body');
const gameBackground = document.getElementById('game-background');

const setFullScreen =()=>{
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
}

const setScreenOrientation =()=>{
    const heightScreen = window.innerHeight;
    const widthScreen = window.innerWidth;
    setFullScreen();
    if(widthScreen<heightScreen){
        screen.orientation.lock("portrait")
        .then(function() {
            alert('Locked');
        })
        .catch(function(error) {
            alert(error);
        });
    }
}

setScreenOrientation();