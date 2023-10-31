import * as THREE from "three";
import { initCamera } from "../libs/util/util.js";
import { OrbitControls } from "../build/jsm/controls/OrbitControls.js";
// import { carroceria } from "./carro.js";
import { carroceria } from "./exempleCar.js";
import {
  modoInspecao,
  camera,
  orbit,
  cameraOffset,
  cameraLookAhead,
} from "./trabalho.js ";
export { updateCameraPosition, toggleCameraControls, cameraMode };

let cameraMode = 0;

let smoothness = 0.05;

function toggleCameraControls() {
  orbit.enabled = modoInspecao;
}

function updateCameraPosition() {
  console.log("Chamada updateCameraPosition - cameraMode atual:", cameraMode);
  let offset, matrix; // Declarar as variáveis fora do switch

  if (cameraMode == 0) {
    // Modo 3ª pessoa
    offset = new THREE.Vector3(-20, 5, 2); // Ajuste conforme necessário

    matrix = new THREE.Matrix4(); // Inicializar a matriz
    matrix.extractRotation(carroceria.matrix); // Obter a matriz de rotação do carro

    // Multiplicar o deslocamento pela matriz de rotação para alinhar com a direção do carro
    offset.applyMatrix4(matrix);

    // Posicionar a câmera atrás do carro, com base no offset ajustado
    let cameraPosition = carroceria.position.clone().add(offset);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

    // Fazer a câmera olhar para o carro
    camera.lookAt(carroceria.position);
  }

  if (cameraMode == 1) {
    // Modo Seguindo o Carro

    let lookAtPosition = new THREE.Vector3(
      carroceria.position.x + cameraLookAhead * Math.sin(carroceria.rotation.y),
      carroceria.position.y,
      carroceria.position.z + cameraLookAhead * Math.cos(carroceria.rotation.y)
    );

    let newPosition = carroceria.position.clone().add(cameraOffset);
    camera.position.set(newPosition.x, newPosition.y, newPosition.z);
    camera.lookAt(lookAtPosition);
  }
  if (cameraMode == 2) {
    carroceria.position.set(0.0, 1.0, 0.0);
    carroceria.rotation.set(0, 1.5, 0);
    modoInspecao = true;
    toggleCameraControls();
    pista.clear();
  } // Modo de Inspeção
}
