import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const nameInput = document.getElementById("name");
const messageTone = new Audio('/tone.mp3')

nameInput.focus()

const socket = io({
  auth: {
    username: nameInput.value,
    messages: messages.value,
    serverOffset: 0,
  },
});

function sendMessage() {
  const fecha = new Date()
  if (input.value && nameInput.value) {
    socket.emit("message", input.value, "Enviado por " + nameInput.value + " a las: " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds())
    addMessageToUI(true, msg, serverOffset, username)
  }
  input.value = "";
}

function addMessageToUI(isOwnMessage, msg, serverOffset, username) {
  if (isOwnMessage) {
    const item = `
      <li id="message-right">
        <p id="message">${msg}</p>
        <span id="username">${username}</span>
      </li>`;
    messages.innerHTML += item
  }
  else {
    const item = `
      <li id="message-left">
        <p id="message">${msg}</p>
        <span id="username">${username}</span>
      </li>`;
    messages.innerHTML += item
  }
  socket.auth.serverOffset = serverOffset;
  messages.scrollTop = messages.scrollHeight;
  input.value = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage()
});

socket.on("chat message", (msg, serverOffset, username) => {
  addMessageToUI(false, msg, serverOffset, username)
  messageTone.play()
});
