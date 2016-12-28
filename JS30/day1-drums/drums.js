/*jshint esversion: 6 */
function getKeydown(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; //stop function working on keys we haven't got in the app
    playSound(audio, key);
}

function getClick(e){
    console.log(e);
    e.keyCode = e.path["1"].attributes["0"].nodeValue;
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    playSound(audio, key);
}

function playSound(audio, key) {
    audio.currentTime = 0; //reset sound file when same key pressed
    audio.play();
    key.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; //skip most events and listen for transform only
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key'); //select all keys
const letter = document.querySelectorAll('kbd');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', getKeydown); 
letter.forEach(key => key.addEventListener('click', getClick));


$(function(){
  $('.key').bind('tap',tapHandler);
 
  function tapHandler( event ){
     $(this).click();
  }
});