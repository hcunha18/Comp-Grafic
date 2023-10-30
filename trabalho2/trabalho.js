import * as THREE from "three";
import { OrbitControls } from "../build/jsm/controls/OrbitControls.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import {
  initCamera,
  initRenderer,
  initDefaultBasicLight,
  setDefaultMaterial,
  InfoBox,
  SecondaryBox,
  onWindowResize,
  createGroundPlaneXZ,
} from "../libs/util/util.js";

// import { carroceria, roda1, roda3, ARO, ARO2, ARO3, ARO4 } from "./carro.js";
import { carroceria,torus,torus1,torus2,torus3,heixo_dianteiro } from "./exempleCar.js";
import {
  createPista,
  checkpoint,
  checkpoint2,
  checkpoint3,
  reducVeloc,
  voltas,
  reduction,
  posicaoPista1,
  posicaoPista2,
  posicaoPista3,
  posicaoPista4,
  setasPista3,
  setasPista4,
} from "./Pista.js";
import { updateCameraPosition, toggleCameraControls } from "./camera.js";
export { modoInspecao, camera, orbit, cameraOffset, cameraLookAhead };
import { Object3D } from "../build/three.module.js";

let scene, light; // Initial variables
let renderer = initRenderer(); // Init a basic renderer
let camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
let orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.
let cameraOffset = new THREE.Vector3(-30, 25, 40);
let cameraLookAhead = 5;
scene = new THREE.Scene(); // Create main scene
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
let modoInspecao = true;
let pista = new THREE.Object3D();
let PistaEscolhida = 0;
let cameraMode = 0; // Inicie no modo que preferir

// contador de voltas
var VoltasMessage = new SecondaryBox("");
VoltasMessage.box.style.bottom = "95%";
VoltasMessage.changeStyle("rgba(0,0,0,0)", "white", "32px", "ubuntu");

function updateVoltasMessage() {
  var str = "Voltas: " + voltas;
  VoltasMessage.changeMessage(str);
}

//funcao para tranformar graus em radianos
function Graus_radianos(anguloGraus) {
  var radianos = anguloGraus * (Math.PI / 180);
  return radianos;
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

function resetMessages(voltas) {
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

// window size changes
// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

var velocidade_carro = 0;
var acelerou = false;

// To use the keyboard
var keyboard = new KeyboardState();

// To be used to manage keyboard
let clock = new THREE.Clock();

// create the ground plane
let plane = createGroundPlaneXZ(20, 20);
scene.add(plane);

scene.add(carroceria);

function keyboardUpdate(position) {
  keyboard.update();
  //angulo de rotacai do carro
  var angle = THREE.MathUtils.degToRad(2);
  var anguloRoda = 0;

  if (!modoInspecao) {
    if (keyboard.pressed("X")) {
      torus.rotation.z += velocidade_carro / 3;
      torus1.rotation.z += velocidade_carro / 3;
      torus2.rotation.z += velocidade_carro / 3;
      torus3.rotation.z += velocidade_carro / 3;
      if (reduction == true) {
        velocidade_carro = 0.25;
        if (velocidade_carro > 0) carroceria.translateX(velocidade_carro);
      } else {
        if (velocidade_carro < 0.5) velocidade_carro += 0.01;
        torus.rotateZ(0);
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
      if (heixo_dianteiro.rotation.z > Graus_radianos(-30)) {
        anguloRoda -= Graus_radianos(1);
        anguloRoda = Number(anguloRoda.toFixed(2));
        heixo_dianteiro.rotateX(anguloRoda);
      }''
      if (velocidade_carro > 0 && acelerou) {
        carroceria.rotateY(angle);
      }
      if (keyboard.pressed("left") && keyboard.pressed("X"))
        carroceria.rotateY(angle);

      if (keyboard.pressed("left") && keyboard.pressed("down"))
        carroceria.rotateY(-angle);
    } else {
      if (heixo_dianteiro.rotation.z < Graus_radianos(0)) {
        anguloRoda += Graus_radianos(1);
        anguloRoda = Number(anguloRoda.toFixed(2));
        heixo_dianteiro.rotateX(anguloRoda);
      }
    }
    if (keyboard.pressed("right")) {
      //rotacao das rodas
      if (heixo_dianteiro.rotation.z < Graus_radianos(30)) {
        anguloRoda += Graus_radianos(1);
        anguloRoda = Number(anguloRoda.toFixed(2));
        heixo_dianteiro.rotateX(anguloRoda);
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
      if (torus.rotation.z > Graus_radianos(0)) {
        anguloRoda -= Graus_radianos(1);
        anguloRoda = Number(anguloRoda.toFixed(2));
        heixo_dianteiro.rotateX(anguloRoda);
      }
    }
  }

  if (keyboard.down("space")) {
    carroceria.position.set(0.0, 1.0, 0.0);
    carroceria.rotation.set(0, 1.5, 0);
    modoInspecao = true;
    toggleCameraControls();
    pista.clear();
    cameraMode = (cameraMode + 1) % 3; // Isso fará a variável alternar entre 0, 1 e 2
  }

  if (keyboard.pressed("1")) {
    modoInspecao = false;
    carroceria.position.set(0.0, 1.0, 0.0);
    carroceria.rotation.set(0, 1.5, 0);
    PistaEscolhida = 1;
    resetMessages();
    pista.clear();
    // scene.add(carroceria)

    createPista(posicaoPista1, pista);
    scene.add(pista);
  }

  if (keyboard.pressed("2")) {
    carroceria.position.set(0.0, 1.0, 0.0);
    carroceria.rotation.set(0, 1.5, 0);
    PistaEscolhida = 2;
    resetMessages();
    modoInspecao = false;
    pista.clear();

    createPista(posicaoPista2, pista);
    scene.add(pista);
  }

  if (keyboard.pressed("3")) {
    carroceria.position.set(0.0, 1.0, 0.0);
    carroceria.rotation.set(0, 1.5, 0);

    PistaEscolhida = 3;
    resetMessages();
    modoInspecao = false;
    pista.clear();
    let seta1 = setasPista3(pista);
    createPista(posicaoPista3, pista);
    scene.add(pista);
  }

  if (keyboard.pressed("4")) {
    carroceria.position.set(0.0, 1.0, 0.0);
    carroceria.rotation.set(0, 1.5, 0);
    PistaEscolhida = 4;
    resetMessages();
    modoInspecao = false;
    pista.clear();
    let seta1 = setasPista4(pista);
    createPista(posicaoPista4, pista);
    scene.add(pista);
  }
}

render();

function render() {
  updateVoltasMessage();
  requestAnimationFrame(render);
  updateCameraPosition();

  if (PistaEscolhida == 1) {
    checkpoint(carroceria.position);
    reducVeloc(posicaoPista1, carroceria.position);
  }
  if (PistaEscolhida == 2) {
    checkpoint(carroceria.position);
    reducVeloc(posicaoPista2, carroceria.position);
  }
  if (PistaEscolhida == 3) {
    checkpoint2(carroceria.position);
    reducVeloc(posicaoPista3, carroceria.position);
  }
  if (PistaEscolhida == 4) {
    checkpoint3(carroceria.position);
    reducVeloc(posicaoPista4, carroceria.position);
  }
  if (voltas != 4) {
    updatecronometroMessage();
    keyboardUpdate(carroceria.position);
  } else if (voltas == 4) {
    updtadeFinalMessage();
    mensagemFinal.box.style.backgroundColor = "rgba(0,0,0)";
  }
  renderer.render(scene, camera); // Render scene
}
