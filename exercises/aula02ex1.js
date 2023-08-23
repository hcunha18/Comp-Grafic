import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
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

var scale = 1.0;

showInformation();

// create the ground plane
let plane = createGroundPlaneXZ(200, 200)
scene.add(plane);

// create a cube
let cubeGeometry = new THREE.BoxGeometry(11, 0.3, 6);
let cylinGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 10)
let cube = new THREE.Mesh(cubeGeometry, material);
let cylinder = new THREE.Mesh(cylinGeometry, material);
let cylinder1 = new THREE.Mesh(cylinGeometry, material);
let cylinder2 = new THREE.Mesh(cylinGeometry, material);
let cylinder3 = new THREE.Mesh(cylinGeometry, material);

// position the cube
cube.position.set(-5.0, 2.0, 0.0);
cylinder.position.set(5, -1.1, 2)
cylinder1.position.set(5, -1.1, -2)
cylinder2.position.set(-5, -1.1, 2)
cylinder3.position.set(-5, -1.1, -2)

// add the cube to the scene
scene.add(cube);
cube.add(cylinder);
cube.add(cylinder1);
cube.add(cylinder2);
cube.add(cylinder3)

render();
function keyboardUpdate() 
{
   keyboard.update();
   if ( keyboard.pressed("left") )     cube.translateX( -1 );
   if ( keyboard.pressed("right") )    cube.translateX(  1 );
   if ( keyboard.pressed("up") )       cube.translateY(  1 );
   if ( keyboard.pressed("down") )     cube.translateY( -1 );
   if ( keyboard.pressed("pageup") )   cube.translateZ(  1 );
   if ( keyboard.pressed("pagedown") ) cube.translateZ( -1 );

   let angle = THREE.MathUtils.degToRad(10); 
   if ( keyboard.pressed("A") )  cube.rotateY(  angle );
   if ( keyboard.pressed("D") )  cube.rotateY( -angle );

   if ( keyboard.pressed("W") )
   {
      scale+=.1;
      cube.scale.set(scale, scale, scale);
   }
   if ( keyboard.pressed("S") )
   {
      scale-=.1;
      cube.scale.set(scale, scale, scale);
   }   
}

function updatePositionMessage()
{
   let wp = new THREE.Vector3(); 
   sphere.getWorldPosition( wp );

   var str =  "Sphere Position: Local Space {" + sphere.position.x.toFixed(1) + ", " + sphere.position.y.toFixed(1) + ", " + sphere.position.z.toFixed(1) + "} " + 
             "| World Space {" + wp.x.toFixed(1) + ", " + wp.y.toFixed(1) + ", " + wp.z.toFixed(1) + "}";
   positionMessage.changeMessage(str);
}

// Use this to show information onscreen
function showInformation()
{
  // Use this to show information onscreen
  var controls = new InfoBox();
    controls.add("Geometric Transformation");
    controls.addParagraph();
    controls.add("Use keyboard arrows to move the cube in XY.");
    controls.add("Press Page Up or Page down to move the cube over the Z axis");
    controls.add("Press 'A' and 'D' to rotate.");
    controls.add("Press 'W' and 'S' to change scale");
    controls.show();
}
render();
function render()
{
  keyboardUpdate();
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}