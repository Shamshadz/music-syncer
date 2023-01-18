import React from "react";
import HomePage from "./components/HomePage";
import RoomJoinPage from "./components/RoomJoinPage";
import CreateRoomPage from "./components/CreateRoomPage";
import Room from "./components/Room";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App(){

    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/join" element={<RoomJoinPage/>} />
          <Route path="/create" element={<CreateRoomPage/>} />
          <Route path="/room/:roomCode" element={<Room/>} />
        </Routes>
      </Router>
    );
}

export default App;