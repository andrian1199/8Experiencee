import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DetailKonser from './pages/DetailKonser';
import Card4 from './pages/Card4';
import Blog from './pages/BlogPage'; 
import BlogDetailPage from './pages/BlogDetailPage';
import Komunitas from './pages/Komunitas';
import CommunityDetail from './pages/CommunityDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import PilihanTiket from './pages/Pilihantiket';
import Pembayaran from './pages/Pembayaran';

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
        <Route path="/komunitas/:id" element={<CommunityDetail />} /> {/* Route dinamis */}
        <Route path="/pilihan-tiket" element={<PilihanTiket />} /> 
        <Route path="/Pembayaran" element={<Pembayaran />} /> 
        <Route path="/Home" element={<Home/>} />

      </Routes>
    </Router>
  );
}

export default App;


