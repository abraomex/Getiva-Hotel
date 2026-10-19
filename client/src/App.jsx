import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './services/authContext'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import Restaurant from './pages/Restaurant'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRooms from './pages/admin/AdminRooms'
import AdminGallery from './pages/admin/AdminGallery'
import AdminInquiries from './pages/admin/AdminInquiries'
import AdminContent from './pages/admin/AdminContent'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:slug" element={<RoomDetails />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="content" element={<AdminContent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
