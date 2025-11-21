import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AuthForm from "./components/AuthForm";
import MentorManagement from "./pages/MentorManagement";
import CourseManagement from "./pages/CourseManagement";
import CourseView from "./pages/CourseView";
import Booking from "./pages/Booking";
import AdminLayout from "./components/AdminLayout";
import UserManagement from "./pages/UserManagement";
import MentorView from "./pages/MentorView";
import BookingManagement from "./pages/BookingManagement";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/cursos/:id" element={<CourseView />} />
          <Route path="/mentores/:mentorId/book" element={<Booking />} />
          <Route path="/mentores/:mentorId" element={<MentorView />} />

          {/* ADMIN PROTEGIDAS */}
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute>
         
                  <UserManagement />
            
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/mentores"
            element={
              <ProtectedRoute>
           
                  <MentorManagement />
      
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/cursos"
            element={
              <ProtectedRoute>
      
                  <CourseManagement />
        
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>

                  <BookingManagement />
   
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </AuthProvider>
  );
}
