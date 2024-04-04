// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import LogoutButton from "../../components/sidebar/LogoutButton";

// const App = () => {
//   const [newCardContent, setNewCardContent] = useState("");
//   const [cards, setCards] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const userData = JSON.parse(localStorage.getItem("chat-user"));

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/todos")
//       .then((response) => {
//         const todos = response.data.todos;
//         if (todos && todos.length > 0) {
//           setCards(todos);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//       });
//     console.log("hi");
//   }, []);

//   const handlehome = () => {};

//   const handleInputChange = (event) => {
//     setNewCardContent(event.target.value);
//   };

//   const handleAddCard = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/server1/todo", {
//         title: newCardContent,
//         name: userData.username,
//       });
//       alert("Todo added");
//       const newCard = response.data;
//       setCards([...cards, newCard]);
//       setNewCardContent("");
//     } catch (error) {
//       console.error("Error adding card:", error);
//     }
//   };

//   const filteredCards = useMemo(() => {
//     return cards.filter((card) => {
//       if (
//         card &&
//         typeof card.title === "string" &&
//         typeof card.name === "string"
//       ) {
//         return (
//           card.title.toLowerCase().includes(filterText.toLowerCase()) ||
//           card.name.toLowerCase().includes(filterText.toLowerCase())
//         );
//       }
//       return false;
//     });
//   }, [cards, filterText]);

//   return (
//     <div>
//       <div className="new-ui">
//         <div className="sidebar">
//         <div><LogoutButton></LogoutButton></div>
//           <h2 >Post LostItems</h2>
//          <div className="addlost"><input
//             type="text"
//             placeholder="Enter details"
//             value={newCardContent}
//             onChange={handleInputChange}
//           />
//           <button onClick={handleAddCard}>Add </button>
//           </div>
//           <div className="filteritem">
//           <h2>FindItems</h2>
//           <input
//             type="text"
//             placeholder="Filter cards"
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//           />
//           </div>

//         </div>

//         <div className="stack-of-cards">
//           <div className="post"><h2>LostItems</h2></div>
//           <div className="card-container">
//             {filteredCards.map((card, index) => (
//               <div key={index} className="card">
//                 <p>User: {card.name}</p>
//                 <p>Lost Item: {card.title}</p>
//                 <button onClick={() => handlehome()}>Chat</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import LogoutButton from "../../components/sidebar/LogoutButton";

// const App = () => {
//   const [newCardContent, setNewCardContent] = useState("");
//   const [cards, setCards] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [chatMessages, setChatMessages] = useState([]);
//   const userData = JSON.parse(localStorage.getItem("chat-user"));

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/todos")
//       .then((response) => {
//         const todos = response.data.todos;
//         if (todos && todos.length > 0) {
//           setCards(todos);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//       });
//   }, []);

//   const handleInputChange = (event) => {
//     setNewCardContent(event.target.value);
//   };

//   const handleAddCard = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/server1/todo", {
//         title: newCardContent,
//         name: userData.username,
//       });
//       alert("Todo added");
//       const newCard = response.data;
//       setCards([...cards, newCard]);
//       setNewCardContent("");
//     } catch (error) {
//       console.error("Error adding card:", error);
//     }
//   };

//   const handleOpenChat = (card) => {
//     setSelectedCard(card);
//     setShowSidebar(true);
//     // Here you can fetch chat messages for the selected card
//   };

//   const handleCloseChat = () => {
//     setShowSidebar(false);
//   };

//   const filteredCards = useMemo(() => {
//     return cards.filter((card) => {
//       if (
//         card &&
//         typeof card.title === "string" &&
//         typeof card.name === "string"
//       ) {
//         return (
//           card.title.toLowerCase().includes(filterText.toLowerCase()) ||
//           card.name.toLowerCase().includes(filterText.toLowerCase())
//         );
//       }
//       return false;
//     });
//   }, [cards, filterText]);

//   return (
//     <div>
//       <div className="new-ui">
//         <div className="sidebar">
//           <div><LogoutButton></LogoutButton></div>
//           <h2>Post LostItems</h2>
//           <div className="addlost">
//             <input
//               type="text"
//               placeholder="Enter details"
//               value={newCardContent}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleAddCard}>Add </button>
//           </div>
//           <div className="filteritem">
//             <h2>FindItems</h2>
//             <input
//               type="text"
//               placeholder="Filter cards"
//               value={filterText}
//               onChange={(e) => setFilterText(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="stack-of-cards">
//           <div className="post"><h2>LostItems</h2></div>
//           <div className="card-container">
//             {filteredCards.map((card, index) => (
//               <div key={index} className="card">
//                 <p>User: {card.name}</p>
//                 <p>Lost Item: {card.title}</p>
//                 <button onClick={() => handleOpenChat(card)}>Chat</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {showSidebar && (
//         <div className="sidebar-container">
//           <div className="sidebar-content">
//             <button onClick={handleCloseChat}>Close</button>
//             <h2>Chat with {selectedCard && selectedCard.name}</h2>
//             {/* Here you can render the chat messages */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import LogoutButton from "../../components/sidebar/LogoutButton";
// import { io } from "socket.io-client";

