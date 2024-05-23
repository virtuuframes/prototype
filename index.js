const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas:  document.querySelector('canvas') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// create a webXR manager instance
const xrManager = new THREE.WebXRManager(renderer);


// Room Geometry
const rootWidth = 5;
const rootHeight = 2.5;
const roomDepth = 4;

const wallGeometry = new THREE.BoxGeometry(rootWidth, rootHeight, roomDepth);   

// Create materials for your walls, floor, and ceiling. 
// You can use basic THREE.MeshBasicMaterial for simple 
// colors or explore textures with THREE.MeshPhongMaterial


// Create meshes for each wall, floor, and ceiling using the geometry and materials:

const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
frontWall.position.z = -roomDepth / 2;

// Create meshes for the other walls:
const rightWall = new THREE.Mesh(wallGeometry.clone(), wallMaterial); // Clone to avoid modifying original geometry
rightWall.position.x = roomWidth / 2;

const leftWall = new THREE.Mesh(wallGeometry.clone(), wallMaterial);
leftWall.position.x = -roomWidth / 2;

const backWall = new THREE.Mesh(wallGeometry.clone(), wallMaterial);
backWall.position.z = -roomDepth / 2;

// Create floor and ceiling meshes:
const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2; // Rotate floor to lie flat on the ground

const ceiling = new THREE.Mesh(floorGeometry.clone(), ceilingMaterial);
ceiling.position.y = roomHeight;
ceiling.rotation.x = Math.PI / 2; // Rotate ceiling to be on top



// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// to interact with obecjts in the scene,  use Three.js's raycasting functionality:

renderer.domElement.addEventListener('click', (event) => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(renderer.getCurrentViewport().aspect);
    const intersects = raycaster.intersectObjects(scene.children);
    // Handle interactions based on detected intersections
})


scene.add(frontWall, rightWall, leftWall, backWall);


// Rendering and Entering VR:

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, xrManager.isPresenting ? xrManager.getCamera() : camera); // Use XR camera when in VR
}

animate();

xrManager.start();