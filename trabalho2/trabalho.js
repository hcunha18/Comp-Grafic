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
import {
  carroceria,
  torus,
  torus1,
  Aro, Aro1, Aro2, Aro3, Aro4, Aro5, Aro6, Aro7
} from "./exempleCar.js";
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
} from "./pista.js";
import { updateCameraPosition, modoInspecao_Camera } from "./camera.js";
export {
  modoInspecao,
  camera,
  orbit,
  cameraOffset,
  cameraLookAhead,
  cameraMode,
  pista,
};
import { Object3D, VectorKeyframeTrack } from "../build/three.module.js";

let scene, light, orbit; // Initial variables
let renderer = initRenderer(); // Init a basic renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
let camera = initCamera(new THREE.Vector3(0, 15, 32)); // Init camera in this position
orbit = new OrbitControls(camera, renderer.domElement); // Enable mouse rotation, pan, zoom etc.
let cameraOffset = new THREE.Vector3(-30, 45, 40);
let cameraLookAhead = 5;
scene = new THREE.Scene(); // Create main scene
light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
let modoInspecao = false;
let pista = new THREE.Object3D();
pista.receiveShadow = true;
let PistaEscolhida = 1;
carroceria.position.set(-1.5, 1.0, 0.0);
carroceria.rotation.set(0, 1.5, 0);
createPista(posicaoPista1, pista);
scene.add(pista);
let cameraMode = 0;
let virtualCamera, camPosition, upVec;
let PistaGrande = 1;
let x = 70;
let y = 150;
let z = 5;

// // Adicione a segunda câmera à cena
// scene.add(virtualCamera);

// contador de voltas
var VoltasMessage = new SecondaryBox("");
VoltasMessage.box.style.bottom = "0%";
VoltasMessage.changeStyle("rgba(0,0,0,0)", "white", "32px", "ubuntu");

// Velocimentro
var velocimetro = new SecondaryBox("");
velocimetro.box.style.bottom = "95%";
velocimetro.box.style.left = "50%";
velocimetro.changeStyle("rgba(0,0,0,0)", "white", "32px", "ubuntu");

function updateVoltasMessage() {

  var str = "Voltas: " + voltas;
  VoltasMessage.changeMessage(str);
}

