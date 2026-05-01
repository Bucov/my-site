import './style.css'
import Lenis from 'lenis'

// import { ShimmerText } from './components/shimmer'
import { Footer } from './components/bottom'
import { AsciiModel } from './components/AsciiModel'
import { NowPlaying } from './components/NowPlaying'



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


// Three.js canvas
// const canvas = document.querySelector<HTMLCanvasElement>('#bg')!;
document.body.appendChild(AsciiModel({
    stlPath: '/models/ribaPastrmka.stl',
    panelWidth: 680,
    autoRotate: true,
    color: '#f7f4b2',
}))


const container = document.getElementById("now-playing-container");

if (container) {
    const nowPlaying = NowPlaying();
    container.appendChild(nowPlaying);
}
// Footer
console.log('Creating Footer...');
document.body.appendChild(Footer());
console.log('Footer added');

const contactBtn = document.querySelector<HTMLButtonElement>('.contact-copy')!

contactBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('bosnjakluka008@gmail.com')

    contactBtn.classList.add('copied')

    setTimeout(() => {
        contactBtn.classList.remove('copied')
    }, 2000)
})
