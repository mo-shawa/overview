import "./style.css"
import * as THREE from "three"

const scene = new THREE.Scene()

const sizes = {
	height: window.innerHeight,
	width: window.innerWidth,
}

const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.append(renderer.domElement)

const camera = new THREE.PerspectiveCamera(
	65,
	sizes.width / sizes.height,
	0.01,
	1000000
)

window.addEventListener("resize", () => {
	sizes.height = window.innerHeight
	sizes.width = window.innerWidth

	renderer.setSize(sizes.width, sizes.height)
	camera.aspect = sizes.width / sizes.height

	camera.updateProjectionMatrix()
})

camera.position.z = 5

scene.add(camera)

const testmesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshMatcapMaterial()
)

console.log(testmesh)

scene.add(testmesh)

renderer.render(scene, camera)

function tick() {
	requestAnimationFrame(tick)
	testmesh.rotation.y += 0.01
	renderer.render(scene, camera)
}

tick()
