import * as THREE from "three";
import { OrbitControls } from "../build/jsm/controls/OrbitControls.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import {
  initRenderer,
  initCamera,
  initDefaultBasicLight,
  setDefaultMaterial,
  InfoBox,
  SecondaryBox,
  onWindowResize,
  createGroundPlaneXZ,
} from "../libs/util/util.js";
import { carroceria } from "./carro.js";
import { Object3D } from "../build/three.module.js";

let scene, renderer, camera, light, orbit; // Initial variables
scene = new THREE.Scene(); // Create main scene
renderer = initRenderer(); // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.
let cameraOffset = new THREE.Vector3(-30, 25, 40);
let cameraLookAhead = 5.0;
let modoInspecao = true;
let pista = new THREE.Object3D();
let PistaEscolhida = 0;

// contador de voltas
var VoltasMessage = new SecondaryBox("");
VoltasMessage.box.style.bottom = "95%";
VoltasMessage.changeStyle("rgba(0,0,0,0)", "white", "32px", "ubuntu");

function updateVoltasMessage() {
  var str = "Voltas: " + voltas;
  VoltasMessage.changeMessage(str);
}

//cronometro
var cronometroMessage = new SecondaryBox("");
var mensagemFinal = new SecondaryBox("");
mensagemFinal.changeStyle("rgba(0,0,0,0)", "white", "50px", "ubuntu");
mensagemFinal.box.style.bottom = "50%";
mensagemFinal.box.style.left = "30%";

cronometroMessage.changeStyle("rgba(0,0,0,0)", "white", "32px", "ubuntu");
cronometroMessage.box.style.bottom = "92%";

let Segundos = 0;
let miliSegundos = 0;
let Minutos = 0;

function resetMessages() {
  Segundos = 0;
  miliSegundos = 0;
  Minutos = 0;
  voltas = 0;
}

function updatecronometroMessage() {
  var str = Minutos + ":" + Segundos + ":" + miliSegundos;
  let intervalo = setInterval(miliSegundos++, 1000);
  if (miliSegundos == 60) {
    Segundos++;
    miliSegundos = 0;
  }
  if (Segundos == 60) {
    Minutos++;
    Segundos = 0;
  }
  if (voltas == 4) {
    updtadeFinalMessage();
  }
  cronometroMessage.changeMessage(str);
}

function updtadeFinalMessage() {
  var str = "Voce finalizou a corrida";
  mensagemFinal.changeMessage(str);
}

function toggleCameraControls() {            
  orbit.enabled = modoInspecao;            
}            
  

// window size changes
// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false,
);

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);
var velocidade_carro = 0;
var acelerou = false;
let voltas = 0;

// To use the keyboard
var keyboard = new KeyboardState();

// To be used to manage keyboard
let clock = new THREE.Clock();

// create the ground plane
let plane = createGroundPlaneXZ(20, 20);
scene.add(plane);

scene.add(carroceria);

function updateCameraPosition() {
  if (!modoInspecao) {
    let lookAtPosition = new THREE.Vector3(
      carroceria.position.x + cameraLookAhead * Math.sin(carroceria.rotation.y),
      carroceria.position.y,
      carroceria.position.z + cameraLookAhead * Math.cos(carroceria.rotation.y)
    );

    let newPosition = carroceria.position.clone().add(cameraOffset);
    camera.position.set(newPosition.x, newPosition.y, newPosition.z);
    camera.lookAt(lookAtPosition);
  }
}

var reduction = false;

