import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "typeface-inter";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import DetailKonser from './pages/DetailKonser';
import Card4 from './pages/Card4';
import Blog from './pages/BlogPage';
import BlogDetail from './pages/Blogdetail'; 
import BlogDetailPage from './pages/BlogDetailPage'; 
import Komunitas from './pages/Komunitas';
import CommunityDetail from './pages/CommunityDetail';
import PilihanTiket from './pages/Pilihantiket';
import Pembayaran from './pages/Pembayaran';
import Kategori from './Detail Konser/Kategori'; 
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Detail Konser dan Tiket */}
        <Route path="/detail-konser" element={<DetailKonser />} />
        <Route path="/card4" element={<Card4 />} />
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/pilihan-tiket" element={<PilihanTiket />} />
        <Route path="/tiket/:price" element={<Tiket />} />

        {/* Pembayaran */}
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/confirm2" element={<Confirm2 />} />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-detail" element={<BlogDetail />} />
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
