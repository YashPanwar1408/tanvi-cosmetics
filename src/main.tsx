
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ScrollbarHide from './components/utils/ScrollbarHide.tsx'
import { Toaster } from "@/components/ui/toaster"

createRoot(document.getElementById("root")!).render(
  <>
    <ScrollbarHide />
    <App />
    <Toaster />
  </>
);