// const App = () => {
//   const socket = useMemo(
//     () =>
//       io("http://localhost:8000", {
//         withCredentials: true,
//       }),
//     []
//   );
//   const [newCardContent, setNewCardContent] = useState("");
//   const [cards, setCards] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [Messages, setMessage] = useState("");
//   const userData = JSON.parse(localStorage.getItem("chat-user"));
//   const [ws, setWs] = useState(null); // WebSocket connection

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/todos")
//       .then((response) => {
//         const todos = response.data.todos;
//         if (todos && todos.length > 0) {
//           setCards(todos);
//         }
//         socket.on("connect", () => {
//           setSocketId(socket.id);
//         });

//         socket.on("receive-message", (data) => {
//           setMessages((messages) => [...messages, data]);
//         });

//         socket.on("receive", (data) => {
//           setRooms((rooms) => [...rooms, data]);
//         });

//         socket.on("welcome", (s) => {
//           console.log(s);
//         });

//         return () => {
//           socket.disconnect();
//         };
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//       });
//   }, [socket]);

//   const handleInputChange = (event) => {
//     setNewCardContent(event.target.value);
//   };

//   const handleAddCard = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/server1/todo", {
//         title: newCardContent,
//         name: userData.username,
//       });
//       alert("Todo added");
//       const newCard = response.data;
//       setCards([...cards, newCard]);
//       setNewCardContent("");
//     } catch (error) {
//       console.error("Error adding card:", error);
//     }
//   };

//   const handleOpenChat = (card) => {
//     setSelectedCard(card);
//     setShowSidebar(true);
//     // Fetch chat messages between current user and selected card's user

//   };

//   const handleCloseChat = () => {
//     setShowSidebar(false);
//   };

//   const handleSubmitMessage = (e) => {
//     e.preventDefault();
//     socket.emit("message", { message, room });
//     setMessage("");
//   };

//   const filteredCards = useMemo(() => {
//     return cards.filter((card) => {
//       if (
//         card &&
//         typeof card.title === "string" &&
//         typeof card.name === "string"
//       ) {
//         return (
//           card.title.toLowerCase().includes(filterText.toLowerCase()) ||
//           card.name.toLowerCase().includes(filterText.toLowerCase())
//         );
//       }
//       return false;
//     });
//   }, [cards, filterText]);

//   return (
//     <div>
//       <div className="new-ui">
//         <div className="sidebar">
//           <div>
//             <LogoutButton></LogoutButton>
//           </div>
//           <h2>Post LostItems</h2>
//           <div className="addlost">
//             <input
//               type="text"
//               placeholder="Enter details"
//               value={newCardContent}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleAddCard}>Add </button>
//           </div>
//           <div className="filteritem">
//             <h2>FindItems</h2>
//             <input
//               type="text"
//               placeholder="Filter cards"
//               value={filterText}
//               onChange={(e) => setFilterText(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="stack-of-cards">
//           <div className="post">
//             <h2>LostItems</h2>
//           </div>
//           <div className="card-container">
//             {filteredCards.map((card, index) => (
//               <div key={index} className="card">
//                 <p>User: {card.name}</p>
//                 <p>Lost Item: {card.title}</p>
//                 <button onClick={() => handleOpenChat(card)}>Chat</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {showSidebar && (
//         <div className="sidebar-container">
//           <div className="sidebar-content">
//             <button onClick={handleCloseChat}>Close</button>
//             <h2>Chat with {selectedCard && selectedCard.name}</h2>
//             <div>
//               <form onSubmit={handleSubmitMessage}>
//                 <input
//                   value={Messages}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Message"
//                 />

//                 <button type="submit">Send</button>
//               </form>
//             </div>
//             <div className="messages-column">
//               <h3>Messages</h3>
//               <div className="chat-messages">
//                 {Messages.map((m, i) => (
//                   <div key={i}>{m}</div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import LogoutButton from "../../components/sidebar/LogoutButton";
// import { io } from "socket.io-client";

// const App = () => {
//   const [newCardContent, setNewCardContent] = useState("");
//   const [cards, setCards] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [messages, setMessages] = useState([]); // Initialize messages as an array
//   const userData = JSON.parse(localStorage.getItem("chat-user"));
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Fetch todos from server
//     axios
//       .get("http://localhost:5000/todos")
//       .then((response) => {
//         setCards(response.data.todos || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//       });

//     // Establish WebSocket connection
//     const socket = io("http://localhost:8000", {
//       withCredentials: true,
//     });
//     setSocket(socket);

//     socket.on("connect", () => {
//       console.log("WebSocket connected");
//     });

//     socket.on("receive-message", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       // Disconnect WebSocket on component unmount
//       socket.disconnect();
//     };
//   }, []);

//   const handleInputChange = (event) => {
//     setNewCardContent(event.target.value);
//   };

//   const handleAddCard = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/server1/todo", {
//         title: newCardContent,
//         name: userData.username,
//       });
//       alert("Todo added");
//       setCards((prevCards) => [...prevCards, response.data]);
//       setNewCardContent("");
//     } catch (error) {
//       console.error("Error adding card:", error);
//     }
//   };

//   const handleOpenChat = (card) => {
//     setSelectedCard(card);
//     setShowSidebar(true);
//     // Fetch chat messages between current user and selected card's user
//   };

//   const handleCloseChat = () => {
//     setShowSidebar(false);
//   };

//   const handleSubmitMessage = (e) => {
//     e.preventDefault();
//     if (socket) {
//       socket.emit("message", {
//         message: messageInput,
//         room: selectedCard.name,
//       });
//       // Append the new message to the existing messages array
//       setMessages([
//         ...messages,
//         { text: messageInput, sender: userData.username },
//       ]);
//       // Clear the message input field
//       setMessageInput("");
//     }
//   };

