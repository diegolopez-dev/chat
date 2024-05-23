import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const nameInput = document.getElementById('name-input')

const getUsername = async () => {
  // const username = localStorage.getItem("username");
  // if (username) {
  //   console.log(`User existed ${username}`);
  //   return username;
  // }

  // const res = await fetch('https://randomuser.me/api/?results=10');
  // const { username: randomUsername } = await res.json();

  // localStorage.setItem("username", randomUsername);
  // return randomUsername;

  const username = nameInput.value;
  console.log(username)
  return username;
};

const socket = io({
  auth: {
    username: getUsername(),
    serverOffset: 0,
  },
});

socket.on("chat message", (msg, serverOffset) => {
  const item = `<li>
        <p>${msg}</p>
        <small>${socket.auth.username}</small>
      </li>`;
  messages.insertAdjacentHTML("beforeend", item);
  socket.auth.serverOffset = serverOffset;
  messages.scrollTop = messages.scrollHeight;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});
