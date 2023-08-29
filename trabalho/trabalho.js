import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import KeyboardState from '../libs/util/KeyboardState.js'
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

// To use the keyboard
var keyboard = new KeyboardState();

// To be used to manage keyboard
let clock = new THREE.Clock();

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

//carroceria do carro
let carroceriaGeometry = new THREE.BoxGeometry(6, 3, 5);
let carroceria = new THREE.Mesh(carroceriaGeometry, material);
carroceria.position.set(0.0, 2.0, 0.0);  // posicao da carroceria

//farol da carroceria
const geomeriaFarol = new THREE.ConeGeometry( 0.5, 0.5, 27 ); 
const materialFarol = new THREE.MeshBasicMaterial( {color: 0x000000} );
const Farol = new THREE.Mesh(geomeriaFarol, materialFarol );
const Farol2 = new THREE.Mesh(geomeriaFarol, materialFarol );

Farol.position.set(3, -1, 1);
Farol2.position.set(3, -1, -1);

Farol.rotateZ(Graus_radianos(90))
Farol2.rotateZ(Graus_radianos(90))

carroceria.add( Farol );
carroceria.add( Farol2 );


// rodas do carro
let rodasGeometry = new THREE.CylinderGeometry( 1, 1, 1,64 );
const materialRodas = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
let roda1 = new THREE.Mesh(rodasGeometry, materialRodas);
let roda2 = new THREE.Mesh(rodasGeometry, materialRodas);
let roda3 = new THREE.Mesh(rodasGeometry, materialRodas);
let roda4 = new THREE.Mesh(rodasGeometry, materialRodas);

roda1.position.set(2.3, -1, 2.5);
roda2.position.set(-2.3, -1, 2.5);
roda3.position.set(2.3, -1, -2.5);
roda4.position.set(-2.3, -1, -2.5);

//rotaciona a roda em 90 graus
var radianos = Graus_radianos(90);


roda1.rotateX(radianos);
roda2.rotateX(radianos);
roda3.rotateX(radianos);
roda4.rotateX(radianos);

//adiciona as rodas na carroceria
carroceria.add(roda1);
carroceria.add(roda2);
carroceria.add(roda3);
carroceria.add(roda4);
carroceria.rotateY(radianos);

// add the carroceria to the scene
scene.add(carroceria);


function keyboardUpdate() {

  keyboard.update();

  if ( keyboard.pressed("up") ){

    carroceria.translateX(  .5 );

  }
  if ( keyboard.pressed("down") ){

    carroceria.translateX( -.5 );
    
  }  

  //angulo de rotacai do carro
  var angle = THREE.MathUtils.degToRad(3);
  var anguloRoda = 0;

  
  if ( keyboard.pressed("left") ){
    //rotacao das rodas
    if( roda1.rotation.z > Graus_radianos(-30)){
      anguloRoda -= 0.01
      roda1.rotateZ( anguloRoda );
      roda3.rotateZ( anguloRoda );
    }
    if(keyboard.pressed("left")  && keyboard.pressed("up")) carroceria.rotateY( angle );

    if(keyboard.pressed("left")  && keyboard.pressed("down")) carroceria.rotateY( -angle );
  }  
  if ( keyboard.pressed("right") ){
    //rotacao das rodas
      if(roda1.rotation.z < Graus_radianos(30)){
        anguloRoda += 0.01
        roda1.rotateZ( anguloRoda );
        roda3.rotateZ( anguloRoda );
        console.log(roda1.rotation.z);

      }
      if(keyboard.pressed("right")  && keyboard.pressed("up")) carroceria.rotateY( -angle );

      if(keyboard.pressed("right")  && keyboard.pressed("down")) carroceria.rotateY( angle );
  } 

}

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

//funcao para tranformar graus em radianos
function Graus_radianos(anguloGraus) {
  var radianos = anguloGraus * (Math.PI / 180);
  return radianos;
}

function render()
{
  requestAnimationFrame(render);
  keyboardUpdate();
  renderer.render(scene, camera) // Render scene
}