//   const filteredCards = useMemo(() => {
//     return cards.filter((card) => {
//       if (
//         card &&
//         typeof card.title === "string" &&
//         typeof card.name === "string"
//       ) {
//         return (
//           card.title.toLowerCase().includes(filterText.toLowerCase()) ||
//           card.name.toLowerCase().includes(filterText.toLowerCase())
//         );
//       }
//       return false;
//     });
//   }, [cards, filterText]);

//   return (
//     <div>
//       <div className="new-ui">
//         <div className="sidebar">
//           <div>
//             <LogoutButton></LogoutButton>
//           </div>
//           <h2>Post LostItems</h2>
//           <div className="addlost">
//             <input
//               type="text"
//               placeholder="Enter details"
//               value={newCardContent}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleAddCard}>Add </button>
//           </div>
//           <div className="filteritem">
//             <h2>FindItems</h2>
//             <input
//               type="text"
//               placeholder="Filter cards"
//               value={filterText}
//               onChange={(e) => setFilterText(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="stack-of-cards">
//           <div className="post">
//             <h2>LostItems</h2>
//           </div>
//           <div className="card-container">
//             {filteredCards.map((card, index) => (
//               <div key={index} className="card">
//                 <p>User: {card.name}</p>
//                 <p>Lost Item: {card.title}</p>
//                 <button onClick={() => handleOpenChat(card)}>Chat</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {showSidebar && (
//         <div className="sidebar-container">
//           <div className="sidebar-content">
//             <button onClick={handleCloseChat}>Close</button>
//             <h2>Chat with {selectedCard && selectedCard.name}</h2>
//             <div>
//               <form onSubmit={handleSubmitMessage}>
//                 <input
//                   value={messageInput} // Use messageInput instead of messages
//                   onChange={(e) => setMessageInput(e.target.value)} // Update messageInput state
//                   placeholder="Message"
//                 />
//                 <button type="submit">Send</button>
//               </form>
//             </div>
//             <div className="messages-column">
//               <h3>Messages</h3>
//               <div className="chat-messages">
//                 {messages.map((m, i) => (
//                   <div key={i}>
//                     <p>
//                       {m.sender}: {m.text}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import LogoutButton from "../../components/sidebar/LogoutButton";
// import { io } from "socket.io-client";

// const App = () => {
//   const [newCardContent, setNewCardContent] = useState("");
//   const [cards, setCards] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const [messages, setMessages] = useState([]);
//   const [Index, setIndex] = useState([]);
//   const userData = JSON.parse(localStorage.getItem("chat-user"));
//   const [socket, setSocket] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [name, setName] = useState([userData.username]);

//   useEffect(() => {
//     // Fetch todos from server
//     axios
//       .get("http://localhost:5000/todos")
//       .then((response) => {
//         setCards(response.data.todos || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//       });
//       const socket = io("http://localhost:8000", {
//         withCredentials: true,
//       });
//       setSocket(socket);
//       socket.on("receive-message", (messageInput,name) => {
//         console.log("Received message:", messageInput,name);
//         // Append the new message to the existing messages array only if the message is for the currently selected card
//         if (Index === Index) {
//           setMessages((prevMessages) => [...prevMessages, messageInput]);
//           console.log(name)
//           setName(name)
//         }
//         else{
//           console.log("not")
//         }
//       });

//       // socket.on("receive-message", (data) => {
//       //   setMessages((prevMessages) => [...prevMessages, data]);
//       // });

//       return () => {
//         // Disconnect WebSocket on component unmount
//         socket.disconnect();
//       };
//     // Establish WebSocket connection

//     socket.on("connect", () => {
//       console.log("connect");
//     });

//   }, []);

//   const handleInputChange = (event) => {
//     setNewCardContent(event.target.value);
//   };

//   const handleAddCard = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/server1/todo", {
//         title: newCardContent,
//         name: userData.username,
//       });
//       alert("Todo added");
//       setCards((prevCards) => [...prevCards, response.data]);
//       setNewCardContent("");
//     } catch (error) {
//       console.error("Error adding card:", error);
//     }
//   };

//   const handleOpenChat = (index) => {
//     setIndex(index);
//     setShowSidebar(true);
//     if (socket) {
//       socket.emit("join-room", index);
//     }
//   };

//   const handleCloseChat = () => {
//     setShowSidebar(false);
//   };

//   const handleSubmitMessage = (e) => {
//     e.preventDefault();
//     console.log("Submitting message:", messageInput);
//     if (socket || Index) {
//       console.log(Index);
//       socket.emit("message", {
//         messageInput,
//         Index,
//         name
//       });
//       setMessageInput(""); // Clear input field after sending message
//       setIndex("");
//     }
//     else{
//       console.log(Index)
//     }
//   };

//   const filteredCards = useMemo(() => {
//     return cards.filter((card) => {
//       if (
//         card &&
//         typeof card.title === "string" &&
//         typeof card.name === "string"
//       ) {
//         return (
//           card.title.toLowerCase().includes(filterText.toLowerCase()) ||
//           card.name.toLowerCase().includes(filterText.toLowerCase())
//         );
//       }
//       return false;
//     });
//   }, [cards, filterText]);

