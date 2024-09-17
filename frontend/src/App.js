import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home';
import TicketsPage from './pages/TicketPage';
import { CssBaseline, Toolbar } from '@mui/material';
import CreateTicketPage from './pages/CreateTicketPage';
import Topbar from './components/Topbar/Topbar';

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CssBaseline />
        <Sidebar />
        <Topbar />

        <main style={{
          marginRight: '120px',
          padding: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
        }}>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/create" element={<CreateTicketPage />} />
            {/* Yeni sayfalar ekledikçe buraya Route ekleyebilirsiniz */}
          </Routes>
        </main>
      </div>
    </Router >
  );
}

export default App;