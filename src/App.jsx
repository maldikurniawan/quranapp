import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import DetailSurah from './pages/Surah/DetailSurah';

function App() {
  return (
    <div className='relative mx-auto max-w-[450px] bg-[#fff] p-[20px]'>
      <Routes>
        <Route path="/quranapp/" element={<SplashScreen />} />
        <Route path="/quranapp/home" element={<Home />} />
        <Route path="/quranapp/surah/:nomor" element={<DetailSurah />} />
      </Routes>
    </div>
  );
}

export default App;
