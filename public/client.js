import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import Swal from 'sweetalert2'

const getUsername = async () => {
  Swal.fire({
    title: "Ingrese su Nombre",
    input: "text",
    inputAttributes: {
      autocapitalize: "on",
    },
    showCancelButton: false,
    confirmButtonText: "Ingesar",
  }).then((result) => {
    username.textContent = result.value;
    nameUser = result.value;
    socket.emit("userConnection", {
      user: result.value,
    });
  });
  // const username = localStorage.getItem("username");
  // if (username) {
  //   console.log(`User existed ${username}`);
  //   return username;
  // }

  // const res = await fetch('https://randomuser.me/api/?results=2');
  // const { username: randomUsername } = await res.json();

  // localStorage.setItem("username", randomUsername);
  // return randomUsername;
};

const socket = io({
  auth: {
    username: await getUsername(),
    serverOffset: 0,
  },
});

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const username = document.getElementById("username");

socket.on("chat message", (msg, serverOffset, username) => {
  const item = `<li>
        <p>${msg}</p>
        <small>${username}</small>
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
