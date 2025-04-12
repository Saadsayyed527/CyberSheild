import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import ScanPage from './components/ScanPage'; // your scan page component
import ExcessiveScanPage from './components/ExcessiveScanPage';
import FakePaymentPage from './components/FakePaymentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/excessive-scan" element={<ExcessiveScanPage />} /> {/* <-- New Route */}
        <Route path="/payment" element={<FakePaymentPage />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
