import '../style.css'
import Lenis from 'lenis'

// import { ShimmerText } from './components/shimmer'
import { Footer } from '../components/bottom'
import { initGifButton } from '../components/gifButton';

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



initGifButton({
    idle: 'https://media1.tenor.com/m/ktVnvXR7HQ4AAAAC/kusuriya-no-hitorigoto-maomao.gif',   // default
    hover: 'https://media1.tenor.com/m/9TzshBF2xAIAAAAd/kusuriya-no-hitorigoto-apothecary.gif',   // while hovering
    angryIdle: 'https://media1.tenor.com/m/Ha_MSTSesLkAAAAd/the-apothecary.gif',  // after hover, before click
    clicked: 'https://media1.tenor.com/m/lZlpdC-haa8AAAAd/kusuriya-no-hitorigoto-the-apothecary-diaries.gif',   // after click
});


const contactBtn = document.querySelector<HTMLButtonElement>('.contact-copy')!
contactBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('bucov123')

    contactBtn.classList.add('copied')

    setTimeout(() => {
        contactBtn.classList.remove('copied')
    }, 2000)
})

console.log('Creating Footer...');
document.body.appendChild(Footer());
console.log('Footer added');