//   return (
//     <div>
//       <div className="new-ui">
//         <div className="sidebar">
//           <div>
//             <LogoutButton></LogoutButton>
//           </div>
//           <h2>Post LostItems</h2>
//           <div className="addlost">
//             <input
//               type="text"
//               placeholder="Enter details"
//               value={newCardContent}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleAddCard}>Add </button>
//           </div>
//           <div className="filteritem">
//             <h2>FindItems</h2>
//             <input
//               type="text"
//               placeholder="Filter cards"
//               value={filterText}
//               onChange={(e) => setFilterText(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="stack-of-cards">
//           <div className="post">
//             <h2>LostItems</h2>
//           </div>
//           <div className="card-container">
//             {filteredCards.map((card, index) => (
//               <div key={index} className="card">
//                 {console.log(card.index)}

//                 <p>User: {card.name}</p>
//                 <p>Lost Item: {card.title}</p>
//                 <button onClick={() => handleOpenChat(index)}>Chat</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {showSidebar && (
//         <div className="sidebar-container">
//           <div className="sidebar-content">
//             <button onClick={handleCloseChat}>Close</button>
//             <h2>Chat with {selectedCard && selectedCard.name}</h2>
//             <div>
//               <form onSubmit={handleSubmitMessage}>
//                 <input

//                   value={messageInput}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                   placeholder="Message"
//                 />
//                 <button type="submit">Send</button>
//               </form>
//             </div>
//             <div className="messages-column">
//               <h3>Messages</h3>
//               <div className="chat-messages">
//               {/* Display messages */}

//               {messages.map((message, index) => (

//                 <div key={index}>{message}
//                 <h3>{name}</h3>

//                 </div>

//               ))}
//             </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import LogoutButton from "../../components/sidebar/LogoutButton";
// import { io } from "socket.io-client";

// const App = () => {
//   const [newCardContent, setNewCardContent] = useState("");
//   const [cards, setCards] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [selectedCardIndex, setSelectedCardIndex] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const userData = JSON.parse(localStorage.getItem("chat-user"));
//   const [socket, setSocket] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [chatRoomName, setChatRoomName] = useState("");

//   useEffect(() => {
//     // Fetch todos from server
//     axios
//       .get("http://localhost:5000/todos")
//       .then((response) => {
//         setCards(response.data.todos || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//       });

//     // Establish WebSocket connection
//     const socket = io("http://localhost:8000", {
//       withCredentials: true,
//     });
//     setSocket(socket);

//     socket.on("connect", () => {
//       console.log("WebSocket connected");
//     });

//     socket.on("receive-message", (data) => {
//       console.log("Received message:", data);
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       // Disconnect WebSocket on component unmount
//       socket.disconnect();
//     };
//   }, []);

//   const handleInputChange = (event) => {
//     setNewCardContent(event.target.value);
//   };

//   const handleAddCard = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/server1/todo", {
//         title: newCardContent,
//         name: userData.username,
//       });
//       alert("Todo added");
//       setCards((prevCards) => [...prevCards, response.data]);
//       setNewCardContent("");
//     } catch (error) {
//       console.error("Error adding card:", error);
//     }
//   };

//   const handleOpenChat = (index) => {
//     setSelectedCardIndex(index);
//     setChatRoomName(cards[index].name);
//     setShowSidebar(true);
//     if (socket) {
//       socket.emit("join-room", index);
//     }
//   };

//   const handleCloseChat = () => {
//     setShowSidebar(false);
//   };

//   const handleSubmitMessage = (e) => {
//     e.preventDefault();
//     if (socket && selectedCardIndex !== null) {
//       socket.emit("message", {
//         text: messageInput,
//         room: selectedCardIndex,
//         sender: userData.username,
//       });
//       setMessageInput("");
//     }
//   };

//   const filteredCards = useMemo(() => {
//     return cards.filter((card) => {
//       if (
//         card &&
//         typeof card.title === "string" &&
//         typeof card.name === "string"
//       ) {
//         return (
//           card.title.toLowerCase().includes(filterText.toLowerCase()) ||
//           card.name.toLowerCase().includes(filterText.toLowerCase())
//         );
//       }
//       return false;
//     });
//   }, [cards, filterText]);

//   return (
//     <div>
//       <div className="new-ui">
//         <div className="sidebar">
//           <div>
//             <LogoutButton />
//           </div>
//           <h2>Post LostItems</h2>
//           <div className="addlost">
//             <input
//               type="text"
//               placeholder="Enter details"
//               value={newCardContent}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleAddCard}>Add</button>
//           </div>
//           <div className="filteritem">
//             <h2>FindItems</h2>
//             <input
//               type="text"
//               placeholder="Filter cards"
//               value={filterText}
//               onChange={(e) => setFilterText(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="stack-of-cards">
//           <div className="post">
//             <h2>LostItems</h2>
//           </div>
//           <div className="card-container">
//             {filteredCards.map((card, index) => (
//               <div key={index} className="card">
//                 <p>User: {card.name}</p>
//                 <p>Lost Item: {card.title}</p>
//                 <button onClick={() => handleOpenChat(index)}>Chat</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {showSidebar && (
//         <div className="sidebar-container">
//           <div className="sidebar-content">
//             <button onClick={handleCloseChat}>Close</button>
//             <h2>Chat with {chatRoomName}</h2>
//             <div>
//               <form onSubmit={handleSubmitMessage}>
//                 <input
//                   value={messageInput}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                   placeholder="Message"
//                 />
//                 <button type="submit">Send</button>
//               </form>
//             </div>
//             <div className="messages-column">
//               <h3>Messages</h3>
//               <div className="chat-messages">
//                 {messages.map((message, index) => (
//                   <div key={index}>
//                     <p>
//                       {message.sender}: {message.text}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useMemo, useState, useRef } from "react";
// import axios from "axios";
// import LogoutButton from "../../components/sidebar/LogoutButton";
// import Phot from "./phot";

