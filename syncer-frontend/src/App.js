import React from "react";
import { render } from "react-dom";
import HomePage from "./components/HomePage";
import RoomJoinPage from "./components/RoomJoinPage";
import CreateRoomPage from "./components/CreateRoomPage";
import { BrowserRouter as Router, Routes, Route, Link, Redirect,} from "react-router-dom";


function App(){

    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/join" element={<RoomJoinPage/>} />
          <Route exact path="/create" element={<CreateRoomPage/>} />
        </Routes>
      </Router>
    );
}

export default App;