import '../style.css'
import Lenis from 'lenis'

// import { ShimmerText } from './components/shimmer'
import { Footer } from '../components/bottom'



// LENIS SMOOTH SCROLLING 
const lenis = new Lenis({
    duration: 1.35,                    // speed
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,

    wheelMultiplier: 1.2,              // scroll sens
    touchMultiplier: 2,
    infinite: false,
})

// raf function
function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// gsap sync
lenis.on('scroll', () => {

})




console.log('Creating Footer...');
document.body.appendChild(Footer());
console.log('Footer added');
