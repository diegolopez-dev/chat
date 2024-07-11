import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const form = document.getElementById("form");
const input = document.getElementById("input-message");
const messages = document.getElementById("messages");
const nameInput = document.getElementById("name");
const messageTone = new Audio('/tone.mp3')

nameInput.focus()

const socket = io({
  auth: {
    user: nameInput.value,
    content: messages.value,
    serverOffset: 0,
  },
});

function addMessageToUI(content, serverOffset, user) {
  const item = `
      <li id="message-left">
        <p id="message">${content}</p>
        <span id="username">${user}</span>
      </li>`;
  messages.innerHTML += item
  socket.auth.serverOffset = serverOffset;
  messages.scrollTop = messages.scrollHeight;
  input.value = "";
}

function sendMessage() {
  const fecha = new Date()
  if (input.value && nameInput.value) {
    socket.emit("message", input.value, nameInput.value + " | " + fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + " | " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds())
    addMessageToUI(content, serverOffset, user)
  }
  input.value = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage()
});

socket.on("chat message", (content, serverOffset, user) => {
  addMessageToUI(content, serverOffset, user)
  messageTone.play()
});
