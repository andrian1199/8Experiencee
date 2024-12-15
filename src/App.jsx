import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "typeface-inter";
import 'bootstrap/dist/css/bootstrap.min.css';

// Import halaman
import LoginAdmin from './Admin/LoginAdmin';
import AdminProfile from './Admin/AdminProfile';
import Dashboard from './Admin/Dashboard';
import EventList from './Admin/EventList';
import OrderPage from './Admin/OrderPage';
import CommunityList from './Admin/CommunityList';
import BlogList from './Admin/BlogList';
import Home from './pages/Home';

import Blog from './pages/BlogPage';

import BlogDetailPage from './pages/BlogDetailPage'; 
import Komunitas from './pages/Komunitas';
import CommunityDetail from './pages/CommunityDetail';
import PilihanTiket from './pages/PilihanTiket';
import Tiket from './pages/Tiket';
import Confirm from './pages/Confirm';
import Confirm2 from './pages/Confirm2';
import Login from './pages/Login';
import Daftar from './pages/Daftar';
import KonfirmasiEmail from './pages/KonfirmasiEmail';
import Berhasil from './pages/Berhasil';
import ProfilePage from './pages/ProfilePage'; 
import EditProfilePage from './pages/EditProfilePage'; 
import ChangePassword from './pages/ChangePassword'; 
import TentangKami from './pages/TentangKami';
import Event from './pages/Event'; 
import EventDetail from './komponen Home/EventDetail'; 
import MetodePembayaran from './pages/MetodePembayaran'; // Import baru
import KonfirmasiPesanan from './pages/KonfirmasiPesanan';
import StatusPembayaran from './pages/StatusPembayaran';
import TicketPage from './pages/TicketPage';


function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Admin */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/event-list" element={<EventList />} />
        <Route path="/admin/blog-list" element={<BlogList />} />
        {/* Route untuk OrderPage */}
        <Route path="/admin/orders" element={<OrderPage />} />  {/* Menambahkan route untuk halaman pesanan */}
        {/* Route untuk Event List */}
        <Route path="/admin/profile" element={<AdminProfile />} />
        
        <Route path="/admin/community-list" element={<CommunityList/>} />
        


        {/* Halaman Utama */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tentangkami" element={<TentangKami />} />

        {/* Event */}
        <Route path="/event" element={<Event />} />
        <Route path="/event/:id" element={<EventDetail />} />

        {/* Detail Konser dan Tiket */}
        <Route path="/event/:id/tiket" element={<PilihanTiket />} />
        <Route path="/tiket/:price" element={<Tiket />} />

        {/* Pembayaran */}
        <Route path="/metode-pembayaran" element={<MetodePembayaran />} /> {/* Rute baru */}
        <Route path="/konfirmasi-pesanan" element={<KonfirmasiPesanan />} />
        <Route path="/status-pembayaran" element={<StatusPembayaran />} />
        <Route path="/tiket-page" element={<TicketPage />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/confirm2" element={<Confirm2 />} />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />

        <Route path="/blog/:id" element={<BlogDetailPage />} />

        {/* Komunitas */}
        <Route path="/komunitas" element={<Komunitas />} />
        <Route path="/komunitas/:id" element={<CommunityDetail />} />

        {/* Akun dan Profil */}
        <Route path="/login" element={<Login />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/konfirmasi-email" element={<KonfirmasiEmail />} />
        <Route path="/berhasil" element={<Berhasil />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/profil/edit" element={<EditProfilePage />} />
        <Route path="/ganti-kata-sandi" element={<ChangePassword />} />

        
      </Routes>
    </Router>
  );
}

export default App;
