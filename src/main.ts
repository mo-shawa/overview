import "./style.css"
import * as THREE from "three"

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
	new THREE.SphereGeometry(2, 400, 400),
	new THREE.MeshStandardMaterial({
		map: earthMap,
	})
)

testmesh.castShadow = true
testmesh.receiveShadow = true

scene.add(testmesh)

const sun = new THREE.PointLight("white", 1, 100)
sun.position.set(10, 0, 10)

scene.add(sun)

renderer.render(scene, camera)

function tick() {
	requestAnimationFrame(tick)
	testmesh.rotation.y += 0.00005
	renderer.render(scene, camera)
}

tick()
