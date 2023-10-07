import "./style.css"
import * as THREE from "three"
import { VRButton } from "three/examples/jsm/webxr/VRButton"

const loader = new THREE.TextureLoader()
const earthMap = loader.load(
	"1_earth_8k.jpg",
	() => console.log("success"),
	() => console.log("progress"),
	(error) => console.error(error)
)

const scene = new THREE.Scene()

const sizes = {
	height: window.innerHeight,
	width: window.innerWidth,
}

const renderer = new THREE.WebGLRenderer()
renderer.xr.enabled = true
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height)

document.body.append(renderer.domElement)
document.body.append(VRButton.createButton(renderer))

const camera = new THREE.PerspectiveCamera(
	45,
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

// camera.position.z = 3500
const cameraGroup = new THREE.Group()
cameraGroup.add(camera) // Set the initial VR Headset Position.
cameraGroup.position.z = 3500
cameraGroup.rotation.y = -Math.PI / 6

scene.add(cameraGroup)

//When user turn on the VR mode.
renderer.xr.addEventListener("sessionstart", function () {
	scene.add(cameraGroup)
	cameraGroup.add(camera)
})
//When user turn off the VR mode.
renderer.xr.addEventListener("sessionend", function () {
	scene.remove(cameraGroup)
	cameraGroup.remove(camera)
})

const earthMesh = new THREE.Mesh(
	new THREE.SphereGeometry(2000, 400, 400),
	new THREE.MeshStandardMaterial({
		map: earthMap,
		roughness: 0.5,
		metalness: 0.1,
	})
)

earthMesh.castShadow = true
earthMesh.receiveShadow = true

scene.add(earthMesh)

const sun = new THREE.PointLight("white", 1, 100000)
sun.position.set(15000, 0, 10000)

scene.add(sun)

// const pointsArray = new Float32Array(6000)

// for (let i = 0; i < 6000 / 3; i++) {
// 	const i3 = i * 3
// 	pointsArray[i3 + 0] = (Math.random() - 0.5) * 10000
// 	pointsArray[i3 + 1] = (Math.random() - 0.5) * 10000
// 	pointsArray[i3 + 2] = (Math.random() - 0.5) * 10000
// }

// const starsGeometry = new THREE.SphereGeometry(10000)
// starsGeometry.setAttribute(
// 	"position",
// 	new THREE.BufferAttribute(pointsArray, 3)
// )

// const stars = new THREE.Points(starsGeometry, new THREE.PointsMaterial({}))

// scene.add(stars)

renderer.setAnimationLoop(() => {
	earthMesh.rotation.y += 0.00005
	renderer.render(scene, camera)
})

// function tick() {
// 	requestAnimationFrame(tick)
// 	earthMesh.rotation.y += 0.00005
// 	renderer.render(scene, camera)
// }

// tick()
