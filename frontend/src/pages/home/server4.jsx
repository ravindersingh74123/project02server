
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import LogoutButton from "../../components/sidebar/LogoutButton";
import { io } from "socket.io-client";

const App = () => {
  const [newCardContent, setNewCardContent] = useState("");
  const [date, setdate] = useState("");
  const [cards, setCards] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [messages, setMessages] = useState({});
  const userData = JSON.parse(localStorage.getItem("chat-user"));
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [chatRoomName, setChatRoomName] = useState("");
 

  useEffect(() => {
    console.log("hi");
    axios
      .get("http://localhost:5000/business")
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
  const handleDateChange = (event) => {
    setdate(event.target.value);
  };

  const handleAddCard = async () => {
    const formData = new FormData();
   
    

    try {
      const response = await axios.post(
        "http://localhost:5000/server1/business",{
          businessName:newCardContent,
          user:userData.username,
          details:date
        }
        
      );
      alert("Todo added");
      setCards((prevCards) => [...prevCards, response.data]);
      setNewCardContent("");
      setdate("");
      
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
        typeof card.businessName === "string" &&
        typeof card.user === "string" &&
        typeof card.details === "string"
      ) {
        return (
          card.businessName.toLowerCase().includes(filterText.toLowerCase()) ||
          card.user.toLowerCase().includes(filterText.toLowerCase())||
          card.details.toLowerCase().includes(filterText.toLowerCase())
        );
      }
      return false;
    });
  }, [cards, filterText]);

  

  return (
    <div>
      <div className="new-ui">
        <div className="sidebar">
          <div>
            <LogoutButton />
          </div>
          <h2>Post Business Details</h2>
          <div className="addlost2">
            <div>
              <input
                type="text"
                className="papa"
                placeholder="Enter Business name"
                value={newCardContent}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="papa"
                placeholder="Enter details"
                value={date}
                onChange={handleDateChange}
              />
            </div>
            <div className="jai2">
              {/* <form className="photo">
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
              </form> */}
              <button className="jai3" onClick={handleAddCard}>ADD DETAILS</button>
            </div>
          </div>

          <div className="filteritem">
            <h2>Search Business</h2>
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
            <h2>TravelMania</h2>
          </div>
          <div className="card-container">
           
            {filteredCards.map((card, index) => (
              <div key={index} className="card">
                
                <p className="user-info">User: {card.user}</p>
                <p className="lost-item">BusinessName: {card.businessName}</p>
                <p className="user-info">Details: {card.details}</p>
               
                {console.log(card.user)}
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
