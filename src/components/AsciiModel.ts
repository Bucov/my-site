import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// ASCII generator by AndrewSink - https://github.com/AndrewSink/STL-to-ASCII-Generator



export interface AsciiModelOptions {
    /** Path to the .stl file, relative to /public   */
    stlPath: string
    /** Width of the ASCII panel in px (default: 480) */
    panelWidth?: number
    /** ASCII character ramp, darkest to lightest (default: ' .:-+*=%@#') */
    characters?: string
    /** ASCII resolution — lower = bigger chars (default: 0.2) */
    resolution?: number
    /** Auto-rotate around Y axis (default: true) */
    autoRotate?: boolean
    /** Auto-rotate the light (default: true) */
    autoRotateLight?: boolean
    /** Text color of ASCII chars (default: '#D8D365' —  accent yellow) */
    color?: string
    /** Background color of panel (default: 'transparent') */
    background?: string
}

export function AsciiModel(options: AsciiModelOptions): HTMLElement {
    const {
        stlPath = '/models/ribaPastrmka.stl',
        panelWidth = 480,
        characters = ' .:-+*=%@#',
        resolution = 0.,
        autoRotate = true,
        autoRotateLight = true,
        color = '#E6F082',
        background = 'transparent',
    } = options

    /* ── Container ─────────────────────────────────────────── */
    const container = document.createElement('div')
    container.className = 'ascii-model'
    container.style.cssText = `
    position: fixed;
    right: 10%;
    top: 0;
    width: ${panelWidth}px;
    height: 100dvh;
    z-index: 5;
    overflow: hidden;
    pointer-events: auto;
  `

    /* ── Three.js core ─────────────────────────────────────── */
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, panelWidth / window.innerHeight, 0.1, 2000)

    const renderer = new THREE.WebGLRenderer()

    const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0)
    pointLight.position.set(100, 100, 400)
    scene.add(pointLight)

    const material = new THREE.MeshStandardMaterial({ flatShading: true, side: THREE.DoubleSide })

    /* ── ASCII Effect ──────────────────────────────────────── */
    let effect = buildEffect()

    function buildEffect(): AsciiEffect {
        const fx = new AsciiEffect(renderer, characters, { invert: true, resolution })
        fx.setSize(panelWidth, window.innerHeight)
        fx.domElement.style.color = color
        fx.domElement.style.backgroundColor = background
        // Remove the default white border AsciiEffect adds
        fx.domElement.style.border = 'none'
        return fx
    }

    container.appendChild(effect.domElement)

    /* ── Load STL ──────────────────────────────────────────── */
    const mesh = new THREE.Mesh()
    const loader = new STLLoader()
    let controls: OrbitControls
    let lightAngle = 45
    let animating = false

    loader.load(
        stlPath,
        (geometry) => {
            mesh.material = material
            mesh.geometry = geometry
            geometry.computeVertexNormals()
            mesh.geometry.center()
            mesh.geometry.computeBoundingBox()

            // Default orientation (most STLs come in Z-up)
            mesh.rotation.set(-Math.PI / 2, 0, 0)

            const bbox = mesh.geometry.boundingBox!
            mesh.position.y = (bbox.max.z - bbox.min.z) / 5

            camera.position.set(bbox.max.x * 4, bbox.max.y, bbox.max.z * 3)

            scene.add(mesh)

            controls = new OrbitControls(camera, effect.domElement)
            controls.enableDamping = true
            controls.dampingFactor = 0.05
            controls.rotateSpeed = 0.5
            controls.zoomSpeed = 0.8

            animating = true
            tick()
        },
        undefined,
        (err) => console.error('[AsciiModel] Failed to load STL:', stlPath, err)
    )

    /* ── Animation loop ────────────────────────────────────── */
    function tick() {
        if (!animating) return

        if (autoRotate) {
            mesh.rotation.z += 0.0009

            mesh.rotation.x += 0.0006
            mesh.rotation.y += 0.0006
        }

        if (autoRotateLight && mesh.geometry?.boundingBox) {
            lightAngle = (lightAngle + 0.01) % 360
            const rad = (lightAngle * Math.PI) / 180
            const radius = mesh.geometry.boundingBox.max.z * 2
            const height = (mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y) * 2
            pointLight.position.set(Math.cos(rad) * radius, height, Math.sin(rad) * radius)
        }

        controls?.update()
        effect.render(scene, camera)
        requestAnimationFrame(tick)
    }

    /* ── Resize ────────────────────────────────────────────── */
    window.addEventListener('resize', () => {
        camera.aspect = panelWidth / window.innerHeight
        camera.updateProjectionMatrix()
        effect.setSize(panelWidth, window.innerHeight)
    })

    return container
}