// import { io } from "socket.io-client";

// const App = () => {
//   const [newCardContent, setNewCardContent] = useState("");
//   const [cards, setCards] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [selectedCardIndex, setSelectedCardIndex] = useState(null);
//   const [messages, setMessages] = useState({});
//   const userData = JSON.parse(localStorage.getItem("chat-user"));
//   const [socket, setSocket] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [chatRoomName, setChatRoomName] = useState("");
//   const [image, setImage] = useState(null);
//   const [allImage, setAllImage] = useState([]);
//   const inputRef = useRef(null);

//   // useEffect(() => {
//   //   // axios.get("http://localhost:2000/get-image")
//   //   // // .then(res=>setAllImage(res.data))
//   //   // .then(res=>console.log(res.data.data))
//   //   // .then(res=>setAllImage(res.data.data))
//   //   getImage();
//   // }, []);

//   // const submitImage = async (e) => {

//   //   e.preventDefault();

//   //   if (!image) {
//   //     console.error("No image selected.");
//   //     return;
//   //   }

//   //   const formData = new FormData();

//   //   formData.set("image", image);

//   //   try {
//   //     axios.post("http://localhost:2000/upload-image", formData);
//   //     console.log(formData);
//   //     // .then(res=>console.log(res.data[0].image))

//   //     // Refresh the list of images after successful upload
//   //   } catch (error) {
//   //     console.error("Error uploading image:", error);
//   //   }
//   // };

//   const onInputChange = (e) => {
//     setImage(e.target.files[0]);
//   };
//   // const getImage = async () => {
//   //   const result = await axios.get("http://localhost:2000/get-image");
//   //   console.log(result);
//   //   setAllImage(result.data.data);
//   // };

//   useEffect(() => {
//     // Fetch todos from server
//     axios
//       .get("http://localhost:5000/todos")
//       .then((response) => {
//         setCards(response.data.todos || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//       });

//     // Establish WebSocket connection
//     const socket = io("http://localhost:8000", {
//       withCredentials: true,
//     });
//     setSocket(socket);

//     socket.on("connect", () => {
//       console.log("WebSocket connected");
//     });

//     socket.on("receive-message", (data) => {
//       console.log("Received message:", data);
//       console.log(data.room);
//       if (data.room !== undefined) {
//         setMessages((prevMessages) => ({
//           ...prevMessages,
//           [data.room]: [...(prevMessages[data.room] || []), data],
//         }));
//       }
//     });

//     return () => {
//       // Disconnect WebSocket on component unmount
//       socket.disconnect();
//     };
//   }, []);
//   useEffect(() => {
//     console.log(messages);
//     console.log(messages);
//   }, [messages]);

//   const handleInputChange = (event) => {
//     setNewCardContent(event.target.value);
//   };

//   const handleAddCard = async () => {
//     console.log("hi");
//     const formData = new FormData();

//     formData.set("image", image);

//     try {
//       const response = await axios.post("http://localhost:5000/server1/todo", formData, {
//         params: {
//           title: newCardContent,
//           name: userData.username,
//         }
//       });
//       alert("Todo added");
//       setCards((prevCards) => [...prevCards, response.data]);
//       setNewCardContent("");
//       setImage(null); // Reset the selected image
//     } catch (error) {
//       console.error("Error adding card:", error);
//     }
//   };

//   const handleOpenChat = (index) => {
//     setSelectedCardIndex(index);
//     setChatRoomName(cards[index].name);
//     console.log(cards[index].name, "baby");
//     setShowSidebar(true);
//     if (socket) {
//       socket.emit("join-room", index);
//       // Initialize or load messages for the selected card
//       if (!messages[index]) {
//         // If messages for the selected card are not yet loaded, fetch them
//         // You can implement this based on your backend API
//         // For simplicity, let's assume an empty array for now
//         setMessages((prevMessages) => ({
//           ...prevMessages,
//           [index]: [],
//         }));
//       }
//     }
//   };

//   const handleCloseChat = () => {
//     setShowSidebar(false);
//   };

//   const handleSubmitMessage = (e) => {
//     e.preventDefault();
//     if (socket || selectedCardIndex !== null) {
//       socket.emit("message", {
//         text: messageInput,
//         room: selectedCardIndex,
//         sender: userData.username,
//       });
//       setMessageInput("");
//     }
//   };

//   const filteredCards = useMemo(() => {
//     return cards.filter((card) => {
//       if (
//         card &&
//         typeof card.title === "string" &&
//         typeof card.name === "string"
//       ) {
//         return (
//           card.title.toLowerCase().includes(filterText.toLowerCase()) ||
//           card.name.toLowerCase().includes(filterText.toLowerCase())
//         );
//       }
//       return false;
//     });
//   }, [cards, filterText]);

//   return (
//     <div>
//       <div className="new-ui">
//         <div className="sidebar">
//           <div>
//             <LogoutButton />
//           </div>
//           <h2>Post LostItems</h2>
//           <div className="addlost">
//             <input
//               type="text"
//               placeholder="Enter details"
//               value={newCardContent}
//               onChange={handleInputChange}
//             />
//             <button  onClick={handleAddCard}>
//               Addd
//             </button>
//           </div>
//           {/* <div> <Phot/> </div> */}
//           <div>
//             <form className="photo" >
//               <input className="inphoto"
//                 type="file"
//                 accept="image/*"

