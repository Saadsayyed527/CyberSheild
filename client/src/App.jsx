import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import ScanPage from './components/ScanPage'; // your scan page component
import ExcessiveScanPage from './components/ExcessiveScanPage';
import FakePaymentPage from './components/FakePaymentPage';
import PdfFeedbackUploader from './components/PdfFeedbackUploader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/excessive-scan" element={<ExcessiveScanPage />} /> {/* <-- New Route */}
        <Route path="/payment" element={<FakePaymentPage />} />
        <Route path="/ai-upload" element={<PdfFeedbackUploader></PdfFeedbackUploader>} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
