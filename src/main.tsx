
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ScrollbarHide from './components/utils/ScrollbarHide.tsx'

createRoot(document.getElementById("root")!).render(
  <>
    <ScrollbarHide />
    <App />
  </>
);
