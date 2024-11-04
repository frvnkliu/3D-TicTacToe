// Import the THREE library
//import * as THREE from './node_modules/three/build/three.module.js';

// Select the container from the DOM
const container = document.getElementById('container');

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create a wireframe cube and add it to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff , wireframe: true });
const wireframeCube = new THREE.Mesh(geometry, material);
scene.add(wireframeCube);

// Position the camera
camera.position.z = 2;

const axisX = new THREE.Vector3(1, 0, 0);
const axisY = new THREE.Vector3(0, 1, 0);
var raycaster = new THREE.Raycaster();

function isHover(X, Y){
    //check if mouse is over sphere
    var mouseVector = new THREE.Vector2(X, Y);
    raycaster.setFromCamera(mouseVector, camera);
    var intersects = raycaster.intersectObject(wireframeCube);
    return intersects.length>0;
}

// Variables for tracking mouse movement
var hovered = false;
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

// Mouse down event to start dragging
document.addEventListener('mousedown', (event) => {
  isDragging = hovered;
});

// Mouse up event to stop dragging
document.addEventListener('mouseup', (event) => {
  isDragging = false;
});

// Mouse move event to rotate the cube based on mouse movement
document.addEventListener('mousemove', (event) => {
    var X = (event.clientX / window.innerWidth) * 2 - 1;
    var Y = -(event.clientY / window.innerHeight) * 2 + 1;
    if (isDragging) {
        // Calculate the change in mouse position
        const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
        };

        // Update cube rotation based on mouse movement
        wireframeCube.rotateOnWorldAxis(axisY, deltaMove.x * 0.007);
        wireframeCube.rotateOnWorldAxis(axisX, deltaMove.y * 0.007);
    }else{
        hovered = isHover(X, Y);
        console.log(hovered);
        if (hovered) {
            container.classList.add('hovered');
        }else{
            container.classList.remove('hovered');
        }

    }

    // Update the previous mouse position to the current position
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Adjust renderer size on resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

animate();

function onWindowResize() {
    // Update the size of the renderer
    renderer.setSize(window.innerWidth, window.innerHeight*.95);

    // Update the aspect ratio of the camera
    camera.aspect = window.innerWidth / (window.innerHeight*.95);
    camera.updateProjectionMatrix();
}
// Add event listener for window resize
window.addEventListener('resize', onWindowResize);