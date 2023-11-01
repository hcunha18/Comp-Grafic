import * as THREE from "three";
import { setDefaultMaterial } from "../libs/util/util.js";
import { InfoBox, SecondaryBox } from "../libs/util/util.js";


function createGroundPlaneXZ(width, height) {
	const geometry = new THREE.PlaneGeometry(width, height);
	const material = new THREE.MeshBasicMaterial({ color: 0xcccccc });
	const plane = new THREE.Mesh(geometry, material);
	plane.position.set(0, 0, 0);
	plane.rotation.x = -Math.PI / 2;
	return plane;
  }

  
// Define the dimensions of the cyber truck
const width = 2.5;
const height = 2.0;
const length = 5.0;

// Create the ground plane
const plane = createGroundPlaneXZ(20, 20);

// Create the cyber truck body
const body = new THREE.Mesh(
  // Use a more complex geometry for the body
  new THREE.BoxGeometry(width, height, length, 100),
  setDefaultMaterial()
);

// Create the cyber truck wheels
const wheel = new THREE.Mesh(
  // Use a more complex geometry for the wheels
  new THREE.CylinderGeometry(1.0, 0.5, 0.5, 100),
  setDefaultMaterial()
);
const wheel2 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.0, 0.5, 0.5, 100),
  setDefaultMaterial()
);

// Position the cyber truck body
body.position.set(0, 1, 0);

// Position the cyber truck wheels
wheel.position.set(-1, 0.5, 0);
wheel2.position.set(1, 0.5, 0);

// Add details to the cyber truck
body.add(
  // Add a window to the front of the car
  new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ color: "white" })
  )
);
body.add(
  // Add headlights to the front of the car
  new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshBasicMaterial({ color: "yellow" })
  )
);
body.add(
  // Add a bumper to the front of the car
  new THREE.BoxGeometry(1, 0.5, 0.5),
    new THREE.MeshBasicMaterial({ color: "black" })
  );

// Add mirrors
const mirror = new THREE.Mesh(
  // Use a box geometry for the mirrors
  new THREE.BoxGeometry(0.5, 1, 0.5),
  setDefaultMaterial()
);
mirror.position.set(-0.75, 1, 0.25);
body.add(mirror);
const mirror2 = new THREE.Mesh(
  // Use a box geometry for the mirrors
  new THREE.BoxGeometry(0.5, 1, 0.5),
  setDefaultMaterial()
);
mirror2.position.set(0.75, 1, 0.25);
body.add(mirror2);

// Create the scene
const scene = new THREE.Scene();
scene.add(plane);
scene.add(body);
scene.add(wheel);
scene.add(wheel2);

// Create the camera
const camera = initCamera(new THREE.Vector3(0, 15, 32));

// Create the renderer
const renderer = initRenderer();

// Render the scene
function render() {
  renderer.render(scene, camera);
}

// Start rendering
render();
