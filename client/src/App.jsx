import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomeLayout from "./layout/HomeLayout";
import GamesLayout from "./layout/GamesLayout";
import QuizzesLayout from "./layout/QuizzesLayout";
import DashboardLayout from "./layout/DashboardLayout";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomeLayout />}/>
        <Route path="games" element={<GamesLayout/>}/>
        <Route path="quizzes" element={<QuizzesLayout/>} />
        <Route path="dashboard" element={<DashboardLayout/>}/>
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