//                 onChange={onInputChange}
//               />
//               <button className="inbtn" type="submit">Submit</button>
//             </form>
//           </div>
//           <div className="filteritem">
//             <h2>FindItems</h2>
//             <input
//               type="text"
//               placeholder="Filter cards"
//               value={filterText}
//               onChange={(e) => setFilterText(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="stack-of-cards">
//           <div className="post">
//             <h2>LostItems</h2>
//           </div>
// <div className="card-container">
//   {filteredCards.map((card, index) => (
//     <div key={index} className="card">
//       {card.image && <img src={`http://localhost:5000/images/${card.image}`} height={100} width={100} alt={`Image ${index}`} />}
//       <p className="user-info">User: {card.name}</p>
//       <p className="lost-item">Lost Item: {card.title}</p>
//       <button className="chat-button" onClick={() => handleOpenChat(index)}>Chat</button>
//     </div>
//   ))}
// </div>

//         </div>
//       </div>

//       {showSidebar && (
//         <div className="sidebar-container">
//           <div className="sidebar-contenttt">
//             <button onClick={handleCloseChat}>Close</button>
//             <h2>Chat with {chatRoomName}</h2>
//             <div className="formmm">
//               <form onSubmit={handleSubmitMessage}>
//                 <input
//                   value={messageInput}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                   placeholder="Message"
//                 />
//                 <button type="submit">Send</button>
//               </form>
//             </div>
//             <div className="messages-column">
//               <h3>Messages</h3>
//               <div className="chat-messages">
//                 {(messages[selectedCardIndex] || []).map((message, index) => (
//                   <div key={index}>
//                     <p>
//                       {message.sender}: {message.text}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import LogoutButton from "../../components/sidebar/LogoutButton";
// import { io } from "socket.io-client";

// const App = () => {
//   const [newCardContent, setNewCardContent] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image file
//   const [cards, setCards] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [selectedCardIndex, setSelectedCardIndex] = useState(null);
//   const [messages, setMessages] = useState({});
//   const userData = JSON.parse(localStorage.getItem("chat-user"));
//   const [socket, setSocket] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [chatRoomName, setChatRoomName] = useState("");

//   useEffect(() => {
//     // Fetch todos from server
//     axios
//       .get("http://localhost:5000/todos")
//       .then((response) => {
//         setCards(response.data.todos || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//       });

//     // Establish WebSocket connection
//     const socket = io("http://localhost:8000", {
//       withCredentials: true,
//     });
//     setSocket(socket);

//     socket.on("connect", () => {
//       console.log("WebSocket connected");
//     });

//     socket.on("receive-message", (data) => {
//       console.log("Received message:", data);
//       console.log(data.room)
//       if (data.room !== undefined) {
//         setMessages((prevMessages) => ({
//           ...prevMessages,
//           [data.room]: [...(prevMessages[data.room] || []), data],
//         }));
//       }
//     });

//     return () => {
//       // Disconnect WebSocket on component unmount
//       socket.disconnect();
//     };
//   }, []);
//   useEffect(() => {
//     console.log(messages);
//     console.log(messages);
//   }, [messages]);

//   const handleInputChange = (event) => {
//     setNewCardContent(event.target.value);
//   };

