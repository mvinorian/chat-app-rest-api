import express from "express";
import bodyParser from "body-parser";

import chatsRoute from "./routes/chats.js";

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use("/chats", chatsRoute);
app.get("/", (req, res) => res.send("REST API Homepage"));

app.listen(PORT, () =>
  console.log(`Server running on: http://localhost:${PORT}`)
);
