import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./layout/HomeLayout";
import GamesLayout from "./layout/GamesLayout";
import QuizzesLayout from "./layout/QuizzesLayout";
import DashboardLayout from "./layout/DashboardLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import { AuthProvider } from "./context/auth";
import { Toaster } from "@/components/ui/toaster/toaster";

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        <Route index element={<Header />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="login" element={<Login />} />
                    </Route>
                    <Route path="games" element={<GamesLayout />} />
                    <Route path="quizzes" element={<QuizzesLayout />} />
                    <Route path="dashboard" element={<DashboardLayout />} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
