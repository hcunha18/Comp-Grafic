import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(200, 200)
scene.add(plane);

// create a cube
// let cubeCircle = new THREE.SphereGeometry(4, 32, 64);
let cubeCircle = new THREE.CylinderGeometry(4, 4, 4, 64);
let cube = new THREE.Mesh(cubeCircle, material);
let cube1 = new THREE.Mesh(cubeCircle, material);
let cube2 = new THREE.Mesh(cubeCircle, material);
// position the cube
cube.position.set(-10.0, 2.0, 0.0);
cube1.position.set(0.0, 2.0, 0.0);
cube2.position.set(+10.0, 2.0, 0.0);
// add the cube to the scene
scene.add(cube);
scene.add(cube1)
scene.add(cube2)

// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}