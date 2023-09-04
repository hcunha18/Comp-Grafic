import * as THREE from "three";
import { OrbitControls } from "../build/jsm/controls/OrbitControls.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import {
  initRenderer,
  initCamera,
  initDefaultBasicLight,
  setDefaultMaterial,
  InfoBox,
  onWindowResize,
  createGroundPlaneXZ,
} from "../libs/util/util.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";

let scene, renderer, camera, material, light, orbit, trackball; // Initial variables
scene = new THREE.Scene(); // Create main scene
renderer = initRenderer(); // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.
trackball = new TrackballControls(camera, renderer.domElement);
let cameraOffset = new THREE.Vector3(0, 25, 50);
let cameraLookAhead = 5.0;
let isOrbitActive = true;

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);
var velocidade_carro = 0;
var acelerou = false;

// To use the keyboard
var keyboard = new KeyboardState();

// To be used to manage keyboard
let clock = new THREE.Clock();

// create the ground plane
let plane = createGroundPlaneXZ(20, 20);
scene.add(plane);

//carroceria do carro
let carroceriaGeometry = new THREE.BoxGeometry(6, 3, 5);
let carroceria = new THREE.Mesh(carroceriaGeometry, material);
carroceria.position.set(0.0, 2.0, 0.0); // posicao da carroceria

//farol da carroceria
const geomeriaFarol = new THREE.ConeGeometry(0.5, 0.5, 27);
const materialFarol = new THREE.MeshBasicMaterial({
  color: 0x000000,
});
const Farol = new THREE.Mesh(geomeriaFarol, materialFarol);
const Farol2 = new THREE.Mesh(geomeriaFarol, materialFarol);

Farol.position.set(3, -1, 1);
Farol2.position.set(3, -1, -1);

Farol.rotateZ(Graus_radianos(90));
Farol2.rotateZ(Graus_radianos(90));

carroceria.add(Farol);
carroceria.add(Farol2);

// rodas do carro
let rodasGeometry = new THREE.CylinderGeometry(1, 1, 1, 64);
const materialRodas = new THREE.MeshBasicMaterial({
  color: 0xffff00,
});
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

function updateCameraPosition() {
  let lookAtPosition = new THREE.Vector3(
    carroceria.position.x + cameraLookAhead * Math.sin(carroceria.rotation.y),
    carroceria.position.y,
    carroceria.position.z + cameraLookAhead * Math.cos(carroceria.rotation.y)
  );

  let newPosition = carroceria.position.clone().add(cameraOffset);
  camera.position.set(newPosition.x, newPosition.y, newPosition.z);
  camera.lookAt(lookAtPosition);
}

function toggleInspectionMode() {
  if (isOrbitActive) {
    // Mostrar todos os objetos
    scene.children.forEach((child) => {
      child.visible = true;
    });
  } else {
    // Ocultar todos os objetos exceto a carroceria e rodas
    scene.children.forEach((child) => {
      if (
        child !== carroceria &&
        child !== roda1 &&
        child !== roda2 &&
        child !== roda3 &&
        child !== roda4
      ) {
        child.visible = false;
      } else {
        child.visible = true;
      }
    });
    // Centralize a câmera no carro
    camera.lookAt(carroceria.position);
  }
}