//   const handleAddCard = async () => {
//     console.log("hi")
//     try {
//       const formData = new FormData();
//       formData.append("title", newCardContent);
//       formData.append("name", userData.username);
//       if (selectedImage) {
//         formData.append("image", selectedImage);
//       }
//       const response = await axios.post("http://localhost:5000/server1/todo", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });
//       alert("Todo added");
//       setCards((prevCards) => [...prevCards, response.data]);
//       setNewCardContent("");
//       setSelectedImage(null); // Reset selected image state after adding the card
//     } catch (error) {
//       console.error("Error adding card:", error);
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleOpenChat = (index) => {
//     setSelectedCardIndex(index);
//     setChatRoomName(cards[index].name);
//     console.log(cards[index].name,"baby")
//     setShowSidebar(true);
//     if (socket) {
//       socket.emit("join-room", index);
//       // Initialize or load messages for the selected card
//       if (!messages[index]) {
//         // If messages for the selected card are not yet loaded, fetch them
//         // You can implement this based on your backend API
//         // For simplicity, let's assume an empty array for now
//         setMessages((prevMessages) => ({
//           ...prevMessages,
//           [index]: [],
//         }));
//       }
//     }
//   };

//   const handleCloseChat = () => {
//     setShowSidebar(false);
//   };

//   const handleSubmitMessage = (e) => {
//     e.preventDefault();
//     if (socket || selectedCardIndex !== null) {
//       socket.emit("message", {
//         text: messageInput,
//         room: selectedCardIndex,
//         sender: userData.username,
//       });
//       setMessageInput("");
//     }
//   };

//   const filteredCards = useMemo(() => {
//     return cards.filter((card) => {
//       if (
//         card &&
//         typeof card.title === "string" &&
//         typeof card.name === "string"
//       ) {
//         return (
//           card.title.toLowerCase().includes(filterText.toLowerCase()) ||
//           card.name.toLowerCase().includes(filterText.toLowerCase())
//         );
//       }
//       return false;
//     });
//   }, [cards, filterText]);

//   return (
//     <div>
//       <div className="new-ui">
//         <div className="sidebar">
//           <div>
//             <LogoutButton />
//           </div>
//           <h2>Post LostItems</h2>
//           <div className="addlost">
//             <input
//               type="text"
//               placeholder="Enter details"
//               value={newCardContent}
//               onChange={handleInputChange}
//             />
//             <input type="file"  onChange={handleImageChange} style={{display:"none"}} /> {/* File input field */}
//             <button onClick={handleAddCard}>Add</button> {/* Add button */}
//           </div>
//           <div className="filteritem">
//             <h2>FindItems</h2>
//             <input
//               type="text"
//               placeholder="Filter cards"
//               value={filterText}
//               onChange={(e) => setFilterText(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="stack-of-cards">
//           <div className="post">
//             <h2>LostItems</h2>
//           </div>
//           <div className="card-container">
//             {filteredCards.map((card, index) => (
//               <div key={index} className="card">
//                 <p className="user-info">User: {card.name}</p>
//                 <p className="lost-item ">Lost Item: {card.title}</p>
//                 <button className="chat-button" onClick={() => handleOpenChat(index)}>Chat</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {showSidebar && (
//         <div className="sidebar-container">
//           <div className="sidebar-contenttt">
//             <button onClick={handleCloseChat}>Close</button>
//             <h2>Chat with {chatRoomName}</h2>
//             <div className="formmm">
//               <form onSubmit={handleSubmitMessage}>
//                 <input
//                   value={messageInput}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                   placeholder="Message"
//                 />
//                 <button type="submit">Send</button>
//               </form>
//             </div>
//             <div className="messages-column">
//               <h3>Messages</h3>
//               <div className="chat-messages">
//                 {(messages[selectedCardIndex] || []).map((message, index) => (
//                   <div key={index}>
//                     <p>
//                       {message.sender}: {message.text}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import LogoutButton from "../../components/sidebar/LogoutButton";
// import { io } from "socket.io-client";

// const App = () => {
//   const [newCardContent, setNewCardContent] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [cards, setCards] = useState([]);
//   const [filterText, setFilterText] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [selectedCardIndex, setSelectedCardIndex] = useState(null);
//   const [messages, setMessages] = useState({});
//   const userData = JSON.parse(localStorage.getItem("chat-user"));
//   const [socket, setSocket] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [chatRoomName, setChatRoomName] = useState("");

//   useEffect(() => {
//     // Fetch todos from server
//     axios
//       .get("/todos") // Updated endpoint
//       .then((response) => {
//         setCards(response.data.todos || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//       });

//     // Establish WebSocket connection
//     const socket = io("http://localhost:8000", {
//       withCredentials: true,
//     });
//     setSocket(socket);

//     socket.on("connect", () => {
//       console.log("WebSocket connected");
//     });

//     socket.on("receive-message", (data) => {
//       console.log("Received message:", data);
//       console.log(data.room)
//       if (data.room !== undefined) {
//         setMessages((prevMessages) => ({
//           ...prevMessages,
//           [data.room]: [...(prevMessages[data.room] || []), data],
//         }));
//       }
//     });

//     return () => {
//       // Disconnect WebSocket on component unmount
//       socket.disconnect();
//     };
//   }, []);
//   useEffect(() => {
//     console.log(messages);
//     console.log(messages);
//   }, [messages]);

//   const handleInputChange = (event) => {
//     setNewCardContent(event.target.value);
//   };

//   const handleAddCard = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("title", newCardContent);
//       formData.append("name", userData.username);
//       if (selectedImage) {
//         formData.append("image", selectedImage);
//       }
//       const response = await axios.post("http://localhost:5000/server1/todo" { // Updated endpoint
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });
//       alert("Todo added");
//       setCards((prevCards) => [...prevCards, response.data]);
//       setNewCardContent("");
//       setSelectedImage(null);
//     } catch (error) {
//       console.error("Error adding card:", error);
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleOpenChat = (index) => {
//     setSelectedCardIndex(index);
//     setChatRoomName(cards[index].name);
//     setShowSidebar(true);
//     if (socket) {
//       socket.emit("join-room", index);
//       if (!messages[index]) {
//         setMessages((prevMessages) => ({
//           ...prevMessages,
//           [index]: [],
//         }));
//       }
//     }
//   };

//   const handleCloseChat = () => {
//     setShowSidebar(false);
//   };

//   const handleSubmitMessage = (e) => {
//     e.preventDefault();
//     if (socket || selectedCardIndex !== null) {
//       socket.emit("message", {
//         text: messageInput,
//         room: selectedCardIndex,
//         sender: userData.username,
//       });
//       setMessageInput("");
//     }
//   };

//   const filteredCards = useMemo(() => {
//     return cards.filter((card) => {
//       if (
//         card &&
//         typeof card.title === "string" &&
//         typeof card.name === "string"
//       ) {
//         return (
//           card.title.toLowerCase().includes(filterText.toLowerCase()) ||
//           card.name.toLowerCase().includes(filterText.toLowerCase())
//         );
//       }
//       return false;
//     });
//   }, [cards, filterText]);

//   return (
//     <div>
//       <div className="new-ui">
//         <div className="sidebar">
//           <div>
//             <LogoutButton />
//           </div>
//           <h2>Post LostItems</h2>
//           <div className="addlost">
//             <input
//               type="text"
//               placeholder="Enter details"
//               value={newCardContent}
//               onChange={handleInputChange}
//             />
//             <input type="file" onChange={handleImageChange} />
//             <button onClick={handleAddCard}>Add</button>
//           </div>
//           <div className="filteritem">
//             <h2>FindItems</h2>
//             <input
//               type="text"
//               placeholder="Filter cards"
//               value={filterText}
//               onChange={(e) => setFilterText(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="stack-of-cards">
//           <div className="post">
//             <h2>LostItems</h2>
//           </div>
//           <div className="card-container">
//             {filteredCards.map((card, index) => (
//               <div key={index} className="card">
//                 <p className="user-info">User: {card.name}</p>
//                 <p className="lost-item ">Lost Item: {card.title}</p>
//                 <button className="chat-button" onClick={() => handleOpenChat(index)}>Chat</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {showSidebar && (
//         <div className="sidebar-container">
//           <div className="sidebar-contenttt">
//             <button onClick={handleCloseChat}>Close</button>
//             <h2>Chat with {chatRoomName}</h2>
//             <div className="formmm">
//               <form onSubmit={handleSubmitMessage}>
//                 <input
//                   value={messageInput}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                   placeholder="Message"
//                 />
//                 <button type="submit">Send</button>
//               </form>
//             </div>
//             <div className="messages-column">
//               <h3>Messages</h3>
//               <div className="chat-messages">
//                 {(messages[selectedCardIndex] || []).map((message, index) => (
//                   <div key={index}>
//                     <p>
//                       {message.sender}: {message.text}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


































import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import LogoutButton from "../../components/sidebar/LogoutButton";
import { io } from "socket.io-client";

const App = () => {
  const [newCardContent, setNewCardContent] = useState("");
  const [cards, setCards] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [messages, setMessages] = useState({});
  const userData = JSON.parse(localStorage.getItem("chat-user"));
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [chatRoomName, setChatRoomName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log("hi");
    axios
      .get("http://localhost:5000/todos")
      .then((response) => {
        setCards(response.data.todos || []);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });

    const socket = io("http://localhost:8000", {
      withCredentials: true,
    });
    setSocket(socket);

    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.on("receive-message", (data) => {
      console.log("Received message:", data);
      if (data.room !== undefined) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [data.room]: [...(prevMessages[data.room] || []), data],
        }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (event) => {
    setNewCardContent(event.target.value);
  };

  const handleAddCard = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", newCardContent);
    formData.append("name", userData.username);

    try {
      const response = await axios.post(
        "http://localhost:5000/server1/todo",
        formData
      );
      alert("Todo added");
      setCards((prevCards) => [...prevCards, response.data]);
      setNewCardContent("");
      setImage(null);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleOpenChat = (index) => {
    setSelectedCardIndex(index);
    setChatRoomName(cards[index].name);
    setShowSidebar(true);
    if (socket) {
      socket.emit("join-room", index);
      if (!messages[index]) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [index]: [],
        }));
      }
    }
  };

  const handleCloseChat = () => {
    setShowSidebar(false);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (socket || selectedCardIndex !== null) {
      socket.emit("message", {
        text: messageInput,
        room: selectedCardIndex,
        sender: userData.username,
      });
      setMessageInput("");
    }
  };

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      if (
        card &&
        typeof card.title === "string" &&
        typeof card.name === "string"
      ) {
        return (
          card.title.toLowerCase().includes(filterText.toLowerCase()) ||
          card.name.toLowerCase().includes(filterText.toLowerCase())
        );
      }
      return false;
    });
  }, [cards, filterText]);

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <div className="new-ui">
        <div className="sidebar">
          <div>
            <LogoutButton />
          </div>
          <h2>Post Lost Items</h2>
          <div className="addlost">
            <div>
              <input
                type="text"
                className="papa"
                placeholder="Enter details"
                value={newCardContent}
                onChange={handleInputChange}
              />
            </div>
            <div className="jai">
              <form className="photo">
                <label htmlFor="file-upload" className="custom-file-input">
                  ADD PHOTO
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={onInputChange}
                  className="hidden-input"
                />
              </form>
              <button onClick={handleAddCard}>ADD ITEM</button>
            </div>
          </div>

          <div className="filteritem">
            <h2>Find Items</h2>
            <input
              className="filmeba"
              type="text"
              placeholder="Filter cards"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>

        <div className="stack-of-cards">
          <div className="post">
            <h2>Lost Items</h2>
          </div>
          <div className="card-container">
            {filteredCards.map((card, index) => (
              <div key={index} className="card">
                {card.image && (
                  <img
                    src={`http://localhost:5000/images/${card.image}`}
                    alt={`Image ${index}`}
                    height={150}
                    width={200}
                  />
                )}
                <p className="user-info">User: {card.name}</p>
                <p className="lost-item">Lost Item: {card.title}</p>
                <button
                  className="chat-button"
                  onClick={() => handleOpenChat(index)}
                >
                  Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSidebar && (
        <div className="sidebar-container">
          <div className="sidebar-contenttt">
            <button onClick={handleCloseChat}>Close</button>
            <h2>Chat with {chatRoomName}</h2>
            <div className="formmm">
              <form onSubmit={handleSubmitMessage}>
                <input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Message"
                />
                <button type="submit">Send</button>
              </form>
            </div>
            <div className="messages-column">
              <h3>Messages</h3>
              <div className="chat-messages">
                {(messages[selectedCardIndex] || []).map((message, index) => (
                  <div key={index}>
                    <p>
                      {message.sender}: {message.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
