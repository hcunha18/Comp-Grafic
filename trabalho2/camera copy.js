import * as THREE from "three";
import {
  initCamera,
} from "../libs/util/util.js";
import { OrbitControls } from "../build/jsm/controls/OrbitControls.js";
import { carroceria } from "./carro.js";
import{ modoInspecao,camera,orbit,cameraOffset,cameraLookAhead} from "./trabalho.js "
export { updateCameraPosition, toggleCameraControls}

function toggleCameraControls() {            
  orbit.enabled = modoInspecao;            
}  

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