function keyboardUpdate() {
  keyboard.update();
  //angulo de rotacai do carro
  var angle = THREE.MathUtils.degToRad(2);
  var anguloRoda = 0;
  console.log(velocidade_carro);

  if (keyboard.pressed("space")) {
    isOrbitActive = !isOrbitActive;
    if (isOrbitActive) {
      // Ative o OrbitControls e desative o TrackballControls
      orbit.enabled = true;
      trackball.enabled = false;
    } else {
      // Ative o TrackballControls e desative o OrbitControls
      orbit.enabled = false;
      trackball.enabled = true;
    }
    toggleInspectionMode();
  }

  if (keyboard.pressed("up")) {
    velocidade_carro = 0.5;
    carroceria.translateX(velocidade_carro);
    roda1.rotateZ(0);
  } else {
    if (velocidade_carro > 0) {
      velocidade_carro -= 0.025;
      velocidade_carro = Number(velocidade_carro.toFixed(2));
      carroceria.translateX(velocidade_carro);
    }
  }

  if (keyboard.pressed("down")) {
    velocidade_carro = -0.5;
    velocidade_carro = Number(velocidade_carro.toFixed(2));
    carroceria.translateX(velocidade_carro);
  } else {
    if (velocidade_carro < 0) {
      velocidade_carro += 0.025;
      velocidade_carro = Number(velocidade_carro.toFixed(2));
      carroceria.translateX(velocidade_carro);
    }
  }

  if (keyboard.pressed("left")) {
    //rotacao das rodas
    if (roda1.rotation.z > Graus_radianos(-30)) {
      anguloRoda -= Graus_radianos(1);
      anguloRoda = Number(anguloRoda.toFixed(2));
      roda1.rotateZ(anguloRoda);
      roda3.rotateZ(anguloRoda);
    }
    if (velocidade_carro > 0 && acelerou) {
      carroceria.rotateY(angle);
    }
    if (keyboard.pressed("left") && keyboard.pressed("up"))
      carroceria.rotateY(angle);

    if (keyboard.pressed("left") && keyboard.pressed("down"))
      carroceria.rotateY(-angle);
  } else {
    if (roda1.rotation.z < Graus_radianos(0)) {
      anguloRoda += Graus_radianos(1);
      anguloRoda = Number(anguloRoda.toFixed(2));
      roda1.rotateZ(anguloRoda);
      roda3.rotateZ(anguloRoda);
    }
  }
  if (keyboard.pressed("right")) {
    //rotacao das rodas
    if (roda1.rotation.z < Graus_radianos(30)) {
      anguloRoda += Graus_radianos(1);
      anguloRoda = Number(anguloRoda.toFixed(2));
      roda1.rotateZ(anguloRoda);
      roda3.rotateZ(anguloRoda);
    }
    if (velocidade_carro > 0 && acelerou) {
      carroceria.rotateY(-angle);
    }

    if (keyboard.pressed("left") || keyboard.pressed("right")) {
      cameraLookAhead = 5.0; //  antecipação durante a curva
    } else {
      cameraLookAhead = 3.0; // Volta ao valor normal quando não estiver virando
    }

    if (keyboard.pressed("right") && keyboard.pressed("up"))
      carroceria.rotateY(-angle);

    if (keyboard.pressed("right") && keyboard.pressed("down"))
      carroceria.rotateY(angle);
  } else {
    if (roda1.rotation.z > Graus_radianos(0)) {
      anguloRoda -= Graus_radianos(1);
      anguloRoda = Number(anguloRoda.toFixed(2));
      roda1.rotateZ(anguloRoda);
      roda3.rotateZ(anguloRoda);
    }
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

// Adição do código da pista
let posicaoPista = [
  [0, 0, -30],
  [0, 0, -60],
  [0, 0, 30],
  [0, 0, 60],
  [30, 0, -60],
  [60, 0, -60],
  [90, 0, -60],
  [120, 0, -60],
  [120, 0, 0],
  [120, 0, -30],
  [120, 0, -60],
  [90, 0, 0],
  [30, 0, 60],
  [60, 0, 60],
  [60, 0, 30],
  [60, 0, 0],
];

function createPista(vet) {
  let posicaoLargada1 = [
    [-10, 0, 10],
    [-10, 0, -10],
    [10, 0, 10],
    [10, 0, -10],
    [0, 0, 0],
  ];
  let posicaoLargada2 = [
    [0, 0, -10],
    [0, 0, 10],
    [-10, 0, 0],
    [10, 0, 0],
  ];
  let geometry1 = new THREE.BoxGeometry(10, 0, 10);
  let material1 = new THREE.MeshBasicMaterial({ color: "black" });
  let material2 = new THREE.MeshBasicMaterial({ color: "white" });
  let largada1 = [];
  let largada2 = [];

  let j = 0;
  while (j < posicaoLargada1.length) {
    largada1[j] = new THREE.Mesh(geometry1, material1);
    largada1[j].position.set(
      posicaoLargada1[j][0],
      posicaoLargada1[j][1],
      posicaoLargada1[j][2]
    );
    scene.add(largada1[j]);
    j++;
  }
  let k = 0;
  while (k < posicaoLargada2.length) {
    largada2[k] = new THREE.Mesh(geometry1, material2);
    largada2[k].position.set(
      posicaoLargada2[k][0],
      posicaoLargada2[k][1],
      posicaoLargada2[k][2]
    );
    scene.add(largada2[k]);
    k++;
  }

  let i = 0;
  let cube = [];
  let geometry = new THREE.BoxGeometry(30, 0, 30);
  let material = new THREE.MeshBasicMaterial({ color: 0x363636 });

  while (i < posicaoPista.length) {
    cube[i] = new THREE.Mesh(geometry, material);
    cube[i].position.set(vet[i][0], vet[i][1], vet[i][2]);
    scene.add(cube[i]);
    i++;
  }
}

createPista(posicaoPista);

function render() {
  requestAnimationFrame(render);
  if (isOrbitActive) {
    orbit.update();
  } else {
    trackball.update();
  }
  keyboardUpdate();
  updateCameraPosition();
  renderer.render(scene, camera);
}
