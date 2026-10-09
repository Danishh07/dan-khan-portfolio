import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'
gsap.registerPlugin(ScrollTrigger)
document.documentElement.classList.add('js')
createRoot(document.getElementById('root')).render(<App />)
