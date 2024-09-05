import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home';
import TicketsPage from './pages/TicketPage';
import { CssBaseline, Toolbar } from '@mui/material';

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <main style={{ padding: '16px', marginLeft: drawerWidth }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tickets" element={<TicketsPage />} />
            {/* Yeni sayfalar ekledikçe buraya Route ekleyebilirsiniz */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;