import '../style.css'
import Lenis from 'lenis'

// import { ShimmerText } from './components/shimmer'
import { Footer } from '../components/bottom'



// === LENIS SMOOTH SCROLLING ===
const lenis = new Lenis({
    duration: 1.35,                    // brzina (1.2 - 1.6 je dobar opseg)
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // smoothTouch je uklonjen u novijim verzijama
    wheelMultiplier: 1.2,              // osetljivost na točkić miša
    touchMultiplier: 2,
    infinite: false,
})

// Raf funkcija (obavezno)
function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Sinhronizacija sa GSAP-om (ako budeš koristio ScrollTrigger kasnije)
lenis.on('scroll', () => {
    // ScrollTrigger.update() ide ovde ako koristiš GSAP ScrollTrigger
})




console.log('Creating Footer...');
document.body.appendChild(Footer());
console.log('Footer added');
