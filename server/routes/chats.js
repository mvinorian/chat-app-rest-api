import express from "express";

const router = express.Router();

let id = 1;
let chats = [
  {
    id: id.toString(),
    sender: "Admin",
    message: "This is the start of the chat room.",
  },
];

// base path = http://localhost:8080/chats

// HTTP GET Method
router.get("/", (req, res) => {
  res.status(200).send(chats);
});

router.get("/:id", (req, res) => {
  const { id: chatId } = req.params;

  const chat = chats.find((chat) => chat.id === chatId);
  const status = chat ? 200 : 404;

  res.status(status).send(chat);
});

// HTTP POST Method
router.post("/", (req, res) => {
  const chat = req.body;

  chats.push({ id: (++id).toString(), ...chat });

  res.status(200).send(`${chat.sender}: ${chat.message} added to chats list`);
});

// HTTP DELETE Method
router.delete("/:id", (req, res) => {
  const { id: chatId } = req.params;
  const status = chats.find((chat) => chat.id === chatId) ? 200 : 404;
  chats = chats.filter((chat) => chat.id !== chatId);

  res
    .status(status)
    .send(
      `chat with id: ${chatId} ${
        status === 200 ? "deleted from chats list" : "not found"
      }`
    );
});

// HTTP PUT Method
router.put("/:id", (req, res) => {
  const { id: chatId } = req.params;
  const updatedChat = req.body;
  let found = false;
  chats.forEach((chat) => {
    if (chat.id === chatId) {
      chat.sender = updatedChat.sender;
      chat.message = updatedChat.message;
      found = true;
    }
  });

  if (!found) chats.push({ id: chatId, ...updatedChat });

  res
    .status(200)
    .send(
      `${
        found
          ? `chat with id: ${chatId} updated to ${updatedChat.sender}: ${updatedChat.message} `
          : `${updatedChat.sender}: ${updatedChat.message} added to chats list with id: ${chatId}`
      }`
    );
});

export default router;
