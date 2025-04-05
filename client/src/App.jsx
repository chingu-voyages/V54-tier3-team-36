import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomeLayout from "./layout/HomeLayout";
import GamesLayout from "./layout/GamesLayout";
import QuizzesLayout from "./layout/QuizzesLayout";
import DashboardLayout from "./layout/DashboardLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}/>
        <Route path="games" element={<GamesLayout/>}/>
        <Route path="quizzes" element={<QuizzesLayout/>} />
        <Route path="dashboard" element={<DashboardLayout/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
