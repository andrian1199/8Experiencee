import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DetailKonser from "./pages/DetailKonser";
import Card4 from "./pages/Card4";
import Blog from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import Komunitas from "./pages/Komunitas";
import CommunityDetail from "./pages/CommunityDetail";
import PilihanTiket from "./pages/Pilihantiket";
import Pembayaran from "./pages/Pembayaran";
import ProfilePage from "./pages/ProfilePage"; // Halaman profil
import EditProfilePage from "./pages/EditProfilePage"; // Halaman Edit Profil
import ChangePassword from "./pages/ChangePassword"; // Halaman Ganti Kata Sandi
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-konser" element={<DetailKonser />} />
        <Route path="/card4" element={<Card4 />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/komunitas" element={<Komunitas />} />
        <Route path="/komunitas/:id" element={<CommunityDetail />} />
        <Route path="/pilihan-tiket" element={<PilihanTiket />} />
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/profil/edit" element={<EditProfilePage />} /> {/* Halaman Edit Profil */}
        <Route path="/ganti-kata-sandi" element={<ChangePassword />} /> {/* Halaman Ganti Kata Sandi */}
      </Routes>
    </Router>
  );
}

export default App;
