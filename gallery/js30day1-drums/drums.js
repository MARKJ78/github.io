/*jshint esversion: 6 */
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; //stop function working on keys we haven't got in the app
    audio.currentTime = 0; //reset sound file when same key pressed
    audio.play();
    key.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; //skip most events and listen for transform only
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key'); //select all keys
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
