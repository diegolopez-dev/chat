import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import { createClient } from "@libsql/client";
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Server } from "socket.io";
import { createServer } from "node:http";
import Swal from 'sweetalert2'

dotenv.config();

const port = process.env.PORT ?? 3000;
const app = express();
const server = createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const io = new Server(server, {
  connectionStateRecovery: {},
});

app.use(express.static(path.join(__dirname, 'public')))

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

const db = createClient({
  url: "libsql://open-mole-man-diegolopez-dev.turso.io",
  authToken: process.env.DB_TOKEN,
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT
  )
`);

io.on("connection", async (socket) => {
  console.log("Usuario conectado");

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  socket.on("chat message", async (msg) => {
    let result;
    const username = socket.handshake.auth.username ?? "anonymous";
    console.log({ username });
    try {
      result = await db.execute({
        sql: "INSERT INTO messages (content, user) VALUES (:msg, :username)",
        args: { msg, username },
      });
    } catch (e) {
      console.error(e);
      return;
    }

    io.emit("chat message", msg, result.lastInsertRowid.toString(), username);
  });

  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: "SELECT id, content, user FROM messages WHERE id > ?",
        args: [socket.handshake.auth.serverOffset ?? 0],
      });

      results.rows.forEach((row) => {
        socket.emit("chat message", row.content, row.id.toString(), row.user);
      });
    } catch (e) {
      console.error(e);
    }
  }
});

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "index.html");
});

server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
