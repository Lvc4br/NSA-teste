import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Grades from "../pages/Grades/Grades";
import Attendance from "../pages/Attendance/Attendance";
import Schedule from "../pages/Schedule/Schedule";
import Subjects from "../pages/Subjects/Subjects";
import Notifications from "../pages/Notifications/Notifications";
import Profile from "../pages/Profile/Profile";
import Documents from "../pages/Documents/Documents";
import Requests from "../pages/Requests/Requests";

function RequireAuth() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notas" element={<Grades />} />
        <Route path="/frequencia" element={<Attendance />} />
        <Route path="/horario" element={<Schedule />} />
        <Route path="/disciplinas" element={<Subjects />} />
        <Route path="/notificacoes" element={<Notifications />} />
        <Route path="/documentos" element={<Documents />} />
        <Route path="/solicitacoes" element={<Requests />} />
        <Route path="/perfil" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}