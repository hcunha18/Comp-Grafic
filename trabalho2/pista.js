import * as THREE from "../build/three.module.js";
import { degreesToRadians } from "../libs/util/util.js";
export {
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
};

// CRIAÇAO DO FENO
let loader = new THREE.TextureLoader();
const feno1 = new THREE.CylinderGeometry(1, 1, 4, 32);

let cilindroMaterial = [
  setMaterial("fenolateral.jpg",1,1),
  setMaterial("fenobase.jpg",1,1),
  setMaterial("fenobase.jpg",1,1)
];
let feno = new THREE.Mesh(feno1, cilindroMaterial);
feno.rotateX(degreesToRadians(90));
feno.rotateZ(degreesToRadians(90));

function setMaterial(file, repeatU = 1, repeatV = 1, color = 'rgb(255,255,255'){
  let mat = new THREE.MeshBasicMaterial({map: loader.load(file), color:color});
  mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
  mat.map.minFilter = mat.map.magFilter = THREE.LinearFilter;
  mat.map.repeat.set(repeatU, repeatV);
  return mat;
}


// CRIAÇÃO DO CONE
var textureLoader = new THREE.TextureLoader();
const conegeometria = new THREE.CylinderGeometry(0.1, 1, 2, 50);
const materialcone = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const cone = new THREE.Mesh(conegeometria, materialcone);
var corcone = textureLoader.load("cone.png");
cone.material.map = corcone;


// Configuração da Repetição
// pistaTexture.wrapS = pistaTexture.wrapT = THREE.RepeatWrapping;
// foraPistaTexture.wrapS = foraPistaTexture.wrapT = THREE.RepeatWrapping;
// pistaTexture.repeat.set(1, 1);
// foraPistaTexture.repeat.set(15, 15);

function Graus_radianos(anguloGraus) {
  var radianos = anguloGraus * (Math.PI / 180);
  return radianos;
}

function setasPista3(pista) {
  const geometry = new THREE.CylinderGeometry(3, 3, 0.2, 3);
  const material = new THREE.MeshBasicMaterial({ color: "BLACK" });
  const triangulo = new THREE.Mesh(geometry, material);
  pista.add(triangulo);
  triangulo.position.set(100, 0, -60);
  triangulo.rotateY(Graus_radianos(90));
  const triangulo2 = new THREE.Mesh(geometry, material);
  pista.add(triangulo2);
  triangulo2.position.set(140, 0, -60);
  triangulo2.rotateY(Graus_radianos(90));
  const triangulo3 = new THREE.Mesh(geometry, material);
  pista.add(triangulo3);
  triangulo3.position.set(180, 0, -100);
  triangulo3.rotateY(Graus_radianos(180));
  const triangulo4 = new THREE.Mesh(geometry, material);
  pista.add(triangulo4);
  triangulo4.position.set(180, 0, -140);
  triangulo4.rotateY(Graus_radianos(180));
}

function setasPista4(pista) {
  const geometry = new THREE.CylinderGeometry(3, 3, 0.2, 3);
  const material = new THREE.MeshBasicMaterial({ color: "BLACK" });
  const triangulo = new THREE.Mesh(geometry, material);
  pista.add(triangulo);
  triangulo.position.set(80, 0, -60);
  triangulo.rotateY(Graus_radianos(90));
  const triangulo2 = new THREE.Mesh(geometry, material);
  pista.add(triangulo2);
  triangulo2.position.set(60, 0, -40);
  const triangulo3 = new THREE.Mesh(geometry, material);
  pista.add(triangulo3);
  triangulo3.position.set(240, 0, 10);
  const triangulo4 = new THREE.Mesh(geometry, material);
  pista.add(triangulo4);
  triangulo4.position.set(240, 0, 50);
}

function reducVeloc(vet, position) {
  let i = 0;
  for (i = 0; i < vet.length; i++) {
    if (
      (position.z <= vet[i][2] + 15 &&
        position.z >= vet[i][2] - 15 &&
        position.x <= vet[i][0] + 15 &&
        position.x >= vet[i][0] - 15) ||
      (position.z <= 15 &&
        position.z >= -15 &&
        position.x <= 15 &&
        position.x >= -15)
    ) {
      reduction = false;
      break;
    } else {
      reduction = true;
    }
  }
}

