import * as THREE from "../build/three.module.js";
export { carroceria,Farol,Farol2,roda1,roda2,roda3,roda4,ARO,ARO2,ARO3,ARO4 };

function Graus_radianos(anguloGraus) {
  var radianos = anguloGraus * (Math.PI / 180);
  return radianos;
}

let scene, renderer, camera, material, light, orbit; // Initial variables
scene = new THREE.Scene(); // Create main scene 
var radianos = Graus_radianos(90);


//carroceria do carro
let carroceriaGeometry = new THREE.BoxGeometry(6, 1.5, 3);
material = new THREE.MeshPhongMaterial({ color: 0xff0000 }); // create a basic material
let carroceria = new THREE.Mesh(carroceriaGeometry, material);
carroceria.position.set(0.0, 1.0, 0.0); // posicao da carroceria


//farol da carroceria
const geomeriaFarol = new THREE.ConeGeometry(0.4, 0.25, 17);
const materialFarol = new THREE.MeshBasicMaterial({
  color: 0x000000,
});
const Farol = new THREE.Mesh(geomeriaFarol, materialFarol);
const Farol2 = new THREE.Mesh(geomeriaFarol, materialFarol);

Farol.position.set(3, -0.5, 1);
Farol2.position.set(3, -0.5, -1);

Farol.rotateZ(Graus_radianos(90));
Farol2.rotateZ(Graus_radianos(90));

carroceria.add(Farol);
carroceria.add(Farol2);

// aquilo
let AROgeometry = new THREE.CapsuleGeometry(0.1, 0.6, 4, 8);
let AROmaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
let ARO = new THREE.Mesh(AROgeometry, AROmaterial);
let ARO2 = new THREE.Mesh(AROgeometry, AROmaterial);
let ARO3 = new THREE.Mesh(AROgeometry, AROmaterial);
let ARO4 = new THREE.Mesh(AROgeometry, AROmaterial);

ARO.position.set(0, 0.2, 0);
ARO2.position.set(0, 0.2, 0);
ARO3.position.set(0, -0.2, 0);
ARO4.position.set(0, -0.2, 0);

ARO.rotateX(radianos);
ARO2.rotateX(radianos);
ARO3.rotateX(radianos);
ARO4.rotateX(radianos);

// rodas do carro
let rodasGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);
const materialRodas = new THREE.MeshBasicMaterial({
  color: 0x00000,
});
let roda1 = new THREE.Mesh(rodasGeometry, materialRodas);
let roda2 = new THREE.Mesh(rodasGeometry, materialRodas);
let roda3 = new THREE.Mesh(rodasGeometry, materialRodas);
let roda4 = new THREE.Mesh(rodasGeometry, materialRodas);

roda1.position.set(2.3, -0.6, 1.7);
roda2.position.set(-2.3, -0.6, 1.7);
roda3.position.set(2.3, -0.6, -1.7);
roda4.position.set(-2.3, -0.6, -1.7);

//rotaciona a roda em 90 graus

roda1.rotateX(radianos);
roda2.rotateX(radianos);
roda3.rotateX(radianos);
roda4.rotateX(radianos);

//adiciona as rodas na carroceria
roda1.add(ARO);
roda2.add(ARO2);
roda3.add(ARO3);
roda4.add(ARO4);
carroceria.add(roda1);
carroceria.add(roda2);
carroceria.add(roda3);
carroceria.add(roda4);
carroceria.rotateY(radianos);


//como eu exporto minha variavel carroceria para o arquivo principal?