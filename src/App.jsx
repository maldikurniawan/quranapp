import { Route, Routes } from 'react-router-dom';
import { Home, DetailSurah, DoaHarian, JadwalSalat } from '@/pages';

function App() {
  return (
    <div className='relative mx-auto max-w-[450px] bg-[#fff] p-[20px]'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surah/:nomor" element={<DetailSurah />} />
        <Route path="/doa" element={<DoaHarian />} />
        <Route path="/jadwal" element={<JadwalSalat />} />
      </Routes>
    </div>
  );
}

export default App;
