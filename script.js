const audioContext = new (
  window.AudioContext ||
  window.webkitAudioContext
)();

const keys = document.querySelectorAll(".key");

function playKalimbaTone(frequency) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.value = frequency;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const now = audioContext.currentTime;

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.4, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 2
  );

  oscillator.start(now);
  oscillator.stop(now + 2);
}

function activateKey(element) {
  const frequency = Number(
    element.dataset.note
  );

  playKalimbaTone(frequency);

  element.classList.add("active");

  setTimeout(() => {
    element.classList.remove("active");
  }, 100);
}

keys.forEach((key) => {
  key.addEventListener("click", () => {
    activateKey(key);
  });
});

window.addEventListener("keydown", (event) => {
  const pressedKey = event.key.toUpperCase();

  const matchedKey = [...keys].find(
    (key) => key.dataset.key === pressedKey
  );

  if (!matchedKey) {
    return;
  }

  activateKey(matchedKey);
});
