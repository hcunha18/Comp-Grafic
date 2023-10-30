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
export { updateCameraPosition, toggleCameraControls };
let cameraMode = 0; // Inicie no modo que preferir

function toggleCameraControls() {
  orbit.enabled = modoInspecao;
}

function updateCameraPosition() {
  switch(cameraMode) {
    case 0: // Modo Inspeção
      let offset = new THREE.Vector3(0, -5, -20); 
      let inspectPosition = carroceria.position.clone().sub(offset);
      camera.position.set(inspectPosition.x, inspectPosition.y, inspectPosition.z);
      camera.lookAt(carroceria.position);
      break;

    case 1: // Seguindo o carro
      let lookAtPosition = new THREE.Vector3(
        carroceria.position.x + cameraLookAhead * Math.sin(carroceria.rotation.y),
        carroceria.position.y,
        carroceria.position.z + cameraLookAhead * Math.cos(carroceria.rotation.y)
      );
      let newPosition = carroceria.position.clone().add(cameraOffset);
      camera.position.set(newPosition.x, newPosition.y, newPosition.z);
      camera.lookAt(lookAtPosition);
      break;

    case 2: // Modo 3ª Pessoa
      let offset3rdPerson = new THREE.Vector3(0, 5, 10); 
      let behindPosition = carroceria.position.clone().sub(offset3rdPerson);
      camera.position.set(behindPosition.x, behindPosition.y, behindPosition.z);
      camera.lookAt(carroceria.position);
      break;
  }
}