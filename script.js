const chatForm = document.querySelector('#chatForm');
const chatInput = document.querySelector('#chatInput');
const chatMessages = document.querySelector('#chatMessages');
const chatCard = document.querySelector('.chat-card');
const toggleChatSize = document.querySelector('#toggleChatSize');

toggleChatSize.addEventListener('click', () => {
  const isExpanded = chatCard.classList.toggle('expanded');
  toggleChatSize.setAttribute('aria-pressed', String(isExpanded));
  toggleChatSize.setAttribute('aria-label', isExpanded ? 'Chatfenster verkleinern' : 'Chatfenster vergrößern');
  toggleChatSize.innerHTML = isExpanded ? '<span aria-hidden="true">⛶</span> Verkleinern' : '<span aria-hidden="true">⛶</span> Vergrößern';
  if (isExpanded) chatMessages.scrollTop = chatMessages.scrollHeight;
});

function addMessage(text, who) {
  const message = document.createElement('div');
  message.className = `message ${who}-message`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function demoReply(question) {
  const text = question.toLowerCase();
  if (/[0-9]+\s*[+]\s*[0-9]+/.test(text)) return 'Das sieht nach einer Plusaufgabe aus! Zähle die erste Zahl und dann die zweite dazu. Du schaffst das. 😊';
  if (text.includes('hilfe') || text.includes('schwer')) return 'Gern helfe ich dir. Wir machen kleine Schritte: Lies die Aufgabe einmal ruhig, markiere wichtige Wörter und beginne mit dem ersten Schritt.';
  if (text.includes('hallo')) return 'Hallo! Ich freue mich, mit dir zu lernen. Was möchtest du ausprobieren?';
  return 'Das ist eine gute Frage! Erzähl mir gern noch ein bisschen mehr – dann denken wir Schritt für Schritt darüber nach.';
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;
  addMessage(question, 'user');
  chatInput.value = '';
  window.setTimeout(() => addMessage(demoReply(question), 'aeg'), 350);
});

const tips = {
  Mathe: 'Mini-Übung: 8 + 4 = ? Zeichne erst 8 Punkte und dann 4 weitere. Wie viele sind es zusammen?',
  Deutsch: 'Mini-Übung: Finde ein Wort mit dem Buchstaben A. Kannst du damit einen kurzen Satz schreiben?',
  Englisch: 'Mini-Übung: „Hello“ heißt „Hallo“. Wie würdest du jemanden freundlich auf Englisch begrüßen?'
};
document.querySelectorAll('.topic').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.topic').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelector('#learningTip').textContent = tips[button.dataset.topic];
  });
});

let seconds = 5 * 60;
let intervalId = null;
const timer = document.querySelector('#timer');
const startTimer = document.querySelector('#startTimer');
const timerMessage = document.querySelector('#timerMessage');
function renderTimer() { timer.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }
startTimer.addEventListener('click', () => {
  if (intervalId) { clearInterval(intervalId); intervalId = null; startTimer.textContent = 'Weiter'; timerMessage.textContent = 'Kurz pausiert. Du kannst weitermachen, wenn du bereit bist.'; return; }
  startTimer.textContent = 'Pause'; timerMessage.textContent = 'Gut gemacht – bleib bei einer Sache nach der anderen.';
  intervalId = window.setInterval(() => {
    seconds -= 1; renderTimer();
    if (seconds <= 0) { clearInterval(intervalId); intervalId = null; startTimer.textContent = 'Nochmal'; timerMessage.textContent = 'Geschafft! Jetzt ist eine kleine Pause verdient. 🎉'; }
  }, 1000);
});
document.querySelector('#resetTimer').addEventListener('click', () => { clearInterval(intervalId); intervalId = null; seconds = 5 * 60; renderTimer(); startTimer.textContent = 'Start'; timerMessage.textContent = 'Bereit? Fünf Minuten schaffen wir gemeinsam.'; });

const motivations = ['Du musst nicht alles sofort können. Üben ist ein super Anfang!', 'Kleine Schritte sind auch Schritte. Du bist auf einem guten Weg!', 'Fehler sind Lernhelfer: Sie zeigen dir, was du als Nächstes üben kannst.', 'Du darfst dir Zeit nehmen. Ruhig bleiben und weiterprobieren!'];
let motivationIndex = 0;
document.querySelector('#newMotivation').addEventListener('click', () => { motivationIndex = (motivationIndex + 1) % motivations.length; document.querySelector('#motivationText').textContent = motivations[motivationIndex]; });
