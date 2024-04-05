
// /* todos = [
//    {
//     title: "go to gym",
//     description: "go to gym",
//    } 
//    ]
// */
// export function Todos({todos}) {

//     return <div>
//         {todos.map(function(todo) {
//             return <div>
//                 <h1>{todo.title}</h1>
//                 <h2>{todo.description}</h2>
//                 <button>{todo.completed == true ? "Completed" : "Mark as Complete"}</button>
//             </div>
//         })}
//     </div>
// }


import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'



function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   fetch("http://localhost:5173/server1/todo", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title: "hi",
  //     }),
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   }).then(async function (res) {
  //     const json = await res.json();
  //     alert("Todo added");
  //   });
  // }, []);

  const handleCardClick = (cardNumber) => {
    setSelectedCard(cardNumber);
    if(cardNumber==1){
      navigate("/server1");
    }
    if(cardNumber==2){
      navigate("/server2");
    }
    if(cardNumber==3){
      navigate("/server3");
    }
    if(cardNumber==4){
      navigate("/server4");
    }
   

  };

  return (
    
   
       
     
      <div className="home-container">
        {/* {[1, 2, 3, 4].map((cardNumber) => (
          <div
            key={cardNumber}
            className="card"
            onClick={() => handleCardClick(cardNumber) }
          >
            Card {cardNumber}
          </div>
        ))} */}
        <div className="ptani">
        <div className="server" onClick={() => handleCardClick(1) }>Lost&Found</div>
        <div className="server" onClick={() => handleCardClick(2) }>TravelPartner</div>
        </div>
        
        
        <div className="ptani2">
        <div className="server" onClick={() => handleCardClick(3) }>Resell</div>
        <div className="server" onClick={() => handleCardClick(4) }>ThisisBusiness</div>
        </div>
        
      </div>
    
  );

  
}

export default App;