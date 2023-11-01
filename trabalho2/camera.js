import * as THREE from "three";
import { initCamera } from "../libs/util/util.js";
import { OrbitControls } from "../build/jsm/controls/OrbitControls.js";
// import { carroceria } from "./carro.js";
import { carroceria } from "./exempleCar.js";
import {
  modoInspecao,
  camera,
  cameraOffset,
  cameraLookAhead,
  cameraMode,
  pista
} from "./trabalho.js ";
export { updateCameraPosition ,modoInspecao_Camera };

let smoothness = 0.05;
let modoInspecao_Camera = false


function updateCameraPosition() {
  switch (cameraMode) {
    case 0:
      // Modo 3ª pessoa
      let offset = new THREE.Vector3(-20, 5, 2);
      let matrix = new THREE.Matrix4();
      modoInspecao_Camera= false

      matrix.extractRotation(carroceria.matrix);
      offset.applyMatrix4(matrix);

      // Posicionar a câmera atrás do carro, com base no offset ajustado
      let cameraPosition = carroceria.position.clone().add(offset);
      camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

      // Fazer a câmera olhar para o carro
      camera.lookAt(carroceria.position);
      break;

    case 1:
      // Modo Seguindo o Carro
      let lookAtPosition = new THREE.Vector3(
        carroceria.position.x + cameraLookAhead * Math.sin(carroceria.rotation.y),
        carroceria.position.y,
        carroceria.position.z + cameraLookAhead * Math.cos(carroceria.rotation.y)
      );

      let newPosition = carroceria.position.clone().add(cameraOffset);
      camera.position.set(newPosition.x, newPosition.y, newPosition.z);
      camera.lookAt(lookAtPosition);
      break;

    case 2:
      // Modo de Inspeção
      camera.lookAt(carroceria.position);
      carroceria.position.set(-2, 0, 0.0)
      carroceria.rotation.set(0, 1.58, 0);

      modoInspecao_Camera = true;
      pista.clear();
      break;
  }
}