function updateVelocimetro() {
  if (velocidade_carro > 0) {
    var str = Math.ceil((velocidade_carro * 99)) + "Km/h ";
    velocimetro.changeMessage(str);
  }
  if (Math.ceil((velocidade_carro * 99) < 3)) {
    var str = "0Km/h ";
    velocimetro.changeMessage(str);
  }
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
cronometroMessage.box.style.bottom = "5%";

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

let lastSpacePress = false;

camPosition = new THREE.Vector3(70, 150, 5);
upVec = new THREE.Vector3(0, 0.0, 0.0);
virtualCamera = new THREE.PerspectiveCamera(60, 1.3, 0.1, 400.0);
virtualCamera.position.copy(camPosition);
virtualCamera.rotation.set(-1.5708, 0, 0);
virtualCamera.up.copy(upVec);




function keyboardUpdate(position) {
  keyboard.update();
  //angulo de rotacai do carro
  var angle = THREE.MathUtils.degToRad(2);
  var anguloRoda = 0;

  if (!modoInspecao) {
    if (keyboard.pressed("X")) {

      // roda girar quando anda
      Aro.rotation.y += velocidade_carro / 3
      Aro1.rotation.y += velocidade_carro / 3
      Aro2.rotation.y += velocidade_carro / 3
      Aro3.rotation.y += velocidade_carro / 3
      Aro4.rotation.y += velocidade_carro / 3
      Aro5.rotation.y += velocidade_carro / 3
      Aro6.rotation.y += velocidade_carro / 3
      Aro7.rotation.y += velocidade_carro / 3


      if (reduction == true) {
        velocidade_carro = 0.25;
        if (velocidade_carro > 0) carroceria.translateX(velocidade_carro);
      } else {
        if (velocidade_carro < 1) velocidade_carro += 0.01;
        // torus.rotateZ(0);
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
      if (velocidade_carro > -1) velocidade_carro -= 0.01;
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
      if (torus.rotation.y < Graus_radianos(30)) {
        anguloRoda += Graus_radianos(1);
        anguloRoda = Number(anguloRoda.toFixed(2));
        torus.rotateY(anguloRoda);
        torus1.rotateY(anguloRoda);
      }
      if (velocidade_carro > 0 && acelerou) {
        carroceria.rotateY(angle);
      }
      if (keyboard.pressed("left") && keyboard.pressed("X"))
        carroceria.rotateY(angle);

      if (keyboard.pressed("left") && keyboard.pressed("down"))
        carroceria.rotateY(-angle);
    } else {
      if (torus.rotation.y > Graus_radianos(0)) {
        anguloRoda -= Graus_radianos(1);
        anguloRoda = Number(anguloRoda.toFixed(2));
        torus.rotateY(anguloRoda);
        torus1.rotateY(anguloRoda);
      }
    }
    if (keyboard.pressed("right")) {
      //rotacao das rodas
      if (torus.rotation.y > Graus_radianos(-30)) {
        anguloRoda -= Graus_radianos(1);
        anguloRoda = Number(anguloRoda.toFixed(2));
        torus.rotateY(anguloRoda);
        torus1.rotateY(anguloRoda);
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
      if (torus.rotation.y < Graus_radianos(0)) {
        anguloRoda += Graus_radianos(1);
        anguloRoda = Number(anguloRoda.toFixed(2));
        torus.rotateY(anguloRoda);
        torus1.rotateY(anguloRoda);
      }
    }

  } else {
    if (keyboard.pressed("X")) {
      velocidade_carro += 0.010;
      Aro.rotation.y += velocidade_carro / 3
      Aro1.rotation.y += velocidade_carro / 3
      Aro2.rotation.y += velocidade_carro / 3
      Aro3.rotation.y += velocidade_carro / 3
      Aro4.rotation.y += velocidade_carro / 3
      Aro5.rotation.y += velocidade_carro / 3
      Aro6.rotation.y += velocidade_carro / 3
      Aro7.rotation.y += velocidade_carro / 3
    } else {
      velocidade_carro = 0;
    }
  }


  if (keyboard.down("space")) {
    console.log("Apertou espaço");
    cameraMode += 1;
    modoInspecao = modoInspecao_Camera;
    if (cameraMode > 2) {
      cameraMode = 0;
      createPista(posicaoPista1, pista);
      modoInspecao = false;
      scene.add(pista);
    } else if (cameraMode == 2) modoInspecao = true;
  }

  if (!modoInspecao) {
    if (keyboard.pressed("1")) {
      modoInspecao = false;
      carroceria.position.set(-1.5, 1.0, 0.0);
      carroceria.rotation.set(0, 1.5, 0);
      PistaEscolhida = 1;
      resetMessages();
      pista.clear();
      // scene.add(carroceria)

      createPista(posicaoPista1, pista);
      scene.add(pista);
    }

    if (keyboard.pressed("2")) {
      carroceria.position.set(-1.5, 1.0, 0.0);
      carroceria.rotation.set(0, 1.5, 0);
      PistaEscolhida = 2;
      resetMessages();
      modoInspecao = false;
      pista.clear();

      createPista(posicaoPista2, pista);
      scene.add(pista);
    }
    if (keyboard.pressed("3")) {
      carroceria.position.set(-1.5, 1.0, 0.0);
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
      carroceria.position.set(-1.5, 1.0, 0.0);
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

}

let lightColor = "rgb(255,255,255)";
let lightPosition = new THREE.Vector3(45.0, 50.0, 50.0);
let dirLight = new THREE.DirectionalLight(lightColor);

dirLight.position.copy(lightPosition);
dirLight.castShadow = true;
light.castShadow = true;

dirLight.position.copy(lightPosition);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 512;
dirLight.shadow.mapSize.height = 512;
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 200;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.right = 50;
dirLight.shadow.camera.top = 50;
dirLight.shadow.camera.bottom = -50;
scene.add(dirLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // cor e intensidade
scene.add(ambientLight);
carroceria.castShadow = true;
plane.receiveShadow = true;

function controlledRender() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Set main viewport
  renderer.setViewport(0, 0, width, height); // Reset viewport
  renderer.setScissorTest(false); // Disable scissor to paint the entire window
  renderer.setClearColor("rgb(100, 100, 150)");
  renderer.clear(); // Clean the window
  renderer.render(scene, camera);
  camera.lookAt(carroceria.position);

  // If autoClear if false, clear depth buffer to avoid unwanted overlays
  if (!renderer.autoClear) renderer.clearDepth(); // Clean the small viewport
  if (!modoInspecao) {
    // Set virtual camera viewport
    let offset = 0;
    let vcWidth = width / 3.0 > 200 ? 400 : width / 3.0;
    let vcHeidth = vcWidth * 0.75;
    camera.lookAt(carroceria.position);
    renderer.setViewport(offset, height - 300 - offset, vcWidth, vcHeidth); // Set virtual camera viewport
    renderer.setScissor(
      offset,
      height - vcHeidth - offset,
      vcWidth - 1,
      vcHeidth - 1
    ); // Set scissor with the same size as the viewport - 1
    renderer.setScissorTest(true); // Enable scissor to paint only the scissor are (i.e., the small viewport)
    renderer.setClearColor("rgb(120, 120, 150)"); // Use a darker clear color in the small viewport
    renderer.render(scene, virtualCamera); // Render scene of the virtual camera}
  }
}

render();

function render() {


  requestAnimationFrame(render);
  updateCameraPosition();
  //Atualiza a posição da spotlight para coincidir com a da câmera
  dirLight.position.set(
    camera.position.x,
    camera.position.y,
    camera.position.z
  );
  dirLight.target.position.set(
    carroceria.position.x,
    carroceria.position.y,
    carroceria.position.z
  );

  if (PistaEscolhida == 1) {
    checkpoint(carroceria.position);
    reducVeloc(posicaoPista1, carroceria.position);
    x = 70;
    y = 130;
    z = 4;
  }
  if (PistaEscolhida == 2) {
    checkpoint(carroceria.position);
    reducVeloc(posicaoPista2, carroceria.position);
    x = 70;
    y = 150;
    z = 5;
  }
  if (PistaEscolhida == 3) {
    checkpoint2(carroceria.position);
    reducVeloc(posicaoPista3, carroceria.position);
    x = 150;
    y = 250;
    z = -50;
  }
  if (PistaEscolhida == 4) {
    checkpoint3(carroceria.position);
    reducVeloc(posicaoPista4, carroceria.position);
    x = 150;
    y = 250;
    z = 30;
  }
  if (voltas != 4) {
    updatecronometroMessage();
    keyboardUpdate(carroceria.position);
  } else if (voltas == 4) {
    updtadeFinalMessage();
    mensagemFinal.box.style.backgroundColor = "rgba(0,0,0)";
  }
  controlledRender();

  if (!modoInspecao) {
    updateVoltasMessage();
    updateVelocimetro();
    camPosition = new THREE.Vector3(x, y, z);
    upVec = new THREE.Vector3(0, 0.0, 0.0);
    virtualCamera = new THREE.PerspectiveCamera(60, 1.3, 0.1, 400.0);
    virtualCamera.position.copy(camPosition);
    virtualCamera.rotation.set(-1.5708, 0, 0);
    virtualCamera.up.copy(upVec);
  } else {
    renderer.render(scene, camera);
  }
}