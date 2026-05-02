import '../style.css'
import Lenis from 'lenis'
import { Footer } from '../components/bottom'


const photos: { src: string; alt: string }[] = [
    { src: '/my-site/photos/IMG_0355.jpg', alt: '' },
    { src: '/my-site/photos/IMG_0359_SnapseedCopy.jpg', alt: '' },
    { src: '/my-site/photos/IMG_0366.jpg', alt: '' },
    { src: '/my-site/photos/IMG_4799.JPG', alt: '' },
    { src: '/my-site/photos/Snapseed.jpg', alt: '' },
    { src: '/my-site/photos/IMG_0370.jpg', alt: '' },
    { src: '/my-site/photos/IMG_0379.jpg', alt: '' },
    { src: '/my-site/photos/IMG_1575.jpg', alt: '' },
    { src: '/my-site/photos/IMG_1576.jpg', alt: '' },
    { src: '/my-site/photos/IMG_1989.jpg', alt: '' },
    { src: '/my-site/photos/IMG_1994.jpg', alt: '' },
    { src: '/my-site/photos/IMG_1999.jpg', alt: '' },


]

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

// ── RENDER PHOTOS ────────────────────────────────────────────────
const grid = document.getElementById('photos-grid')!
const emptyState = document.getElementById('photos-empty')!

if (photos.length === 0) {
    emptyState.style.display = 'block'
} else {
    photos.forEach(({ src, alt }, i) => {
        const card = document.createElement('div')
        card.className = 'photo-card'

        const img = document.createElement('img')
        img.src = src
        img.alt = alt
        img.loading = 'lazy'

        // Stagger fade-in
        img.addEventListener('load', () => {
            setTimeout(() => card.classList.add('loaded'), i * 60)
        })

        // no lightbox, just open the image in a new tab
        card.addEventListener('click', () => {
            window.open(src, '_blank')
        })

        card.appendChild(img)
        grid.appendChild(card)
    })
}

// ── FOOTER ───────────────────────────────────────────────────────
document.body.appendChild(Footer())