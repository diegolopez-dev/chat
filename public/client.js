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
  if (input.value && nameInput.value) {
    socket.emit("message", input.value, nameInput.value)
    addMessageToUI(true, msg, serverOffset, username)
  }
  else {
    nameInput.focus()
    alert("Introduce nombre y mensaje")
  }
  input.value = "";
}

function addMessageToUI(isOwnMessage, msg, serverOffset, username) {
  const item = `
      <li id="${isOwnMessage ? 'message-right' : 'message-left'}">
        <p id="message">${msg}</p>
        <span>${username}</span>
      </li>`;
  messages.innerHTML += item
  socket.auth.serverOffset = serverOffset;
  messages.scrollTop = messages.scrollHeight;
  input.value = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage()
});

socket.on("chat message", (msg, serverOffset, username) => {
  messageTone.play()
  addMessageToUI(false, msg, serverOffset, username)
});
