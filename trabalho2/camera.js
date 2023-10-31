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

export var cameraMode = 0; // 0: 3ª pessoa, 1: Seguindo o Carro, 2: Inspeção
let smoothness = 0.05;

function toggleCameraControls() {
  orbit.enabled = modoInspecao;
}

function updateCameraPosition() {
  console.log("Chamada updateCameraPosition - cameraMode atual:", cameraMode);
  let offset, matrix; // Declarar as variáveis fora do switch
  switch (cameraMode) {
    case 0: // Modo 3ª pessoa
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
      break;

    case 1: // Modo Seguindo o Carro
      offset = new THREE.Vector3(0, 5, 10); // Ajuste o offset conforme necessário

      matrix = new THREE.Matrix4(); // Reutilizar a variável, apenas reatribuindo o valor
      matrix.extractRotation(carroceria.matrix);

      // Aplicar a rotação ao offset
      offset.applyMatrix4(matrix);

      // Atualizar a posição da câmera para ficar atrás do carro
      let followPosition = carroceria.position.clone().sub(offset);
      camera.position.set(followPosition.x, followPosition.y, followPosition.z);

      // Fazer a câmera olhar para o carro (ou para a direção do movimento)
      camera.lookAt(carroceria.position);
      break;

    case 2: // Modo de Inspeção
      console.log("Pista visível:", pista.visible);
      // Definir visibilidade da pista, se necessário
      pista.visible = false;
      console.log(
        "Pista deve estar invisível agora. Pista visível:",
        pista.visible
      );
      // Definir posição da câmera
      offset = new THREE.Vector3(0, -10, -30);
      let inspectPosition = carroceria.position.clone().sub(offset);
      camera.position.set(
        inspectPosition.x,
        inspectPosition.y,
        inspectPosition.z
      );
      // Habilitar controles interativos
      controls.enabled = true;
      controls.target.set(
        carroceria.position.x,
        carroceria.position.y,
        carroceria.position.z
      );
      controls.update();
      break;
  }
}