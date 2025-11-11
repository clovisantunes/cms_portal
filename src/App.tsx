import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/theme.scss';
import LoginPage from './pages/Login';
import Portal from './pages/Portal';
import { registerSW } from 'virtual:pwa-register'


registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </Router>
  );
}

export default App;