let voltas = 0;
var reduction = false;
let posicaoPista1 = [
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
  [70, 1, 60],
  [50, 1, 65],
  [130, 1, 15],
  [120, 1, 60],
  [120, 1, -45],
  [108, 1, -30],
  [5,1.3,50],
  [-5, 1, 20],
  [35,1,-70],
  [90,1,-60]
];
let posicaoPista2 = [
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
  [70, 1, 60],
  [50, 1, 65],
  [100, 1, 5],
  [60, 1, 0],
  [120, 1, -45],
  [108, 1, -30],
  [5,1.3,50],
  [-5, 1, 20],
  [35,1,-70],
  [90,1,-60]
];
let posicaoPista3 = [
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
  [120, 0, -60],
  [150, 0, -60],
  [180, 0, -60],
  [210, 0, -120],
  [240, 0, -120],
  [180, 0, -90],
  [180, 0, -120],
  [240, 0, -150],
  [240, 0, -180],
  [120, 0, -90],
  [120, 0, -120],
  [150, 0, -120],
  [180, 0, -150],
  [180, 0, -180],
  [210, 0, -180],
  [140, 1, -55],
  [175, 1, -85],
  [130, 1, 15],
  [120, 1, 60],
  [180, 1, -120],
  [120, 1, -120],
  [5,1.3,50],
  [-5, 1, 20],
  [35,1,-70],
  [90,1,-60]
];
let posicaoPista4 = [
  [0, 0, -30],
  [0, 0, -60],
  [0, 0, 30],
  [0, 0, 60],
  [0, 0, 90],
  [30, 0, 90],
  [60, 0, 90],
  [90, 0, 90],
  [90, 0, 120],
  [90, 0, 150],
  [120, 0, 150],
  [150, 0, 150],
  [180, 0, 150],
  [210, 0, 150],
  [30, 0, -60],
  [60, 0, -60],
  [90, 0, -60],
  [120, 0, -60],
  [150, 0, -60],
  [180, 0, -60],
  [210, 0, -60],
  [240, 0, -60],
  [240, 0, -30],
  [240, 0, 0],
  [240, 0, 30],
  [240, 0, 60],
  [240, 0, 90],
  [240, 0, 120],
  [240, 0, 150],
  [60, 0, 0],
  [60, 0, -30],
  [60, 0, 30],
  [90, 0, 30],
  [120, 0, 30],
  [150, 0, 30],
  [180, 0, 30],
  [210, 0, 30],
  [70, 1, 35],
  [120, 1, 25],
  [130, 1, 150],
  [210, 1, 145],
  [240, 1, -45],
  [235, 1, 0],
  [5,1,50],
  [-5, 1, 20],
  [35,1,-70],
  [90,1,-60]
];

function createPista(vet, pista,pistaTexture,foraPistaTexture) {
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
    pista.add(largada1[j]);
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
    pista.add(largada2[k]);
    k++;
  }
  let foraPistaMaterial = new THREE.MeshBasicMaterial({
    map: foraPistaTexture,
  });
  const foraPistaGeometry = new THREE.PlaneGeometry(1000, 1000); // Ajuste o tamanho conforme necessário
  const foraPista = new THREE.Mesh(foraPistaGeometry, foraPistaMaterial);
  foraPista.position.set(0, -1, 0); // Ajuste conforme a necessidade de posicionamento
  foraPista.rotation.x = -Math.PI / 2; // Rotação para deixar o plano horizontal
  pista.add(foraPista);

  let i = 0;
  let cube = [];
  let geometry = new THREE.BoxGeometry(30, 0, 30);
  let material = new THREE.MeshBasicMaterial({ map: pistaTexture });

  while (i < vet.length-10) {
    cube[i] = new THREE.Mesh(geometry, material);
    cube[i].position.set(vet[i][0], vet[i][1], vet[i][2]);
    cube[i].receiveShadow = true;
    pista.add(cube[i]);
    i++;
  }

    let cones=[];
    let fenos=[];
    let m = 0;
    let h = vet.length-1;
    let posicoescone= [[70, 1, 60],[130, 1, 15], [120, 1, -45],[5,1.3,50],[35,1,-70]];
    let posicoesfeno= [[50, 1, 65],[120, 1, 60],[108, 1, -30],[-5, 1, 20],[90,1,-60]];
  
  while(h > vet.length-10){
    cones[m] = cone.clone();
    fenos[m] = feno.clone();
    cones[m].position.set(vet[h][0], vet[h][1], vet[h][2]);
    h--;
    fenos[m].position.set(vet[h][0], vet[h][1], vet[h][2]);
    h--;
    pista.add(cones[m]);
    pista.add(fenos[m]);
    m++;
  };
}

// Adição do código da pista

let primeiroCheckPoint = false;
let segundoCheckPoint = false;
let terceiroCheckPoint = false;

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

function checkpoint2(position) {
  if (
    position.x > 165 &&
    position.x < 195 &&
    position.z < -45 &&
    position.z > -75
  ) {
    primeiroCheckPoint = true;
  }
  if (
    position.x > 165 &&
    position.x < 195 &&
    position.z > -195 &&
    position.z < -165 &&
    primeiroCheckPoint == true
  ) {
    segundoCheckPoint = true;
  }
  if (
    position.x > 105 &&
    position.x < 135 &&
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

function checkpoint3(position) {
  if (
    position.x > 225 &&
    position.x < 255 &&
    position.z < 165 &&
    position.z > 135
  ) {
    primeiroCheckPoint = true;
  }
  if (
    position.x > 75 &&
    position.x < 105 &&
    position.z > 135 &&
    position.z < 165 &&
    primeiroCheckPoint == true
  ) {
    segundoCheckPoint = true;
  }
  if (
    position.x > -15 &&
    position.x < 15 &&
    position.z < 105 &&
    position.z > 75 &&
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

function volta(position) {
  checkpoint(position);
}
