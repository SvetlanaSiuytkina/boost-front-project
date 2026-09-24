import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BoostPage } from './pages/BoostPage';
import { CreateAchievementPage } from './pages/CreateAchievementPage';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/boost" replace />} />
        <Route path="/boost" element={<BoostPage />} />
        <Route path="/boost/create" element={<CreateAchievementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;