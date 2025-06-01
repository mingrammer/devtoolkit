import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Analytics 자동 초기화
import './services/analytics';

createRoot(document.getElementById("root")!).render(<App />);
