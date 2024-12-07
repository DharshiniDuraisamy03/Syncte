import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Library from "./Library";
import Chats from "./Chats";
import Help from "./Help";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Library />} />
          <Route path="/library" element={<Library />} />
          <Route path="/" element={<Chats />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/" element={<Help />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
