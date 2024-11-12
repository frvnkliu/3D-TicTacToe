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
const cubeLength = 60;
const geometry = new THREE.BoxGeometry(cubeLength, cubeLength, cubeLength);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff , transparent: true, opacity: 0});
const wireframeCube = new THREE.Mesh(geometry, material);
//wireframeCube.visible = false;

const cubeFamily = new THREE.Group();
cubeFamily.add(wireframeCube);
scene.add(cubeFamily);

/*
const axesHelper = new THREE.AxesHelper(100);
cubeFamily.add(axesHelper);
const gridHelper = new THREE.GridHelper(cubeLength*2, 12);
cubeFamily.add(gridHelper);
*/

// Making points for each cube
for (let i=-(cubeLength/2); i<=(cubeLength/2);i+=(cubeLength/3)){
  for (let j=-(cubeLength/2); j<=(cubeLength/2);j+=(cubeLength/3)){
    for (let k=-(cubeLength/2); k<=(cubeLength/2);k+=(cubeLength/3)){
      const g = new THREE.SphereGeometry(1, 32, 16); 
      const m = new THREE.MeshBasicMaterial( { color: 0xE1F0FA, transparent: true, opacity: 0.5, depthTest: false} ); 
      const sphere = new THREE.Mesh( g, m );
      sphere.position.set(i, j, k);
      cubeFamily.add( sphere );
    }
  }
}

/*
  Creating "wireframe" lines inbetween our points
*/
// Add lines along the x-axis
for (let j = -(cubeLength / 2); j <= cubeLength / 2; j += cubeLength / 3) {
  for (let k = -(cubeLength / 2); k <= cubeLength / 2; k += cubeLength / 3) {
    const start = new THREE.Vector3(-cubeLength / 2, j, k);
    const end = new THREE.Vector3(cubeLength / 2, j, k);
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color: 0xE1F0FA  });
    const line = new THREE.Line(geometry, material);
    cubeFamily.add(line);
  }
}

// Add lines along the y-axis
for (let i = -(cubeLength / 2); i <= cubeLength / 2; i += cubeLength / 3) {
  for (let k = -(cubeLength / 2); k <= cubeLength / 2; k += cubeLength / 3) {
    const start = new THREE.Vector3(i, -cubeLength / 2, k);
    const end = new THREE.Vector3(i, cubeLength / 2, k);
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color: 0xE1F0FA, depthTest: false  });
    const line = new THREE.Line(geometry, material);
    cubeFamily.add(line);
  }
}

// Add lines along the z-axis
for (let i = -(cubeLength / 2); i <= cubeLength / 2; i += cubeLength / 3) {
  for (let j = -(cubeLength / 2); j <= cubeLength / 2; j += cubeLength / 3) {
    const start = new THREE.Vector3(i, j, -cubeLength / 2);
    const end = new THREE.Vector3(i, j, cubeLength / 2);
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({ color: 0xE1F0FA, depthTest: false  });
    const line = new THREE.Line(geometry, material);
    cubeFamily.add(line);
  }
}

// Position the camera
camera.position.z = 120;

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
    //find if element is hovered

    if (isDragging) {
        // Calculate the change in mouse position
        const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
        };

        // Update cube rotation based on mouse movement
        cubeFamily.rotateOnWorldAxis(axisY, deltaMove.x * 0.007);
        cubeFamily.rotateOnWorldAxis(axisX, deltaMove.y * 0.007);
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