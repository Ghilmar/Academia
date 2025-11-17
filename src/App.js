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


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthForm />} />

        {/* Public course view and booking */}
        <Route path="/courses/:id" element={<CourseView />} />
        <Route path="/mentores/:mentorId/book" element={<Booking />} />

        {/* Admin routes wrapped with AdminLayout */}
        <Route
          path="/admin/usuarios"
          element={<UserManagement />}
        />
        <Route
          path="/admin/mentores"
          element={
            <AdminLayout>
              <MentorManagement />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/cursos"
          element={
            <AdminLayout>
              <CourseManagement />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminLayout>
              <BookingManagement />
            </AdminLayout>
          }
        />  

        <Route path="/mentores/:mentorId" element={<MentorView />} />

        <Route path="/cursos/:courseId" element={<CourseView />} />

      </Routes>
    </div>
  );
}