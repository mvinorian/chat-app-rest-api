import { useEffect, useState } from "react";
import axios from "axios";

const BASE_PATH_API = "https://chat-rest-api.vercel.app/";
// const BASE_PATH_API = "http://localhost:8080/";

export default function App() {
  const [state, setState] = useState("login");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState("");
  const [editing, setEditing] = useState(0);

  const getChats = () => {
    axios.get(BASE_PATH_API + "chats").then((res) => {
      setChats(() => res.data);
    });
  };

  const postChat = (message) => {
    const data = {
      sender: user,
      message: message,
    };
    axios.post(BASE_PATH_API + "chats", { ...data }).then(() => getChats());
  };

  const deleteChat = (id) => {
    axios.delete(BASE_PATH_API + `chats/${id}`).then(() => getChats());
  };

  const updateChat = (id, message) => {
    const data = {
      sender: user,
      message: message,
    };
    axios
      .put(BASE_PATH_API + `chats/${id}`, { ...data })
      .then(() => getChats());
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <main className="h-screen flex flex-col justify-center items-center px-12 py-8 bg-slate-500 text-slate-800">
      {/* Login State */}
      {state === "login" && (
        <section className="w-96 flex flex-col space-y-4 p-2 rounded-md bg-slate-400 shadow-lg">
          <h1 className="font-bold text-2xl">Chat Room</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const username = event.target.username.value;
              username && setUser(() => username);
              username && setState(() => "chat");
            }}
            className="flex flex-row space-x-2 rounded-b-md bg-slate-400"
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="flex-1 rounded-md px-2 py-1 text-sm bg-slate-200"
            />
            <button
              type="submit"
              className="w-fit h-full rounded-md px-2 bg-slate-200 hover:bg-slate-300"
            >
              Join Chat
            </button>
          </form>
        </section>
      )}

      {/* Chat State */}
      {state === "chat" && (
        <section className="w-96 h-full flex flex-col rounded-md bg-slate-300 shadow-lg">
          {/* Chat Header */}
          <div className="w-full flex flex-row justify-between p-2 rounded-t-md bg-slate-400">
            <h1 className="text-2xl">
              Login as <span className="font-semibold">{user}</span>
            </h1>
            <button
              onClick={() => getChats()}
              className="w-fit h-full rounded-md px-2 bg-slate-200 hover:bg-slate-300"
            >
              Sync Messages
            </button>
          </div>

          {/* Chat Messages */}
          <ul className="list-none h-full flex flex-col justify-end space-y-2 overflow-y-hidden">
            {chats.map((chat) => (
              <li
                key={chat.id}
                className="flex flex-col py-2 border-t border-slate-200"
              >
                {editing === chat.id ? (
                  <form
                    onSubmit={(event) => {
                      const message = event.target.message.value;
                      message && updateChat(chat.id, message);
                      event.preventDefault();
                      setEditing(() => 0);
                    }}
                    className="w-full flex flex-col px-2"
                  >
                    <div className="w-full flex flex-row justify-between px-2">
                      <h6 className="text-sm">{chat.sender}</h6>
                      <div className="w-full flex flex-row justify-end gap-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditing(() => 0);
                          }}
                          className={`${
                            user !== chat.sender && "hidden"
                          } text-xs text-slate-500 hover:text-slate-800`}
                        >
                          Escape
                        </button>
                        <button
                          type="submit"
                          className={`${
                            user !== chat.sender && "hidden"
                          } text-xs text-slate-500 hover:text-slate-800`}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="message"
                      placeholder={chat.message}
                      className="flex-1 rounded-md mt-1 px-2 py-1 text-sm bg-slate-200"
                    />
                  </form>
                ) : (
                  <div className="w-full flex flex-col px-4">
                    <div className="w-full flex flex-row justify-between">
                      <h6 className="text-sm">{chat.sender}</h6>
                      <div className="w-full flex flex-row justify-end gap-x-2">
                        <button
                          onClick={() => setEditing(() => chat.id)}
                          className={`${
                            user !== chat.sender && "hidden"
                          } text-xs text-slate-500 hover:text-slate-800`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteChat(chat.id)}
                          className={`${
                            user !== chat.sender && "hidden"
                          } text-xs text-slate-500 hover:text-slate-800`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p>{chat.message}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Chat Footer */}
          <form
            onSubmit={(event) => {
              const message = event.target.message.value;
              message && postChat(message);
              event.target.message.value = "";
              event.preventDefault();
            }}
            className="flex flex-row space-x-2 p-2 rounded-b-md bg-slate-400"
          >
            <input
              type="text"
              name="message"
              placeholder="Message"
              className="flex-1 rounded-md px-2 py-1 text-sm bg-slate-200"
            />
            <button
              type="submit"
              className="w-fit h-full rounded-md px-2 bg-slate-200 hover:bg-slate-300"
            >
              Send
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
