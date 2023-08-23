import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, light, orbit; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// criando material da roda
var materialRoda = new THREE.MeshPhongMaterial({color: 0x000});

// criando roda dafault
let GeometriaRoda= new THREE.CylinderGeometry(4, 4, 20, 32);
let roda = new THREE.Mesh(GeometriaRoda, materialRoda);

// criando suporte de carcaça
let GeometriaCaixa = new THREE.BoxGeometry(2.5, 1, 5);
let materialCaixa = new THREE.MeshPhongMaterial({color : 0xffffff});
let caixa  = new THREE.Mesh(GeometriaCaixa, materialCaixa);

// criando cabine
let Geometriacabine = new THREE.CylinderGeometry(2, 2, 2.5, 32, 1, false, 0, 3.14);
let cabine = new THREE.Mesh(Geometriacabine, materialCaixa);

// position the cube
// roda.position.set(0, 0, 0);
// caixa.position.set(0, 5, 0);
cabine.position.set(0, 5, 0);
cabine.rotateZ(1.57);
// add the cube to the scene
scene.add(cabine);



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