function keyboardUpdate(position) {
  keyboard.update();
  //angulo de rotacai do carro
  var angle = THREE.MathUtils.degToRad(2);
  var anguloRoda = 0;

  if (!modoInspecao) {
    if (keyboard.pressed("X")) {
      ARO.rotation.z += velocidade_carro / 3;
      ARO2.rotation.z += velocidade_carro / 3;
      ARO3.rotation.z += velocidade_carro / 3;
      ARO4.rotation.z += velocidade_carro / 3;
      if (reduction == true) {
        velocidade_carro = 0.25;
        if (velocidade_carro > 0) carroceria.translateX(velocidade_carro);
      } else {
        if (velocidade_carro < 0.5) velocidade_carro += 0.010;
        roda1.rotateZ(0);
        if (velocidade_carro > 0) carroceria.translateX(velocidade_carro);
      }
    } else {
      if (velocidade_carro > 0) {
        velocidade_carro -= 0.025;
        velocidade_carro = Number(velocidade_carro.toFixed(2));
        carroceria.translateX(velocidade_carro);
      }
    }

    if (keyboard.pressed("down")) {
      if (velocidade_carro > -0.5) velocidade_carro -= 0.01;
      velocidade_carro = Number(velocidade_carro.toFixed(2));
      if (velocidade_carro < 0) carroceria.translateX(velocidade_carro);
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
      if (keyboard.pressed("left") && keyboard.pressed("X"))
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

      if (keyboard.pressed("right") && keyboard.pressed("X"))
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

  if (keyboard.down("space")) {
    carroceria.position.set(0.0, 1.0, 0.0);
    carroceria.rotation.set(0, 1.5, 0);
    modoInspecao = true;
    toggleCameraControls();
    pista.clear();
  }

  if (keyboard.pressed("2")) {
    carroceria.position.set(0.0, 1.0, 0.0);
    carroceria.rotation.set(0, 1.5, 0);
    PistaEscolhida = 2;
    resetMessages();
    modoInspecao = false;
    pista.clear();

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

    createPista(posicaoPista, pista);
    scene.add(pista);
  }

  if (keyboard.pressed("1")) {
    modoInspecao = false;
    carroceria.position.set(0.0, 1.0, 0.0);
    carroceria.rotation.set(0, 1.5, 0);
    PistaEscolhida = 1;
    resetMessages();
    pista.clear();
    // scene.add(carroceria)
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
      [120, 0, 30],
      [120, 0, 60],
      [30, 0, 60],
      [60, 0, 60],
      [90, 0, 60],
      [120, 0, 60],
    ];
    createPista(posicaoPista, pista);
    scene.add(pista);
  }
}

render();

//funcao para tranformar graus em radianos
function Graus_radianos(anguloGraus) {
  var radianos = anguloGraus * (Math.PI / 180);
  return radianos;
}

// Adição do código da pista

let primeiroCheckPoint = false;
let segundoCheckPoint = false;
let terceiroCheckPoint = false;

let positionPista = [
  [0, 0, -60],
  [120, 9999, 60],
];

function reducaoVelocidade(position) {
  if (
    (position.z <= 75 &&
      position.z >= -75 &&
      position.x >= -15 &&
      position.x <= 15) ||
    (position.x >= -15 &&
      position.x <= 135 &&
      position.z >= -75 &&
      position.z <= -45) ||
    (position.x >= 45 &&
      position.x <= 135 &&
      position.z >= -15 &&
      position.z <= 15) ||
    (position.x <= 135 &&
      position.x >= 105 &&
      position.z >= -75 &&
      position.z <= -15) ||
    (position.x >= 45 &&
      position.x <= 75 &&
      position.z >= -15 &&
      position.z <= 75) ||
    (position.x >= -15 &&
      position.x <= 75 &&
      position.z >= 45 &&
      position.z <= 75)
  ) {
    reduction = false;
  } else {
    reduction = true;
  }
}
function reducaoVelocidade2(position) {
  if (
    (position.z <= 75 &&
      position.z >= -75 &&
      position.x >= -15 &&
      position.x <= 15) ||
    (position.z <= 75 &&
      position.z >= -75 &&
      position.x >= 105 &&
      position.x <= 135) ||
    (position.x >= -15 &&
      position.x <= 135 &&
      position.z >= -75 &&
      position.z <= -45) ||
    (position.x >= -15 &&
      position.x <= 135 &&
      position.z >= 45 &&
      position.z <= 75)
  ) {
    reduction = false;
    console.log(reduction);
  } else {
    reduction = true;
    console.log(reduction);
  }
}

function checkpoint(position) {
  if (
    position.x > -15 &&
    position.x < 15 &&
    position.z < -45 &&
    position.z > -75
  ) {
    primeiroCheckPoint = true;
  }
  if (
    position.x > 105 &&
    position.x < 135 &&
    position.z < -45 &&
    position.z > -75 &&
    primeiroCheckPoint == true
  ) {
    segundoCheckPoint = true;
  }
  if (
    position.x > -15 &&
    position.x < 15 &&
    position.z < 75 &&
    position.z > 45 &&
    segundoCheckPoint == true
  ) {
    terceiroCheckPoint = true;
  }
  if (
    position.x > -15 &&
    position.x < 15 &&
    position.z < -15 &&
    terceiroCheckPoint == true
  ) {
    primeiroCheckPoint = false;
    segundoCheckPoint = false;
    terceiroCheckPoint = false;
    voltas += 1;
  }
}

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

function createPista(vet, pista) {
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
      posicaoLargada1[j][2],
    );
    pista.add(largada1[j]);
    j++;
  }
  let k = 0;
  while (k < posicaoLargada2.length) {
    largada2[k] = new THREE.Mesh(geometry1, material2);
    largada2[k].position.set(
      posicaoLargada2[k][0],
      posicaoLargada2[k][1],
      posicaoLargada2[k][2],
    );
    pista.add(largada2[k]);
    k++;
  }

  let i = 0;
  let cube = [];
  let geometry = new THREE.BoxGeometry(30, 0, 30);
  let material = new THREE.MeshBasicMaterial({ color: "GREEN" });

  while (i < posicaoPista.length) {
    cube[i] = new THREE.Mesh(geometry, material);
    cube[i].position.set(vet[i][0], vet[i][1], vet[i][2]);
    pista.add(cube[i]);
    i++;
  }
}

function volta(position) {
  checkpoint(position);
}

function render() {
  updateVoltasMessage();
  requestAnimationFrame(render);
  updateCameraPosition();
  checkpoint(carroceria.position);

  if (PistaEscolhida == 2) {
    reducaoVelocidade(carroceria.position);
  } else {
    reducaoVelocidade2(carroceria.position);
  }
  if (voltas != 4 ) {
    updatecronometroMessage();
    keyboardUpdate(carroceria.position);

  } else if (voltas == 4) {
    updtadeFinalMessage();
    mensagemFinal.box.style.backgroundColor = "rgba(0,0,0)";
  }
  renderer.render(scene, camera); // Render scene
}
