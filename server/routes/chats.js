import express from "express";

const router = express.Router();

let id = 1;
let chats = [
  {
    id: id.toString(),
    sender: "John",
    message: "Watch youtube!",
  },
];

// base path = http://localhost:8080/chats

// HTTP GET Method
router.get("/", (req, res) => {
  res.send(chats);
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

  res.send(`${chat.value} added to chats list`);
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

export default router;
