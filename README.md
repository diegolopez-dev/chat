# 💬 Chat en Tiempo Real con Node.js y Socket.io 

Este proyecto es un chat en tiempo real creado con Node.js y Socket.io. Permite a múltiples usuarios conectarse y comunicarse en tiempo real a través de la web.

---

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Estructura del Proyecto](#estructura-del-proyecto)

---

## Requisitos

- Node.js instalado en tu sistema. Puedes descargarlo desde (https://nodejs.org/).
- Conexión a internet para el correcto funcionamiento del chat en tiempo real.

## Instalación

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/diegolopez-dev/chat-node-socketio.git
```

2. Instalar las dependencias del proyecto:

```bash
cd chat-node-socketio
npm install
```

## Uso

1. Inicia el servidor de Node.js:

```bash
node server.js
```

2. Abre tu navegador y accede a `http://localhost:3000`.

3. ¡Comienza a chatear en tiempo real con tus amigos o colegas!

## Estructura del Proyecto

- `index.js`: Archivo principal que inicia el servidor Node.js y configura la comunicación con Socket.io.
- `public/index.html`: Página HTML del chat para los usuarios.
- `public/style.css`: Estilos CSS para darle diseño al chat.
- `public/index.js`: Archivo que configura los mensajes y la vista final.
