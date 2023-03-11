import "./style.css"
import * as THREE from "three"

const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer()
document.body.append(renderer.domElement)

const sizes = {
	height: window.innerHeight,
	width: window.innerWidth,
}

const camera = new THREE.PerspectiveCamera(
	65,
	sizes.width / sizes.height,
	0.01,
	1000000
)

renderer.render(scene, camera)
